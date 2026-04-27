import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { auth, googleProvider } from "@/lib/firebase";
import { LoginFormData, loginSchema } from "@/lib/loginSchema";
import { getFirebaseErrorMessage } from "@/utils/firebaseErrors";

import orbitLogo from "@/assets/orbit-logo.svg";

const LoginForm = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof LoginFormData]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name as keyof LoginFormData];
        return updated;
      });
    }
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    const validation = loginSchema.safeParse(formValues);
    if (!validation.success) {
      const fieldErrors: Partial<LoginFormData> = {};
      for (const issue of validation.error.issues) {
        const key = issue.path[0] as keyof LoginFormData;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      await signInWithEmailAndPassword(
        auth,
        validation.data.email,
        validation.data.password,
      );
      navigate("/");
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        if (
          error.code === "auth/user-not-found" ||
          error.code === "auth/wrong-password" ||
          error.code === "auth/invalid-credential"
        ) {
          // Intentionally generic — avoids confirming whether an email exists
          setErrors({ email: "Incorrect email or password" });
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (error: any) {
      const message = getFirebaseErrorMessage(error.code);
      if (message) toast.error(message);
    } finally {
      setGoogleLoading(false);
    }
  };

  const inputStyles = (hasError: boolean) =>
    `bg-[#f2f4f6] rounded-lg p-2 mt-2 border-0 placeholder:text-[#94a3b8] ${
      hasError ? "border-2 border-red-500" : ""
    }`;

  return (
    <div className="w-full max-w-md py-8 md:py-10 lg:py-12 px-4">
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="flex aspect-square size-10 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#0040a1_0%,#0056d2_100%)] text-white shadow-lg shadow-blue-900/20">
          <img src={orbitLogo} alt="Orbit logo" className="w-5 h-5" />
        </div>

        <span className="font-manrope text-2xl font-extrabold tracking-tight text-blue-800">
          Orbit
        </span>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-2xl font-semibold text-center text-gray-900">
          Welcome Back
        </h1>

        <p className="text-sm text-gray-500 text-center mt-2 mb-6">
          Enter your credentials to access your <br /> workspace.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="space-y-1">
            <Label className="text-gray-600">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="alex@example.com"
              value={formValues.email}
              onChange={handleChange}
              className={`bg-gray-100 border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${inputStyles(!!errors.email)}`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <Label className="text-gray-600">Password</Label>

              <Link
                to="/auth/forgot-password"
                className="text-sm text-[#0056d2] hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formValues.password}
                onChange={handleChange}
                className={`bg-gray-100 border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-100 pr-10 ${inputStyles(!!errors.password)}`}
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={googleLoading || loading}
            className="w-full text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2 bg-[linear-gradient(135deg,#0040a1_0%,#0056d2_100%)] hover:opacity-90 transition shadow-md shadow-blue-900/20 cursor-pointer"
          >
            {loading ? "Loading..." : "Access Workspace"}
            {!loading && <ArrowRight size={16} />}
          </Button>

          <div className="flex items-center gap-4 my-2">
            <div className="flex-1 h-px bg-[#c3c6d6]/30" />
            <span className="text-xs font-semibold uppercase tracking-widest text-[#424654]">
              OR
            </span>
            <div className="flex-1 h-px bg-[#c3c6d6]/30" />
          </div>

          <Button
            variant="outline"
            type="button"
            onClick={handleGoogleSignIn}
            disabled={googleLoading || loading}
            className="w-full py-3 rounded-lg font-medium text-base border-[#c3c6d6]/50 shadow-sm cursor-pointer"
          >
            <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            {googleLoading ? "Signing in..." : "Continue with Google"}
          </Button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-6">
          Don&apos;t have an account?&nbsp;
          <Link to="/auth/register" className="text-[#0056d2] font-medium">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;

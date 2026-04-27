import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowRight } from "lucide-react";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import orbitLogo from "@/assets/orbit-logo.svg";
import { auth } from "@/firebase";
import { resetPasswordSchema } from "@/lib/resetPasswordSchema";

const ResetPasswordPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = resetPasswordSchema.safeParse({ email });
    if (!validation.success) {
      setError(validation.error.issues[0].message);
      return;
    }

    setError(null);
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, validation.data.email);
      toast.success(
        "If an account exists for this email, a reset link has been sent.",
      );
      navigate("/auth/login");
    } catch {
      // Intentionally generic — avoids leaking whether an email is registered
      toast.success(
        "If an account exists for this email, a reset link has been sent.",
      );
      navigate("/auth/login");
    } finally {
      setLoading(false);
    }
  };

  const inputStyles = (hasError: boolean) =>
    `bg-[#f2f4f6] rounded-lg p-2 mt-2 border-0 placeholder:text-[#94a3b8] ${
      hasError ? "border-2 border-red-500" : ""
    }`;

  return (
    <div className="flex-1 bg-[#f5f7fb] flex items-center justify-center px-4">
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
            Reset password
          </h1>

          <p className="text-sm text-gray-500 text-center mt-2 mb-6">
            Enter your email and we will send you <br />a reset link
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="space-y-1">
              <Label className="text-gray-600">Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@company.com"
                className={`bg-gray-100 border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${inputStyles(!!error)}`}
              />
              {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2 bg-[linear-gradient(135deg,#0040a1_0%,#0056d2_100%)] hover:opacity-90 transition shadow-md shadow-blue-900/20 cursor-pointer"
            >
              {loading ? "Sending..." : "Send Reset Link"}
              {!loading && <ArrowRight size={16} />}
            </Button>
          </form>

          <p className="text-sm text-center text-gray-500 mt-6">
            Remember your password?&nbsp;
            <Link to="/auth/login" className="text-[#0056d2] font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;

import { Footer } from "@/components/layout/Footer";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOff, Globe} from "lucide-react"
import { useState } from "react";
import { Link } from "react-router";


export const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false)

    const inputStyles = (hasError: boolean) =>
  `bg-[#f2f4f6] rounded-lg p-2 mt-2 border-0 placeholder:text-[#94a3b8] ${hasError ? "border-2 border-red-500" : ""}`;

  return (
      <div className="min-h-screen bg-[#f7f9fb] flex flex-col">
          <div  className="flex-1 flex flex-col items-center justify-center relative overflow-hidden px-4 py-12">
               {/* Decorative blurs */}
            <div className="absolute -top-32 -right-16 w-[512px] h-[512px] bg-[#0040a1]/5 rounded-full blur-[60px]" />
            <div className="absolute -bottom-16 -left-16 w-[384px] h-[384px] bg-[#006c49]/5 rounded-full blur-[50px]" />
          <div className="flex flex-col items-center mb-4">
              <div className="bg-white rounded-full p-2 shadow-lg mt-4 mb-4">
                  <Globe className="h-8 w-8 text-[#0040a1]" />
              </div>
              <h2 className="text-3xl font-extrabold font-manrope text-[#0040a1] tracking-tight">Orbit</h2>
          </div>
          <div className="bg-white max-w-[448px] w-full overflow-y-auto p-6 sm:p-12 rounded-xl shadow-[0px_32px_48px_-4px_rgba(25,28,30,0.06)] relative z-10 mb-10">
              <h2 className="text-3xl font-extrabold font-manrope text-center text-[#191c1e]">Create an account</h2>
              <p className="text-base text-center text-[#424654] mt-2"> Begin your curated career journey today</p>
            <div className="mt-6 space-y-4">
              <div>
                  <Label htmlFor="fullName" className="text-sm font-semibold text-[#424654]">Full Name</Label>
                  <Input type="text"id="fullName" name="fullName" placeholder="Alex Marcer"
                      className={`w-full ${inputStyles(false)}`} />
              </div>
              <div>
                  <Label htmlFor="email" className="text-sm font-semibold text-[#424654]">Email</Label>
                    <Input type="email" id="email" name="email" placeholder="alex@example.com"
                        className={`w-full ${inputStyles(false)}`} />
              </div>
              <div>   
                  <Label htmlFor="password" className="text-sm font-semibold text-[#424654]">Password</Label>
                    <div className="relative">
                        <Input type={showPassword ? "text" : "password"} id="password" name="password" placeholder="Min 8 characters"
                          className={`w-full ${inputStyles(false)}`} />
                        <button type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-[#424654]"
                            onClick={() => setShowPassword(!showPassword)}>
                            {showPassword? <EyeOff className="h-5 w-5"/> : <EyeIcon className="h-5 w-5"/>  }
                        </button>
                  </div>
                  </div>
                      <Button
                        className="w-full py-4 mt-4 rounded-lg text-white font-bold font-manrope text-base shadow-md"
                      style={{ background: "linear-gradient(171deg, #0040a1 0%, #0056d2 100%)" }}>
                      Create Account
                  </Button>
                  <div className="flex items-center gap-4 my-4">
                        <div className="flex-1 h-px bg-[#c3c6d6]/30" />
                        <span className="text-xs font-semibold uppercase tracking-widest text-[#424654]">OR</span>
                        <div className="flex-1 h-px bg-[#c3c6d6]/30" />
                    </div>
                      <Button 
                          variant="outline"
                          className="w-full py-4 rounded-lg font-bold font-manrope text-base border-[#c3c6d6]/50 shadow-sm">
                            <img
                            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                            alt="Google"
                            className="h-5 w-5 mr-1"
                        />Continue with Google
                  </Button>
                      <p className="text-sm text-center text-slate-600 mt-4">Already have an account?
                          <Link to="/login" className="text-[#0040a1] font-semibold hover:underline"> Log in</Link></p>
            </div>
              </div>
        </div>    
          <Footer />
      </div>
  )
}

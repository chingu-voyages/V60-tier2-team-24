import { type LucideIcon } from 'lucide-react';
import { Link } from 'react-router';
import { Sparkles, TrendingUp, History } from 'lucide-react';
import orbitLogo from '@/assets/orbit-logo.svg';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';

interface FeatureCardProps {
  icon: LucideIcon;
  iconColor: string;
  accentColor: string;
  badgeColor: string;
  badgeTextColor: string;
  badge: string;
  title: string;
  description: string;
}

function FeatureCard({
  icon: Icon,
  iconColor,
  accentColor,
  badgeColor,
  badgeTextColor,
  badge,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-left relative overflow-hidden group hover:shadow-md transition-shadow">
      <div className={`absolute top-0 left-0 w-1 h-full ${accentColor}`} />
      <div className="mb-6 flex justify-between items-start">
        <Icon className={`${iconColor} w-6 h-6`} />
        <div className={`px-3 py-1 ${badgeColor} rounded-full`}>
          <span
            className={`text-[10px] font-bold ${badgeTextColor} tracking-wider uppercase`}
          >
            {badge}
          </span>
        </div>
      </div>
      <h3 className="font-manrope font-bold text-lg mb-2 text-[#191c1e]">
        {title}
      </h3>
      <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

const FEATURE_CARDS: FeatureCardProps[] = [
  {
    icon: Sparkles,
    iconColor: 'text-emerald-500',
    accentColor: 'bg-emerald-500',
    badgeColor: 'bg-emerald-50',
    badgeTextColor: 'text-emerald-600',
    badge: 'Active',
    title: 'Editorial Tracker',
    description:
      'Your applications treated like stories, not spreadsheet rows.',
  },
  {
    icon: TrendingUp,
    iconColor: 'text-blue-600',
    accentColor: 'bg-blue-600',
    badgeColor: 'bg-blue-50',
    badgeTextColor: 'text-blue-600',
    badge: 'Beta',
    title: 'Market Pulse',
    description:
      'Real-time salary benchmarks and hiring trends at your fingertips.',
  },
  {
    icon: History,
    iconColor: 'text-slate-400',
    accentColor: 'bg-slate-400',
    badgeColor: 'bg-slate-50',
    badgeTextColor: 'text-slate-500',
    badge: 'Legacy',
    title: 'Portfolio Archiving',
    description:
      'Build a lifelong history of your career achievements and growth.',
  },
];

export function WelcomePage() {
  return (
    <div className="bg-white font-sans text-[#191c1e] min-h-screen flex flex-col overflow-x-hidden">
      <nav className="fixed top-0 left-0 w-full z-50 bg-transparent">
        <div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="bg-[linear-gradient(135deg,#0040a1_0%,#0056d2_100%)] h-10 w-10 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-900/20 group-hover:scale-105 transition-transform">
              <img src={orbitLogo} alt="Orbit logo" className="w-5 h-5" />
            </div>
            <span className="text-blue-800 font-manrope font-bold text-xl hidden sm:block">
              Orbit
            </span>
          </div>
          <div className="flex gap-4 items-center">
            <Button
              variant="outline"
              asChild
              className="text-blue-700 font-bold border-2 border-blue-100 px-6 py-2 rounded-xl hover:bg-blue-50 transition-colors"
            >
              <Link to="/auth/login">Login</Link>
            </Button>
          </div>
        </div>
      </nav>

      <main className="flex-grow flex flex-col items-center justify-center px-6 pt-24 pb-16 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] z-0 opacity-30 overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] right-[20%] w-96 h-96 bg-[#dae2ff] blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[15%] left-[10%] w-[500px] h-[500px] bg-[#4edea3]/20 blur-[100px] rounded-full"></div>
        </div>

        <div className="max-w-4xl w-full text-center space-y-12 relative z-10">
          <div className="flex flex-col items-center gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-400 blur-3xl opacity-10 rounded-full scale-150"></div>
              <div className="relative bg-white p-6 rounded-[2rem] shadow-2xl shadow-blue-900/5 border border-slate-100">
                <img
                  src={orbitLogo}
                  alt=""
                  className="w-16 h-16"
                  style={{
                    filter:
                      'brightness(0) saturate(100%) invert(21%) sepia(100%) saturate(2256%) hue-rotate(213deg) brightness(91%) contrast(101%)',
                  }}
                />
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-manrope font-extrabold tracking-tight text-[#191c1e] leading-[1.1]">
              Your Career, <br />
              <span className="text-transparent bg-clip-text bg-[linear-gradient(135deg,#0040a1_0%,#0056d2_100%)]">
                Unified.
              </span>
            </h1>

            <p className="text-base md:text-lg text-slate-500 max-w-xl mx-auto leading-relaxed font-medium">
              Transform the job hunt into a curated professional journey. Orbit
              brings every application, interview, and offer into one high-end
              editorial workspace.
            </p>
          </div>

          <div className="flex flex-col items-center gap-6 animate-in fade-in slide-in-from-bottom-4 delay-300 duration-700 fill-mode-both">
            <Button
              asChild
              className="bg-[linear-gradient(135deg,#0040a1_0%,#0056d2_100%)] text-white text-lg font-bold px-10 py-7 rounded-xl shadow-xl shadow-blue-900/30 hover:opacity-90 active:scale-95 transition-all duration-200 border-0"
            >
              <Link to="/auth/register">Get Started</Link>
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-slate-500">Already have an account?</span>
              <Link
                to="/auth/login"
                className="text-blue-700 font-semibold hover:underline underline-offset-4 transition-all"
              >
                Log in
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 animate-in fade-in slide-in-from-bottom-4 delay-500 duration-700 fill-mode-both">
            {FEATURE_CARDS.map((card) => (
              <FeatureCard key={card.title} {...card} />
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 right-0 z-0 w-[50vw] md:w-[40vw] h-[700px] md:h-[400px] pointer-events-none opacity-40 overflow-hidden">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAF_tqhww-tk8_VwOGsc9t-fEV3RnKOzMITF7P53GtZS3UzNcpDuLng16jS-tsJPrAROZzBbLE5U0QSXYUoMdl2-UKaNRn4ksI6huAltT47doyYWKlF-ZwFLtB4t86u-KrI8DcOgZ9a-Pieu8GccTEeJTXAo7lmXvM2KPXaB1VRchDi4-k5-zVwOLphjraTMBYZGZpz-OFKYfTz_gc6eTotvu-EAY2eLvKnVtujd6b02jkEhKGI2_gAS0sU5XNSHNaQVS8pKDlMcqZ4"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover rounded-tl-[100px] grayscale brightness-125 contrast-75 mix-blend-multiply"
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}

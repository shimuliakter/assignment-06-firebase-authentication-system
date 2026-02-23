import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import SocialLogin from "../components/SocialLogin";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value.trim();
    const password = form.password.value;

    setLoading(true);
    try {
      await login(email, password);
      toast.success("Welcome back!");
      navigate(from, { replace: true });
    } catch (err) {
      const msg =
        err.code === "auth/invalid-credential" || err.code === "auth/wrong-password"
          ? "Invalid email or password"
          : err.code === "auth/user-not-found"
          ? "No account found with this email"
          : err.code === "auth/too-many-requests"
          ? "Too many attempts. Try again later."
          : "Login failed. Please try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-4">
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(#E8FF47 1px, transparent 1px), linear-gradient(90deg, #E8FF47 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 w-full max-w-md animate-fade-up">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-accent rounded-sm rotate-12" />
            <span className="font-display text-2xl font-800 text-text tracking-tight">AuthFlow</span>
          </div>
          <h1 className="font-display text-4xl font-bold text-text mt-2">Welcome back</h1>
          <p className="text-subtle font-body mt-2 text-sm">Sign in to your account</p>
        </div>

        {/* Card */}
        <div className="bg-surface border border-muted rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-body font-medium text-subtle mb-2">Email</label>
              <input
                type="email"
                name="email"
                required
                placeholder="john@example.com"
                className="w-full bg-muted text-text font-body placeholder-subtle/50 px-4 py-3 rounded-xl border border-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-body font-medium text-subtle mb-2">Password</label>
              <input
                type="password"
                name="password"
                required
                placeholder="Your password"
                className="w-full bg-muted text-text font-body placeholder-subtle/50 px-4 py-3 rounded-xl border border-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-all duration-200"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent text-primary font-display font-bold py-3.5 rounded-xl hover:bg-accent/90 active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-muted" />
            <span className="text-subtle text-xs font-body uppercase tracking-widest">or continue with</span>
            <div className="flex-1 h-px bg-muted" />
          </div>

          <SocialLogin />

          <p className="text-center text-subtle text-sm font-body mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-accent hover:underline font-medium">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

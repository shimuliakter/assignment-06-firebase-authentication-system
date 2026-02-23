import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully. See you soon!");
      navigate("/login");
    } catch {
      toast.error("Failed to logout. Please try again.");
    }
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-primary">
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(#E8FF47 1px, transparent 1px), linear-gradient(90deg, #E8FF47 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Navbar */}
      <nav className="relative z-10 border-b border-muted bg-surface/50 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="inline-flex items-center gap-2">
            <div className="w-7 h-7 bg-accent rounded-sm rotate-12" />
            <span className="font-display text-xl font-bold text-text tracking-tight">AuthFlow</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-subtle hover:text-text font-body text-sm transition-colors duration-200 border border-muted hover:border-subtle rounded-lg px-4 py-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-16">
        <div className="animate-fade-up mb-12">
          <div className="flex items-center gap-6 mb-8">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-20 h-20 rounded-2xl border-2 border-accent object-cover"
              />
            ) : (
              <div className="w-20 h-20 bg-accent rounded-2xl flex items-center justify-center">
                <span className="font-display text-2xl font-bold text-primary">
                  {getInitials(user?.displayName)}
                </span>
              </div>
            )}
            <div>
              <p className="text-subtle font-body text-sm uppercase tracking-widest mb-1">Welcome back</p>
              <h1 className="font-display text-4xl font-bold text-text">
                {user?.displayName || "User"}
              </h1>
              <p className="text-subtle font-body text-sm mt-1">{user?.email}</p>
              
            </div>
          </div>
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <div className="bg-surface border border-muted rounded-2xl p-6">
            <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <p className="text-subtle font-body text-xs uppercase tracking-wider mb-1">Auth Provider</p>
            <p className="text-text font-display font-semibold text-lg capitalize">
              {user?.providerData?.[0]?.providerId?.replace(".com", "") || "Email"}
            </p>
          </div>

          <div className="bg-surface border border-muted rounded-2xl p-6">
            <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <p className="text-subtle font-body text-xs uppercase tracking-wider mb-1">Email Verified</p>
            <p className="text-text font-display font-semibold text-lg">
              {user?.emailVerified ? "✓ Verified" : "Not verified"}
            </p>
          </div>

          <div className="bg-surface border border-muted rounded-2xl p-6">
            <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-subtle font-body text-xs uppercase tracking-wider mb-1">Member Since</p>
            <p className="text-text font-display font-semibold text-lg">
              {user?.metadata?.creationTime
                ? new Date(user.metadata.creationTime).toLocaleDateString("en-US", { month: "short", year: "numeric" })
                : "—"}
            </p>
          </div>
        </div>

        {/* Protected content block */}
        <div
          className="bg-surface border border-accent/30 rounded-2xl p-8 animate-fade-up"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-text mb-2">Protected Page</h2>
              <p className="text-subtle font-body text-sm leading-relaxed">
                You are viewing this page because you are authenticated. This is a protected route — only logged-in users can access this content. Unauthenticated users are redirected to the login page.
              </p>
            </div>
          </div>
        </div>

        {/* User UID */}
        <div className="mt-6 animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <div className="bg-muted/50 rounded-xl px-5 py-3 flex items-center gap-3">
            <span className="text-subtle font-body text-xs uppercase tracking-wider flex-shrink-0">UID</span>
            <span className="text-subtle font-body text-xs font-mono truncate">{user?.uid}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

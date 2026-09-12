import React, { useState } from 'react';
import { Menu, X, User, LogOut, ShieldCheck, Car, Building2, Sparkles, ArrowRight, Compass, Shield } from 'lucide-react';

export default function Navbar({
  currentUser,
  onLogout,
  onOpenLogin,
  onOpenGetStarted,
  onOpenMarketplace,
  onOpenDashboard
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dashboardDropdownOpen, setDashboardDropdownOpen] = useState(false);

  const navLinks = [
    { name: 'Marketplace', href: '#marketplace', action: onOpenMarketplace, icon: Compass },
    { name: 'How It Works', href: '#how-it-works', action: null, icon: Shield },
    { name: 'About', href: '#tech-stack', action: null, icon: null },
  ];

  const getRoleBadgeStyle = (role) => {
    switch (role) {
      case 'seller':
        return 'bg-slate-100 text-slate-800 border-slate-300';
      case 'authority':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'buyer':
      default:
        return 'bg-teal-100 text-teal-800 border-teal-300';
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-slate-200/90 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* LEFT: carNodes Brand Logo */}
          <a href="#hero" className="flex items-center group shrink-0">
            <img
              src="/carnodes-logo.svg"
              alt="carNodes"
              className="h-12 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </a>

          {/* CENTER: Creative Navigation Links + Role Dashboards Dropdown */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={link.action ? (e) => { e.preventDefault(); link.action(); } : undefined}
                  className="px-3.5 py-1.5 rounded-xl text-sm font-semibold text-slate-700 hover:text-teal-700 hover:bg-teal-50/60 transition-all duration-200 flex items-center space-x-1.5 group cursor-pointer"
                >
                  {Icon && <Icon className="w-4 h-4 text-slate-400 group-hover:text-teal-600 transition-colors" />}
                  <span>{link.name}</span>
                </a>
              );
            })}

            {/* Role Dashboards Nav Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDashboardDropdownOpen(!dashboardDropdownOpen)}
                className="text-xs font-mono font-bold uppercase text-teal-800 bg-teal-50 hover:bg-teal-100/80 border border-teal-300/80 px-3 py-1.5 rounded-xl transition-all duration-200 flex items-center space-x-2 shadow-xs cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                <span>Dashboards</span>
                <span className="text-[10px] text-teal-600">▼</span>
              </button>

              {dashboardDropdownOpen && (
                <div className="absolute left-0 mt-2 w-64 bg-white rounded-2xl border border-slate-200 shadow-2xl p-2 z-50 animate-fadeIn">
                  <div className="px-3 py-1.5 text-[10px] font-mono uppercase text-slate-400 font-bold border-b border-slate-100">
                    Direct Role Portal
                  </div>
                  <div className="space-y-1 mt-1">
                    <button
                      onClick={() => {
                        setDashboardDropdownOpen(false);
                        if (onOpenDashboard) onOpenDashboard('buyer');
                      }}
                      className="w-full text-left p-2 rounded-xl hover:bg-teal-50 text-xs text-slate-800 font-semibold flex items-center space-x-2.5 transition-colors cursor-pointer"
                    >
                      <Car className="w-4 h-4 text-teal-600 shrink-0" />
                      <span>1. Buyer Dashboard</span>
                    </button>
                    <button
                      onClick={() => {
                        setDashboardDropdownOpen(false);
                        if (onOpenDashboard) onOpenDashboard('seller');
                      }}
                      className="w-full text-left p-2 rounded-xl hover:bg-slate-50 text-xs text-slate-800 font-semibold flex items-center space-x-2.5 transition-colors cursor-pointer"
                    >
                      <Building2 className="w-4 h-4 text-slate-700 shrink-0" />
                      <span>2. Seller Dashboard</span>
                    </button>
                    <button
                      onClick={() => {
                        setDashboardDropdownOpen(false);
                        if (onOpenDashboard) onOpenDashboard('authority');
                      }}
                      className="w-full text-left p-2 rounded-xl hover:bg-emerald-50 text-xs text-slate-800 font-semibold flex items-center space-x-2.5 transition-colors cursor-pointer"
                    >
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>3. Authority / RTO Dashboard</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* RIGHT: Creative Login + Get Started OR Active User Profile */}
          <div className="hidden md:flex items-center space-x-3">
            {currentUser ? (
              <div className="flex items-center space-x-3 bg-white p-1.5 pl-3 pr-2 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-xl bg-slate-900 text-teal-400 flex items-center justify-center font-bold text-xs font-mono border border-teal-500/30">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <span className="text-xs font-bold text-slate-900">{currentUser.name}</span>
                      <span className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${getRoleBadgeStyle(currentUser.role)}`}>
                        {currentUser.role}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onOpenDashboard && onOpenDashboard(currentUser.role)}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-teal-700 text-white font-bold text-xs transition-all shadow-xs cursor-pointer flex items-center space-x-1"
                >
                  <span>Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={onLogout}
                  title="Logout"
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                {/* Creative Frosted Glass Login Button */}
                <button
                  id="nav-login-btn"
                  onClick={() => onOpenLogin && onOpenLogin('signin')}
                  className="px-5 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider text-slate-800 bg-white/80 hover:bg-white border border-slate-300/90 hover:border-teal-600 transition-all duration-200 shadow-xs hover:shadow-sm cursor-pointer"
                >
                  Login
                </button>

                {/* Creative High-Impact Get Started Button */}
                <button
                  id="nav-get-started-btn"
                  onClick={() => onOpenGetStarted ? onOpenGetStarted('signup') : onOpenLogin('signup')}
                  className="relative group overflow-hidden px-6 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider text-white bg-gradient-to-r from-slate-900 via-slate-800 to-teal-800 hover:to-teal-600 transition-all duration-300 shadow-md hover:shadow-teal-500/20 hover:shadow-lg flex items-center space-x-2 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
                  <span>Get Started</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center space-x-2">
            {currentUser ? (
              <button
                onClick={() => onOpenDashboard && onOpenDashboard(currentUser.role)}
                className="text-[11px] font-mono font-bold uppercase px-2.5 py-1 rounded-lg bg-slate-900 text-teal-400"
              >
                {currentUser.role} →
              </button>
            ) : (
              <button
                onClick={() => onOpenLogin && onOpenLogin('signin')}
                className="text-xs font-mono font-bold uppercase text-slate-800 border border-slate-300 px-3 py-1.5 rounded-lg bg-white"
              >
                Login
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-teal-700"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FDFBF7] border-b border-slate-200 px-6 pt-2 pb-6 space-y-2 animate-fadeIn">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                setMobileMenuOpen(false);
                if (link.action) { e.preventDefault(); link.action(); }
              }}
              className="block py-2.5 text-sm font-semibold text-slate-800 hover:text-teal-700 border-b border-slate-100 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-3">
            <button
              onClick={() => { setMobileMenuOpen(false); if (onOpenGetStarted) onOpenGetStarted('signup'); }}
              className="w-full py-3 rounded-xl bg-slate-900 text-white font-bold text-xs uppercase font-mono tracking-wider flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-4 h-4 text-teal-400" />
              <span>Get Started</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}


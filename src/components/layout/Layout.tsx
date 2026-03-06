import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { BarChart3, Menu, X, Database, Lock } from "lucide-react";

export function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Services", path: "/#services" },
    { name: "Portfolio", path: "/#portfolio" },
    { name: "Pricing", path: "/#pricing" },
    { name: "About", path: "/#about" },
    { name: "Blog", path: "/blog" },
  ];

  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-indigo-500/30">
      <header className="sticky top-0 z-50 w-full border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
                  <BarChart3 className="h-5 w-5" />
                </div>
                <span className="text-lg font-bold tracking-tight text-white">
                  DataVault<span className="text-indigo-400">Guru</span>
                </span>
              </Link>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.path}
                  className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                className="inline-flex h-9 items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500"
              >
                Book Consultation
              </a>
            </nav>

            {/* Mobile Menu Toggle */}
            <div className="flex md:hidden">
              <button
                type="button"
                className="text-slate-300 hover:text-white"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden border-b border-slate-800 bg-slate-900"
          >
            <div className="space-y-1 px-4 pb-3 pt-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.path}
                  className="block rounded-md px-3 py-2 text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                className="block w-full text-center mt-4 rounded-md bg-indigo-600 px-3 py-2 text-base font-medium text-white hover:bg-indigo-700"
              >
                Book Consultation
              </a>
            </div>
          </motion.div>
        )}
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="border-t border-slate-800 bg-slate-950 py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <Link to="/" className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
                  <Database className="h-5 w-5" />
                </div>
                <span className="text-lg font-bold tracking-tight text-white">
                  DataVault<span className="text-indigo-400">Guru</span>
                </span>
              </Link>
              <p className="text-sm text-slate-400 mt-4 max-w-xs">
                Helping small and medium businesses unlock hidden insights using Data Analytics, Power BI, and automated reporting.
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Services</h3>
              <ul className="space-y-2">
                <li><a href="#services" className="text-sm text-slate-400 hover:text-indigo-400">Power BI Dashboards</a></li>
                <li><a href="#services" className="text-sm text-slate-400 hover:text-indigo-400">Excel Automation</a></li>
                <li><a href="#services" className="text-sm text-slate-400 hover:text-indigo-400">Data Cleaning</a></li>
                <li><a href="#services" className="text-sm text-slate-400 hover:text-indigo-400">BI Consulting</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#about" className="text-sm text-slate-400 hover:text-indigo-400">About</a></li>
                <li><a href="#portfolio" className="text-sm text-slate-400 hover:text-indigo-400">Portfolio</a></li>
                <li><a href="/blog" className="text-sm text-slate-400 hover:text-indigo-400">Blog & Insights</a></li>
                <li><a href="#contact" className="text-sm text-slate-400 hover:text-indigo-400">Contact</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Connect</h3>
              <ul className="space-y-2">
                <li><a href="mailto:datavaultguru@gmail.com" className="text-sm text-slate-400 hover:text-indigo-400">datavaultguru@gmail.com</a></li>
                <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-400 hover:text-indigo-400">LinkedIn</a></li>
                <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-400 hover:text-indigo-400">Twitter</a></li>
                <li className="pt-4">
                  <Link to="/admin" className="inline-flex items-center gap-2 text-xs text-slate-600 hover:text-slate-400 transition-colors">
                    <Lock className="h-3 w-3" /> Admin Login
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-slate-500">
              &copy; {new Date().getFullYear()} DataVault Guru. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

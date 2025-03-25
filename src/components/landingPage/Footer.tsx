import React from "react";

import { Mail, ChevronRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-goal-100">
      <div className="container mx-auto px-4 lg:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}

          <div className="space-y-4">
            <div className="flex items-center">
              <span className="font-bold text-xl text-goal-900">GOALSET</span>
            </div>
            <p className="text-goal-600 text-sm max-w-xs">
              Your personal goal-setting companion designed to help you turn
              dreams into achievements.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-goal-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {["Home", "Features", "How It-Works", "Testimonials"].map(
                (item, index) => (
                  <li key={index}>
                    <a
                      href={`#${item.toLowerCase().replace(" ", "-")}`}
                      className="text-goal-600 hover:text-goal-900 transition-colors inline-flex items-center"
                    >
                      <ChevronRight size={14} className="mr-1" />
                      {item}
                    </a>
                  </li>
                ),
              )}

              <li>
                <Link
                  to="/sign-up"
                  className="text-goal-600 hover:text-goal-900 transition-colors inline-flex items-center"
                >
                  <ChevronRight size={14} className="mr-1" />
                  Get Started
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-goal-900 mb-4">Legal</h3>
            <ul className="space-y-2">
              {[
                "Terms of Service",
                "Privacy Policy",
                "Cookie Policy",
                "GDPR",
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-goal-600 hover:text-goal-900 transition-colors inline-flex items-center"
                  >
                    <ChevronRight size={14} className="mr-1" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="font-semibold text-goal-900 mb-4">Stay Updated</h3>
            <p className="text-goal-600 text-sm mb-4">
              Subscribe to our newsletter for tips, updates, and exclusive
              content.
            </p>
            <form className="space-y-2">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-4 py-2 bg-goal-50 border border-goal-100 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-goal-300 flex-1 text-goal-800 placeholder:text-goal-400"
                  required
                />
                <button
                  type="submit"
                  className="bg-goal-600 text-white px-4 py-2 rounded-r-lg hover:bg-goal-700 transition-colors"
                  aria-label="Subscribe"
                >
                  <Mail size={18} />
                </button>
              </div>
              <p className="text-goal-500 text-xs">
                By subscribing, you agree to our Privacy Policy.
              </p>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-goal-100 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-goal-600 text-sm">
            &copy; {currentYear} GOALSET. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <div className="text-goal-500 text-sm">
              Made with care by the GOALSET team
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

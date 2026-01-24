import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const languageMenuRef = useRef(null);
  const mobileLanguageMenuRef = useRef(null);

  const currentLanguage = i18n.language?.split('-')[0] || 'en';

  const changeLanguage = async (lng) => {
    try {
      await i18n.changeLanguage(lng);
      setLanguageMenuOpen(false);
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedInsideDesktop = languageMenuRef.current?.contains(event.target);
      const clickedInsideMobile = mobileLanguageMenuRef.current?.contains(event.target);
      
      if (!clickedInsideDesktop && !clickedInsideMobile) {
        setLanguageMenuOpen(false);
      }
    };

    if (languageMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [languageMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="w-full bg-[#ded1c7] py-4"> 
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img  
            src="/images/logo.png" 
            alt="SKY EXPERIENCE Logo"
            className="h-10 md:h-12 w-auto"
          />
        </div>

        {/* Desktop Navigation Menu */}
        <nav className="hidden md:flex items-center gap-8">
          <Link 
            to="/" 
            className={`font-bold text-sm uppercase tracking-wider hover:text-orange-500 transition-colors ${isActive("/") ? "text-orange-500" : "text-gray-800"}`}
          >
            {t("nav.home")}
          </Link>
          <Link 
            to="/about" 
            className={`font-bold text-sm uppercase tracking-wider hover:text-orange-500 transition-colors ${isActive("/about") ? "text-orange-500" : "text-gray-800"}`}
          >
            {t("nav.about")}
          </Link>
          <Link 
            to="/booking" 
            className={`font-bold text-sm uppercase tracking-wider hover:text-orange-500 transition-colors ${isActive("/booking") ? "text-orange-500" : "text-gray-800"}`}
          >
            {t("nav.flight")}
          </Link>
          <Link 
            to="/contact" 
            className={`font-bold text-sm uppercase tracking-wider hover:text-orange-500 transition-colors ${isActive("/contact") ? "text-orange-500" : "text-gray-800"}`}
          >
            {t("nav.contact")}
          </Link>
        </nav>

        {/* Desktop Language Switcher and BOOK NOW Button */}
        <div className="hidden md:flex items-center gap-4">
          <div className="relative" ref={languageMenuRef}>
            <button
              onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/80 hover:bg-white text-gray-800 font-semibold text-sm transition-colors border border-gray-200"
            >
              <span>{currentLanguage === "fr" ? "🇫🇷 FR" : "🇬🇧 EN"}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {languageMenuOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <button
                  onClick={() => changeLanguage("en")}
                  className={`w-full text-left px-4 py-2 hover:bg-orange-50 transition-colors rounded-t-lg ${
                    currentLanguage === "en" ? "bg-orange-50 text-orange-600 font-semibold" : "text-gray-800"
                  }`}
                >
                  🇬🇧 English
                </button>
                <button
                  onClick={() => changeLanguage("fr")}
                  className={`w-full text-left px-4 py-2 hover:bg-orange-50 transition-colors rounded-b-lg ${
                    currentLanguage === "fr" ? "bg-orange-50 text-orange-600 font-semibold" : "text-gray-800"
                  }`}
                >
                  🇫🇷 Français
                </button>
              </div>
            )}
          </div>
          <Link 
            to="/booking" 
            className="bg-[#a43518] hover:scale-110 transition-all duration-300 text-white px-6 py-2 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-orange-600"
          >
            {t("nav.bookNow")}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <div className="relative" ref={mobileLanguageMenuRef}>
            <button
              onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
              className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-white/80 text-gray-800 font-semibold text-xs"
            >
              <span>{currentLanguage === "fr" ? "🇫🇷" : "🇬🇧"}</span>
            </button>
            {languageMenuOpen && (
              <div className="absolute right-0 mt-2 w-28 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <button
                  onClick={() => changeLanguage("en")}
                  className={`w-full text-left px-3 py-2 hover:bg-orange-50 transition-colors rounded-t-lg text-xs ${
                    currentLanguage === "en" ? "bg-orange-50 text-orange-600 font-semibold" : "text-gray-800"
                  }`}
                >
                  🇬🇧 English
                </button>
                <button
                  onClick={() => changeLanguage("fr")}
                  className={`w-full text-left px-3 py-2 hover:bg-orange-50 transition-colors rounded-b-lg text-xs ${
                    currentLanguage === "fr" ? "bg-orange-50 text-orange-600 font-semibold" : "text-gray-800"
                  }`}
                >
                  🇫🇷 Français
                </button>
              </div>
            )}
          </div>
          <button 
            className="text-gray-800 p-2"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden bg-white mt-2 mx-4 rounded-lg shadow-lg transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'block opacity-100' : 'hidden opacity-0'}`}>
        <div className="flex flex-col gap-0 p-4">
          <Link 
            to="/" 
            className={`font-bold py-3 px-4 rounded-lg hover:bg-orange-50 transition-colors ${isActive("/") ? "text-orange-500 bg-orange-50" : "text-gray-800"}`}
            onClick={closeMobileMenu}
          >
            {t("nav.home")}
          </Link>
          <Link 
            to="/about" 
            className={`font-bold py-3 px-4 rounded-lg hover:bg-orange-50 transition-colors ${isActive("/about") ? "text-orange-500 bg-orange-50" : "text-gray-800"}`}
            onClick={closeMobileMenu}
          >
            {t("nav.about")}
          </Link>
          <Link 
            to="/booking" 
            className={`font-bold py-3 px-4 rounded-lg hover:bg-orange-50 transition-colors ${isActive("/booking") ? "text-orange-500 bg-orange-50" : "text-gray-800"}`}
            onClick={closeMobileMenu}
          >
            {t("nav.flight")}
          </Link>
          <Link 
            to="/contact" 
            className={`font-bold py-3 px-4 rounded-lg hover:bg-orange-50 transition-colors ${isActive("/contact") ? "text-orange-500 bg-orange-50" : "text-gray-800"}`}
            onClick={closeMobileMenu}
          >
            {t("nav.contact")}
          </Link>
          <Link 
            to="/booking" 
            className="bg-[#a43518] text-white px-4 py-3 rounded-full font-bold text-center mt-2 hover:bg-orange-600 transition-colors"
            onClick={closeMobileMenu}
          >
            {t("nav.bookNow")}
          </Link>
        </div>
      </div>
    </header>
  );
}
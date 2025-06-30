import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import LogoAutohaven from "../../data/Images/logo.png";

const LANGUAGES = [
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "no", label: "Norsk",   flag: "🇳🇴" },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const isHome = location.pathname === "/";
  const navbarClasses = `fixed top-0 w-full z-50 transition-colors duration-200 ${
    isHome ? "bg-transparent" : "bg-gray-700"
  }`;

  const isActive = (path: string) => (
    location.pathname === path
      ? "text-white border-b-2 border-white"
      : "text-gray-200 hover:text-white"
  );

  // Cambiar idioma
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <header>
      <nav className={navbarClasses}>
        <div className="container mx-auto px-4 pt-2 pb-4 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="h-16 overflow-visible">
              <img
                src={LogoAutohaven}
                alt="AutoHaven AS Logo"
                className="h-20 object-contain transform scale-150"
              />
            </div>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-8 items-center">
            <li>
              <Link to="/" className={`text-lg ${isActive("/")} transition-all duration-200`}>
                {t("home")}
              </Link>
            </li>
            <li>
              <Link to="/nosotros" className={`text-lg ${isActive("/nosotros")} transition-all duration-200`}>
                {t("about")}
              </Link>
            </li>
            <li>
              <Link to="/contacto" className={`text-lg ${isActive("/contacto")} transition-all duration-200`}>
                {t("contact")}
              </Link>
            </li>
            <li>
              <Link to="/catalogo" className={`text-lg ${isActive("/catalogo")} transition-all duration-200`}>
                {t("catalog")}
              </Link>
            </li>
            
            <li>
              <Link
                to="/sell-your-car"
                className={`text-lg font-bold transition-all duration-200 ${
                  location.pathname === "/sell-your-car"
                    ? "text-amber-400 border-b-2 border-amber-400"
                    : "text-amber-400 hover:text-yellow-300"
                }`}
              >
                {t("sell")}
              </Link>
            </li>

            <li>
              {/* Selector de idioma con icono */}
              <div className="flex items-center gap-2 ml-4">
                <Globe className="w-5 h-5 text-white" />
                <select
                  value={i18n.language}
                  onChange={handleLanguageChange}
                  className="p-1 rounded bg-gray-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 hover:bg-gray-700"
                >
                  {LANGUAGES.map((lang) => (
                    <option value={lang.code} key={lang.code}>
                      {lang.flag} {lang.label}
                    </option>
                  ))}
                </select>
              </div>
            </li>
          </ul>

          {/* Mobile (Hamburger) Button */}
          <button
            className="md:hidden text-gray-200 hover:text-white focus:outline-none"
            onClick={toggleMenu}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
            <div
              className="fixed inset-0 bg-gray-900 bg-opacity-95 z-50 flex flex-col md:hidden pt-16"
            >

            <div className="flex flex-col space-y-6 p-6">
              <Link to="/" className="text-2xl font-medium text-gray-200 hover:text-white transition-colors" onClick={closeMenu}>
                {t("home")}
              </Link>
              <Link to="/catalogo" className="text-2xl font-medium text-gray-200 hover:text-white transition-colors" onClick={closeMenu}>
                {t("catalog")}
              </Link>
              <Link to="/nosotros" className="text-2xl font-medium text-gray-200 hover:text-white transition-colors" onClick={closeMenu}>
                {t("about")}
              </Link>
              <Link to="/contacto" className="text-2xl font-medium text-gray-200 hover:text-white transition-colors" onClick={closeMenu}>
                {t("contact")}
              </Link>
              <Link to="/sell-your-car" className="text-2xl font-bold text-amber-400 hover:text-white transition-colors" onClick={closeMenu}>
                {t("sell")}
              </Link>
              {/* Selector de idioma con icono en mobile */}
              <div className="flex items-center gap-2 mt-4">
                <Globe className="w-5 h-5 text-white" />
                <select
                  value={i18n.language}
                  onChange={handleLanguageChange}
                  className="p-2 rounded bg-gray-800 text-white text-base w-full focus:outline-none focus:ring-2 focus:ring-blue-400 hover:bg-gray-700"
                >
                  {LANGUAGES.map((lang) => (
                    <option value={lang.code} key={lang.code}>
                      {lang.flag} {lang.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;

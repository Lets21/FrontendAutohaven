import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Mail, Phone, MapPin } from 'lucide-react';
import { useTranslation } from "react-i18next"; // 1. Importa el hook

const Footer: React.FC = () => {
  const { t } = useTranslation(); // 2. Usa el hook

  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Car className="h-8 w-8" />
              <span className="text-xl font-bold tracking-wider text-white">AUTOHAVEN</span>
              <span className="text-sm font-light text-white">AS</span>
            </div>
            <p className="text-sm leading-relaxed mt-2">
              {t('footer.company_info')}
            </p>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">{t('footer.contact')}</h3>
            <div className="space-y-2">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span>{t('footer.address')}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <span>{t('footer.phone')}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <span>{t('footer.email')}</span>
              </div>
              <div className="pt-2">
                <p className="text-sm">{t('footer.org_number')}</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">{t('footer.quick_links')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  {t('footer.home')}
                </Link>
              </li>
              <li>
                <Link to="/catalogo" className="hover:text-white transition-colors">
                  {t('footer.vehicle_catalog')}
                </Link>
              </li>
              <li>
                <Link to="/nosotros" className="hover:text-white transition-colors">
                  {t('footer.about_us')}
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="hover:text-white transition-colors">
                  {t('footer.contact')}
                </Link>
              </li>
              <li>
                <Link to="/sell-your-car" className="hover:text-white transition-colors font-semibold">
                  {t('footer.sell_your_car')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-sm text-center">
          <p>© 2025 AutoHaven AS. {t('footer.rights_reserved')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

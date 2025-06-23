import React from 'react';
import SectionTitle from '../components/ui/SectionTitle';
import ContactForm from '../components/forms/ContactForm';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const ContactPage: React.FC = () => {
  return (
    <div className="bg-gray-900 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Kontakt"
          subtitle="Vi er her for å svare på alle dine spørsmål"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <div className="order-2 md:order-1">
            <h3 className="text-2xl font-semibold text-white mb-6">
             Send oss en melding
            </h3>
            <ContactForm />
          </div>

          {/* Contact Information + Map */}
          <div className="order-1 md:order-2">
            <h3 className="text-2xl font-semibold text-white mb-6">
              Kontaktinformasjon
            </h3>
            
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-gray-700 p-3 rounded-full mr-4">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-white mb-1">Adresse</h4>
                    <p className="text-gray-300">Viksletta 109, 1789 Halden</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-gray-700 p-3 rounded-full mr-4">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-white mb-1">Telefon</h4>
                    <p className="text-gray-300">92 92 92 46</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-gray-700 p-3 rounded-full mr-4">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-white mb-1">E-post</h4>
                    <p className="text-gray-300">AutoHavenAS@hotmail.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-gray-700 p-3 rounded-full mr-4">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-white mb-1">Åpningstider</h4>
                    <p className="text-gray-300">
                      Mandag – Fredag: 09:00 – 18:00<br />
                      Lørdag: 10:00 – 14:00<br />
                      Søndag: Stengt
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-lg font-medium text-white mb-3">Tilleggsinformasjon</h4>
                <p className="text-gray-300 mb-2">
                  <strong>Organisasjonsnummer:</strong> 934 985 540
                </p>
                <p className="text-gray-300">
                  Du er hjertelig velkommen til å besøke vårt showroom for å se våre kjøretøy personlig.
                </p>
              </div>
            </div>

            {/* Map Embed: Usamos el iframe con tu URL específica */}
            <div className="mt-8 bg-gray-800 rounded-lg overflow-hidden h-72">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2156.050296799587!2d11.273525312580732!3d59.1360475263709!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46441227125e47a9%3A0x410beff37211063a!2sViksletta%20109%2C%201788%20Halden%2C%20Noruega!5e1!3m2!1ses-419!2sec!4v1749051037390!5m2!1ses-419!2sec"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="AutoHaven AS Location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

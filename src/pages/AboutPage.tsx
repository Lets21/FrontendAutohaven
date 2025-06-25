import React from 'react';
import SectionTitle from '../components/ui/SectionTitle';
import { Car, Award, Check, Clock } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-gray-900 pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Título de la sección */}
        <SectionTitle 
          title="Om AutoHaven AS"
          subtitle="Lær om vår historie og våre verdier"
        />

        {/* Historia y gráfica */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          <div>
            <h3 className="text-2xl font-semibold text-white mb-4">Vår Historie</h3>
            <p className="text-gray-300 mb-4">
              Et tiar med lidenskap for bil og kundeservice
Hos AutoHaven AS handler det ikke bare om biler - det handler om mennesker, tillit og trygghet. Vi har over 10 ärs erfaring i bilbransjen, og gjennom ärene har vi solgt og händtert alle typer biler og bilmerker - fra smá bybiler til store premiumbiler.
Vär reise startet med én ting til felles: en genuin lidenskap for bil, og et anske om à giare kjap og salg av bruktbil enklere, tryggere og mer transparent. Da vi etablerte AutoHaven AS i 2015, var málet á være en akter folk kunne stole pä - og det stär vi fortsatt for i dag.
Vi vet at det à kjepe eller selge bil kan oppleves bäde spennende og overveldende. Derfor er vi med deg hele veien gjennom prosessen - uansett om du ensker à finne dremmebilen, eller trenger hjelp med à selge bilen din videre. Vi tilbyr ogsà profesjonell formidling av bilsalg pà vegne av kunder, i allé prisklasser.
Med hundrevis av forneyde kunder og et rykte bygget pá ápenhet, erfaring og personlig oppfalging, er vi stolte av à væere en solid og profesjonell akter i Halden - og et trygt valg for ditt neste bilbytte.
Velkommen til AutoHaven AS - vi kan det à kispe og selge bil.
            </p>
            <p className="text-gray-300 mb-4">
              Gjennom årene har vi bygget et solid rykte basert på tillit og enestående service. 
  Vårt team består av fagfolk med lang erfaring i bilbransjen, 
  som er forpliktet til å gi best mulig rådgivning til våre kunder.
            </p>
            <p className="text-gray-300">
              I dag er AutoHaven AS anerkjent som et av de ledende selskapene for salg av brukte biler i Halden, 
  med hundrevis av fornøyde kunder som har funnet sin ideelle bil hos oss.
            </p>
          </div>

          <div className="relative rounded-lg overflow-hidden h-80 md:h-auto">
            {/* Imagen de showroom como fondo semi-oscuro */}
            <img
              src="https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg"
              alt="AutoHaven Showroom"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="text-center">
                <Car className="h-16 w-16 mx-auto text-white mb-4" />
                <h3 className="text-2xl font-bold text-white">AUTOHAVEN AS</h3>
                <p className="text-gray-200">Siden 2015</p>
              </div>
            </div>
          </div>
        </div>

        {/* Nuestros valores */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-white mb-6 text-center">Våre Verdier</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-gray-700 rounded-full mr-4">
                  <Check className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-white">Åpenhet</h4>
              </div>
              <p className="text-gray-300">
               Vi tror på å gi klar og fullstendig informasjon om hvert kjøretøy. 
  Vi skjuler ingenting og kommuniserer alltid hele historikken og den faktiske tilstanden.
              </p>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-gray-700 rounded-full mr-4">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-white">Kvalitet</h4>
              </div>
              <p className="text-gray-300">
                Vi tilbyr kun kjøretøy som har bestått våre strenge kvalitetskontroller. 
  Hver bil er grundig inspisert før den legges ut for salg.
              </p>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-gray-700 rounded-full mr-4">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-white">Engasjement</h4>
              </div>
              <p className="text-gray-300">
                Vi er dedikert til å finne det perfekte kjøretøyet for hver kunde, og tar den tiden 
  som trengs for å forstå deres behov og preferanser.
              </p>
            </div>
          </div>
        </div>

        {/* Nuestra ubicación */}
        <div>
          <h3 className="text-2xl font-semibold text-white mb-6">Vår Beliggenhet</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Aquí insertamos el iframe de Google Maps en lugar de la imagen */}
            <div className="md:col-span-2 bg-gray-800 rounded-lg overflow-hidden h-80">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2156.050296799587!2d11.273525312580732!3d59.1360475263709!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46441227125e47a9%3A0x410beff37211063a!2sViksletta%20109%2C%201788%20Halden%2C%20Noruega!5e1!3m2!1ses-419!2sec!4v1749051037390!5m2!1ses-419!2sec"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="AutoHaven AS Location"
              ></iframe>
            </div>

            {/* Datos de contacto */}
            <div className="bg-gray-800 p-6 rounded-lg">
              <h4 className="text-xl font-semibold text-white mb-4">Kontaktinformasjon</h4>
              <div className="space-y-3 text-gray-300">
                <p>
                  <strong>Adresse:</strong><br />
                  Viksletta 109, 1789 Halden
                </p>
                <p>
                  <strong>Telefon:</strong><br />
                  92 92 92 46
                </p>
                <p>
                  <strong>E-post:</strong><br />
                  AutoHavenAS@hotmail.com
                </p>
                <p>
                  <strong>Organisasjonsnummer:</strong><br />
                  934 985 540
                </p>
                <p>
                  <strong>Åpningstider:</strong><br />
                  Mandag – Fredag: 09:00 – 18:00<br />
  Lørdag: 10:00 – 14:00
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;

import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '../ui/Button';
import { toast } from 'react-hot-toast';

interface ContactFormProps {
  vehicleId?: string;
  vehicleTitle?: string;
  subject?: string; // <--- Añadido
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject?: string;
  message: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ vehicleId, vehicleTitle, subject }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormData>({
    defaultValues: {
      // Si viene desde vehículo, asunto autogenerado, si no, vacío
      subject: subject || '',
      message: vehicleTitle
        ? `Estoy interesado en el vehículo ${vehicleTitle}.`
        : '',
    },
  });

  // Si subject cambia (por el prop), lo sincroniza (ej. si cambias de vehículo)
  React.useEffect(() => {
    if (subject) setValue('subject', subject);
  }, [subject, setValue]);

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch('http://192.168.1.167:5000/api/contact', {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          vehicleId,
          vehicleTitle,
        }),
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.error || 'Failed to send message');
      }

      reset();
      toast.success('¡Meldingen ble sendt!');
    } catch (err: any) {
      toast.error('Error: ' + (err.message || 'Det oppstod en feil ved sending av meldingen.'));
      console.error(err);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
      {isSubmitSuccessful ? (
        <div className="text-center py-8">
          <h3 className="text-xl font-semibold text-white mb-3">¡Meldingen ble sendt!</h3>
          <p className="text-gray-300 mb-6">
            Takk for henvendelsen din. Vi tar kontakt med deg snart.
          </p>
          <Button onClick={() => reset({ name: '', email: '', phone: '', subject: '', message: '' }, { keepIsSubmitSuccessful: false })}>
            Send en ny melding
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                Fullt navn *
              </label>
              <input
                id="name"
                type="text"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="Ditt navn"
                {...register('name', { required: 'Dette feltet er obligatorisk' })}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                E-post *
              </label>
              <input
                id="email"
                type="email"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="you@example.com"
                {...register('email', {
                  required: 'Dette feltet er obligatorisk',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Ugyldig e-post',
                  },
                })}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                Telefon
              </label>
              <input
                id="phone"
                type="tel"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="Ditt telefonnummer"
                {...register('phone')}
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">
                Emne *
              </label>
              <input
                id="subject"
                type="text"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="Hva gjelder henvendelsen?"
                {...register('subject', { required: 'Dette feltet er obligatorisk' })}
                // Si viene de vehículo, el input será readonly (no editable)
                readOnly={!!subject}
              />
              {errors.subject && (
                <p className="mt-1 text-sm text-red-400">{errors.subject.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                Melding *
              </label>
              <textarea
                id="message"
                rows={5}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder={vehicleTitle ? `Jeg er interessert i ${vehicleTitle}` : 'Skriv meldingen din'}
                {...register('message', { required: 'Dette feltet er obligatorisk' })}
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>
              )}
            </div>

            <div>
              <Button
                type="submit"
                variant="primary"
                size="md"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sender...' : 'Send melding'}
              </Button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default ContactForm;

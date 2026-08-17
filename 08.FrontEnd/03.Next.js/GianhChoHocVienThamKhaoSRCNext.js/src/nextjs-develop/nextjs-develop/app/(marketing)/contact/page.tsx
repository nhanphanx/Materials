import ContactForm from '@/components/forms/ContactForm';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'Contact Us | NextJS Learning Platform',
  description: 'Get in touch with us.',
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600">
            We&apos;d love to hear from you.
          </p>
        </div>
        <ContactForm />
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
}

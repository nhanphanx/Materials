// app/(marketing)/about/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn more about our blog and our mission.',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-4">About Us</h1>
      <p className="text-lg text-gray-700">
        This is a blog created to help people learn Next.js in a fun and interactive way.
        Our goal is to provide high-quality content and practical examples.
      </p>
    </div>
  );
}

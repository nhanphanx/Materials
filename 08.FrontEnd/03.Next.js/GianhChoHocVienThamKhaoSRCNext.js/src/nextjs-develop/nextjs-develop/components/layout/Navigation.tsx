import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="flex gap-6">
      <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
        Home
      </Link>
      <Link href="/blog" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
        Blog
      </Link>
      <Link href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
        Contact
      </Link>
    </nav>
  );
}

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t py-8 mt-auto">
      <div className="container mx-auto px-4 text-center text-gray-500">
        <p>© {new Date().getFullYear()} NextJS Blog Learning Platform. Built for educational purposes.</p>
      </div>
    </footer>
  );
}

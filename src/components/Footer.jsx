export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-16">
      <div className="max-w-[1280px] mx-auto px-6 py-10 flex flex-col md:flex-row justify-between gap-6">
        
        <div>
          <h2 className="text-xl font-bold text-primary">LUXE</h2>
          <p className="text-gray-500 text-sm max-w-[250px]">
            Premium lifestyle products for modern living.
          </p>
        </div>

        <div className="flex gap-6 flex-wrap">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Contact</a>
          <a href="#">Shipping</a>
        </div>

        <p className="text-sm text-gray-500">© 2024 LUXE</p>
      </div>
    </footer>
  );
}
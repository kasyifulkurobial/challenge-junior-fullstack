const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">RM</span>
              </div>
              <span className="font-display font-bold text-xl">Rumah Makan Padang</span>
            </div>
            <p className="text-gray-300 text-sm">
              Website UMKM yang menampilkan solusi technical test dan showcase rumah makan Padang dengan cita rasa
              autentik.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Menu Navigasi</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-gray-300 hover:text-white transition-colors">
                  Beranda
                </a>
              </li>
              <li>
                <a href="/case1" className="text-gray-300 hover:text-white transition-colors">
                  Case 1 - Fruits
                </a>
              </li>
              <li>
                <a href="/case2" className="text-gray-300 hover:text-white transition-colors">
                  Case 2 - Comments
                </a>
              </li>
              <li>
                <a href="/restaurant" className="text-gray-300 hover:text-white transition-colors">
                  Rumah Makan
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Teknologi</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>React.js + Vite</li>
              <li>Express.js + Node.js</li>
              <li>Tailwind CSS</li>
              <li>SQLite Database</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300 text-sm">
            © 2025 Rumah Makan Padang. Dimasak dengan sepenuh hati oleh orang padang asli.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">RM</span>
              </div>
              <span className="font-bold text-xl">Rumah Makan Padang</span>
            </div>
            <p className="text-gray-300 text-sm">
              Sajian masakan Padang autentik dengan cita rasa tradisional yang telah diwariskan turun temurun. 
              Nikmati kelezatan rendang, gulai, dan berbagai hidangan khas Minangkabau.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Menu Navigasi</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/restaurant" className="text-gray-300 hover:text-white transition-colors">
                  Beranda
                </a>
              </li>
              <li>
                <a href="/restaurant#menu" className="text-gray-300 hover:text-white transition-colors">
                  Menu
                </a>
              </li>
              <li>
                <a href="/restaurant#reservasi" className="text-gray-300 hover:text-white transition-colors">
                  Reservasi
                </a>
              </li>
              <li>
                <a href="/restaurant#tentang" className="text-gray-300 hover:text-white transition-colors">
                  Tentang Kami
                </a>
              </li>
              <li>
                <a href="/restaurant#kontak" className="text-gray-300 hover:text-white transition-colors">
                  Kontak
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Jam Operasional</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Senin - Jumat: 10:00 - 22:00</li>
              <li>Sabtu - Minggu: 10:00 - 23:00</li>
              <li>Delivery tersedia</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300 text-sm">
            © 2025 Rumah Makan Padang. Dimasak dengan sepenuh hati oleh orang Padang asli.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
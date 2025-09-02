"use client"

import { useState } from "react"
import axios from "axios"

const RestaurantPage = () => {
  const [reservationForm, setReservationForm] = useState({
    name: "",
    phone: "",
    guests: 1,
    date: "",
    time: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")

  const menuItems = {
    makananUtama: [
      {
        id: 1,
        name: "Rendang Daging Sapi",
        description: "Daging sapi empuk dimasak dengan santan dan rempah-rempah pilihan selama berjam-jam",
        price: "Rp 45.000",
        image: "/rendang-daging-sapi-padang.png",
        badge: "Best Seller",
      },
      {
        id: 2,
        name: "Ayam Pop Padang",
        description: "Ayam kampung dimasak dengan bumbu kuning khas Padang, gurih dan lezat",
        price: "Rp 35.000",
        image: "/ayam-pop-padang.png",
        badge: "",
      },
      {
        id: 3,
        name: "Gulai Ikan Kakap",
        description: "Ikan kakap segar dimasak dengan kuah gulai santan yang kaya rempah",
        price: "Rp 40.000",
        image: "/gulai-ikan-kakap-padang.png",
        badge: "",
      },
      {
        id: 4,
        name: "Dendeng Balado",
        description: "Dendeng sapi kering dibalur dengan sambal balado pedas yang menggugah selera",
        price: "Rp 50.000",
        image: "/dendeng-balado-padang.png",
        badge: "Spicy",
      },
    ],
    minuman: [
      {
        id: 5,
        name: "Es Teh Manis",
        description: "Teh manis segar dengan es batu, cocok untuk cuaca panas",
        price: "Rp 8.000",
        image: "/es-teh-manis-indonesia.png",
        badge: "",
      },
      {
        id: 6,
        name: "Es Jeruk Nipis",
        description: "Jeruk nipis segar dengan gula aren, menyegarkan dan sehat",
        price: "Rp 12.000",
        image: "/es-jeruk-nipis-segar.png",
        badge: "",
      },
      {
        id: 7,
        name: "Kopi Tubruk",
        description: "Kopi robusta pilihan diseduh dengan cara tradisional",
        price: "Rp 10.000",
        image: "/kopi-tubruk-tradisional.png",
        badge: "",
      },
    ],
    makananRingan: [
      {
        id: 8,
        name: "Kerupuk Jangek",
        description: "Kerupuk kulit sapi renyah, cocok sebagai pelengkap makan",
        price: "Rp 15.000",
        image: "/kerupuk-jangek-padang.png",
        badge: "",
      },
      {
        id: 9,
        name: "Sambal Lado Mudo",
        description: "Sambal cabai hijau segar dengan tomat dan bawang, pedas menyengat",
        price: "Rp 5.000",
        image: "/sambal-lado-mudo-padang.png",
        badge: "Extra Spicy",
      },
    ],
  }

  const [activeTab, setActiveTab] = useState("makananUtama")

  const handleInputChange = (e) => {
    setReservationForm({
      ...reservationForm,
      [e.target.name]: e.target.value,
    })
  }

  const handleReservationSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage("")

    try {
      await axios.post("http://localhost:5000/api/reservations", reservationForm)
      setMessage("Reservasi berhasil dikirim! Kami akan menghubungi Anda segera.")
      setReservationForm({
        name: "",
        phone: "",
        guests: 1,
        date: "",
        time: "",
      })
    } catch {
      setMessage("Terjadi kesalahan. Silakan coba lagi.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-red-600 to-orange-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/rumah-makan-padang-traditional-food-spread.png')",
          }}
        ></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto" data-aos="fade-up">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">Rasa Asli, Kenangan di Setiap Suapan</h1>
          <p className="text-xl md:text-2xl mb-8 text-balance">
            Menyajikan hidangan khas Padang dengan resep warisan sejak tahun 1992
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => document.getElementById("menu").scrollIntoView({ behavior: "smooth" })}
              className="bg-white text-red-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              Lihat Menu
            </button>
            <button
              onClick={() => document.getElementById("reservasi").scrollIntoView({ behavior: "smooth" })}
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-red-600 transition-all duration-300 transform hover:scale-105"
            >
              Reservasi Meja
            </button>
          </div>
        </div>
      </section>

      {/* Tentang Kami */}
      <section className="py-20 bg-white" data-aos="fade-up">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img src="/traditional-padang-kitchen-cooking.png" alt="Dapur Tradisional" className="rounded-2xl shadow-2xl" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Cerita di Balik Dapur Kami</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Dimulai dari hobi memasak Ibu Sari pada tahun 1992, warung kecil kami telah berkembang menjadi rumah
                makan yang dikenal luas karena cita rasa autentik masakan Padang.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Setiap hidangan dibuat dengan resep turun-temurun yang telah diwariskan dari generasi ke generasi,
                menggunakan rempah-rempah pilihan dan teknik memasak tradisional yang telah teruji waktu.
              </p>
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600">30+</div>
                  <div className="text-gray-600">Tahun Pengalaman</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600">15+</div>
                  <div className="text-gray-600">Menu Andalan</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600">1000+</div>
                  <div className="text-gray-600">Pelanggan Setia</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Menu Andalan Kami</h2>
            <p className="text-xl text-gray-600">Hidangan lezat yang akan memanjakan lidah Anda</p>
          </div>

          {/* Menu Tabs */}
          <div className="flex flex-wrap justify-center mb-12" data-aos="fade-up" data-aos-delay="100">
            <button
              onClick={() => setActiveTab("makananUtama")}
              className={`px-6 py-3 mx-2 mb-2 rounded-full font-semibold transition-all duration-300 ${
                activeTab === "makananUtama"
                  ? "bg-red-600 text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-red-100"
              }`}
            >
              Makanan Utama
            </button>
            <button
              onClick={() => setActiveTab("minuman")}
              className={`px-6 py-3 mx-2 mb-2 rounded-full font-semibold transition-all duration-300 ${
                activeTab === "minuman" ? "bg-red-600 text-white shadow-lg" : "bg-white text-gray-600 hover:bg-red-100"
              }`}
            >
              Minuman
            </button>
            <button
              onClick={() => setActiveTab("makananRingan")}
              className={`px-6 py-3 mx-2 mb-2 rounded-full font-semibold transition-all duration-300 ${
                activeTab === "makananRingan"
                  ? "bg-red-600 text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-red-100"
              }`}
            >
              Makanan Ringan
            </button>
          </div>

          {/* Menu Items */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {menuItems[activeTab].map((item, index) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="relative">
                  <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-48 object-cover" />
                  {item.badge && (
                    <span
                      className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-semibold ${
                        item.badge === "Best Seller"
                          ? "bg-yellow-400 text-yellow-900"
                          : item.badge === "Spicy"
                            ? "bg-red-500 text-white"
                            : item.badge === "Extra Spicy"
                              ? "bg-red-700 text-white"
                              : "bg-blue-500 text-white"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                  <p className="text-gray-600 mb-4 text-pretty">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-red-600">{item.price}</span>
                    <button className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-colors duration-300">
                      Pesan
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Galeri */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Suasana Rumah Makan</h2>
            <p className="text-xl text-gray-600">Nikmati pengalaman makan yang nyaman dan berkesan</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { query: "interior+rumah+makan+padang+traditional", delay: 0 },
              { query: "suasana+makan+keluarga+indonesia", delay: 100 },
              { query: "dekorasi+tradisional+minangkabau", delay: 200 },
              { query: "meja+makan+tradisional+indonesia", delay: 300 },
              { query: "dapur+terbuka+rumah+makan", delay: 400 },
              { query: "pelayan+ramah+rumah+makan", delay: 500 },
              { query: "suasana+ramai+rumah+makan", delay: 600 },
              { query: "eksterior+rumah+makan+padang", delay: 700 },
            ].map((item, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                data-aos="fade-up"
                data-aos-delay={item.delay}
              >
                <img
                  src={`/abstract-geometric-shapes.png?height=300&width=300&query=${item.query}`}
                  alt={`Galeri ${index + 1}`}
                  className="w-full h-48 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reservasi */}
      <section id="reservasi" className="py-20 bg-gradient-to-r from-red-600 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-4xl font-bold mb-4">Reservasi Meja Online</h2>
            <p className="text-xl">Pastikan tempat Anda tersedia dengan melakukan reservasi terlebih dahulu</p>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-8 text-gray-900" data-aos="fade-up" data-aos-delay="200">
            <form onSubmit={handleReservationSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap</label>
                  <input
                    type="text"
                    name="name"
                    value={reservationForm.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Masukkan nama lengkap"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nomor WhatsApp</label>
                  <input
                    type="tel"
                    name="phone"
                    value={reservationForm.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="08xxxxxxxxxx"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Jumlah Tamu</label>
                  <select
                    name="guests"
                    value={reservationForm.guests}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <option key={num} value={num}>
                        {num} orang
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Tanggal</label>
                  <input
                    type="date"
                    name="date"
                    value={reservationForm.date}
                    onChange={handleInputChange}
                    required
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Waktu</label>
                  <select
                    name="time"
                    value={reservationForm.time}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="">Pilih waktu</option>
                    <option value="11:00">11:00</option>
                    <option value="12:00">12:00</option>
                    <option value="13:00">13:00</option>
                    <option value="18:00">18:00</option>
                    <option value="19:00">19:00</option>
                    <option value="20:00">20:00</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-red-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Mengirim..." : "Kirim Reservasi"}
              </button>
            </form>

            {message && (
              <div
                className={`mt-4 p-4 rounded-lg ${
                  message.includes("berhasil") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}
              >
                {message}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Lokasi & Jam Buka */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Lokasi & Jam Buka</h2>
            <p className="text-xl text-gray-600">
              Kunjungi kami untuk merasakan pengalaman kuliner yang tak terlupakan
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div data-aos="fade-right">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Informasi Lokasi</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm">📍</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Alamat</p>
                      <p className="text-gray-600">Jl. Raya Padang No. 123, Kota Padang, Sumatera Barat 25117</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm">📞</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Telepon</p>
                      <p className="text-gray-600">+62 813 3261 4507</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm">💬</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">WhatsApp</p>
                      <p className="text-gray-600">+62 +62 813 3261 4507</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div data-aos="fade-left">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Jam Operasional</h3>
                <div className="space-y-3">
                  {[
                    { day: "Senin - Jumat", time: "10:00 - 22:00" },
                    { day: "Sabtu", time: "10:00 - 23:00" },
                    { day: "Minggu", time: "10:00 - 23:00" },
                  ].map((schedule, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0"
                    >
                      <span className="font-semibold text-gray-900">{schedule.day}</span>
                      <span className="text-red-600 font-semibold">{schedule.time}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-red-50 rounded-lg">
                  <p className="text-red-800 text-sm">
                    <strong>Catatan:</strong> Kami tutup pada hari libur nasional. Silakan hubungi kami untuk konfirmasi
                    ketersediaan.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default RestaurantPage

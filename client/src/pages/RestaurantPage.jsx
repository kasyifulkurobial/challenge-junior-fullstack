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

  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [orderForm, setOrderForm] = useState({
    customerName: "",
    customerPhone: "",
    deliveryAddress: "",
    orderType: "dine-in", // dine-in, takeaway, delivery
  })
  const [isOrderSubmitting, setIsOrderSubmitting] = useState(false)
  const [orderMessage, setOrderMessage] = useState("")

  const menuItems = {
    makananUtama: [
      {
        id: 1,
        name: "Rendang Daging Sapi",
        description: "Daging sapi empuk dimasak dengan santan dan rempah-rempah pilihan selama berjam-jam",
        price: 45000,
        priceText: "Rp 45.000",
        image: "/rendang-daging-sapi-padang.png",
        badge: "Best Seller",
      },
      {
        id: 2,
        name: "Ayam Pop Padang",
        description: "Ayam kampung dimasak dengan bumbu kuning khas Padang, gurih dan lezat",
        price: 35000,
        priceText: "Rp 35.000",
        image: "/ayam-pop-padang.png",
        badge: "",
      },
      {
        id: 3,
        name: "Gulai Ikan Kakap",
        description: "Ikan kakap segar dimasak dengan kuah gulai santan yang kaya rempah",
        price: 40000,
        priceText: "Rp 40.000",
        image: "/gulai-ikan-kakap-padang.png",
        badge: "",
      },
      {
        id: 4,
        name: "Dendeng Balado",
        description: "Dendeng sapi kering dibalur dengan sambal balado pedas yang menggugah selera",
        price: 50000,
        priceText: "Rp 50.000",
        image: "/dendeng-balado-padang.png",
        badge: "Spicy",
      },
    ],
    minuman: [
      {
        id: 5,
        name: "Es Teh Manis",
        description: "Teh manis segar dengan es batu, cocok untuk cuaca panas",
        price: 8000,
        priceText: "Rp 8.000",
        image: "/es-teh-manis-indonesia.png",
        badge: "",
      },
      {
        id: 6,
        name: "Es Jeruk Nipis",
        description: "Jeruk nipis segar dengan gula aren, menyegarkan dan sehat",
        price: 12000,
        priceText: "Rp 12.000",
        image: "/es-jeruk-nipis-segar.png",
        badge: "",
      },
      {
        id: 7,
        name: "Kopi Tubruk",
        description: "Kopi robusta pilihan diseduh dengan cara tradisional",
        price: 10000,
        priceText: "Rp 10.000",
        image: "/kopi-tubruk-tradisional.png",
        badge: "",
      },
    ],
    makananRingan: [
      {
        id: 8,
        name: "Kerupuk Jangek",
        description: "Kerupuk kulit sapi renyah, cocok sebagai pelengkap makan",
        price: 15000,
        priceText: "Rp 15.000",
        image: "/kerupuk-jangek-padang.png",
        badge: "",
      },
      {
        id: 9,
        name: "Sambal Lado Mudo",
        description: "Sambal cabai hijau segar dengan tomat dan bawang, pedas menyengat",
        price: 5000,
        priceText: "Rp 5.000",
        image: "/sambal-lado-mudo-padang.png",
        badge: "Extra Spicy",
      },
    ],
  }

  const [activeTab, setActiveTab] = useState("makananUtama")

  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id)
    if (existingItem) {
      setCart(
        cart.map((cartItem) => (cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem)),
      )
    } else {
      setCart([...cart, { ...item, quantity: 1 }])
    }
    setShowCart(true)
  }

  const removeFromCart = (itemId) => {
    setCart(cart.filter((item) => item.id !== itemId))
  }

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(itemId)
    } else {
      setCart(cart.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item)))
    }
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const handleOrderSubmit = async (e) => {
    e.preventDefault()
    if (cart.length === 0) {
      setOrderMessage("Keranjang kosong! Silakan pilih menu terlebih dahulu.")
      return
    }

    setIsOrderSubmitting(true)
    setOrderMessage("")

    try {
      const orderData = {
        ...orderForm,
        items: cart,
        totalPrice: getTotalPrice(),
        orderDate: new Date().toISOString(),
      }

      await axios.post("http://localhost:5000/api/orders", orderData)
      setOrderMessage("Pesanan berhasil dikirim! Kami akan menghubungi Anda segera untuk konfirmasi.")
      setCart([])
      setShowCart(false)
      setOrderForm({
        customerName: "",
        customerPhone: "",
        deliveryAddress: "",
        orderType: "dine-in",
      })
    } catch {
      setOrderMessage("Terjadi kesalahan. Silakan coba lagi.")
    } finally {
      setIsOrderSubmitting(false)
    }
  }

  const handleInputChange = (e) => {
    setReservationForm({
      ...reservationForm,
      [e.target.name]: e.target.value,
    })
  }

  const handleOrderInputChange = (e) => {
    setOrderForm({
      ...orderForm,
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
      {cart.length > 0 && (
        <button
          onClick={() => setShowCart(true)}
          className="fixed bottom-6 right-6 bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition-colors z-50"
          aria-label={`Lihat keranjang dengan ${cart.length} item`}
          title={`Keranjang (${cart.length} item)`}
        >
          <div className="relative">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6"
              />
            </svg>
            <span className="absolute -top-2 -right-2 bg-yellow-400 text-red-800 text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {cart.length}
            </span>
          </div>
        </button>
      )}

      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Keranjang Pesanan</h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="text-gray-500 hover:text-gray-700"
                  aria-label="Tutup keranjang"
                  title="Tutup keranjang"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6">
              {cart.length === 0 ? (
                <p className="text-center text-gray-500 py-8">Keranjang kosong</p>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{item.name}</h3>
                          <p className="text-red-600 font-bold">{item.priceText}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                            aria-label={`Kurangi jumlah ${item.name}`}
                            title={`Kurangi jumlah ${item.name}`}
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                            aria-label={`Tambah jumlah ${item.name}`}
                            title={`Tambah jumlah ${item.name}`}
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700"
                          aria-label={`Hapus ${item.name} dari keranjang`}
                          title={`Hapus ${item.name} dari keranjang`}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 mb-6">
                    <div className="flex justify-between items-center text-xl font-bold">
                      <span>Total:</span>
                      <span className="text-red-600">Rp {getTotalPrice().toLocaleString("id-ID")}</span>
                    </div>
                  </div>

                  <form onSubmit={handleOrderSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="customerName" className="block text-sm font-semibold text-gray-700 mb-2">
                        Nama Pemesan
                      </label>
                      <input
                        type="text"
                        id="customerName"
                        name="customerName"
                        value={orderForm.customerName}
                        onChange={handleOrderInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Masukkan nama pemesan"
                        aria-describedby="customerName-help"
                      />
                    </div>

                    <div>
                      <label htmlFor="customerPhone" className="block text-sm font-semibold text-gray-700 mb-2">
                        Nomor WhatsApp
                      </label>
                      <input
                        type="tel"
                        id="customerPhone"
                        name="customerPhone"
                        value={orderForm.customerPhone}
                        onChange={handleOrderInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="08xxxxxxxxxx"
                        aria-describedby="customerPhone-help"
                      />
                    </div>

                    <div>
                      <label htmlFor="orderType" className="block text-sm font-semibold text-gray-700 mb-2">
                        Jenis Pesanan
                      </label>
                      <select
                        id="orderType"
                        name="orderType"
                        value={orderForm.orderType}
                        onChange={handleOrderInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        aria-describedby="orderType-help"
                      >
                        <option value="dine-in">Makan di Tempat</option>
                        <option value="takeaway">Bungkus</option>
                        <option value="delivery">Antar</option>
                      </select>
                    </div>

                    {orderForm.orderType === "delivery" && (
                      <div>
                        <label htmlFor="deliveryAddress" className="block text-sm font-semibold text-gray-700 mb-2">
                          Alamat Pengantaran
                        </label>
                        <textarea
                          id="deliveryAddress"
                          name="deliveryAddress"
                          value={orderForm.deliveryAddress}
                          onChange={handleOrderInputChange}
                          required={orderForm.orderType === "delivery"}
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="Masukkan alamat lengkap untuk pengantaran"
                          aria-describedby="deliveryAddress-help"
                        />
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isOrderSubmitting}
                      className="w-full bg-red-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-red-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-describedby="order-submit-help"
                    >
                      {isOrderSubmitting ? "Mengirim Pesanan..." : "Kirim Pesanan"}
                    </button>
                  </form>

                  {orderMessage && (
                    <div
                      className={`mt-4 p-4 rounded-lg ${
                        orderMessage.includes("berhasil") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                      role="alert"
                      aria-live="polite"
                    >
                      {orderMessage}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}

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
              aria-label="Lihat menu makanan"
              title="Lihat menu makanan"
            >
              Lihat Menu
            </button>
            <button
              onClick={() => document.getElementById("reservasi").scrollIntoView({ behavior: "smooth" })}
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-red-600 transition-all duration-300 transform hover:scale-105"
              aria-label="Reservasi meja"
              title="Reservasi meja"
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
              <img
                src="/traditional-padang-kitchen-cooking.png"
                alt="Dapur Tradisional"
                className="rounded-2xl shadow-2xl"
              />
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
              aria-label="Tampilkan menu makanan utama"
              title="Menu makanan utama"
            >
              Makanan Utama
            </button>
            <button
              onClick={() => setActiveTab("minuman")}
              className={`px-6 py-3 mx-2 mb-2 rounded-full font-semibold transition-all duration-300 ${
                activeTab === "minuman" ? "bg-red-600 text-white shadow-lg" : "bg-white text-gray-600 hover:bg-red-100"
              }`}
              aria-label="Tampilkan menu minuman"
              title="Menu minuman"
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
              aria-label="Tampilkan menu makanan ringan"
              title="Menu makanan ringan"
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
                    <span className="text-2xl font-bold text-red-600">{item.priceText}</span>
                    <button
                      onClick={() => addToCart(item)}
                      className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-colors duration-300"
                      aria-label={`Pesan ${item.name} seharga ${item.priceText}`}
                      title={`Pesan ${item.name}`}
                    >
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
                  <label htmlFor="reservationName" className="block text-sm font-semibold text-gray-700 mb-2">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    id="reservationName"
                    name="name"
                    value={reservationForm.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Masukkan nama lengkap"
                    aria-describedby="reservationName-help"
                  />
                </div>
                <div>
                  <label htmlFor="reservationPhone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Nomor WhatsApp
                  </label>
                  <input
                    type="tel"
                    id="reservationPhone"
                    name="phone"
                    value={reservationForm.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="08xxxxxxxxxx"
                    aria-describedby="reservationPhone-help"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="reservationGuests" className="block text-sm font-semibold text-gray-700 mb-2">
                    Jumlah Tamu
                  </label>
                  <select
                    id="reservationGuests"
                    name="guests"
                    value={reservationForm.guests}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    aria-describedby="reservationGuests-help"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <option key={num} value={num}>
                        {num} orang
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="reservationDate" className="block text-sm font-semibold text-gray-700 mb-2">
                    Tanggal
                  </label>
                  <input
                    type="date"
                    id="reservationDate"
                    name="date"
                    value={reservationForm.date}
                    onChange={handleInputChange}
                    required
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    aria-describedby="reservationDate-help"
                  />
                </div>
                <div>
                  <label htmlFor="reservationTime" className="block text-sm font-semibold text-gray-700 mb-2">
                    Waktu
                  </label>
                  <select
                    id="reservationTime"
                    name="time"
                    value={reservationForm.time}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    aria-describedby="reservationTime-help"
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
                aria-describedby="reservation-submit-help"
              >
                {isSubmitting ? "Mengirim..." : "Kirim Reservasi"}
              </button>
            </form>

            {message && (
              <div
                className={`mt-4 p-4 rounded-lg ${
                  message.includes("berhasil") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}
                role="alert"
                aria-live="polite"
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
                      <p className="text-gray-600">+62 751 123456</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm">💬</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">WhatsApp</p>
                      <p className="text-gray-600">+62 812 3456 7890</p>
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

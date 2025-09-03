"use client";

import { useState, useEffect } from "react";
import axios from "axios";

const RestaurantPage = () => {
  const [reservationForm, setReservationForm] = useState({
    name: "",
    phone: "",
    guests: 1,
    date: "",
    time: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [orderForm, setOrderForm] = useState({
    customerName: "",
    customerPhone: "",
    deliveryAddress: "",
    orderType: "dine-in", // dine-in, takeaway, delivery
  });
  const [isOrderSubmitting, setIsOrderSubmitting] = useState(false);
  const [orderMessage, setOrderMessage] = useState("");
  const [addressError, setAddressError] = useState("");

  const menuItems = {
    makananUtama: [
      {
        id: 1,
        name: "Rendang Daging",
        description: "Potongan daging sapi pilihan yang dimasak dalam waktu lama dengan santan kental dan bumbu rempah-rempah autentik hingga kering",
        price: 28000,
        priceText: "Rp 28.000",
        image: "/rendang-daging-sapi-padang.png",
        badge: "Best Seller",
      },
      {
        id: 2,
        name: "Ayam Pop",
        description: "Ayam kampung yang direbus dengan air kelapa, lalu digoreng sesaat. Disajikan dengan sambal lado tomat yang segar",
        price: 24000,
        priceText: "Rp 24.000",
        image: "/ayam-pop-padang.png",
        badge: "",
      },
      {
        id: 3,
        name: "Gulai Tunjang",
        description: "Kikil atau kulit kaki sapi yang dimasak dalam kuah gulai santan kental, pedas, dan gurih hingga empuk sempurna",
        price: 25000,
        priceText: "Rp 25.000",
        image: "/gulai-tunjang-padang.png",
        badge: "",
      },
      {
        id: 4,
        name: "Dendeng Batokok",
        description: "Daging sapi iris tipis yang digepuk (ditokok), dibumbui, lalu digoreng kering dan disiram dengan sambal lado mudo",
        price: 27000,
        priceText: "Rp 27.000",
        image: "/dendeng-batokok-padang.png",
        badge: "Spicy",
      },
      {
        id: 5,
        name: "Gulai Kepala Ikan",
        description: "Setengah bagian kepala ikan kakap segar yang dimasak dengan kuah gulai merah yang kaya rempah, sedikit asam, dan pedas",
        price: 65000,
        priceText: "Rp 65.000",
        image: "/gulai-ikan-kakap-padang.png",
        badge: "Premium",
      },
      {
        id: 6,
        name: "Ayam Bakar Padang",
        description: "Ayam yang diungkep dengan bumbu gulai kental lalu dibakar di atas arang, menghasilkan aroma smokey yang khas",
        price: 25000,
        priceText: "Rp 25.000",
        image: "/ayam-bakar-padang.png",
        badge: "",
      },
      {
        id: 7,
        name: "Gulai Cincang",
        description: "Potongan daging dan tetelan sapi yang dimasak dalam kuah gulai pedas kental dengan aroma rempah yang kuat",
        price: 26000,
        priceText: "Rp 26.000",
        image: "/gulai-cincang-padang.png",
        badge: "",
      },
      {
        id: 8,
        name: "Ikan Asam Padeh",
        description: "Potongan ikan tongkol segar yang dimasak tanpa santan dengan kuah asam pedas dari belimbing wuluh dan cabai",
        price: 23000,
        priceText: "Rp 23.000",
        image: "/ikan-asam-padeh.png",
        badge: "Spicy",
      },
      {
        id: 9,
        name: "Telur Dadar Padang",
        description: "Telur dadar tebal dan padat berisi irisan daun bawang, daun kunyit, dan bumbu khas yang digoreng garing di luar",
        price: 15000,
        priceText: "Rp 15.000",
        image: "/telur-dadar-padang.png",
        badge: "",
      },
      {
        id: 10,
        name: "Paru Goreng",
        description: "Irisan paru sapi yang direbus dengan bumbu lalu digoreng hingga renyah dan gurih",
        price: 22000,
        priceText: "Rp 22.000",
        image: "/paru-goreng-padang.png",
        badge: "",
      },
      {
        id: 11,
        name: "Gulai Otak",
        description: "Otak sapi yang lembut dimasak dalam kuah gulai kuning yang tidak terlalu pedas namun sangat gurih",
        price: 24000,
        priceText: "Rp 24.000",
        image: "/gulai-otak-padang.jpg",
        badge: "",
      },
      {
        id: 12,
        name: "Gulai Ati Ampela",
        description: "Ati dan ampela ayam yang dimasak dengan bumbu gulai santan yang medok dan nikmat",
        price: 18000,
        priceText: "Rp 18.000",
        image: "/gulai-ati-ampela.png",
        badge: "",
      },
      {
        id: 13,
        name: "Ikan Kembung Bakar",
        description: "Ikan kembung segar yang dilumuri bumbu khas lalu dibakar dan disajikan dengan sambal",
        price: 22000,
        priceText: "Rp 22.000",
        image: "/ikan-kembung-bakar.png",
        badge: "",
      },
      {
        id: 14,
        name: "Gulai Nangka",
        description: "Potongan nangka muda yang dimasak dengan santan dan bumbu gulai hingga empuk, menjadi lauk pendamping wajib",
        price: 12000,
        priceText: "Rp 12.000",
        image: "/gulai-nangka-padang.png",
        badge: "",
      },
      {
        id: 15,
        name: "Nasi Putih",
        description: "Nasi putih hangat pulen, disajikan per porsi",
        price: 7000,
        priceText: "Rp 7.000",
        image: "/nasi-putih.png",
        badge: "",
      },
    ],
    minuman: [
      {
        id: 16,
        name: "Teh Talua",
        description: "Minuman khas Minang dari teh, kuning telur, dan gula yang dikocok hingga berbusa, memberikan energi ekstra",
        price: 18000,
        priceText: "Rp 18.000",
        image: "/teh-talua-minang.png",
        badge: "Signature",
      },
      {
        id: 17,
        name: "Es Teh Manis",
        description: "Teh seduh dingin dengan tambahan gula, pelepas dahaga klasik",
        price: 6000,
        priceText: "Rp 6.000",
        image: "/es-teh-manis-indonesia.png",
        badge: "",
      },
      {
        id: 18,
        name: "Teh Tawar",
        description: "Teh tawar murni yang disajikan panas atau dengan es",
        price: 4000,
        priceText: "Rp 4.000",
        image: "/teh-tawar.png",
        badge: "",
      },
      {
        id: 19,
        name: "Es Jeruk",
        description: "Perasan jeruk segar yang disajikan dingin dengan es",
        price: 10000,
        priceText: "Rp 10.000",
        image: "/es-jeruk-nipis-segar.png",
        badge: "",
      },
      {
        id: 20,
        name: "Jeruk Hangat",
        description: "Perasan jeruk segar yang diseduh dengan air hangat",
        price: 9000,
        priceText: "Rp 9.000",
        image: "/jeruk-hangat.png",
        badge: "",
      },
      {
        id: 21,
        name: "Kopi Hitam",
        description: "Kopi tubruk tradisional dengan aroma dan rasa yang kuat",
        price: 8000,
        priceText: "Rp 8.000",
        image: "/kopi-tubruk-tradisional.png",
        badge: "",
      },
      {
        id: 22,
        name: "Kopi Susu",
        description: "Kopi hitam yang dipadukan dengan manisnya susu kental",
        price: 10000,
        priceText: "Rp 10.000",
        image: "/kopi-susu-indonesia.png",
        badge: "",
      },
      {
        id: 23,
        name: "Jus Alpukat",
        description: "Daging buah alpukat segar yang diblender hingga lembut, disajikan dengan susu cokelat",
        price: 15000,
        priceText: "Rp 15.000",
        image: "/jus-alpukat.png",
        badge: "",
      },
      {
        id: 24,
        name: "Jus Terong Belanda",
        description: "Jus dari buah terong belanda yang memiliki cita rasa asam manis menyegarkan",
        price: 15000,
        priceText: "Rp 15.000",
        image: "/jus-terong-belanda.png",
        badge: "",
      },
      {
        id: 25,
        name: "Es Timun Serut",
        description: "Serutan timun segar yang dicampur dengan sirup dan perasan jeruk nipis",
        price: 12000,
        priceText: "Rp 12.000",
        image: "/es-timun-serut.png",
        badge: "Refreshing",
      },
      {
        id: 26,
        name: "Air Mineral Botol",
        description: "Air mineral kemasan botol 600ml",
        price: 6000,
        priceText: "Rp 6.000",
        image: "/air-mineral-botol.png",
        badge: "",
      },
      {
        id: 27,
        name: "Soda Gembira",
        description: "Campuran soda, sirup, dan susu kental manis yang menyegarkan",
        price: 14000,
        priceText: "Rp 14.000",
        image: "/soda-gembira.png",
        badge: "",
      },
      {
        id: 28,
        name: "Es Cincau Hijau",
        description: "Cincau hijau alami disajikan dengan santan dan sirup gula merah",
        price: 13000,
        priceText: "Rp 13.000",
        image: "/es-cincau-hijau.png",
        badge: "",
      },
      {
        id: 29,
        name: "Kawa Daun",
        description: "Minuman tradisional dari daun kopi yang dikeringkan lalu diseduh seperti teh, disajikan dalam batok kelapa",
        price: 12000,
        priceText: "Rp 12.000",
        image: "/kawa-daun-minang.png",
        badge: "Traditional",
      },
    ],
    makananRingan: [
      {
        id: 30,
        name: "Sate Padang",
        description: "Potongan daging sapi yang dibakar dan disiram dengan kuah kental berwarna kuning dari bumbu rempah-rempah",
        price: 25000,
        priceText: "Rp 25.000",
        image: "/sate-padang.png",
        badge: "Popular",
      },
      {
        id: 31,
        name: "Soto Padang",
        description: "Soto berkuah bening kaya rempah, berisi irisan dendeng sapi kering, perkedel, dan soun",
        price: 28000,
        priceText: "Rp 28.000",
        image: "/soto-padang.png",
        badge: "",
      },
      {
        id: 32,
        name: "Perkedel Kentang",
        description: "Kentang tumbuk yang dicampur bumbu dan daging cincang, lalu digoreng hingga keemasan",
        price: 6000,
        priceText: "Rp 6.000",
        image: "/perkedel-kentang.png",
        badge: "",
      },
      {
        id: 33,
        name: "Kerupuk Jangek",
        description: "Kerupuk kulit sapi yang renyah, nikmat dicocol dengan kuah gulai",
        price: 8000,
        priceText: "Rp 8.000",
        image: "/kerupuk-jangek-padang.png",
        badge: "",
      },
      {
        id: 34,
        name: "Keripik Balado",
        description: "Keripik singkong renyah yang dilumuri saus cabai merah manis pedas (per bungkus)",
        price: 15000,
        priceText: "Rp 15.000",
        image: "/keripik-balado.png",
        badge: "Spicy",
      },
      {
        id: 365,
        name: "Martabak Mesir",
        description: "Martabak telur dengan isian daging rendang cincang, disajikan dengan kuah cuka khas",
        price: 30000,
        priceText: "Rp 30.000",
        image: "/martabak-mesir.png",
        badge: "Special",
      },
      {
        id: 36,
        name: "Sala Lauak",
        description: "Bola-bola goreng renyah dari adonan tepung beras dan ikan teri khas Pariaman (per 4 buah)",
        price: 10000,
        priceText: "Rp 10.000",
        image: "/sala-lauak.png",
        badge: "Traditional",
      },
      {
        id: 37,
        name: "Lemang Tapai",
        description: "Beras ketan yang dimasak dalam bambu (lemang) disajikan dengan tapai ketan hitam yang manis",
        price: 18000,
        priceText: "Rp 18.000",
        image: "/lemang-tapai.png",
        badge: "Sweet",
      },
      {
        id: 38,
        name: "Bubur Kampiun",
        description: "Campuran aneka bubur manis seperti bubur sumsum, ketan hitam, dan kolak dalam satu mangkuk",
        price: 17000,
        priceText: "Rp 17.000",
        image: "/bubur-kampiun.png",
        badge: "",
      },
      {
        id: 39,
        name: "Lontong Sayur Padang",
        description: "Lontong disiram dengan kuah gulai nangka, pakis, dan dilengkapi dengan telur balado",
        price: 20000,
        priceText: "Rp 20.000",
        image: "/lontong-sayur-padang.png",
        badge: "",
      },
      {
        id: 40,
        name:"Sambal Lado Mudo",
        description: "Sambal cabai hijau tumbuk kasar dengan tomat hijau dan ikan teri, porsi tambahan",
        price: 7000,
        priceText: "Rp 7.000",
        image: "/sambal-lado-mudo-padang.png",
        badge: "Extra Spicy",
      },
      {
        id: 41,
        name: "Sambal Lado Merah",
        description: "Sambal cabai merah goreng dengan bawang, porsi tambahan",
        price: 7000,
        priceText: "Rp 7.000",
        image: "/sambal-lado-merah.png",
        badge: "Spicy",
      },
      {
        id: 42,
        name: "Dadar Gulung Pandan",
        description: "Kue basah tradisional berupa dadar hijau dengan isian kelapa parut dan gula merah",
        price: 5000,
        priceText: "Rp 5.000",
        image: "/dadar-gulung-pandan.png",
        badge: "",
      },
      {
        id: 43,
        name: "Es Durian",
        description: "Es serut yang disiram dengan daging buah durian asli dan susu kental manis",
        price: 22000,
        priceText: "Rp 22.000",
        image: "/es-durian.png",
        badge: "Premium",
      },
      {
        id: 44,
        name: "Rempeyek Udang",
        description: "Rempeyek renyah dan gurih dengan taburan udang rebon",
        price: 8000,
        priceText: "Rp 8.000",
        image: "/rempeyek-udang.png",
        badge: "",
      },
    ],
  };

  const [activeTab, setActiveTab] = useState("makananUtama");

  // Auto hide messages after 6 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    if (orderMessage) {
      const timer = setTimeout(() => {
        setOrderMessage("");
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [orderMessage]);

  useEffect(() => {
    if (addressError) {
      const timer = setTimeout(() => {
        setAddressError("");
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [addressError]);

  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map((cartItem) => (cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem)));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
    setShowCart(true);
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(itemId);
    } else {
      setCart(cart.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item)));
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      setOrderMessage("Keranjang kosong! Silakan pilih menu terlebih dahulu.");
      return;
    }

    // Validate delivery address if delivery is selected
    if (orderForm.orderType === "delivery" && orderForm.deliveryAddress.trim().length < 7) {
      setAddressError("Alamat pengantaran harus minimal 7 karakter.");
      return;
    }

    setIsOrderSubmitting(true);
    setOrderMessage("");
    setAddressError("");

    try {
      const orderData = {
        ...orderForm,
        items: cart,
        totalPrice: getTotalPrice(),
        orderDate: new Date().toISOString(),
      };

      await axios.post("http://localhost:5000/api/orders", orderData);
      setOrderMessage("Pesanan berhasil dikirim! Kami akan menghubungi Anda segera untuk konfirmasi.");
      setCart([]);
      setOrderForm({
        customerName: "",
        customerPhone: "",
        deliveryAddress: "",
        orderType: "dine-in",
      });

      setTimeout(() => {
        setShowCart(false);
      }, 6000);
    } catch {
      setOrderMessage("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsOrderSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    setReservationForm({
      ...reservationForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleOrderInputChange = (e) => {
    setOrderForm({
      ...orderForm,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === "deliveryAddress" && addressError) {
      setAddressError("");
    }
  };

  const handleReservationSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      await axios.post("http://localhost:5000/api/reservations", reservationForm);
      setMessage("Reservasi berhasil dikirim! Kami akan menghubungi Anda segera.");
      setReservationForm({
        name: "",
        phone: "",
        guests: 1,
        date: "",
        time: "",
      });
    } catch {
      setMessage("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6" />
            </svg>
            <span className="absolute -top-2 -right-2 bg-yellow-400 text-red-800 text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">{cart.length}</span>
          </div>
        </button>
      )}
      {showCart && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Keranjang Pesanan</h2>
                <button onClick={() => setShowCart(false)} className="text-gray-500 hover:text-gray-700" aria-label="Tutup keranjang" title="Tutup keranjang">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6">
              {cart.length === 0 ? (
                <p className="text-center font-bold text-green-500 py-8">Order berhasil di proses</p>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
                        <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
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
                        <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700" aria-label={`Hapus ${item.name} dari keranjang`} title={`Hapus ${item.name} dari keranjang`}>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${addressError ? "border-red-500" : "border-gray-300"}`}
                          placeholder="Masukkan alamat lengkap untuk pengantaran"
                          aria-describedby="deliveryAddress-help"
                        />
                        {addressError && (
                          <p className="mt-2 text-sm text-red-600" role="alert">
                            {addressError}
                          </p>
                        )}
                        <p className="mt-1 text-sm text-gray-500">Alamat harus minimal 7 karakter</p>
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
                    <div className={`mt-4 p-4 rounded-lg ${orderMessage.includes("berhasil") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`} role="alert" aria-live="polite">
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
          <p className="text-xl md:text-2xl mb-8 text-balance">Menyajikan hidangan khas Padang dengan resep warisan sejak tahun 1992</p>
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
              <img src="/traditional-padang-kitchen-cooking.png" alt="Dapur Tradisional" className="rounded-2xl shadow-2xl" />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Cerita di Balik Dapur Kami</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Dimulai dari hobi memasak Ibu Sari pada tahun 1992, warung kecil kami telah berkembang menjadi rumah makan yang dikenal luas karena cita rasa autentik masakan Padang.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Setiap hidangan dibuat dengan resep turun-temurun yang telah diwariskan dari generasi ke generasi, menggunakan rempah-rempah pilihan dan teknik memasak tradisional yang telah teruji waktu.
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
              className={`px-6 py-3 mx-2 mb-2 rounded-full font-semibold transition-all duration-300 ${activeTab === "makananUtama" ? "bg-red-600 text-white shadow-lg" : "bg-white text-gray-600 hover:bg-red-100"}`}
              aria-label="Tampilkan menu makanan utama"
              title="Menu makanan utama"
            >
              Makanan Utama
            </button>
            <button
              onClick={() => setActiveTab("minuman")}
              className={`px-6 py-3 mx-2 mb-2 rounded-full font-semibold transition-all duration-300 ${activeTab === "minuman" ? "bg-red-600 text-white shadow-lg" : "bg-white text-gray-600 hover:bg-red-100"}`}
              aria-label="Tampilkan menu minuman"
              title="Menu minuman"
            >
              Minuman
            </button>
            <button
              onClick={() => setActiveTab("makananRingan")}
              className={`px-6 py-3 mx-2 mb-2 rounded-full font-semibold transition-all duration-300 ${activeTab === "makananRingan" ? "bg-red-600 text-white shadow-lg" : "bg-white text-gray-600 hover:bg-red-100"}`}
              aria-label="Tampilkan menu makanan ringan"
              title="Menu makanan ringan"
            >
              Makanan Ringan
            </button>
          </div>

          {/* Menu Items */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {menuItems[activeTab].map((item, index) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2" data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="relative">
                  <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-48 object-cover" />
                  {item.badge && (
                    <span
                      className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-semibold ${
                        item.badge === "Best Seller" ? "bg-yellow-400 text-yellow-900" : item.badge === "Spicy" ? "bg-red-500 text-white" : item.badge === "Extra Spicy" ? "bg-red-700 text-white" : "bg-blue-500 text-white"
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
              { src: "/interior-rumah-makan-padang.png", alt: "Interior tradisional rumah makan", delay: 0 },
              { src: "/suasana-makan-keluarga.png", alt: "Suasana makan keluarga yang hangat", delay: 100 },
              { src: "/dekorasi-minangkabau.png", alt: "Dekorasi khas Minangkabau", delay: 200 },
              { src: "/meja-makan-tradisional.png", alt: "Meja makan dengan peralatan tradisional", delay: 300 },
              { src: "/dapur-terbuka.png", alt: "Dapur terbuka dengan masakan segar", delay: 400 },
              { src: "/pelayan-ramah.png", alt: "Pelayan yang ramah melayani tamu", delay: 500 },
              { src: "/suasana-ramai.png", alt: "Suasana ramai saat jam makan", delay: 600 },
              { src: "/eksterior-rumah-makan.png", alt: "Tampak depan rumah makan", delay: 700 },
            ].map((item, index) => (
              <div key={index} className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105" data-aos="fade-up" data-aos-delay={item.delay}>
                <img src={item.src} alt={item.alt} className="w-full h-48 object-cover" />
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
              <div className={`mt-4 p-4 rounded-lg ${message.includes("berhasil") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`} role="alert" aria-live="polite">
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
            <p className="text-xl text-gray-600">Kunjungi kami untuk merasakan pengalaman kuliner yang tak terlupakan</p>
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
                      <p className="text-gray-600">+62 813 3261 4507</p>
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
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                      <span className="font-semibold text-gray-900">{schedule.day}</span>
                      <span className="text-red-600 font-semibold">{schedule.time}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-red-50 rounded-lg">
                  <p className="text-red-800 text-sm">
                    <strong>Catatan:</strong> Kami tutup pada hari libur nasional. Silakan hubungi kami untuk konfirmasi ketersediaan.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RestaurantPage;

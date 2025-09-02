"use client";

import { useState, useEffect } from "react";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [activeTab, setActiveTab] = useState("orders");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [serverConnected, setServerConnected] = useState(false);

  // Simulate data fetching with sample data for demo
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Sample data for demonstration
      const sampleOrders = [
        {
          id: 1,
          customer_name: "John Doe",
          customer_phone: "081234567890",
          created_at: new Date().toISOString(),
          status: "pending",
          order_type: "delivery",
          delivery_address: "Jl. Malioboro No. 123, Yogyakarta",
          total_price: 125000,
          items: [
            { name: "Nasi Gudeg", quantity: 2, price: 25000 },
            { name: "Ayam Goreng", quantity: 1, price: 35000 },
            { name: "Es Teh Manis", quantity: 2, price: 8000 }
          ]
        },
        {
          id: 2,
          customer_name: "Jane Smith",
          customer_phone: "087654321098",
          created_at: new Date(Date.now() - 3600000).toISOString(),
          status: "confirmed",
          order_type: "takeaway",
          delivery_address: null,
          total_price: 75000,
          items: [
            { name: "Sate Ayam", quantity: 2, price: 30000 },
            { name: "Nasi Putih", quantity: 1, price: 5000 },
            { name: "Wedang Jahe", quantity: 1, price: 10000 }
          ]
        }
      ];

      const sampleReservations = [
        {
          id: 1,
          name: "Ahmad Rahman",
          phone: "081122334455",
          created_at: new Date().toISOString(),
          status: "pending",
          date: new Date(Date.now() + 86400000).toISOString(),
          time: "19:00",
          guests: 4
        },
        {
          id: 2,
          name: "Siti Nurhaliza",
          phone: "087766554433",
          created_at: new Date(Date.now() - 1800000).toISOString(),
          status: "confirmed",
          date: new Date(Date.now() + 172800000).toISOString(),
          time: "20:30",
          guests: 6
        }
      ];

      setServerConnected(true);
      setOrders(sampleOrders);
      setReservations(sampleReservations);
    } catch (error) {
      console.error("Error fetching data:", error);
      setServerConnected(false);
      setError("Gagal mengambil data. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const updateReservationStatus = async (reservationId, newStatus) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setReservations(prevReservations => 
        prevReservations.map(reservation => 
          reservation.id === reservationId ? { ...reservation, status: newStatus } : reservation
        )
      );
    } catch (error) {
      console.error("Error updating reservation status:", error);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      confirmed: "bg-blue-100 text-blue-800",
      preparing: "bg-orange-100 text-orange-800",
      ready: "bg-green-100 text-green-800",
      delivered: "bg-green-200 text-green-900",
      completed: "bg-green-200 text-green-900",
      cancelled: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const getStatusText = (status) => {
    const texts = {
      pending: "Menunggu",
      confirmed: "Dikonfirmasi",
      preparing: "Dimasak",
      ready: "Siap",
      delivered: "Selesai",
      completed: "Selesai",
      cancelled: "Dibatalkan",
    };
    return texts[status] || status;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 sm:h-32 sm:w-32 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-sm sm:text-base">Menghubungkan ke server...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center max-w-md mx-auto p-4 sm:p-6">
          <div className="text-red-600 text-4xl sm:text-6xl mb-4">⚠️</div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Koneksi Bermasalah</h2>
          <p className="text-gray-600 mb-6 text-sm sm:text-base">{error}</p>

          <div className="bg-gray-50 p-3 sm:p-4 rounded-lg mb-6 text-left">
            <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Cara menjalankan server:</h3>
            <ol className="text-xs sm:text-sm text-gray-600 space-y-1">
              <li>1. Buka terminal di folder server</li>
              <li>2. Jalankan: <code className="bg-gray-200 px-1 rounded">npm install</code></li>
              <li>3. Jalankan: <code className="bg-gray-200 px-1 rounded">npm start</code></li>
              <li>4. Server akan berjalan di http://localhost:5000</li>
            </ol>
          </div>

          <button 
            onClick={fetchData} 
            className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold text-sm sm:text-base"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-4 sm:py-6">
            <div className="mb-4 sm:mb-0">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <div className="flex items-center mt-1">
                <div className={`w-2 h-2 rounded-full mr-2 ${serverConnected ? "bg-green-500" : "bg-red-500"}`}></div>
                <span className="text-xs sm:text-sm text-gray-600">
                  Server {serverConnected ? "Terhubung" : "Terputus"}
                </span>
              </div>
            </div>
            
            {/* Tab Navigation */}
            <div className="flex space-x-2 sm:space-x-4 w-full sm:w-auto">
              <button 
                onClick={() => setActiveTab("orders")} 
                className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-lg font-semibold text-sm sm:text-base transition-colors ${
                  activeTab === "orders" 
                    ? "bg-red-600 text-white" 
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Pesanan ({orders.length})
              </button>
              <button 
                onClick={() => setActiveTab("reservations")} 
                className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-lg font-semibold text-sm sm:text-base transition-colors ${
                  activeTab === "reservations" 
                    ? "bg-red-600 text-white" 
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Reservasi ({reservations.length})
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {activeTab === "orders" && (
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Manajemen Pesanan</h2>
            {orders.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <div className="text-gray-400 text-4xl mb-4">📦</div>
                <p className="text-gray-500">Belum ada pesanan</p>
              </div>
            ) : (
              <div className="space-y-4 sm:space-y-6">
                {orders.map((order) => (
                  <div key={order.id} className="bg-white rounded-lg shadow">
                    {/* Mobile Layout */}
                    <div className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4">
                        <div className="mb-3 sm:mb-0">
                          <h3 className="text-lg font-semibold text-gray-900">
                            Pesanan ke-{order.id}
                          </h3>
                          <p className="text-gray-600 text-sm sm:text-base">
                            {order.customer_name}
                          </p>
                          <p className="text-gray-600 text-sm">
                            {order.customer_phone}
                          </p>
                          <p className="text-xs sm:text-sm text-gray-500 mt-1">
                            {new Date(order.created_at).toLocaleString("id-ID")}
                          </p>
                        </div>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${getStatusColor(order.status)}`}>
                          {getStatusText(order.status)}
                        </span>
                      </div>

                      <div className="mb-4 space-y-2">
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                          <p className="font-semibold text-gray-700 text-sm sm:text-base">
                            Jenis: <span className="font-normal capitalize">{order.order_type}</span>
                          </p>
                          <p className="font-bold text-red-600 text-base sm:text-lg">
                            Rp {order.total_price.toLocaleString("id-ID")}
                          </p>
                        </div>
                        {order.delivery_address && (
                          <p className="text-gray-600 text-sm">
                            <span className="font-medium">Alamat:</span> {order.delivery_address}
                          </p>
                        )}
                      </div>

                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-700 mb-2 text-sm sm:text-base">Items:</h4>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <div className="space-y-2">
                            {order.items.map((item, index) => (
                              <div key={index} className="flex justify-between items-center text-sm">
                                <span className="flex-1">
                                  {item.name} 
                                  <span className="text-gray-500 ml-1">x{item.quantity}</span>
                                </span>
                                <span className="font-medium">
                                  Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-2">
                        {order.status === "pending" && (
                          <>
                            <button 
                              onClick={() => updateOrderStatus(order.id, "confirmed")} 
                              className="flex-1 sm:flex-none px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
                            >
                              ✓ Konfirmasi
                            </button>
                            <button 
                              onClick={() => updateOrderStatus(order.id, "cancelled")} 
                              className="flex-1 sm:flex-none px-4 py-2 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors"
                            >
                              ✕ Batalkan
                            </button>
                          </>
                        )}
                        {order.status === "confirmed" && (
                          <button 
                            onClick={() => updateOrderStatus(order.id, "preparing")} 
                            className="flex-1 sm:flex-none px-4 py-2 bg-orange-600 text-white rounded text-sm hover:bg-orange-700 transition-colors"
                          >
                            🍳 Mulai Masak
                          </button>
                        )}
                        {order.status === "preparing" && (
                          <button 
                            onClick={() => updateOrderStatus(order.id, "ready")} 
                            className="flex-1 sm:flex-none px-4 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors"
                          >
                            ✅ Siap
                          </button>
                        )}
                        {order.status === "ready" && order.order_type !== "dine-in" && (
                          <button 
                            onClick={() => updateOrderStatus(order.id, "delivered")} 
                            className="flex-1 sm:flex-none px-4 py-2 bg-green-700 text-white rounded text-sm hover:bg-green-800 transition-colors"
                          >
                            🚚 Selesai
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "reservations" && (
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Manajemen Reservasi</h2>
            {reservations.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <div className="text-gray-400 text-4xl mb-4">🍽️</div>
                <p className="text-gray-500">Belum ada reservasi</p>
              </div>
            ) : (
              <div className="space-y-4 sm:space-y-6">
                {reservations.map((reservation) => (
                  <div key={reservation.id} className="bg-white rounded-lg shadow">
                    <div className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4">
                        <div className="mb-3 sm:mb-0">
                          <h3 className="text-lg font-semibold text-gray-900">
                            Reservasi ke-{reservation.id}
                          </h3>
                          <p className="text-gray-600 text-sm sm:text-base">
                            {reservation.name}
                          </p>
                          <p className="text-gray-600 text-sm">
                            {reservation.phone}
                          </p>
                          <p className="text-xs sm:text-sm text-gray-500 mt-1">
                            Dibuat: {new Date(reservation.created_at).toLocaleString("id-ID")}
                          </p>
                        </div>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${getStatusColor(reservation.status)}`}>
                          {getStatusText(reservation.status)}
                        </span>
                      </div>

                      <div className="mb-4 bg-gray-50 rounded-lg p-4">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                          <div>
                            <span className="font-semibold text-gray-700">📅 Tanggal:</span>
                            <p className="text-gray-600 mt-1">
                              {new Date(reservation.date).toLocaleDateString("id-ID", {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-700">🕐 Waktu:</span>
                            <p className="text-gray-600 mt-1">{reservation.time}</p>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-700">👥 Tamu:</span>
                            <p className="text-gray-600 mt-1">{reservation.guests} orang</p>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-2">
                        {reservation.status === "pending" && (
                          <>
                            <button 
                              onClick={() => updateReservationStatus(reservation.id, "confirmed")} 
                              className="flex-1 sm:flex-none px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
                            >
                              ✓ Konfirmasi
                            </button>
                            <button 
                              onClick={() => updateReservationStatus(reservation.id, "cancelled")} 
                              className="flex-1 sm:flex-none px-4 py-2 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors"
                            >
                              ✕ Batalkan
                            </button>
                          </>
                        )}
                        {reservation.status === "confirmed" && (
                          <button 
                            onClick={() => updateReservationStatus(reservation.id, "completed")} 
                            className="flex-1 sm:flex-none px-4 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors"
                          >
                            ✅ Selesai
                            </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
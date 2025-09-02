"use client";

import { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [activeTab, setActiveTab] = useState("orders");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [serverConnected, setServerConnected] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const healthCheck = await axios.get("http://localhost:5000/api/health", {
        timeout: 5000,
      });

      if (healthCheck.status === 200) {
        setServerConnected(true);

        const [ordersRes, reservationsRes] = await Promise.all([axios.get("http://localhost:5000/api/admin/orders"), axios.get("http://localhost:5000/api/admin/reservations")]);

        setOrders(Array.isArray(ordersRes.data?.data) ? ordersRes.data.data : []);
        setReservations(Array.isArray(reservationsRes.data?.data) ? reservationsRes.data.data : []);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setServerConnected(false);

      if (error.code === "ERR_NETWORK" || error.code === "ECONNREFUSED") {
        setError("Server tidak dapat dijangkau. Pastikan server Express.js berjalan di port 5000.");
      } else if (error.code === "ECONNABORTED") {
        setError("Koneksi timeout. Server mungkin sedang sibuk.");
      } else {
        setError(`Error: ${error.message}`);
      }

      setOrders([]);
      setReservations([]);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/api/admin/orders/${orderId}/status`, {
        status: newStatus,
      });
      fetchData(); // Refresh data
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const updateReservationStatus = async (reservationId, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/api/admin/reservations/${reservationId}/status`, {
        status: newStatus,
      });
      fetchData(); // Refresh data
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Menghubungkan ke server...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Koneksi Bermasalah</h2>
          <p className="text-gray-600 mb-6">{error}</p>

          <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
            <h3 className="font-semibold text-gray-900 mb-2">Cara menjalankan server:</h3>
            <ol className="text-sm text-gray-600 space-y-1">
              <li>1. Buka terminal di folder server</li>
              <li>
                2. Jalankan: <code className="bg-gray-200 px-1 rounded">npm install</code>
              </li>
              <li>
                3. Jalankan: <code className="bg-gray-200 px-1 rounded">npm start</code>
              </li>
              <li>4. Server akan berjalan di http://localhost:5000</li>
            </ol>
          </div>

          <button onClick={fetchData} className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold">
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <div className="flex items-center mt-1">
                <div className={`w-2 h-2 rounded-full mr-2 ${serverConnected ? "bg-green-500" : "bg-red-500"}`}></div>
                <span className="text-sm text-gray-600">Server {serverConnected ? "Connected" : "Disconnected"}</span>
              </div>
            </div>
            <div className="flex space-x-4">
              <button onClick={() => setActiveTab("orders")} className={`px-4 py-2 rounded-lg font-semibold ${activeTab === "orders" ? "bg-red-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}>
                Pesanan ({orders.length})
              </button>
              <button onClick={() => setActiveTab("reservations")} className={`px-4 py-2 rounded-lg font-semibold ${activeTab === "reservations" ? "bg-red-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}>
                Reservasi ({reservations.length})
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "orders" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Manajemen Pesanan</h2>
            {orders.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Belum ada pesanan</p>
            ) : (
              <div className="grid gap-6">
                {orders.map((order) => (
                  <div key={order.id} className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Pesanan #{order.id}</h3>
                        <p className="text-gray-600">
                          {order.customer_name} - {order.customer_phone}
                        </p>
                        <p className="text-sm text-gray-500">{new Date(order.created_at).toLocaleString("id-ID")}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>{order.status}</span>
                    </div>

                    <div className="mb-4">
                      <p className="font-semibold text-gray-700">Jenis: {order.order_type}</p>
                      {order.delivery_address && <p className="text-gray-600">Alamat: {order.delivery_address}</p>}
                      <p className="font-bold text-red-600">Total: Rp {order.total_price.toLocaleString("id-ID")}</p>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-700 mb-2">Items:</h4>
                      <div className="space-y-1">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span>
                              {item.name} x{item.quantity}
                            </span>
                            <span>Rp {(item.price * item.quantity).toLocaleString("id-ID")}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      {order.status === "pending" && (
                        <>
                          <button onClick={() => updateOrderStatus(order.id, "confirmed")} className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
                            Konfirmasi
                          </button>
                          <button onClick={() => updateOrderStatus(order.id, "cancelled")} className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700">
                            Batalkan
                          </button>
                        </>
                      )}
                      {order.status === "confirmed" && (
                        <button onClick={() => updateOrderStatus(order.id, "preparing")} className="px-3 py-1 bg-orange-600 text-white rounded text-sm hover:bg-orange-700">
                          Mulai Masak
                        </button>
                      )}
                      {order.status === "preparing" && (
                        <button onClick={() => updateOrderStatus(order.id, "ready")} className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700">
                          Siap
                        </button>
                      )}
                      {order.status === "ready" && order.order_type !== "dine-in" && (
                        <button onClick={() => updateOrderStatus(order.id, "delivered")} className="px-3 py-1 bg-green-700 text-white rounded text-sm hover:bg-green-800">
                          Selesai
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "reservations" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Manajemen Reservasi</h2>
            {reservations.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Belum ada reservasi</p>
            ) : (
              <div className="grid gap-6">
                {reservations.map((reservation) => (
                  <div key={reservation.id} className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Reservasi #{reservation.id}</h3>
                        <p className="text-gray-600">
                          {reservation.name} - {reservation.phone}
                        </p>
                        <p className="text-sm text-gray-500">Dibuat: {new Date(reservation.created_at).toLocaleString("id-ID")}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(reservation.status)}`}>{reservation.status}</span>
                    </div>

                    <div className="mb-4">
                      <p className="font-semibold text-gray-700">Tanggal: {new Date(reservation.date).toLocaleDateString("id-ID")}</p>
                      <p className="text-gray-600">Waktu: {reservation.time}</p>
                      <p className="text-gray-600">Jumlah Tamu: {reservation.guests} orang</p>
                    </div>

                    <div className="flex space-x-2">
                      {reservation.status === "pending" && (
                        <>
                          <button onClick={() => updateReservationStatus(reservation.id, "confirmed")} className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
                            Konfirmasi
                          </button>
                          <button onClick={() => updateReservationStatus(reservation.id, "cancelled")} className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700">
                            Batalkan
                          </button>
                        </>
                      )}
                      {reservation.status === "confirmed" && (
                        <button onClick={() => updateReservationStatus(reservation.id, "completed")} className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700">
                          Selesai
                        </button>
                      )}
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

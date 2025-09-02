"use client";

import { useState, useEffect } from "react";

// Data buah dari soal
const fruits = [
  {
    fruitId: 1,
    fruitName: "Apel",
    fruitType: "IMPORT",
    stock: 10,
  },
  { fruitId: 2, 
    fruitName: "Kurma", 
    fruitType: "IMPORT", 
    stock: 20 
  },
  { fruitId: 3, 
    fruitName: "apel", 
    fruitType: "IMPORT", 
    stock: 50 
  },
  { fruitId: 4, 
    fruitName: "Manggis", 
    fruitType: "LOCAL", 
    stock: 100 
  },
  { fruitId: 5, 
    fruitName: "Jeruk Bali", 
    fruitType: "LOCAL", 
    stock: 10 
  },
  { fruitId: 5, 
    fruitName: "KURMA", 
    fruitType: "IMPORT", 
    stock: 20 
  },
  { fruitId: 5, 
    fruitName: "Salak", 
    fruitType: "LOCAL", 
    stock: 150 
  },
];

// Fungsi untuk menyelesaikan soal-soal
function solveFruitProblems() {
  // 1. Buah apa saja yang dimiliki Andi?
  const uniqueFruits = [...new Set(fruits.map((fruit) => fruit.fruitName.toLowerCase()))].map((name) => fruits.find((fruit) => fruit.fruitName.toLowerCase() === name).fruitName);

  // 2. Berapa jumlah wadah yang dibutuhkan dan buah apa saja di masing-masing wadah?
  const fruitsByType = fruits.reduce((acc, fruit) => {
    if (!acc[fruit.fruitType]) {
      acc[fruit.fruitType] = [];
    }
    acc[fruit.fruitType].push(fruit.fruitName);
    return acc;
  }, {});

  const wadahCount = Object.keys(fruitsByType).length;

  // 3. Total stock buah di masing-masing wadah
  const stockByType = fruits.reduce((acc, fruit) => {
    if (!acc[fruit.fruitType]) {
      acc[fruit.fruitType] = 0;
    }
    acc[fruit.fruitType] += fruit.stock;
    return acc;
  }, {});

  // 4. Komentar terkait kasus
  const comments = ["Ada duplikasi fruitId (ID 5 digunakan 3 kali)", "Ada inkonsistensi penulisan nama buah (Apel vs apel, Kurma vs KURMA)", "Perlu normalisasi data untuk menghindari duplikasi dan inkonsistensi"];

  return {
    uniqueFruits,
    wadahCount,
    fruitsByType,
    stockByType,
    comments,
  };
}

const Case1Page = () => {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const solutions = solveFruitProblems();
    setResults(solutions);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12" data-aos="fade-up">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Case 1: Technical Test - Fruits Management</h1>
          <p className="text-xl text-gray-600">Solusi untuk manajemen data buah Andi</p>
        </div>

        <div className="grid gap-8">
          {/* Soal 1 */}
          <div className="bg-white rounded-xl shadow-lg p-8" data-aos="fade-up" data-aos-delay="100">
            <h2 className="text-2xl font-bold text-orange-600 mb-4">1. Buah yang dimiliki Andi</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {results.uniqueFruits?.map((fruit, index) => (
                <div key={index} className="bg-orange-100 rounded-lg p-4 text-center">
                  <span className="text-lg font-semibold text-orange-800">{fruit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Soal 2 */}
          <div className="bg-white rounded-xl shadow-lg p-8" data-aos="fade-up" data-aos-delay="200">
            <h2 className="text-2xl font-bold text-orange-600 mb-4">2. Wadah berdasarkan tipe buah</h2>
            <p className="text-lg mb-4">
              Jumlah wadah yang dibutuhkan: <span className="font-bold text-orange-600">{results.wadahCount}</span>
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(results.fruitsByType || {}).map(([type, fruits]) => (
                <div key={type} className="border-2 border-orange-200 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-orange-700 mb-3">Wadah {type}</h3>
                  <div className="space-y-2">
                    {fruits.map((fruit, index) => (
                      <div key={index} className="bg-orange-50 rounded p-2 text-orange-800">
                        {fruit}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Soal 3 */}
          <div className="bg-white rounded-xl shadow-lg p-8" data-aos="fade-up" data-aos-delay="300">
            <h2 className="text-2xl font-bold text-orange-600 mb-4">3. Total stock per wadah</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(results.stockByType || {}).map(([type, stock]) => (
                <div key={type} className="bg-gradient-to-r from-orange-100 to-red-100 rounded-lg p-6 text-center">
                  <h3 className="text-xl font-bold text-orange-700 mb-2">Wadah {type}</h3>
                  <p className="text-3xl font-bold text-orange-600">{stock}</p>
                  <p className="text-orange-600">Total Stock</p>
                </div>
              ))}
            </div>
          </div>

          {/* Soal 4 */}
          <div className="bg-white rounded-xl shadow-lg p-8" data-aos="fade-up" data-aos-delay="400">
            <h2 className="text-2xl font-bold text-orange-600 mb-4">4. Komentar terkait kasus</h2>
            <div className="space-y-4">
              {results.comments?.map((comment, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">!</span>
                  </div>
                  <p className="text-gray-700">{comment}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Raw Data */}
          <div className="bg-gray-900 rounded-xl shadow-lg p-8" data-aos="fade-up" data-aos-delay="500">
            <h2 className="text-2xl font-bold text-white mb-4">Data Mentah (Raw Data)</h2>
            <pre className="text-green-400 text-sm overflow-x-auto">{JSON.stringify(fruits, null, 2)}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Case1Page;

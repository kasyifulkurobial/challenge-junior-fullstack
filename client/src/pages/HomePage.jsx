import { Link } from "react-router-dom";

const HomePage = () => {
  const cases = [
    {
      id: 1,
      title: "Case 1: Fruits Management",
      description: "Solusi technical test untuk mengelola data buah-buahan dengan berbagai operasi seperti filtering, grouping, dan counting.",
      icon: "🍎",
      path: "/case1",
      color: "from-green-400 to-green-600",
      features: ["Data Processing", "Array Manipulation", "Filtering & Grouping"],
    },
    {
      id: 2,
      title: "Case 2: Comments Counter",
      description: "Implementasi algoritma untuk menghitung total komentar termasuk nested replies dengan pendekatan rekursif.",
      icon: "💬",
      path: "/case2",
      color: "from-blue-400 to-blue-600",
      features: ["Recursive Algorithm", "Tree Traversal", "Data Counting"],
    },
    {
      id: 3,
      title: "Case 3: Rumah Makan Padang",
      description: "Website UMKM rumah makan Padang yang menggugah selera dengan fitur menu, galeri, dan sistem reservasi online.",
      icon: "🍛",
      path: "/restaurant",
      color: "from-orange-400 to-red-600",
      features: ["Full-Stack App", "Online Reservation", "Menu Showcase"],
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Cases Section */}
      <section id="cases" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-4">Pilih Case Study</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Tiga case study yang mendemonstrasikan kemampuan technical dan creative development</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cases.map((caseItem, index) => (
              <div key={caseItem.id} className="card-hover bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100" data-aos="fade-up" data-aos-delay={index * 100}>
                <div className={`h-32 bg-gradient-to-r ${caseItem.color} flex items-center justify-center`}>
                  <span className="text-6xl">{caseItem.icon}</span>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-display font-bold text-gray-800 mb-3">{caseItem.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{caseItem.description}</p>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-2">Key Features:</h4>
                    <ul className="space-y-1">
                      {caseItem.features.map((feature, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-center">
                          <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link to={caseItem.path} className="block w-full text-center bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105">
                    Lihat Detail
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-4">Technology Stack</h2>
            <p className="text-xl text-gray-600">Dibangun dengan teknologi modern dan best practices industri</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: "React.js", icon: "⚛️", desc: "Frontend Library" },
              { name: "Express.js", icon: "🚀", desc: "Backend Framework" },
              { name: "Tailwind CSS", icon: "🎨", desc: "Styling Framework" },
              { name: "SQLite", icon: "🗄️", desc: "Database" },
            ].map((tech, index) => (
              <div key={tech.name} className="text-center p-6 bg-white rounded-xl shadow-md card-hover" data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="text-4xl mb-3">{tech.icon}</div>
                <h3 className="font-bold text-gray-800 mb-1">{tech.name}</h3>
                <p className="text-sm text-gray-600">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

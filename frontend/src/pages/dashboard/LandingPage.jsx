import React, { useState } from 'react';
import { Menu, X, Heart, Users, Zap, Home } from 'lucide-react';

export default function CharityCrowdfunding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const campaigns = [
    {
      id: 1,
      name: "Sekolah untuk Anak Desa",
      category: "Pendidikan",
      image: "bg-gradient-to-br from-blue-400 to-blue-600",
      description: "Membangun sarana pendidikan berkualitas untuk anak-anak di daerah terpencil",
      target: "$5,000",
      raised: "$3,600",
      daysLeft: 12,
      supporters: 156,
      progress: 72
    },
    {
      id: 2,
      name: "Kesehatan Ibu Hamil",
      category: "Kesehatan",
      image: "bg-gradient-to-br from-pink-400 to-red-600",
      description: "Program pemeriksaan kesehatan gratis untuk ibu hamil di daerah pinggiran",
      target: "$3,000",
      raised: "$1,900",
      daysLeft: 8,
      supporters: 89,
      progress: 63
    },
    {
      id: 3,
      name: "Makanan Bergizi Anak",
      category: "Nutrisi",
      image: "bg-gradient-to-br from-green-400 to-lime-500",
      description: "Program pemberian makanan bergizi untuk anak-anak kurang mampu",
      target: "$2,500",
      raised: "$2,300",
      daysLeft: 5,
      supporters: 234,
      progress: 92
    },
    {
      id: 4,
      name: "Bantuan Keluarga Korban Banjir",
      category: "Bencana Alam",
      image: "bg-gradient-to-br from-cyan-400 to-blue-500",
      description: "Penyediaan kebutuhan dasar dan pemulihan rumah untuk korban banjir",
      target: "$8,000",
      raised: "$6,560",
      daysLeft: 15,
      supporters: 178,
      progress: 82
    }
  ];

  const stats = [
    { value: "Rp 2.8M", label: "Total Terkumpul" },
    { value: "12K+", label: "Penyumbang" },
    { value: "45+", label: "Kampanye Selesai" },
    { value: "28+", label: "Kampanye Aktif" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 bg-white border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-red-500">AkuPeduli</div>

          <div className="hidden md:flex gap-8 items-center">
            <a href="#" className="text-gray-700 hover:text-gray-900 transition">Untuk Organisasi</a>
            <a href="#" className="text-gray-700 hover:text-gray-900 transition">Berdonasi</a>
            <a href="#" className="text-gray-700 hover:text-gray-900 transition">Cara Bekerja</a>
          </div>

          <div className="hidden md:flex gap-4">

            <a href='/auth' className="bg-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600 transition">
              Masuk
            </a>
          </div>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 p-4">
            <div className="flex flex-col gap-4">
              <a href="#" className="text-gray-700">Untuk Organisasi</a>
              <a href="#" className="text-gray-700">Berdonasi</a>
              <a href="#" className="text-gray-700">Cara Bekerja</a>
              <a href="/auth"><button className="bg-red-500 text-white px-6 py-2 rounded-lg font-semibold w-full">Masuk</button></a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 bg-linear-to-b from-red-50 to-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Berbagi Kasih, Mengubah Hidup
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              AkuPeduli adalah platform crowdfunding berbasis amal yang menghubungkan orang-orang berhati mulia dengan mereka yang membutuhkan bantuan. Bersama-sama kita bisa membuat perbedaan nyata dalam kehidupan banyak orang.
            </p>
            <div className="flex gap-4 flex-wrap">
              <button className="bg-red-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-600 transition">
                Mulai Berdonasi
              </button>
              <button className="border-2 border-gray-300 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:border-gray-400 transition">
                Pelajari Lebih Lanjut
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="w-full h-80 bg-linear-to-br from-red-300 via-pink-300 to-orange-300 rounded-2xl relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl mb-2">❤️</div>
                  <img src="../../public/donation.jpg" alt="" />
                </div>
              </div>
              <div className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full opacity-30"></div>
              <div className="absolute bottom-8 left-8 w-8 h-8 bg-red-400 rounded-full"></div>
            </div>

          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-linear-to-r from-red-600 to-red-700 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i}>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-red-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Campaigns Section */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Kampanye Terbaru</h2>
              <p className="text-gray-600">Lihat kampanye-kampanye terbaru yang membutuhkan bantuan Anda hari ini.</p>
            </div>
            <button className="border-2 border-gray-300 px-6 py-2 rounded-lg text-gray-900 font-semibold hover:border-gray-400 transition">
              Lihat Semua
            </button>
          </div>

          {/* Campaigns Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {campaigns.map((campaign) => (
              <div key={campaign.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition cursor-pointer">
                <div className={`${campaign.image} h-48 relative group`}>
                  <button className="absolute top-3 right-3 bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition">
                    <Heart size={20} className="text-red-500" fill="currentColor" />
                  </button>
                </div>

                <div className="p-4">
                  <div className="flex gap-2 mb-3">
                    <span className="text-xs font-semibold text-red-600 bg-red-100 px-2 py-1 rounded">
                      {campaign.category}
                    </span>
                  </div>

                  <h3 className="font-bold text-lg text-gray-900 mb-2">{campaign.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{campaign.description}</p>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm font-semibold mb-2">
                      <span className="text-gray-900">{campaign.raised}</span>
                      <span className="text-gray-600">Target {campaign.target}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-red-500 h-2 rounded-full transition-all"
                        style={{ width: `${campaign.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Meta Info */}
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <div className="font-bold text-gray-900">{campaign.daysLeft}</div>
                      <div className="text-gray-600">Hari lagi</div>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{campaign.supporters}</div>
                      <div className="text-gray-600">Penyumbang</div>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{campaign.progress}%</div>
                      <div className="text-gray-600">Terkumpul</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Mengapa Memilih AkuPeduli?</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Heart className="text-red-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Dampak Nyata</h3>
              <p className="text-gray-600">
                Setiap donasi Anda langsung membantu mereka yang membutuhkan. Kami memastikan transparansi penuh dalam setiap kampanye.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="text-red-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Komunitas Berbagi</h3>
              <p className="text-gray-600">
                Bergabunglah dengan ribuan orang berhati mulia yang peduli dan siap membantu sesama mereka.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="text-red-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Mudah & Aman</h3>
              <p className="text-gray-600">
                Proses donasi yang simpel dan sistem keamanan terjamin untuk melindungi data pribadi Anda.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stories Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Kisah Dampak</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-red-50 p-8 rounded-xl">
              <div className="text-4xl font-bold text-red-500 mb-4">500+</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Anak Mendapat Akses Pendidikan</h3>
              <p className="text-gray-600">
                Berkat kampanye pendidikan, ratusan anak dari keluarga kurang mampu kini bisa sekolah dengan baik.
              </p>
            </div>

            <div className="bg-red-50 p-8 rounded-xl">
              <div className="text-4xl font-bold text-red-500 mb-4">1,200+</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Ibu Hamil Terpantau Kesehatan</h3>
              <p className="text-gray-600">
                Program kesehatan kami telah membantu memastikan keselamatan ibu dan bayi mereka.
              </p>
            </div>

            <div className="bg-red-50 p-8 rounded-xl">
              <div className="text-4xl font-bold text-red-500 mb-4">3,500+</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Keluarga Terbantu</h3>
              <p className="text-gray-600">
                Ribuan keluarga telah merasakan manfaat langsung dari kampanye amal kami selama ini.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-linear-to-r from-red-500 to-red-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Setiap Langkah Mulia Dimulai dari Hati</h2>
          <p className="text-lg text-red-100 mb-8">
            Bergabunglah dengan jutaan orang yang telah membuat perbedaan. Donasi Anda, apapun nominalnya, sangat berarti bagi mereka yang membutuhkan.
          </p>
          <button className="bg-white text-red-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-red-50 transition">
            Mulai Donasi Sekarang
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-white font-bold text-xl mb-4">AkuPeduli</div>
              <p className="text-sm">Platform crowdfunding amal untuk membantu sesama dan membuat perbedaan nyata.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Produk</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Untuk Donatur</a></li>
                <li><a href="#" className="hover:text-white transition">Untuk Organisasi</a></li>
                <li><a href="#" className="hover:text-white transition">Lihat Kampanye</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Perusahaan</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Tentang Kami</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Hubungi Kami</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Privasi</a></li>
                <li><a href="#" className="hover:text-white transition">Syarat & Ketentuan</a></li>
                <li><a href="#" className="hover:text-white transition">Kebijakan</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2025 AkuPeduli. Dipersembahkan dengan sepenuh hati untuk sesama.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
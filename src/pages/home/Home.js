import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import FlightCard from "../../components/flightCard/FlightCard";
import PanoramicSection from "../../components/section";
import axios from "axios";
import API_BASE_URL from "../../config/api";
import { Phone } from "lucide-react";

export default function HomePage() {
  const { t } = useTranslation();
    const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomepageFlights = async () => {
      try {
        // Backend exposes GET /api/flights for the public flight list.
        // Use that here instead of a non-existent /homepage endpoint.
        const response = await axios.get(`${API_BASE_URL}/api/flights`);
        setFlights(response.data);
      } catch (error) {
        console.error("Error fetching homepage flights:", error);
        // Fallback to empty array if API fails
        setFlights([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHomepageFlights();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-cover bg-center bg-fixed" >
        <div className="flex items-center justify-center h-screen">
          <div className="text-white text-xl">{t("home.loadingFlights")}</div>
        </div>
      </div>
    );
  }
  return (
          <div className="min-h-screen bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('/images/skyvid.mp4')" }}>
            {/* Hero Section */}
          
            <main className="relative flex items-center justify-center h-[calc(100vh-72px)] w-full overflow-hidden">
  {/* Background video */}
  <video
    className="absolute inset-0 w-full h-full object-cover"
    autoPlay
    loop
    muted
    playsInline
  >
    <source src="/images/skyvid.mp4" type="video/mp4" />
  </video>

  {/* Optional dark overlay for readability */}
  <div className="absolute inset-0 bg-black/40"></div>

  {/* Content */}
  <div className="relative z-10 flex flex-col justify-between items-center w-full h-full text-center py-12">
    
    {/* Heading in center */}
    <div className="flex-1 flex items-center justify-center">
      <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-xl">
        {t("home.heroTitle")}
      </h1>
    </div>

    {/* Button at bottom */}
    <Link
      to="/booking"
      className="bg-[#a43518] hover:bg-orange-600 hover:scale-110 transition-all duration-300 text-white px-8 py-4 rounded-md font-bold text-lg uppercase tracking-wider shadow-lg"
    >
      {t("home.bookFlight")}
    </Link>
  </div>
</main>



                  {/* Our Flights Section - Dynamic */}
      <section id="flight" className="w-full bg-[#ded1c7] py-12">
        <div className="max-w-5xl mx-auto rounded-2xl p-8 md:p-12 flex flex-col gap-12">
          <h2 className="text-6xl font-extrabold text-center mb-6 text-[#2c2c2c]">{t("home.ourFlights")}</h2>
          
          {/* Navigation buttons - dynamically generated from available flights */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {flights.map((flight) => (
              <a 
                key={flight._id}
                href={`#${flight.title.toLowerCase().replace(/\s+/g, '-')}`}
                className="bg-white rounded-full px-6 py-2 font-bold text-[#a43518] shadow hover:bg-orange-50 transition"
              >
                {flight.title}
              </a>
            ))}
          </div>

          {/* Flight cards */}
          {flights.map((flight) => {
            // Generate anchor ID from title
            const anchorId = flight.title.toLowerCase().replace(/\s+/g, '-');
            // Generate route from title
            const route = `/flights/${flight._id}`;
            
            return (
              <div id={anchorId} key={flight._id}>
                <FlightCard 
                  title={flight.title}
                  overview={flight.overview}
                  mainImage={flight.mainImage}
                  price={flight.price}
                  rating={flight.rating}
                  category={flight.category}
                  program={flight.program}
                  imageLink={route}
                />
              </div>
            );
          })}
        </div>
      </section>

            {/* Section Trusted by */}
            <section className="w-full bg-[#faf9e6] py-12">
              <div className="max-w-4xl mx-auto flex flex-col items-center">
                <h2 className="text-4xl font-serif font-semibold text-center mb-4">{t("home.trustedBy")}</h2>
                <p className="text-lg text-center mb-8 font-serif">{t("home.trustedBySubtitle")}</p>
                <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
                  <img src="/images/airbnb.png" alt="airbnb" className="h-12 object-contain" style={{minWidth:'80px'}} />
                  <img src="/images/Booking.png" alt="Booking.com" className="h-10 object-contain" style={{minWidth:'120px'}} />
                  <img src="/images/Tripadvisor.png" alt="Tripadvisor" className="h-10 object-contain" style={{minWidth:'120px'}} />
                  <img src="/images/getyourguide.png" alt="GetYourGuide" className="h-10 object-contain" style={{minWidth:'120px'}} />
                </div>
              </div>
            </section>

            {/* Section Panoramic Views sans effet plein écran */}
            <PanoramicSection /> 

{/* Section Client's Testimonials */}
<section className="w-full bg-[#e8ded6] py-16">
  <div className="max-w-6xl mx-auto px-4">
    <h2 className="text-5xl font-extrabold text-[#310000] text-center mb-2">{t("home.testimonials")}</h2>
    <p className="text-2xl text-[#6d5d51] text-center mb-12">{t("home.testimonialsSubtitle")}</p>
    
    <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch">
      
      {/* Card 1 */}
      <div 
        className="bg-white p-7 flex-1 max-w-sm mx-auto flex flex-col gap-2 transform -rotate-2 transition-all duration-500 hover:scale-110 hover:-translate-y-2 shadow-lg hover:shadow-2xl cursor-pointer"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 85%, 0 100%)" }}
      >
        <div className="flex items-start gap-3 mb-1">
          <div className="w-14 h-14 rounded-2xl bg-[#310000] flex items-center justify-center text-white text-3xl font-bold shrink-0">L</div>
          <div className="flex-1">
            <div className="font-bold text-gray-900 leading-tight">Lizzie Mack9</div>
            <div className="text-[11px] text-gray-500 font-medium">Il ya 2 mois</div>
          </div>
          <div className="flex items-center gap-0.5 mt-1">
            {Array(5).fill(0).map((_, i) => <span key={i} className="text-yellow-400 text-sm">★</span>)}
          </div>
        </div>
        <div className="text-sm text-gray-700 leading-relaxed pb-12">
          Definitely a bucket list experience. Everything went smoothly on the day. Jamal and the team were great, really friendly and checked In with us throughout the morning to check we were enjoying the experience.
        </div>
      </div>

      {/* Card 2 */}
      <div 
        className="bg-white p-7 flex-1 max-w-sm mx-auto flex flex-col gap-2 transform rotate-1 transition-all duration-500 hover:scale-110 hover:-translate-y-2 shadow-lg hover:shadow-2xl cursor-pointer"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 85%, 0 100%)" }}
      >
        <div className="flex items-start gap-3 mb-1">
          <img src="/images/avatar1.png" alt="Cecile F" className="w-14 h-14 rounded-2xl object-cover shrink-0" />
          <div className="flex-1">
            <div className="font-bold text-gray-900">Cecile F</div>
            <div className="text-[11px] text-gray-500 font-medium">févr. 2025 • En famille</div>
          </div>
        </div>
        <div className="flex items-center gap-0.5 mb-1">
          {Array(5).fill(0).map((_, i) => <span key={i} className="text-yellow-400 text-sm">★</span>)}
        </div>
        <div className="text-sm text-gray-700 leading-relaxed pb-12">
          Expérience incroyable et très bien organisée par la compagnie. Si bien que cela mérite un avis positif laissé ici afin que d'autres personnes puissent vivre la même chose en toute confiance ! Notre "pilote" était français.
        </div>
      </div>

      {/* Card 3 */}
      <div 
        className="bg-white p-7 flex-1 max-w-sm mx-auto flex flex-col gap-2 transform -rotate-1 transition-all duration-500 hover:scale-110 hover:-translate-y-2 shadow-lg hover:shadow-2xl cursor-pointer"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 85%, 0 100%)" }}
      >
        <div className="flex items-start gap-3 mb-1">
          <img src="/images/avatar2.png" alt="Yassine AIT BELLA" className="w-14 h-14 rounded-2xl object-cover shrink-0" />
          <div className="flex-1">
            <div className="font-bold text-gray-900 text-sm uppercase">Yassine AIT BELLA</div>
            <div className="text-[11px] text-gray-500 font-medium">décembre 2024</div>
          </div>
          <div className="flex items-center gap-0.5 mt-1">
            {Array(5).fill(0).map((_, i) => <span key={i} className="text-yellow-400 text-sm">★</span>)}
          </div>
        </div>
        <div className="text-sm text-gray-700 leading-relaxed pb-4">
          J'ai vécu une expérience inoubliable en montgolfière pour admirer le lever de soleil, et c'était tout simplement magique ! Voler au-dessus des paysages à couper le souffle...
        </div>
        <button className="text-[#3b4a8b] font-bold self-start text-sm flex items-center gap-1 mt-auto pb-8">
          View more <span className="text-[10px]">▼</span>
        </button>
      </div>

    </div>
  </div>
</section>
            {/* Section ABOUT US */}
            <section id="contact" className="w-full bg-[#f5ede6] py-16">
              <div className="max-w-5xl mx-auto flex flex-col md:flex-row overflow-hidden items-center gap-8 px-4">
                {/* Image à gauche */}
                <div className="w-full md:w-1/2 flex justify-center">
                  <img src="/images/about.png" alt="About Sky Experience" className="rounded-lg object-cover hover:scale-110 transition-all duration-300 w-full max-w-sm h-64" />
                </div>
                {/* Contenu à droite */}
                <div className="w-full md:w-1/2 flex flex-col justify-center items-start gap-6">
                  <h2 className="text-3xl md:text-4xl font-extrabold text-[#f97316] mb-2">{t("home.aboutUs")}</h2>
                  <div className="text-gray-800 text-base md:text-lg leading-relaxed">
                    <strong>{t("home.aboutUsTitle")}</strong><br/>
                    {t("home.aboutUsDescription")}
                  </div>
                  <div className="flex items-center gap-4 mt-2">
                    <a href="/about" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md font-bold transition-colors">{t("home.checkDetails")}</a>
                    {/* Icône téléphone SVG */}
                    <div className="flex items-center gap-3">
                      <a href="tel:+212661445327" className="text-gray-800 font-medium hover:text-orange-500 transition">
                      <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-orange-100">
                        <Phone className="w-7 h-7 text-orange-500" />
                      </span>
                      </a>
                    </div>
            </div>
          </div>
        </div>
      </section>     
    </div>
    
  )

}
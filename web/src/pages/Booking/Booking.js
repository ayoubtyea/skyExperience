import React, { useRef, useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import API_BASE_URL from '../../config/api';

export default function BookingPage() {
  const { t } = useTranslation();
  const scrollRef = useRef(null);
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [openCard, setOpenCard] = useState(null);


  const fetchFlights = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/flights`);
      setFlights(response.data);
      setError(null);
    } catch (err) {
      setError(t("booking.errorLoading"));
      console.error('Error fetching flights:', err);
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    fetchFlights();
  }, [fetchFlights]);

  useEffect(() => {
    const checkScroll = () => {
      if (scrollRef.current) {
        const { scrollWidth, clientWidth, scrollLeft } = scrollRef.current;
        setShowLeftArrow(scrollLeft > 0);
        setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
      }
    };

    checkScroll();
    window.addEventListener('resize', checkScroll);

    return () => {
      window.removeEventListener('resize', checkScroll);
    };
  }, [flights]);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const cardWidth = 350;
      if (direction === "left") {
        current.scrollBy({ left: -cardWidth, behavior: "smooth" });
      } else {
        current.scrollBy({ left: cardWidth, behavior: "smooth" });
      }

      setTimeout(() => {
        const { scrollWidth, clientWidth, scrollLeft } = current;
        setShowLeftArrow(scrollLeft > 0);
        setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
      }, 300);
    }
  };

  const getBadgeStyle = (category) => {
    switch (category?.toLowerCase()) {
      case 'vip':
        return { bg: '#ff5e5e', text: t("booking.vip") };
      case 'romantic offer':
        return { bg: '#e17055', text: t("booking.romanticOffer") };
      case 'most reserved':
        return { bg: '#f39c12', text: t("booking.mostReserved") };
      default:
        return { bg: '#d35400', text: t("booking.special") };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#f9f8f6] to-[#e8e7e5] flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#d35400] mb-4"></div>
          <div className="text-2xl text-[#3d2c1e]">{t("booking.loadingFlights")}</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#f9f8f6] to-[#e8e7e5] flex items-center justify-center py-12">
        <div className="text-center max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
          <div className="text-red-500 text-xl mb-4">{error}</div>
          <button
            onClick={fetchFlights}
            className="bg-[#d35400] text-white px-6 py-2 rounded-full font-bold hover:bg-[#e67e22] transition-colors"
          >
            {t("booking.tryAgain")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f9f8f6] to-[#e8e7e5] flex flex-col items-center py-8">
      <style>{`
        /* ---------- BADGES ---------- */
        @keyframes breathe {
          0% { transform: scale(1); }
          50% { transform: scale(0.94); }
          100% { transform: scale(1); }
        }

        .badge-breathe {
          animation: breathe 2.6s ease-in-out infinite;
        }

        .badge-vip {
          background: #ff5e5e;
          font-size: 26px;
          font-weight: 900;
          padding: 16px 28px;
          border-radius: 999px;
          color: white;
        }

        .badge-reserved {
          background: #f39c12;
          font-size: 18px;
          padding: 12px 20px;
          color: white;
          border-radius: 10px;
        }

        .heart-badge {
          background: #e85b5b;
          color: white;
          width: 120px;
          height: 120px;
          font-weight: 700;
          text-align: center;
          padding-top: 32px;
          clip-path: path(
            "M60 110 C10 75, 0 45, 30 30
             C50 20, 60 35, 60 35
             C60 35, 70 20, 90 30
             C120 45, 110 75, 60 110"
          );
        }

        /* ---------- VIP BUTTON ---------- */
        .vip-animated-btn {
          background: linear-gradient(135deg, #ff2d2d, #ff6a6a);
          animation: vipPulse 2s infinite;
        }

        @keyframes vipPulse {
          0% { box-shadow: 0 0 0 rgba(255,90,90,0.5); }
          50% { box-shadow: 0 0 14px rgba(255,90,90,0.6); }
          100% { box-shadow: 0 0 0 rgba(255,90,90,0.5); }
        }

        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { scrollbar-width: none; }
      `}</style>

      {/* Header Section */}
      <div className="w-full pb-8 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#3d2c1e] text-center pt-4 mb-8">
          {t("booking.title")}
        </h1>
        <div className="mx-auto w-full max-w-6xl rounded-2xl overflow-hidden shadow-lg">
          <img
            src="/images/ourflight.png"
            alt="Our Flights"
            className="w-full h-[300px] md:h-[400px] object-cover"
          />
        </div>
      </div>

      {/* Description Section */}
      <div className="w-full max-w-4xl text-center mb-12 px-4">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#d35400] mb-4">
          {t("booking.adventureTitle")}
        </h2>
        <p className="text-gray-700 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
          {t("booking.adventureDescription")}
        </p>
      </div>

      {/* Flights Section */}
<div className="w-full max-w-7xl mx-auto px-4 relative">
  {/* ARROWS - Hidden on mobile, shown on md screens up */}
  {showLeftArrow && (
    <button
      onClick={() => scroll("left")}
      className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-40 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all"
    >
      ‹
    </button>
  )}

  {showRightArrow && (
    <button
      onClick={() => scroll("right")}
      className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-40 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all"
    >
      ›
    </button>
  )}

  {/* CARDS CONTAINER */}
  <div
    ref={scrollRef}
    className="flex gap-4 md:gap-8 overflow-x-auto scrollbar-hide px-2 md:px-10 py-6 snap-x snap-mandatory"
  >
    {flights.map((flight) => {
      const isOpen = openCard === flight._id;
      const category = flight.category?.toLowerCase();

      return (
        <div
          key={flight._id}
          onClick={() => setOpenCard(isOpen ? null : flight._id)}
          /* RESPONSIVE WIDTH: 
             w-[85vw] -> mobile (shows a peek of the next card)
             md:w-[350px] -> desktop fixed size 
          */
          className="flex-none w-[85vw] sm:w-[300px] md:w-[360px] h-[480px] md:h-[520px] rounded-[30px] overflow-hidden shadow-xl bg-white relative cursor-pointer snap-center"
        >
          {/* IMAGE */}
          <img
            src={flight.mainImage}
            alt={flight.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />

          {/* GRADIENT OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* RESPONSIVE FLIP BADGE */}
          {category && (
            <div className="absolute top-3 right-3 md:top-4 md:right-4 breathe-animation">
              <div className={`flip-card ${category === 'vip' ? 'style-vip' : category === 'romantic offer' ? 'style-romantic' : 'style-reserved'}`}>
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    {category === 'vip' ? 'VIP' : category === 'romantic offer' ? 'Romantic Offer' : 'Most Reserved'}
                  </div>
                  <div className="flip-card-back">${flight.price}</div>
                </div>
              </div>
            </div>
          )}

          {/* BOTTOM CONTENT */}
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white z-10">
            <h3 className="text-xl md:text-2xl font-extrabold truncate">
              {flight.title}
            </h3>
            <p className="text-xs md:text-sm opacity-90 mt-1">
              Hot-Air Balloon Flight
            </p>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-1 md:gap-2 text-base md:text-lg font-bold">
                <span className="text-yellow-400 text-lg md:text-xl">★</span>
                {flight.rating || "4.9"}
              </div>

              <button className="px-4 md:px-6 py-1.5 md:py-2 rounded-full font-bold text-sm md:text-base bg-red-600 hover:bg-red-700 transition-colors">
                {t("booking.details")}
              </button>
            </div>
          </div>

          {/* WHITE INFO PANEL (Mobile Friendly) */}
          <div
            className={`absolute bottom-0 left-0 right-0 bg-white text-black transition-all duration-500 z-20 shadow-[0_-5px_15px_rgba(0,0,0,0.1)]
              ${isOpen ? "h-[50%] p-5 md:p-6" : "h-0 p-0 overflow-hidden"}
            `}
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-lg md:text-xl font-extrabold leading-tight">
                {flight.title}
              </h4>
              <div className="text-lg font-bold text-[#d35400]">
                ${flight.price}
              </div>
            </div>
            <p className="text-xs md:text-sm text-gray-600 leading-relaxed line-clamp-4">
              {flight.overview}
            </p>
          </div>
        </div>
      );
    })}
  </div>
</div>
    </div>
  );
}
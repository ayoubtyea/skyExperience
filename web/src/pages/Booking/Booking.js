import React, { useRef, useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import API_BASE_URL from '../../config/api';
import { Link } from "react-router-dom"; // Ensure react-router-dom is installeds

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
  className="tour-card flex-none w-[85vw] sm:w-[300px] md:w-[360px] snap-center cursor-pointer"
>
  <div className="card-inner">
    <div className="image-box">
      <img
        src={flight.mainImage}
        alt={flight.title}
      />

      {/* BADGE */}
      <div className="badge-flip-wrapper">
        <div className="badge-flip-inner">
          <div className="badge-front">
            {flight.category?.toUpperCase() || "VIP"}
          </div>
          <div className="badge-back">
            <div className="price-val">${flight.price}</div>
            <div className="price-sub">/Adult</div>
          </div>
        </div>
      </div>

      {/* WHITE SLIDE */}
      <div className="white-slide-up" />
    </div>

    {/* INFO */}
    <div className="info-area">
      <div className="text-block">
        <h3>
          <strong>{flight.title.split(" ")[0]}</strong>{" "}
          {flight.title.replace(flight.title.split(" ")[0], "")}
        </h3>
      </div>

      <div className="footer-block">
        <span className="rating">★ {flight.rating || "4.9"}/5</span>

        <Link
          to={`/flights/${flight._id}`}
          className="btn-details"
        >
          Check Details
        </Link>
      </div>
    </div>
  </div>
</div>

      );
    })}
  </div>
</div>
    </div>
  );
}
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import axios from "axios";
import "../../App.css";
import API_BASE_URL from '../../config/api';

const Contact = () => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState({ success: false, message: "" });

  const contactSchema = z.object({
    details: z.string().min(10, { message: "Message must be at least 10 characters" }),
    firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
    lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
    phone: z.string().min(10, { message: "Please enter a valid phone number" }),
    email: z.string().email({ message: "Please enter a valid email address" })
  });

  const handleContactClick = () => {
    window.location.href = "/contact";
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      details: "",
      firstName: "",
      lastName: "",
      phone: "",
      email: ""
    }
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus({ success: false, message: "" });
    
    try {
      await axios.post(`${API_BASE_URL}/api/contact`, {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        message: data.details
      });
      
      setSubmitStatus({ success: true, message: t("contact.messageSuccess") });
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus({ 
        success: false, 
        message: error.response?.data?.message || t("contact.messageError") 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#f0e7e0] to-[#ffe6d6] flex flex-col items-center py-8 px-4">
      <div className="w-full max-w-3xl bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl p-6 md:p-10 mx-auto border border-[#f3e2d2]">
        <h1
          className="text-4xl md:text-5xl font-extrabold text-center mb-2 cursor-pointer text-[#a43518] drop-shadow-lg tracking-tight"
          onClick={handleContactClick}
        >
          {t("contact.title")}
        </h1>
        <h2
          className="text-2xl font-semibold mb-6 cursor-pointer text-center text-[#ff7e47]"
          onClick={handleContactClick}
        >
          {t("contact.subtitle")}
        </h2>
        <p className="mb-8 text-gray-700 text-lg text-center">
          {t("contact.description")}<br />
          <span className="text-[#a43518] font-semibold">{t("contact.descriptionHighlight")}</span>
        </p>
        
        {/* Status Message */}
        {submitStatus.message && (
          <div className={`mb-6 p-4 rounded-2xl text-center ${submitStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {submitStatus.message}
          </div>
        )}
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3 className="font-bold mb-3 text-xl text-center text-[#a43518]">{t("contact.sendMessage")}</h3>
          
          <div className="mb-6">
            <label className="block mb-2 font-semibold text-[#a43518]">{t("contact.detailsLabel")}</label>
            <textarea
              {...register("details")}
              placeholder={t("contact.detailsPlaceholder")}
              className="w-full rounded-2xl border border-[#ffd6b3] p-3 bg-white/60 focus:outline-[#ff7e47] focus:ring-2 text-gray-800 shadow-sm"
              rows={4}
            />
            {errors.details && <p className="mt-1 text-red-600 text-sm">{errors.details.message}</p>}
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <label className="block mb-1 font-semibold text-[#a43518]">{t("contact.firstName")}</label>
              <input
                {...register("firstName")}
                placeholder={t("contact.firstNamePlaceholder")}
                className="w-full rounded-2xl border border-[#ffd6b3] p-2 bg-white/60 focus:outline-[#ff7e47] focus:ring-2 text-gray-800 shadow-sm"
              />
              {errors.firstName && <p className="mt-1 text-red-600 text-sm">{errors.firstName.message}</p>}
            </div>
            <div className="flex-1">
              <label className="block mb-1 font-semibold text-[#a43518]">{t("contact.lastName")}</label>
              <input
                {...register("lastName")}
                placeholder={t("contact.lastNamePlaceholder")}
                className="w-full rounded-2xl border border-[#ffd6b3] p-2 bg-white/60 focus:outline-[#ff7e47] focus:ring-2 text-gray-800 shadow-sm"
              />
              {errors.lastName && <p className="mt-1 text-red-600 text-sm">{errors.lastName.message}</p>}
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <label className="block mb-1 font-semibold text-[#a43518]">{t("contact.phone")}</label>
              <div className="flex items-center">
                <span className="inline-block mr-2">
                  🇲🇦                
                </span>
                <input
                  {...register("phone")}
                  placeholder="+212"
                  className="w-full rounded-2xl border border-[#ffd6b3] p-2 bg-white/60 focus:outline-[#ff7e47] focus:ring-2 text-gray-800 shadow-sm"
                />
              </div>
              {errors.phone && <p className="mt-1 text-red-600 text-sm">{errors.phone.message}</p>}
            </div>
            <div className="flex-1">
              <label className="block mb-1 font-semibold text-[#a43518]">{t("contact.email")}</label>
              <input
                {...register("email")}
                placeholder={t("contact.emailPlaceholder")}
                className="w-full rounded-2xl border border-[#ffd6b3] p-2 bg-white/60 focus:outline-[#ff7e47] focus:ring-2 text-gray-800 shadow-sm"
                type="email"
              />
              {errors.email && <p className="mt-1 text-red-600 text-sm">{errors.email.message}</p>}
            </div>
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-[#ff7e47] to-[#a43518] text-white font-bold py-3 rounded-2xl text-lg mt-2 shadow-lg hover:from-[#a43518] hover:to-[#ff7e47] transition disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? t("contact.sending") : t("contact.send")}
          </button>
        </form>
        
        {/* Info Cards Section */}
        <div className="flex flex-col md:flex-row gap-6 justify-center mt-12 mb-8">
          {/* Address Card */}
          <div className="flex-1 bg-white/80 backdrop-blur-lg border-2 border-[#ff7e47] rounded-3xl p-5 md:p-7 flex flex-col items-center min-w-[220px] max-w-xs mx-auto shadow-lg hover:scale-105 transition-transform">
            <div className="mb-2 text-4xl">📍</div>
            <div className="font-bold mb-1 text-[#a43518]">{t("contact.address")}</div>
            <div className="text-center text-gray-700 text-sm md:text-base" dangerouslySetInnerHTML={{ __html: t("contact.addressValue") }} />
          </div>
          
          {/* Contact Card */}
          <div className="flex-1 bg-white/80 backdrop-blur-lg border-2 border-[#ff7e47] rounded-3xl p-5 md:p-7 flex flex-col items-center min-w-[220px] max-w-xs mx-auto shadow-lg hover:scale-105 transition-transform">
            <div className="mb-2 text-4xl">📞</div>
            <div className="font-bold mb-1 text-[#a43518]">{t("contact.contactLabel")}</div>
            <div className="text-center text-gray-700 text-sm md:text-base">
              +212 6 12 88 11 44<br />
              <span className="text-xs">contact@skyexperience-marrakech.com</span>
            </div>
          </div>
          
          {/* Office Hour Card */}
          <div className="flex-1 bg-white/80 backdrop-blur-lg border-2 border-[#ff7e47] rounded-3xl p-5 md:p-7 flex flex-col items-center min-w-[220px] max-w-xs mx-auto shadow-lg hover:scale-105 transition-transform">
            <div className="mb-2 text-4xl">⏰</div>
            <div className="font-bold mb-1 text-[#a43518]">{t("contact.officeHour")}</div>
            <div className="text-center text-gray-700 text-sm md:text-base" dangerouslySetInnerHTML={{ __html: t("contact.officeHourValue") }} />
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="mt-8">
          <h3 className="font-bold text-2xl mb-4 text-[#a43518] text-center">{t("contact.faq")}</h3>
          <ul className="list-disc pl-6 text-gray-800 text-base space-y-2">
            <li>{t("contact.faq1")}</li>
            <li>{t("contact.faq2")}</li>
            <li>{t("contact.faq3")}</li>
            <li>{t("contact.faq4")}</li>
            <li>{t("contact.faq5")}</li>
            <li>{t("contact.faq6")}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Contact;
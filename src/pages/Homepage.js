import React, { useState, useEffect } from "react";
import "../styles/HomePage.css";

const heroImages = [
  "/images/hero1.jpg",
  "/images/hero2.jpg",
  "/images/hero3.jpg"
];

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="homepage-container">
      {/* Hero Section */}
      <section
        className="hero-section"
        style={{ backgroundImage: `url(${heroImages[currentSlide]})` }}
      >
        <div className="hero-overlay">
          <h1 className="hero-title">Welcome to CashDekho</h1>
          <p className="hero-subtitle">CashDekho offers trusted financial advice and personalized guidance to help you make smarter money decisions. From savings to investments, we simplify finance for everyone.</p>
          {/* <p className="hero-text">
            Your trusted partner for expert <span className="highlight">financial advice</span> and
            <span className="highlight"> personalized guidance</span>. Make smarter decisions about your money, savings, and investments — effortlessly.
          </p> */}
          <button className="get-started-btn">Get Started</button>
        </div>

        {/* Slider Indicators */}
        <div className="hero-indicators">
          {heroImages.map((_, index) => (
            <span
              key={index}
              className={index === currentSlide ? "active" : ""}
              onClick={() => setCurrentSlide(index)}
            ></span>
          ))}
        </div>
      </section>

      

      {/* Terms and Conditions */}
      <section id="terms" className="section terms-section">
        <h2 className="section-title">Terms and Conditions</h2>
        <p className="section-text">
          By using CashDekho, you agree to our terms and conditions. Our services are meant to
          provide financial advice and guidance based on available data and best practices.
          CashDekho shall not be held responsible for any financial losses incurred based on
          suggestions or insights provided. Please ensure all financial decisions are made after
          personal discretion and professional consultation.
        </p>
      </section>

      {/* Refund Policy */}
      <section id="refund" className="section refund-section">
        <div className="section-container">
          <h2 className="section-title">Refund Policy</h2>
          <p className="section-text">
            Refunds are applicable only for eligible services as stated during purchase.
            Requests for refunds must be raised within 7 working days of payment.
            Upon verification, approved refunds will be processed to the original payment method within 10–15 working days.
          </p>
        </div>
      </section>

      {/* Privacy Policy */}
      <section id="privacy" className="section privacy-section">
        <h2 className="section-title">Privacy Policy</h2>
        <p className="section-text">
          We value your privacy and ensure that your personal and financial data remains confidential.
          CashDekho does not share user data with third parties without consent.
          All sensitive information is encrypted and securely stored.
          For any privacy-related queries, you may contact our support team.
        </p>
      </section>
    </div>
  );
};

export default HomePage;
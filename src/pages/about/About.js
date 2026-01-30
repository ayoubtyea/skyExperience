import React from "react";
import { useTranslation } from "react-i18next";
import "../../App.css";

const About = () => {
  const { t } = useTranslation();
  return (
    <div  className="overflow-hidden" style={{ background: "#EAD8C0", minHeight: "100vh", width: '100%' }}>
      <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto", padding: "48px 20px 0 20px" }}>
        {/* Carrés décoratifs */}
        <div style={{
          position: "absolute",
          top: 180,
          left: -80,
          width: 180,
          height: 180,
          border: "6px solid #C7B299",
          borderRadius: 24,
          zIndex: 0,
          opacity: 0.5
        }} />
        <div style={{
          position: "absolute",
          top: 500,
          right: -100,
          width: 220,
          height: 220,
          border: "8px solid #C7B299",
          borderRadius: 32,
          zIndex: 0,
          opacity: 0.5
        }} />

        <h1 style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "2.5rem",
          marginBottom: "30px",
          color: "#222",
          position: "relative",
          zIndex: 1
        }}>
          {t("about.title")}
        </h1>
        <img
          src="/images/aboutus.png"
          alt="Hot air balloons"
          style={{
            display: "block",
            margin: "0 auto",
            width: "100%",
            maxHeight: 400,
            objectFit: "cover",
            borderRadius: "20px",
            position: "relative",
            zIndex: 1
          }}
        />

        {/* Section responsive */}
        <div className="about-section" style={{ display: 'flex', flexWrap: 'wrap', gap: 40, alignItems: 'center', marginTop: 48, marginBottom: 48 }}>
          {/* Texte gauche */}
          <div className="about-text">
            <h2 style={{ fontWeight: "bold", fontSize: "2.0rem" }}>
              {t("about.adventureTitle")}
            </h2>
            <h3 style={{ marginTop: 16, fontWeight: "bold", fontSize: "1.1rem" }}>
              {t("about.adventureSubtitle")}
            </h3>
            <ul style={{ marginTop: 10, marginBottom: 30, paddingLeft: 20 }}>
              <li>{t("about.adventurePoint1")}</li>
              <li>{t("about.adventurePoint2")}</li>
              <li>{t("about.adventurePoint3")}</li>
            </ul>
          </div>

          {/* Images droite sous forme de grille */}
          <div className="about-images-grid">
            <img src="/images/about.png" alt="about" className="about-img-large" />
            <img src="/images/smiling-woman.png" alt="Smiling woman" className="about-img-small" />
            <img src="/images/balloon-landscape.png" alt="Balloon landscape" className="about-img-small" />
          </div>
        </div>

        {/* Deuxième section avec images à droite */}
        <div className="about-section" style={{ display: 'flex', flexWrap: 'wrap', gap: 40, alignItems: 'center', marginTop: 48, marginBottom: 48 }}>
          {/* Texte gauche */}
          <div className="about-text">
            <h2 style={{ fontWeight: "bold", fontSize: "2.4rem", marginBottom: 0 }}>
              {t("about.safetyTitle")}
            </h2>
            <h3 style={{ fontWeight: "bold", fontSize: "1.3rem", margin: "18px 0 10px 0" }}>
              {t("about.safetySubtitle")}
            </h3>
            <ul style={{ marginTop: 10, paddingLeft: 20 }}>
              <li>{t("about.safetyPoint1")}</li>
              <li>{t("about.safetyPoint2")}</li>
              <li>{t("about.safetyPoint3")}</li>
            </ul>
          </div>
          {/* Images droite sous forme de bloc vertical */}
          <div className="about-images-grid-2">
            <img src="/images/group-basket.png" alt="Group in basket" className="about-img-large-2" />
            <img src="/images/happy-group.png" alt="Happy group" className="about-img-small-2" />
          </div>
        </div>
        {/* Troisième section avec bloc d'images à gauche et texte à droite */}
        <div className="about-section" style={{ display: 'flex', flexWrap: 'wrap', gap: 40, alignItems: 'center', marginTop: 48, marginBottom: 48 }}>
          {/* Bloc images à gauche */}
          <div>
            <div className="about-images-grid-3">
              <img src="/images/balloon-basket.png" alt="Balloon basket" className="about-img-large-3" />
              <img src="/images/balloon-land.png" alt="Balloon landscape" className="about-img-small-3 left" />
              <img src="/images/ball.png" alt="Balloon background" className="about-img-small-3 right" />
            </div>
          </div>
          {/* Texte à droite */}
          <div className="about-text">
            <h2 style={{ color: "#2C2C2C", fontWeight: "bold", fontSize: "2rem", marginBottom: 20 }}>
              {t("about.expectationsTitle")}
            </h2>
            <ul style={{ color: "#2C2C2C", fontSize: "1.1rem", lineHeight: 1.6 }}>
              <li style={{ marginBottom: 12 }}>
                {t("about.expectationsPoint1")}
              </li>
              <li>
                {t("about.expectationsPoint2")}
              </li>
            </ul>
          </div>
        </div>
        {/* Section relaxation avec fond d'image et overlay */}
        <div className="about-relax-section" style={{    background: "radial-gradient(black, #0000008a);"}}>
          <div className="about-relax-bg"></div>
          <div className="about-relax-overlay"></div>
          <div className="about-relax-content "> 
            <h2 style={{ fontSize: '2.2rem', fontWeight: 'bold', color: '#fff', textShadow: '0 2px 8px #0007' }}>{t("about.relaxationTitle")}</h2>
            <p style={{ color: '#fff', fontSize: '1.15rem', marginTop: 12 }}>
              {t("about.relaxationPoint1")}
            </p>
            <p style={{ color: '#fff', fontSize: '1.15rem' }}>
              {t("about.relaxationPoint2")}
            </p>
            <p style={{ color: '#fff', fontSize: '1.15rem' }}>
              {t("about.relaxationPoint3")}
            </p>
          </div>
        </div>


        {/* Section: A Journey Through Moroccan Landscapes */}
        


        {/* Section: Our Commitments: A Worry-Free Experience */}
        <section style={{ padding: '56px 0 0 0', margin: '0 -20px 48px -20px', borderRadius: 32 }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px' }}>
            <h2 style={{ fontWeight: 'bold', fontSize: '2.2rem', color: '#222', marginBottom: 8, textAlign: 'center', letterSpacing: '-1px' }}>
              {t("about.commitmentsTitle")}
            </h2>
            <div style={{ fontSize: '1.1rem', color: '#a43518', fontWeight: 600, marginBottom: 24, textAlign: 'center' }}>{t("about.commitmentsSubtitle")}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ flex: 1, minWidth: 260 }}>
                <p style={{ color: '#222', fontSize: '1.13rem', marginBottom: 14, lineHeight: 1.7 }}>
                  {t("about.commitmentsDescription")}
                </p>
                <ul style={{ color: '#444', fontSize: '1.05rem', marginLeft: 18, marginBottom: 0, lineHeight: 1.6 }}>
                  <li>{t("about.commitmentsPoint1")}</li>
                  <li>{t("about.commitmentsPoint2")}</li>
                  <li>{t("about.commitmentsPoint3")}</li>
                  <li>{t("about.commitmentsPoint4")}</li>
                </ul>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flex: 1, minWidth: 260 }}>
                <div style={{ display: 'flex', gap: 16, justifyContent: 'flex-end' }}>
                  <img src="/images/one.jpg" alt="one" style={{ width: 180, height: 120, objectFit: 'cover', borderRadius: 18, boxShadow: '0 4px 16px #0001' }} />
                  <img src="/images/too.png" alt="Too" style={{ width: 100, height: 120, objectFit: 'cover', borderRadius: 18, boxShadow: '0 4px 16px #0001' }} />
                </div>
                <img src="/images/happy-group.png" alt="Happy group" style={{ width: 340, height: 100, objectFit: 'cover', borderRadius: 18, boxShadow: '0 4px 16px #0001', marginLeft: 0 }} />
              </div>
            </div>
          </div>
        </section>
        
      </div>
    </div>
  );
};

export default About;
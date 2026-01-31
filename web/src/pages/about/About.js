import React from "react";
import { useTranslation } from "react-i18next";
import "../../App.css";

/* Decorative Lines - positioned in corners throughout */
const DecorativeLines = ({ corner = "top-left" }) => {
  const positions = {
    "top-left": { top: 0, left: 0, rotation: 0 },
    "top-right": { top: 0, right: 0, rotation: 90 },
    "bottom-right": { bottom: 0, right: 0, rotation: 180 },
    "bottom-left": { bottom: 0, left: 0, rotation: 270 },
  };

  const pos = positions[corner];

  return (
    <div style={{ 
      position: "absolute", 
      ...pos,
      width: "400px", 
      height: "400px", 
      pointerEvents: "none",
      zIndex: 0,
      transform: `rotate(${pos.rotation}deg)`
    }}>
      {[1, 2, 3].map((i) => (
        <div key={i} style={{
          position: "absolute",
          top: i * 20,
          left: i * 20,
          width: `${380 - i * 40}px`,
          height: `${380 - i * 40}px`,
          borderTop: "3px solid rgba(139, 115, 85, 0.25)",
          borderLeft: "3px solid rgba(139, 115, 85, 0.25)",
          borderRadius: "30px 0 0 0",
        }} />
      ))}
    </div>
  );
};

const About = () => {
  const { t } = useTranslation();

  return (
    <div style={{ backgroundColor: "#EAD8C0" }}>
      
{/* SECTION 1: Main Hero */}
<div style={{ 
  minHeight: "100vh", 
  width: "100%",
  backgroundColor: "#f2e6d9", // Precise beige background from your image
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  overflow: "hidden",
  padding: "80px 5%"
}}>
  
  {/* Layered Decorative Shapes (Bottom Left) */}
  <div style={{ 
    position: "absolute", 
    bottom: 0, 
    left: 0, 
    zIndex: 0,
    opacity: 0.6 // Subtly blends into the background
  }}>
    <DecorativeLines corner="bottom-left" />
  </div>

  <div style={{ 
    maxWidth: "1400px", 
    width: "100%",
    display: "flex", 
    flexDirection: "row",
    alignItems: "center", 
    justifyContent: "center",
    gap: "60px",
    position: "relative",
    zIndex: 1 
  }}>
    
    {/* LEFT CONTENT - Centered Text Paragraph */}
    <div style={{ 
      flex: "1", 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", // Centers the title and list horizontally
      textAlign: "center"   // Centers the text within the paragraph
    }}>
      <h1 style={{ 
        fontSize: "2.8rem", 
        fontWeight: 800, 
        lineHeight: "1.2", 
        color: "#1A1A1A", 
        marginBottom: "20px",
        maxWidth: "550px"
      }}>
        Live a Unique Hot-Air Balloon Adventure with Sky Experience!
      </h1>
      
      <p style={{ 
        fontSize: "1.3rem", 
        fontWeight: 700, 
        marginBottom: "40px", 
        color: "#1A1A1A" 
      }}>
        The Sky Experience Adventures
      </p>

      <ul style={{ 
        listStyle: "none", 
        padding: 0, 
        margin: 0, 
        maxWidth: "480px" // Keeps the bullet points contained and centered
      }}>
        {[
          "Soar above Marrakech and its breathtaking landscapes in the comfort of our modern hot-air balloons.",
          "Give yourself the gift of serenity and enjoy an unforgettable view of the Atlas Mountains, the palm groves of Marrakech, and much more.",
          "Every detail has been carefully thought out to make this experience unforgettable."
        ].map((text, i) => (
          <li key={i} style={{ 
            display: "flex", 
            marginBottom: "18px", 
            fontSize: "1.05rem", 
            lineHeight: "1.5", 
            color: "#1A1A1A",
            fontWeight: 600,
            textAlign: "center",
            justifyContent: "center"
          }}>
            <span style={{ marginRight: "10px", fontWeight: "bold" }}>•</span>
            <span>{text}</span>
          </li>
        ))}
      </ul>
    </div>

    {/* RIGHT IMAGE GRID - Massive and Pill-Shaped */}
    <div style={{ 
      flex: "1.1", 
      display: "flex", 
      gap: "20px", 
      height: "650px", // Larger height for bigger impact
      alignItems: "center"
    }}>
      {/* Tall Pill (The Balloon) */}
      <div style={{ 
        flex: "1.1", 
        height: "85%", // Creates the offset look
        borderRadius: "80px", // Large pill radius
        overflow: "hidden",
        boxShadow: "0 15px 35px rgba(0,0,0,0.1)"
      }}>
        <img 
          src="/images/about.png" 
          alt="Hot air balloon" 
          style={{ width: "100%", height: "100%", objectFit: "cover" }} 
        />
      </div>

      {/* Column for Two Small Pills */}
      <div style={{ 
        flex: "1", 
        display: "flex", 
        flexDirection: "column", 
        gap: "20px", 
        height: "100%",
        justifyContent: "center"
      }}>
        <div style={{ 
          height: "45%", 
          borderRadius: "70px", 
          overflow: "hidden",
          boxShadow: "0 15px 35px rgba(0,0,0,0.1)"
        }}>
          <img 
            src="/images/smiling-woman.png" 
            alt="Customer" 
            style={{ width: "100%", height: "100%", objectFit: "cover" }} 
          />
        </div>
        <div style={{ 
          height: "45%", 
          borderRadius: "70px", 
          overflow: "hidden",
          boxShadow: "0 15px 35px rgba(0,0,0,0.1)"
        }}>
          <img 
            src="/images/balloon-landscape.png" 
            alt="Landscape" 
            style={{ width: "100%", height: "100%", objectFit: "cover" }} 
          />
        </div>
      </div>
    </div>
  </div>
</div>

{/* SECTION 2: Safety and Comfort */}
<div style={{ 
  minHeight: "100vh", 
  backgroundColor: "#f5e8dc", 
  display: "flex", 
  alignItems: "center", 
  justifyContent: "center",
  position: "relative",
  padding: "60px 5%",
  overflow: "hidden"
}}>
  {/* Decorative vertical stripes on LEFT */}
  <div style={{ 
    position: "absolute", 
    left: 0, 
    top: 0, 
    bottom: 0, 
    width: "180px",
    display: "flex",
    zIndex: 0
  }}>
    <div style={{ width: "50px", backgroundColor: "#f0dcc8" }}></div>
    <div style={{ width: "40px", backgroundColor: "#d4b896" }}></div>
    <div style={{ width: "45px", backgroundColor: "#a89580" }}></div>
    <div style={{ width: "45px", backgroundColor: "#8b7d6b" }}></div>
  </div>

  {/* Decorative vertical stripes on RIGHT */}
  <div style={{ 
    position: "absolute", 
    right: 0, 
    top: 0, 
    bottom: 0, 
    width: "180px",
    display: "flex",
    zIndex: 0
  }}>
    <div style={{ width: "45px", backgroundColor: "#8b7d6b" }}></div>
    <div style={{ width: "45px", backgroundColor: "#a89580" }}></div>
    <div style={{ width: "40px", backgroundColor: "#d4b896" }}></div>
    <div style={{ width: "50px", backgroundColor: "#f0dcc8" }}></div>
  </div>

  <div style={{ 
    maxWidth: "1300px", 
    width: "100%", 
    display: "grid", 
    gridTemplateColumns: "1fr 1fr", 
    gap: "80px",
    alignItems: "center",
    zIndex: 1,
    position: "relative"
  }}>
    {/* TEXT CONTENT - LEFT SIDE */}
    <div style={{ 
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingLeft: "20px"
    }}>
      <h2 style={{ 
        fontSize: "3.5rem", 
        fontWeight: "900", 
        marginBottom: "10px",
        lineHeight: "1.1",
        color: "#000"
      }}>
        Safety and Comfort: Our Priorities
      </h2>
      <p style={{ 
        fontSize: "1.3rem", 
        fontWeight: "700", 
        marginBottom: "30px",
        color: "#000"
      }}>
        Safety first always
      </p>
      <ul style={{ 
        listStyle: "none", 
        padding: 0, 
        fontSize: "1rem",
        lineHeight: "1.6",
        color: "#000",
        textAlign: "left",
        maxWidth: "480px"
      }}>
        <li style={{ marginBottom: "18px", fontWeight: "500" }}>
          • At Sky Experience, safety is our top priority.
        </li>
        <li style={{ marginBottom: "18px", fontWeight: "500" }}>
          • Our certified, experienced pilots will guide you throughout the adventure, ensuring you enjoy a safe and comfortable flight.
        </li>
        <li style={{ marginBottom: "18px", fontWeight: "500" }}>
          • We provide perfectly maintained hot-air balloons, tailored to meet your needs, guaranteeing both safety and comfort.
        </li>
      </ul>
    </div>

    {/* IMAGE GRID - RIGHT SIDE */}
    <div style={{ 
      position: "relative", 
      height: "700px",
      width: "100%"
    }}>
      {/* TOP IMAGE - Hot air balloon (BIGGER & DOMINANT) */}
      <div style={{ 
        position: "absolute",
        top: "0",
        right: "0",
        width: "500px", 
        height: "450px", 
        borderRadius: "45px", 
        overflow: "hidden",
        boxShadow: "0 15px 50px rgba(0,0,0,0.2)",
        zIndex: 2
      }}>
        <img 
          src="/images/safety-group.png" 
          alt="Hot air balloon group experience" 
          style={{ 
            width: "100%", 
            height: "100%", 
            objectFit: "cover" 
          }} 
        />
      </div>
      
      {/* BOTTOM IMAGE - Family (smaller, overlapping) */}
      <div style={{ 
        position: "absolute",
        bottom: "0",
        left: "0",
        width: "420px", 
        height: "340px", 
        borderRadius: "45px", 
        overflow: "hidden",
        border: "16px solid #f5e8dc",
        boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
        zIndex: 3
      }}>
        <img 
          src="/images/safety-family.png" 
          alt="Family hot air balloon experience" 
          style={{ 
            width: "100%", 
            height: "100%", 
            objectFit: "cover" 
          }} 
        />
      </div>
    </div>
  </div>
</div>

      {/* SECTION 3: Flight Tailored */}
      <div style={{ 
        minHeight: "100vh", 
        position: "relative",
        display: "flex",
        alignItems: "center" 
      }}>
        <DecorativeLines corner="top-left" />
        <DecorativeLines corner="bottom-right" />

        <div style={{ 
          maxWidth: 1400, 
          margin: "0 auto", 
          padding: "60px 5%", 
          display: "grid", 
          gridTemplateColumns: "1fr 1fr", 
          gap: "80px", 
          alignItems: "center",
          position: "relative",
          zIndex: 1 
        }}>
          
          {/* LEFT IMAGE GRID */}
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "1fr 1fr",
            gap: "20px",
            height: "600px"
          }}>
            {/* Top Left - spans 2 columns */}
            <div style={{ gridColumn: "span 2" }}>
              <img 
                src="/images/flight-basket.png" 
                alt="Balloon basket view" 
                style={{ 
                  width: "100%", 
                  height: "100%", 
                  objectFit: "cover", 
                  borderRadius: "60px"
                }} 
              />
            </div>

            {/* Bottom Left */}
            <div>
              <img 
                src="/images/flight-landscape1.png" 
                alt="Multiple balloons" 
                style={{ 
                  width: "100%", 
                  height: "100%", 
                  objectFit: "cover", 
                  borderRadius: "60px"
                }} 
              />
            </div>

            {/* Bottom Right */}
            <div>
              <img 
                src="/images/flight-landscape2.png" 
                alt="Single balloon" 
                style={{ 
                  width: "100%", 
                  height: "100%", 
                  objectFit: "cover", 
                  borderRadius: "60px"
                }} 
              />
            </div>
          </div>

          {/* RIGHT TEXT */}
          <div>
            <h2 style={{ 
              fontSize: "2.8rem", 
              fontWeight: 800, 
              lineHeight: "1.2", 
              color: "#1A1A1A", 
              marginBottom: "40px"
            }}>
              A Flight Tailored to Your Expectations
            </h2>

            <ul style={{ listStyle: "none", padding: 0 }}>
              {[
                "Whether you choose a classic or private flight, every experience is carefully planned to give you a panoramic view of Marrakech like you've never seen before.",
                "Every moment in the air invites you to relax and fully appreciate the stunning beauty of the landscapes around you."
              ].map((text, i) => (
                <li key={i} style={{ 
                  display: "flex", 
                  marginBottom: "18px", 
                  fontSize: "1rem", 
                  lineHeight: "1.6", 
                  color: "#222",
                  fontWeight: 500
                }}>
                  <span style={{ marginRight: "12px", fontWeight: "bold", color: "#000", fontSize: "1.3rem" }}>•</span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* SECTION 4: Our Commitments */}
      <div style={{ 
        minHeight: "100vh", 
        position: "relative",
        display: "flex",
        alignItems: "center" 
      }}>
        <DecorativeLines corner="top-left" />
        <DecorativeLines corner="bottom-right" />

        <div style={{ 
          maxWidth: 1400, 
          margin: "0 auto", 
          padding: "60px 5%", 
          display: "grid", 
          gridTemplateColumns: "1fr 1fr", 
          gap: "80px", 
          alignItems: "center",
          position: "relative",
          zIndex: 1 
        }}>
          
          {/* LEFT TEXT */}
          <div>
            <h2 style={{ 
              fontSize: "2.8rem", 
              fontWeight: 800, 
              lineHeight: "1.2", 
              color: "#1A1A1A", 
              marginBottom: "40px",
              textAlign: "center"
            }}>
              Our Commitments: A Worry-Free Experience
            </h2>

            <p style={{ 
              fontSize: "1rem", 
              lineHeight: "1.7", 
              color: "#222",
              fontWeight: 500,
              marginBottom: "0"
            }}>
              From reservation to landing, we've taken care of everything to ensure you can fully relax and enjoy the moment. We handle all the logistics—transport, welcoming, safety briefings, and personalized souvenirs at the end of your adventure. All you have to do is focus on what matters: enjoying the experience.
            </p>
          </div>

          {/* RIGHT IMAGE GRID */}
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "1fr 1fr",
            gap: "20px",
            height: "600px"
          }}>
            {/* Top Left */}
            <div>
              <img 
                src="/images/commitment1.png" 
                alt="Balloon preparation" 
                style={{ 
                  width: "100%", 
                  height: "100%", 
                  objectFit: "cover", 
                  borderRadius: "60px"
                }} 
              />
            </div>

            {/* Top Right - spans 2 rows */}
            <div style={{ gridRow: "span 2" }}>
              <img 
                src="/images/commitment2.png" 
                alt="Balloon flame" 
                style={{ 
                  width: "100%", 
                  height: "100%", 
                  objectFit: "cover", 
                  borderRadius: "60px"
                }} 
              />
            </div>

            {/* Bottom Left */}
            <div>
              <img 
                src="/images/commitment3.png" 
                alt="Team celebration" 
                style={{ 
                  width: "100%", 
                  height: "100%", 
                  objectFit: "cover", 
                  borderRadius: "60px"
                }} 
              />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default About;
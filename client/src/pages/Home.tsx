import { useEffect, useRef, useState } from "react";

// Social media SVG icons

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const YouTubeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
    <polygon points="9.75 15.02 15.5 12 9.75 8.98"/>
  </svg>
);

const TikTokIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
  </svg>
);

const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
    <line x1="10" y1="11" x2="10" y2="17"/>
    <line x1="14" y1="11" x2="14" y2="17"/>
  </svg>
);

const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0.5" color="#C8A951">
    <polygon points="12 2 15.09 10.26 24 10.26 17.55 15.74 19.64 24 12 18.52 4.36 24 6.45 15.74 0 10.26 8.91 10.26"/>
  </svg>
);

/**
 * C.U.R.B. Solutions — Home Page
 * Design: Emerald & Ivory Prestige
 * Colors: Ivory #FAF8F4 | Emerald #1B5E3B | Gold #C8A951 | Charcoal #2C2C2C
 * Fonts: Playfair Display (headings) | Cormorant Garamond (taglines) | Source Sans 3 (body)
 */

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const observerRefs = useRef<(HTMLElement | null)[]>([]);

  const addRef = (el: HTMLElement | null, index: number) => {
    if (el) observerRefs.current[index] = el;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    observerRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/trpc/booking.submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: formData }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", phone: "", message: "" });
        setTimeout(() => setSubmitStatus("idle"), 3000);
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const smoothScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#FAF8F4" }}>
      {/* ── NAVIGATION ── */}
      <nav style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "#FAF8F4",
        borderBottom: "1px solid rgba(200, 169, 81, 0.2)",
        padding: "1.5rem 2rem",
      }}>
        <div style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "#1B5E3B",
          }}>C.U.R.B. Solutions</div>

          <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
            <button onClick={() => smoothScroll("services")} style={{
              background: "none",
              border: "none",
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: "0.9rem",
              fontWeight: 500,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: "#2C2C2C",
              cursor: "pointer",
            }}>SERVICES</button>
            <button onClick={() => smoothScroll("about")} style={{
              background: "none",
              border: "none",
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: "0.9rem",
              fontWeight: 500,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: "#2C2C2C",
              cursor: "pointer",
            }}>ABOUT</button>
            <button onClick={() => smoothScroll("loyalty")} style={{
              background: "none",
              border: "none",
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: "0.9rem",
              fontWeight: 500,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: "#2C2C2C",
              cursor: "pointer",
            }}>LOYALTY</button>
            <button onClick={() => smoothScroll("contact")} style={{
              background: "none",
              border: "none",
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: "0.9rem",
              fontWeight: 500,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: "#2C2C2C",
              cursor: "pointer",
            }}>CONTACT</button>

            <div style={{ display: "flex", gap: "1rem" }}>
              <a href="https://www.instagram.com/curbsolutions/" target="_blank" rel="noopener noreferrer" style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "32px",
                height: "32px",
                border: "1px solid #C8A951",
                borderRadius: "2px",
                color: "#C8A951",
                transition: "all 0.3s ease",
              }} onMouseEnter={(e) => {
                e.currentTarget.style.background = "#C8A951";
                e.currentTarget.style.color = "#FAF8F4";
              }} onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#C8A951";
              }}>
                <InstagramIcon />
              </a>
              <a href="https://www.facebook.com/people/CURB-Solutions/61579461505969/" target="_blank" rel="noopener noreferrer" style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "32px",
                height: "32px",
                border: "1px solid #C8A951",
                borderRadius: "2px",
                color: "#C8A951",
                transition: "all 0.3s ease",
              }} onMouseEnter={(e) => {
                e.currentTarget.style.background = "#C8A951";
                e.currentTarget.style.color = "#FAF8F4";
              }} onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#C8A951";
              }}>
                <FacebookIcon />
              </a>
              <a href="https://www.youtube.com/@C.U.R.B.Solutions" target="_blank" rel="noopener noreferrer" style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "32px",
                height: "32px",
                border: "1px solid #C8A951",
                borderRadius: "2px",
                color: "#C8A951",
                transition: "all 0.3s ease",
              }} onMouseEnter={(e) => {
                e.currentTarget.style.background = "#C8A951";
                e.currentTarget.style.color = "#FAF8F4";
              }} onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#C8A951";
              }}>
                <YouTubeIcon />
              </a>
              <a href="https://www.tiktok.com/@curbsolutions" target="_blank" rel="noopener noreferrer" style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "32px",
                height: "32px",
                border: "1px solid #C8A951",
                borderRadius: "2px",
                color: "#C8A951",
                transition: "all 0.3s ease",
              }} onMouseEnter={(e) => {
                e.currentTarget.style.background = "#C8A951";
                e.currentTarget.style.color = "#FAF8F4";
              }} onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#C8A951";
              }}>
                <TikTokIcon />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* ── HERO SECTION ── */}
      <section style={{
        padding: "4rem 2rem 6rem",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663438830896/RwdpQnUHETTx3khai6RZzn/curb-hero-bg_a0506adb.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 0,
        }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(250, 248, 244, 0.85)", zIndex: 1 }} />

        <div style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4rem",
          alignItems: "center",
          position: "relative",
          zIndex: 2,
        }}>
          <div>
            <span style={{
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#C8A951",
              display: "block",
              marginBottom: "1rem",
            }}>PREMIUM BIN CLEANING SERVICE</span>

            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              fontWeight: 700,
              color: "#1B5E3B",
              lineHeight: 1.1,
              marginBottom: "1.5rem",
            }}>C.U.R.B. Solutions</h1>

            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "1.5rem",
              color: "#1B5E3B",
              marginBottom: "2rem",
            }}>"Something trashy has yet to be so classy"</p>

            <p style={{
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: "1rem",
              lineHeight: 1.8,
              color: "#2C2C2C",
              marginBottom: "2.5rem",
            }}>We bring cleanliness to your curb. Professional trash bin and gutter washing that eliminates odors, bacteria, and grime; leaving your bins spotless and your home pristine.</p>

            <div style={{ display: "flex", gap: "1rem" }}>
              <button onClick={() => smoothScroll("contact")} style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "1rem 2rem",
                background: "#C8A951",
                color: "#FAF8F4",
                border: "none",
                borderRadius: "2px",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }} onMouseEnter={(e) => {
                e.currentTarget.style.background = "#B8941F";
              }} onMouseLeave={(e) => {
                e.currentTarget.style.background = "#C8A951";
              }}>Book a Wash</button>
              <button onClick={() => smoothScroll("services")} style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "1rem 2rem",
                background: "#1B5E3B",
                color: "#FAF8F4",
                border: "none",
                borderRadius: "2px",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }} onMouseEnter={(e) => {
                e.currentTarget.style.background = "#0f3a23";
              }} onMouseLeave={(e) => {
                e.currentTarget.style.background = "#1B5E3B";
              }}>Our Services</button>
            </div>
          </div>

          <div style={{
            position: "relative",
            height: "400px",
            borderRadius: "2px",
            overflow: "hidden",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
          }}>
            <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663438830896/RwdpQnUHETTx3khai6RZzn/curb-bins-hero_d90e93fa.png" alt="Premium trash bins" style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }} />
          </div>
        </div>
      </section>

      {/* ── SERVICES SECTION ── */}
      <section id="services" style={{
        padding: "6rem 2rem",
        background: "#F0EDE6",
      }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <span style={{
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#C8A951",
              display: "block",
              marginBottom: "1rem",
            }}>Our Services</span>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
              color: "#2C2C2C",
              marginBottom: "1rem",
            }}>Luxury Cleaning Solutions</h2>
            <div className="gold-divider" style={{ width: "80px", margin: "0 auto" }} />
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem",
          }}>
            {[
              {
                title: "Standard Bin Wash",
                description: "Complete curb-side cleaning for all bins on your property. Ideal for larger households and businesses",
                features: ["Residue removal", "Professional-grade sanitization", "Odor elimination"],
              },
              {
                title: "Gutter Cleaning",
                description: "Keep your gutters flowing freely with our comprehensive cleaning service.",
                features: ["Debris removal", "Gutter flushing", "Downspout clearing"],
              },
            ].map((service, i) => (
              <div
                key={i}
                ref={(el) => addRef(el, 3 + i)}
                className="fade-up"
                style={{
                  background: "#ffffff",
                  padding: "2.5rem",
                  borderRadius: "2px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                  transitionDelay: `${i * 0.1}s`,
                }}
              >
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "#1B5E3B",
                  marginBottom: "1rem",
                }}>{service.title}</h3>
                <p style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  fontSize: "0.95rem",
                  color: "#4a4a4a",
                  lineHeight: 1.6,
                  marginBottom: "1.5rem",
                }}>{service.description}</p>
                <ul style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                }}>
                  {service.features.map((feature, j) => (
                    <li key={j} style={{
                      fontFamily: "'Source Sans 3', sans-serif",
                      fontSize: "0.9rem",
                      color: "#2C2C2C",
                      paddingLeft: "1.5rem",
                      marginBottom: "0.75rem",
                      position: "relative",
                    }}>
                      <span style={{
                        position: "absolute",
                        left: 0,
                        color: "#C8A951",
                        fontWeight: 600,
                      }}>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT SECTION ── */}
      <section id="about" style={{
        padding: "6rem 2rem",
        background: "#FAF8F4",
      }}>
        <div style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4rem",
          alignItems: "center",
        }}>
          <div>
            <span style={{
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#C8A951",
              display: "block",
              marginBottom: "1rem",
            }}>About Us</span>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
              color: "#2C2C2C",
              marginBottom: "1.5rem",
            }}>Crafted for Excellence</h2>

            <p style={{
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: "1rem",
              lineHeight: 1.85,
              marginBottom: "2.5rem",
              color: "#4a4a4a",
            }}>C.U.R.B. Solutions was built on a simple belief: even the most overlooked parts of your home deserve the finest care. We treat every bin and gutter like a luxury item — because your home's curb appeal matters from top to bottom.</p>

            <p style={{
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: "1rem",
              lineHeight: 1.85,
              marginBottom: "2rem",
              color: "#4a4a4a",
            }}>Using professional-grade pressure washing and sanitizing agents, we eliminate 99.9% of bacteria, neutralize odors, and restore your bins and gutters to a like-new condition — all without you lifting a finger.</p>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
              <div>
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "2rem",
                  fontWeight: 700,
                  color: "#1B5E3B",
                }}>100+</div>
                <div style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  fontSize: "0.85rem",
                  color: "#4a4a4a",
                  marginTop: "0.5rem",
                }}>Happy Customers</div>
              </div>
              <div>
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "2rem",
                  fontWeight: 700,
                  color: "#1B5E3B",
                }}>5★</div>
                <div style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  fontSize: "0.85rem",
                  color: "#4a4a4a",
                  marginTop: "0.5rem",
                }}>Average Rating</div>
              </div>
            </div>
          </div>

          <div style={{
            position: "relative",
            height: "400px",
            borderRadius: "2px",
            overflow: "hidden",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
          }}>
            <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663438830896/RwdpQnUHETTx3khai6RZzn/curb-bins-about_660867c4.png" alt="Service in action" style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }} />
          </div>
        </div>
      </section>

      {/* ── LOYALTY SECTION ── */}
      <section id="loyalty" style={{
        padding: "6rem 2rem",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663438830896/RwdpQnUHETTx3khai6RZzn/curb-hero-bg_a0506adb.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 0,
        }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(250, 248, 244, 0.88)", zIndex: 1 }} />
        <div style={{
          maxWidth: "900px",
          margin: "0 auto",
          textAlign: "center",
          marginBottom: "3rem",
          position: "relative",
          zIndex: 2,
        }}>
          <span style={{
            fontFamily: "'Source Sans 3', sans-serif",
            fontSize: "0.72rem",
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#C8A951",
            display: "block",
            marginBottom: "1rem",
          }}>Loyalty Program</span>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 700,
            color: "#FAF8F4",
            marginBottom: "1rem",
          }}>Earn Your Free Wash</h2>
          <div className="gold-divider" style={{ width: "80px", margin: "0 auto" }} />
        </div>

        <div style={{
          maxWidth: "800px",
          margin: "0 auto",
          background: "rgba(250, 248, 244, 0.08)",
          border: "1px solid rgba(200, 169, 81, 0.3)",
          borderRadius: "2px",
          padding: "3rem 2rem",
          position: "relative",
          zIndex: 2,
        }}>
          <div style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: "linear-gradient(90deg, #C8A951, #e0c070, #C8A951)",
          }} />

          {/* Ticket notches */}
          <div style={{
            position: "absolute",
            left: "-16px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            background: "#1B5E3B",
          }} />
          <div style={{
            position: "absolute",
            right: "-16px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            background: "#1B5E3B",
          }} />

          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            gap: "2rem",
            alignItems: "center",
          }}>
            {/* Left: Wash counters */}
            <div>
              <p style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: "0.72rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(200, 169, 81, 0.8)",
                marginBottom: "1.25rem",
              }}>Your Progress</p>
              <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <div key={n} style={{
                    width: "48px",
                    height: "48px",
                    border: "1.5px solid rgba(200, 169, 81, 0.5)",
                    borderRadius: "2px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    gap: "2px",
                  }}>
                    <TrashIcon />
                    <span style={{ fontSize: "0.6rem", color: "rgba(200, 169, 81, 0.7)", fontFamily: "'Source Sans 3', sans-serif" }}>#{n}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Center divider */}
            <div style={{
              width: "1px",
              height: "100px",
              background: "linear-gradient(180deg, transparent, rgba(200, 169, 81, 0.5), transparent)",
            }} />

            {/* Right: Free wash */}
            <div style={{ textAlign: "center" }}>
              <div style={{
                background: "rgba(200, 169, 81, 0.15)",
                border: "1.5px solid #C8A951",
                borderRadius: "2px",
                padding: "1.25rem 1.5rem",
                display: "inline-block",
              }}>
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: "#C8A951",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}>6th Wash</div>
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "2rem",
                  fontWeight: 900,
                  color: "#FAF8F4",
                  lineHeight: 1,
                  marginTop: "0.25rem",
                }}>FREE</div>
                <div style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  fontSize: "0.65rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(250, 248, 244, 0.6)",
                  marginTop: "0.5rem",
                }}>On Us</div>
              </div>
            </div>
          </div>

          <div className="gold-divider" style={{ margin: "2rem 0" }} />

          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontSize: "1.1rem",
            color: "rgba(250, 248, 244, 0.8)",
            textAlign: "center",
          }}>
            Every 5 washes earns you a complimentary 6th wash — our way of saying thank you for trusting C.U.R.B. Solutions.
          </p>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{
        padding: "6rem 2rem",
        background: "#F0EDE6",
        position: "relative",
      }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <span style={{
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#C8A951",
              display: "block",
              marginBottom: "1rem",
            }}>Testimonials</span>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
              color: "#2C2C2C",
              marginBottom: "1rem",
            }}>What Our Clients Say</h2>
            <div className="gold-divider" style={{ width: "80px", margin: "0 auto" }} />
          </div>

          <div style={{
            display: "grid",
            gap: "2rem",
          }}>
            {[
              {
                name: "Sarah M.",
                location: "Chino Hills",
                text: "I never thought I'd be impressed by a trash bin cleaning service, but C.U.R.B. Solutions completely changed my mind. My bins look and smell brand new!",
              },
              {
                name: "James T.",
                location: "Chino",
                text: "The professionalism is unmatched. They arrived on time, worked efficiently, and the results were incredible. The loyalty program is a great bonus too.",
              },
              {
                name: "Linda R.",
                location: "Upland",
                text: "Something trashy has never been so classy — their tagline says it all. Highly recommend to anyone who values a clean, well-maintained home.",
              },
              {
                name: "Jennifer W.",
                location: "Chino Hills",
                text: "Best gutter cleaning I've ever had! The team was efficient, thorough, and left no mess behind. My gutters are crystal clear and I can see the difference immediately. Absolutely worth it!",
              },
              {
                name: "David R.",
                location: "Chino",
                text: "What really impressed me was how friendly and courteous the team was. They explained everything they were doing, answered all my questions, and treated my home with respect. Great service, great people!",
              },
            ].map((review, i) => (
              <div
                key={review.name}
                ref={(el) => addRef(el, 9 + i)}
                className="fade-up"
                style={{
                  background: "#ffffff",
                  padding: "2rem",
                  borderRadius: "2px",
                  borderLeft: "4px solid #C8A951",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                  transitionDelay: `${i * 0.1}s`,
                }}
              >
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontSize: "1.05rem",
                  color: "#4a4a4a",
                  lineHeight: 1.7,
                  margin: 0,
                  marginBottom: "1.5rem",
                }}>"{review.text}"</p>
                <div style={{
                  marginTop: "1.5rem",
                }}>
                  <div style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    color: "#1B5E3B",
                  }}>— {review.name}</div>
                  <div style={{
                    fontFamily: "'Source Sans 3', sans-serif",
                    fontSize: "0.78rem",
                    color: "#666",
                    letterSpacing: "0.05em",
                    marginTop: "0.3rem",
                  }}>{review.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT / CTA SECTION ── */}
      <section
        id="contact"
        style={{
          padding: "6rem 2rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663438830896/RwdpQnUHETTx3khai6RZzn/curb-hero-bg_a0506adb.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          zIndex: 0,
        }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(250, 248, 244, 0.93)", zIndex: 1 }} />

        <div style={{
          maxWidth: "600px",
          margin: "0 auto",
          position: "relative",
          zIndex: 2,
        }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
              color: "#2C2C2C",
              marginBottom: "1rem",
            }}>Request a Booking</h2>
            <div className="gold-divider" style={{ width: "80px", margin: "0 auto" }} />
          </div>

          <form onSubmit={handleSubmit} style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleInputChange}
              required
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                padding: "1rem",
                border: "1px solid rgba(200, 169, 81, 0.3)",
                borderRadius: "2px",
                fontSize: "0.95rem",
                background: "#ffffff",
              }}
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleInputChange}
              required
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                padding: "1rem",
                border: "1px solid rgba(200, 169, 81, 0.3)",
                borderRadius: "2px",
                fontSize: "0.95rem",
                background: "#ffffff",
              }}
            />
            <input
              type="tel"
              name="phone"
              placeholder="Your Phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                padding: "1rem",
                border: "1px solid rgba(200, 169, 81, 0.3)",
                borderRadius: "2px",
                fontSize: "0.95rem",
                background: "#ffffff",
              }}
            />
            <textarea
              name="message"
              placeholder="Tell us about your needs..."
              value={formData.message}
              onChange={handleInputChange}
              rows={4}
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                padding: "1rem",
                border: "1px solid rgba(200, 169, 81, 0.3)",
                borderRadius: "2px",
                fontSize: "0.95rem",
                background: "#ffffff",
                resize: "vertical",
              }}
            />

            {submitStatus === "success" && (
              <div style={{
                padding: "1rem",
                background: "#d4edda",
                color: "#155724",
                borderRadius: "2px",
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: "0.9rem",
              }}>
                Thank you! We've received your booking request and will contact you soon.
              </div>
            )}

            {submitStatus === "error" && (
              <div style={{
                padding: "1rem",
                background: "#f8d7da",
                color: "#721c24",
                borderRadius: "2px",
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: "0.9rem",
              }}>
                There was an error submitting your request. Please try again.
              </div>
            )}

            <button
              type="submit"
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "1rem 2rem",
                background: "#1B5E3B",
                color: "#FAF8F4",
                border: "none",
                borderRadius: "2px",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#0f3a23";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#1B5E3B";
              }}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Request a Booking"}
            </button>
          </form>
        </div>
      </section>

      {/* ── FAQ SECTION ── */}
      <section style={{
        background: "#FAF8F4",
        padding: "5rem 2rem",
      }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "2.5rem",
              fontWeight: 700,
              color: "#2C2C2C",
              marginBottom: "1rem",
            }}>Frequently Asked <span style={{ color: "#C8A951" }}>Questions</span></h2>
            <div className="gold-divider" style={{ width: "80px", margin: "0 auto" }} />
          </div>

          <div style={{
            display: "grid",
            gap: "2rem",
          }}>
            {[
              {
                question: "How often should I schedule bin cleaning?",
                answer: "We recommend scheduling bin cleaning every one to three months, depending on usage and environmental factors. Regular maintenance ensures optimal odor control, bacteria elimination, and extends the lifespan of your bins.",
              },
              {
                question: "What areas do you currently service?",
                answer: "We proudly serve Chino, Chino Hills, Pomona, Ontario, and Diamond Bar. Our service areas continue to expand, so please contact us to confirm availability for your specific location.",
              },
              {
                question: "How long does a typical bin cleaning take?",
                answer: "A standard bin cleaning typically takes between 45 minutes to an hour and a half, depending on the number of bins and their condition. We work efficiently while maintaining our high standards of quality.",
              },
              {
                question: "Do you offer same-day or emergency cleaning services?",
                answer: "Yes, we offer same-day and emergency cleaning services to accommodate urgent needs. A $5 service fee applies to expedited bookings, ensuring we can prioritize your request.",
              },
              {
                question: "What is included in your gutter cleaning service?",
                answer: "Our gutter cleaning service includes debris removal, thorough flushing to ensure proper water drainage, and downspout clearing to prevent blockages. We leave your gutters in pristine condition, ready to handle any rainfall.",
              },
            ].map((faq, i) => (
              <div
                key={i}
                style={{
                  background: "#ffffff",
                  padding: "2rem",
                  borderRadius: "2px",
                  borderLeft: "4px solid #C8A951",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                }}
              >
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  color: "#1B5E3B",
                  marginBottom: "0.75rem",
                }}>{faq.question}</h3>
                <p style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  fontSize: "0.95rem",
                  color: "#4a4a4a",
                  lineHeight: 1.6,
                  margin: 0,
                }}>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        background: "#143028",
        padding: "4rem 2rem 2rem",
        position: "relative",
      }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "3rem",
            marginBottom: "3rem",
          }}>
            <div>
              <h4 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.1rem",
                fontWeight: 700,
                color: "#FAF8F4",
                marginBottom: "1rem",
              }}>C.U.R.B. Solutions</h4>
              <p style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: "0.85rem",
                color: "rgba(250, 248, 244, 0.7)",
                lineHeight: 1.6,
              }}>Professional trash bin and gutter cleaning services bringing luxury-level cleanliness to your curb.</p>
            </div>

            <div>
              <h4 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.1rem",
                fontWeight: 700,
                color: "#FAF8F4",
                marginBottom: "1rem",
              }}>Quick Links</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                <li style={{ marginBottom: "0.5rem" }}>
                  <button onClick={() => smoothScroll("services")} style={{
                    background: "none",
                    border: "none",
                    fontFamily: "'Source Sans 3', sans-serif",
                    fontSize: "0.85rem",
                    color: "rgba(250, 248, 244, 0.7)",
                    cursor: "pointer",
                    transition: "color 0.3s ease",
                  }} onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#C8A951";
                  }} onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(250, 248, 244, 0.7)";
                  }}>Services</button>
                </li>
                <li style={{ marginBottom: "0.5rem" }}>
                  <button onClick={() => smoothScroll("about")} style={{
                    background: "none",
                    border: "none",
                    fontFamily: "'Source Sans 3', sans-serif",
                    fontSize: "0.85rem",
                    color: "rgba(250, 248, 244, 0.7)",
                    cursor: "pointer",
                    transition: "color 0.3s ease",
                  }} onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#C8A951";
                  }} onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(250, 248, 244, 0.7)";
                  }}>About</button>
                </li>
                <li style={{ marginBottom: "0.5rem" }}>
                  <button onClick={() => smoothScroll("contact")} style={{
                    background: "none",
                    border: "none",
                    fontFamily: "'Source Sans 3', sans-serif",
                    fontSize: "0.85rem",
                    color: "rgba(250, 248, 244, 0.7)",
                    cursor: "pointer",
                    transition: "color 0.3s ease",
                  }} onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#C8A951";
                  }} onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(250, 248, 244, 0.7)";
                  }}>Contact</button>
                </li>
              </ul>
            </div>

            <div>
              <h4 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.1rem",
                fontWeight: 700,
                color: "#FAF8F4",
                marginBottom: "1rem",
              }}>Follow Us</h4>
              <div style={{ display: "flex", gap: "1rem" }}>
                <a href="https://www.instagram.com/curbsolutions/" target="_blank" rel="noopener noreferrer" style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "36px",
                  height: "36px",
                  border: "1px solid #C8A951",
                  borderRadius: "2px",
                  color: "#C8A951",
                  transition: "all 0.3s ease",
                }} onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#C8A951";
                  e.currentTarget.style.color = "#143028";
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#C8A951";
                }}>
                  <InstagramIcon />
                </a>
                <a href="https://www.facebook.com/people/CURB-Solutions/61579461505969/" target="_blank" rel="noopener noreferrer" style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "36px",
                  height: "36px",
                  border: "1px solid #C8A951",
                  borderRadius: "2px",
                  color: "#C8A951",
                  transition: "all 0.3s ease",
                }} onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#C8A951";
                  e.currentTarget.style.color = "#143028";
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#C8A951";
                }}>
                  <FacebookIcon />
                </a>
                <a href="https://www.youtube.com/@C.U.R.B.Solutions" target="_blank" rel="noopener noreferrer" style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "36px",
                  height: "36px",
                  border: "1px solid #C8A951",
                  borderRadius: "2px",
                  color: "#C8A951",
                  transition: "all 0.3s ease",
                }} onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#C8A951";
                  e.currentTarget.style.color = "#143028";
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#C8A951";
                }}>
                  <YouTubeIcon />
                </a>
                <a href="https://www.tiktok.com/@curbsolutions" target="_blank" rel="noopener noreferrer" style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "36px",
                  height: "36px",
                  border: "1px solid #C8A951",
                  borderRadius: "2px",
                  color: "#C8A951",
                  transition: "all 0.3s ease",
                }} onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#C8A951";
                  e.currentTarget.style.color = "#143028";
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#C8A951";
                }}>
                  <TikTokIcon />
                </a>
              </div>
            </div>
          </div>

          <div style={{
            borderTop: "1px solid rgba(200, 169, 81, 0.2)",
            paddingTop: "2rem",
            textAlign: "center",
          }}>
            <p style={{
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: "0.8rem",
              color: "rgba(250, 248, 244, 0.5)",
              margin: 0,
            }}>© 2026 C.U.R.B. Solutions. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style>{`
        .fade-up {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .fade-up.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .gold-divider {
          width: 40px;
          height: 2px;
          background: #C8A951;
          margin: 1rem 0;
        }
      `}</style>
    </div>
  );
}

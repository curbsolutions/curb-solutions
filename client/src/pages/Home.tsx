/**
 * C.U.R.B. Solutions — Home Page
 * Design: Emerald & Ivory Prestige
 * Colors: Ivory #FAF8F4 | Emerald #1B5E3B | Gold #C8A951 | Charcoal #2C2C2C
 * Fonts: Playfair Display (headings) | Cormorant Garamond (taglines) | Source Sans 3 (body)
 */

import { useEffect, useRef, useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

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
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/>
  </svg>
);

const TikTokIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
  </svg>
);

const TrashIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
    <path d="M10 11v6"/>
    <path d="M14 11v6"/>
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
  </svg>
);

const StarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#C8A951" stroke="#C8A951" strokeWidth="1">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C8A951" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

export default function Home() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const bookingMutation = trpc.booking.submit.useMutation();
  const fadeRefs = useRef<(HTMLElement | null)[]>([]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const result = await bookingMutation.mutateAsync(formData);
      if (result.success) {
        toast.success(result.message);
        setFormData({ firstName: "", lastName: "", phone: "", message: "" });
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Failed to submit booking request. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
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

    fadeRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const addRef = (el: HTMLElement | null, index: number) => {
    fadeRefs.current[index] = el;
  };

  return (
    <div style={{ fontFamily: "'Source Sans 3', sans-serif", background: "#FAF8F4", color: "#2C2C2C" }}>

      {/* ── NAVIGATION ── */}
      <nav style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: "rgba(250, 248, 244, 0.96)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(200, 169, 81, 0.2)",
        padding: "0 2rem",
      }}>
        <div style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "72px",
        }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: "1.5rem",
              color: "#1B5E3B",
              letterSpacing: "0.05em",
            }}>C.U.R.B.</span>
            <span style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 400,
              fontSize: "1.5rem",
              color: "#2C2C2C",
              textDecoration: "underline",
              textDecorationColor: "#C8A951",
              textUnderlineOffset: "4px",
            }}>Solutions</span>
          </div>

          {/* Nav links */}
          <div style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
            {["Services", "About", "Loyalty", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  fontWeight: 500,
                  fontSize: "0.82rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#2C2C2C",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#1B5E3B")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#2C2C2C")}
              >
                {item}
              </a>
            ))}
          </div>

          {/* Social icons */}
          <div style={{ display: "flex", gap: "0.75rem" }}>
            {[
              { icon: <InstagramIcon />, href: "https://www.instagram.com/curbsolutions/", label: "Instagram" },
              { icon: <FacebookIcon />, href: "https://www.facebook.com/people/CURB-Solutions/61579461505969/", label: "Facebook" },
              { icon: <YouTubeIcon />, href: "https://www.youtube.com/@C.U.R.B.Solutions", label: "YouTube" },
              { icon: <TikTokIcon />, href: "https://www.tiktok.com/@curbsolutions", label: "TikTok" },
            ].map(({ icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="social-icon"
                style={{ borderRadius: "2px" }}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ── HERO SECTION ── */}
      <section
        id="hero"
        style={{
          minHeight: "100vh",
          position: "relative",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          paddingTop: "72px",
        }}
      >
        {/* Marble background */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663438830896/RwdpQnUHETTx3khai6RZzn/curb-hero-bg-7wtVrP7A2YSiXjqUxWetKJ.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 0,
        }} />

        {/* Emerald diagonal overlay — bottom right */}
        <div style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: "45%",
          height: "100%",
          background: "linear-gradient(135deg, transparent 30%, rgba(27, 94, 59, 0.92) 60%)",
          zIndex: 1,
        }} />

        {/* Gold diagonal accent line */}
        <div style={{
          position: "absolute",
          bottom: "30%",
          right: "44%",
          width: "60%",
          height: "2px",
          background: "linear-gradient(90deg, transparent, #C8A951, #e0c070)",
          transform: "rotate(-8deg)",
          zIndex: 2,
        }} />
        <div style={{
          position: "absolute",
          bottom: "28%",
          right: "44%",
          width: "60%",
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(200, 169, 81, 0.5))",
          transform: "rotate(-8deg)",
          zIndex: 2,
        }} />

        {/* Hero content */}
        <div style={{
          position: "relative",
          zIndex: 3,
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "4rem 2rem",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4rem",
          alignItems: "center",
        }}>
          {/* Left: Text content */}
          <div>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "1.5rem",
            }}>
              <div className="gold-divider" style={{ width: "40px" }} />
              <span style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#C8A951",
              }}>Premium Bin Cleaning Service</span>
            </div>

            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.8rem, 5vw, 4.5rem)",
              fontWeight: 700,
              color: "#2C2C2C",
              lineHeight: 1.1,
              marginBottom: "0.5rem",
            }}>
              <span style={{ color: "#1B5E3B" }}>C.U.R.B.</span>
            </h1>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.8rem, 5vw, 4.5rem)",
              fontWeight: 400,
              color: "#2C2C2C",
              lineHeight: 1.1,
              marginBottom: "1.5rem",
              textDecoration: "underline",
              textDecorationColor: "#C8A951",
              textUnderlineOffset: "6px",
            }}>
              Solutions
            </h1>

            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)",
              color: "#1B5E3B",
              fontWeight: 500,
              lineHeight: 1.5,
              marginBottom: "2.5rem",
              maxWidth: "480px",
            }}>
              "Something trashy has yet to be so classy"
            </p>

            <p style={{
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: "1rem",
              color: "#4a4a4a",
              lineHeight: 1.8,
              marginBottom: "2.5rem",
              maxWidth: "440px",
            }}>
              We bring cleanliness to your curb. Professional trash bin and gutter washing that eliminates odors, bacteria, and grime; leaving your bins spotless and your home pristine.
            </p>

            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <a href="#contact" className="btn-gold" style={{ display: "inline-block", textDecoration: "none", borderRadius: "2px" }} onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
                Book a Wash
              </a>
              <a href="#services" className="btn-emerald" style={{ display: "inline-block", textDecoration: "none", borderRadius: "2px" }} onClick={(e) => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }}>
                Our Services
              </a>
            </div>
          </div>

          {/* Right: Service photo */}
          <div style={{ position: "relative" }}>
            <div style={{
              position: "absolute",
              top: "-12px",
              left: "-12px",
              right: "12px",
              bottom: "12px",
              border: "1px solid rgba(200, 169, 81, 0.4)",
              borderRadius: "2px",
              zIndex: 0,
            }} />
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663438830896/RwdpQnUHETTx3khai6RZzn/curb-bins-hero-MkmWhetKdqt485vF7oVq8C.webp"
              alt="Premium curb-side trash bin service with black, green, and blue bins"
              style={{
                width: "100%",
                height: "420px",
                objectFit: "cover",
                borderRadius: "2px",
                position: "relative",
                zIndex: 1,
                boxShadow: "0 20px 60px rgba(27, 94, 59, 0.25)",
              }}
            />
            {/* Gold badge */}
            <div style={{
              position: "absolute",
              bottom: "-20px",
              right: "-20px",
              zIndex: 2,
              background: "#1B5E3B",
              border: "2px solid #C8A951",
              padding: "1rem 1.5rem",
              borderRadius: "2px",
              textAlign: "center",
              boxShadow: "0 8px 24px rgba(27, 94, 59, 0.3)",
            }}>
              <div style={{ color: "#C8A951", fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 700, lineHeight: 1 }}>100%</div>
              <div style={{ color: "#FAF8F4", fontFamily: "'Source Sans 3', sans-serif", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: "0.25rem" }}>Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GOLD DIVIDER ── */}
      <div className="gold-divider" />

      {/* ── SERVICES SECTION ── */}
      <section id="services" style={{ padding: "6rem 2rem", background: "#FAF8F4" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div
            ref={(el) => addRef(el, 0)}
            className="fade-up"
            style={{ textAlign: "center", marginBottom: "4rem" }}
          >
            <span style={{
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#C8A951",
              display: "block",
              marginBottom: "1rem",
            }}>What We Offer</span>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
              color: "#2C2C2C",
              marginBottom: "1rem",
            }}>Our Premium Services</h2>
            <div className="gold-divider" style={{ width: "80px", margin: "0 auto 1.5rem" }} />
            <p style={{
              fontFamily: "'Source Sans 3', sans-serif",
              color: "#4a4a4a",
              maxWidth: "520px",
              margin: "0 auto",
              fontSize: "1rem",
              lineHeight: 1.8,
            }}>
              Every wash is performed with professional-grade equipment and meticulous attention to detail.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2rem",
          }}>
            {[
              {
                icon: "🗑️",
                title: "Standard Bin Wash",
                desc: "Deep interior and exterior cleaning of your residential trash bins. Eliminates odors, bacteria, and built-up grime.",
                features: ["Residue removal", "Professional-grade sanitization", "Odor elimination"],
              },
              {
                icon: "🌧️",
                title: "Gutter Cleaning",
                desc: "Professional gutter maintenance to prevent water damage and keep your home protected. Debris removal and thorough flushing for optimal drainage.",
                features: ["Debris removal", "Gutter flushing", "Downspout clearing"],
              },
            ].map((service, i) => (
              <div
                key={service.title}
                ref={(el) => addRef(el, i + 1)}
                className="fade-up luxury-card"
                style={{
                  padding: "2.5rem 2rem",
                  borderRadius: "2px",
                  transitionDelay: `${i * 0.1}s`,
                }}
              >
                <div style={{
                  width: "64px",
                  height: "64px",
                  background: "linear-gradient(135deg, #1B5E3B, #2a7a50)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.5rem",
                  borderRadius: "2px",
                  fontSize: "1.8rem",
                }}>
                  {service.icon}
                </div>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.3rem",
                  fontWeight: 600,
                  color: "#2C2C2C",
                  marginBottom: "0.75rem",
                }}>{service.title}</h3>
                <p style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  color: "#4a4a4a",
                  fontSize: "0.95rem",
                  lineHeight: 1.7,
                  marginBottom: "1.5rem",
                }}>{service.desc}</p>
                <div className="gold-divider" style={{ marginBottom: "1.25rem" }} />
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {service.features.map((f) => (
                    <li key={f} style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.88rem", color: "#4a4a4a" }}>
                      <CheckIcon /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT / MARQUEE SECTION ── */}
      <section
        id="about"
        style={{
          position: "relative",
          padding: "6rem 2rem",
          overflow: "hidden",
        }}
      >
        {/* Emerald texture background */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663438830896/RwdpQnUHETTx3khai6RZzn/curb-emerald-texture-YKoqEVGpz2zaXZwRBsYi4H.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 0,
        }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(20, 48, 40, 0.82)", zIndex: 1 }} />

        <div style={{ position: "relative", zIndex: 2, maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "5rem",
            alignItems: "center",
          }}>
            {/* Left: Image */}
            <div
              ref={(el) => addRef(el, 4)}
              className="fade-up"
              style={{ position: "relative" }}
            >
              <div style={{
                position: "absolute",
                top: "16px",
                left: "16px",
                right: "-16px",
                bottom: "-16px",
                border: "1px solid rgba(200, 169, 81, 0.5)",
                borderRadius: "2px",
              }} />
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663438830896/RwdpQnUHETTx3khai6RZzn/curb-bins-about-M5qjC2cPfsgRZ2jfZuyBiq.webp"
                alt="Close-up of clean trash bins with black, green, and blue colors"
                style={{
                  width: "100%",
                  height: "400px",
                  objectFit: "cover",
                  borderRadius: "2px",
                  position: "relative",
                  zIndex: 1,
                  boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
                }}
              />
            </div>

            {/* Right: Text */}
            <div
              ref={(el) => addRef(el, 5)}
              className="fade-up"
            >
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
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                fontWeight: 700,
                color: "#FAF8F4",
                marginBottom: "1.5rem",
                lineHeight: 1.2,
              }}>
                Where Clean Meets<br />
                <span style={{ color: "#C8A951" }}>Classy</span>
              </h2>
              <div className="gold-divider" style={{ marginBottom: "1.5rem" }} />
              <p style={{
                fontFamily: "'Source Sans 3', sans-serif",
                color: "rgba(250, 248, 244, 0.85)",
                fontSize: "1rem",
                lineHeight: 1.85,
                marginBottom: "1.5rem",
              }}>
                C.U.R.B. Solutions was built on a simple belief: even the most overlooked parts of your home deserve the finest care. We treat every bin like a luxury item — because your home's curb appeal matters from top to bottom.
              </p>
              <p style={{
                fontFamily: "'Source Sans 3', sans-serif",
                color: "rgba(250, 248, 244, 0.85)",
                fontSize: "1rem",
                lineHeight: 1.85,
                marginBottom: "2.5rem",
              }}>
                Using professional-grade pressure washing and sanitizing agents, we eliminate 99.9% of bacteria, neutralize odors, and restore your bins to a like-new condition — all without you lifting a finger.
              </p>

              {/* Stats */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1.5rem" }}>
                {[
                  { num: "500+", label: "Happy Clients" },
                  { num: "99.9%", label: "Bacteria Removed" },
                  { num: "6th", label: "Wash Free" },
                ].map((stat) => (
                  <div key={stat.label} style={{ textAlign: "center" }}>
                    <div style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "1.8rem",
                      fontWeight: 700,
                      color: "#C8A951",
                      lineHeight: 1,
                    }}>{stat.num}</div>
                    <div style={{
                      fontFamily: "'Source Sans 3', sans-serif",
                      fontSize: "0.72rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "rgba(250, 248, 244, 0.65)",
                      marginTop: "0.4rem",
                    }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LOYALTY PROGRAM ── */}
      <section id="loyalty" style={{ padding: "6rem 2rem", background: "#FAF8F4" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div
            ref={(el) => addRef(el, 6)}
            className="fade-up"
            style={{ textAlign: "center", marginBottom: "4rem" }}
          >
            <span style={{
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#C8A951",
              display: "block",
              marginBottom: "1rem",
            }}>Rewards</span>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
              color: "#2C2C2C",
              marginBottom: "1rem",
            }}>Loyalty Program</h2>
            <div className="gold-divider" style={{ width: "80px", margin: "0 auto" }} />
          </div>

          {/* Loyalty card — styled like a ticket */}
          <div
            ref={(el) => addRef(el, 7)}
            className="fade-up"
            style={{
              maxWidth: "800px",
              margin: "0 auto",
              background: "linear-gradient(135deg, #1B5E3B 0%, #143028 100%)",
              borderRadius: "4px",
              padding: "3rem",
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 20px 60px rgba(27, 94, 59, 0.3)",
              border: "1px solid rgba(200, 169, 81, 0.4)",
            }}
          >
            {/* Gold accent lines */}
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "3px",
              background: "linear-gradient(90deg, #C8A951, #e0c070, #C8A951)",
            }} />
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
              background: "#FAF8F4",
            }} />
            <div style={{
              position: "absolute",
              right: "-16px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: "#FAF8F4",
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
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{
        padding: "6rem 2rem",
        background: "#F0EDE6",
        position: "relative",
      }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div
            ref={(el) => addRef(el, 8)}
            className="fade-up"
            style={{ textAlign: "center", marginBottom: "4rem" }}
          >
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
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
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
                name: "Michael K.",
                location: "Chino Hills",
                text: "Their gutter cleaning service is exceptional! No more overflowing gutters when it rains. The team was thorough, professional, and my gutters have never looked better. Highly satisfied!",
              },
            ].map((review, i) => (
              <div
                key={review.name}
                ref={(el) => addRef(el, 9 + i)}
                className="fade-up luxury-card"
                style={{
                  padding: "2rem",
                  borderRadius: "2px",
                  transitionDelay: `${i * 0.1}s`,
                  background: "#ffffff",
                }}
              >
                <div style={{ display: "flex", gap: "3px", marginBottom: "1.25rem" }}>
                  {[...Array(5)].map((_, j) => <StarIcon key={j} />)}
                </div>
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontSize: "1.05rem",
                  color: "#4a4a4a",
                  lineHeight: 1.7,
                  marginBottom: "1.5rem",
                }}>"{review.text}"</p>
                <div className="gold-divider" style={{ marginBottom: "1rem" }} />
                <div>
                  <div style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    color: "#2C2C2C",
                  }}>{review.name}</div>
                  <div style={{
                    fontFamily: "'Source Sans 3', sans-serif",
                    fontSize: "0.78rem",
                    color: "#1B5E3B",
                    letterSpacing: "0.05em",
                    marginTop: "0.2rem",
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
          backgroundImage: "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663438830896/RwdpQnUHETTx3khai6RZzn/curb-hero-bg-7wtVrP7A2YSiXjqUxWetKJ.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          zIndex: 0,
        }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(250, 248, 244, 0.93)", zIndex: 1 }} />

        <div style={{ position: "relative", zIndex: 2, maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
          <div
            ref={(el) => addRef(el, 12)}
            className="fade-up"
          >
            <span style={{
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#C8A951",
              display: "block",
              marginBottom: "1rem",
            }}>Get In Touch</span>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
              color: "#2C2C2C",
              marginBottom: "1rem",
            }}>Ready for a Cleaner Curb?</h2>
            <div className="gold-divider" style={{ width: "80px", margin: "0 auto 1.5rem" }} />
            <p style={{
              fontFamily: "'Source Sans 3', sans-serif",
              color: "#4a4a4a",
              fontSize: "1rem",
              lineHeight: 1.8,
              marginBottom: "3rem",
            }}>
              Book your first wash today and experience the C.U.R.B. Solutions difference. Follow us on social media for tips, promotions, and behind-the-scenes content.
            </p>

            {/* Contact form */}
            <div style={{
              background: "#ffffff",
              border: "1px solid rgba(200, 169, 81, 0.25)",
              borderRadius: "2px",
              padding: "2.5rem",
              boxShadow: "0 8px 40px rgba(44, 44, 44, 0.08)",
              textAlign: "left",
            }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                {[{ label: "First Name", name: "firstName" }, { label: "Last Name", name: "lastName" }].map(({ label, name }) => (
                  <div key={name}>
                    <label style={{
                      fontFamily: "'Source Sans 3', sans-serif",
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "#4a4a4a",
                      display: "block",
                      marginBottom: "0.5rem",
                    }}>{label}</label>
                    <input
                      type="text"
                      name={name}
                      placeholder={label}
                      value={formData[name as keyof typeof formData]}
                      onChange={handleFormChange}
                      style={{
                        width: "100%",
                        padding: "0.75rem 1rem",
                        border: "1px solid rgba(200, 169, 81, 0.3)",
                        borderRadius: "2px",
                        fontFamily: "'Source Sans 3', sans-serif",
                        fontSize: "0.9rem",
                        color: "#2C2C2C",
                        background: "#FAF8F4",
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                ))}
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <label style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#4a4a4a",
                  display: "block",
                  marginBottom: "0.5rem",
                }}>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="(555) 000-0000"
                  value={formData.phone}
                  onChange={handleFormChange}
                  style={{
                    width: "100%",
                    padding: "0.75rem 1rem",
                    border: "1px solid rgba(200, 169, 81, 0.3)",
                    borderRadius: "2px",
                    fontFamily: "'Source Sans 3', sans-serif",
                    fontSize: "0.9rem",
                    color: "#2C2C2C",
                    background: "#FAF8F4",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>
              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{
                  fontFamily: "'Source Sans 3', sans-serif",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#4a4a4a",
                  display: "block",
                  marginBottom: "0.5rem",
                }}>Message</label>
                <textarea
                  name="message"
                  placeholder="Tell us about your service needs..."
                  rows={4}
                  value={formData.message}
                  onChange={handleFormChange}
                  style={{
                    width: "100%",
                    padding: "0.75rem 1rem",
                    border: "1px solid rgba(200, 169, 81, 0.3)",
                    borderRadius: "2px",
                    fontFamily: "'Source Sans 3', sans-serif",
                    fontSize: "0.9rem",
                    color: "#2C2C2C",
                    background: "#FAF8F4",
                    outline: "none",
                    resize: "vertical",
                    boxSizing: "border-box",
                  }}
                />
              </div>
              <button 
                className="btn-gold" 
                style={{ width: "100%", borderRadius: "2px", cursor: isSubmitting ? "not-allowed" : "pointer", opacity: isSubmitting ? 0.7 : 1 }}
                onClick={handleFormSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Request a Booking"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        background: "#143028",
        padding: "4rem 2rem 2rem",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Top gold line */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: "linear-gradient(90deg, transparent, #C8A951, #e0c070, #C8A951, transparent)",
        }} />

        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr",
            gap: "4rem",
            marginBottom: "3rem",
          }}>
            {/* Brand */}
            <div>
              <div style={{ marginBottom: "1rem" }}>
                <span style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  fontSize: "1.8rem",
                  color: "#C8A951",
                  letterSpacing: "0.05em",
                }}>C.U.R.B.</span>
                <span style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 400,
                  fontSize: "1.8rem",
                  color: "#FAF8F4",
                  marginLeft: "0.4rem",
                  textDecoration: "underline",
                  textDecorationColor: "#C8A951",
                  textUnderlineOffset: "4px",
                }}>Solutions</span>
              </div>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontSize: "1rem",
                color: "rgba(200, 169, 81, 0.8)",
                marginBottom: "1.5rem",
                lineHeight: 1.6,
              }}>
                "Something trashy has yet to be so classy"
              </p>
              <p style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: "0.88rem",
                color: "rgba(250, 248, 244, 0.6)",
                lineHeight: 1.7,
                maxWidth: "320px",
              }}>
                Professional trash bin cleaning services bringing luxury-level cleanliness to your curb.
              </p>
            </div>

            {/* Quick links */}
            <div>
              <h4 style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#C8A951",
                marginBottom: "1.5rem",
              }}>Quick Links</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {["Services", "About", "Loyalty Program", "Contact"].map((link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase().replace(" ", "")}`}
                      style={{
                        fontFamily: "'Source Sans 3', sans-serif",
                        fontSize: "0.9rem",
                        color: "rgba(250, 248, 244, 0.7)",
                        textDecoration: "none",
                        transition: "color 0.2s ease",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#C8A951")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(250, 248, 244, 0.7)")}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#C8A951",
                marginBottom: "1.5rem",
              }}>Follow Us</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {[
                  { icon: <InstagramIcon />, label: "Instagram", href: "https://www.instagram.com" },
                  { icon: <FacebookIcon />, label: "Facebook", href: "https://www.facebook.com" },
                  { icon: <YouTubeIcon />, label: "YouTube", href: "https://www.youtube.com" },
                ].map(({ icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      color: "rgba(250, 248, 244, 0.7)",
                      textDecoration: "none",
                      fontFamily: "'Source Sans 3', sans-serif",
                      fontSize: "0.9rem",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#C8A951";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "rgba(250, 248, 244, 0.7)";
                    }}
                  >
                    <span style={{
                      width: "36px",
                      height: "36px",
                      border: "1px solid rgba(200, 169, 81, 0.3)",
                      borderRadius: "2px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}>{icon}</span>
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="gold-divider" style={{ marginBottom: "1.5rem" }} />

          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}>
            <p style={{
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: "0.78rem",
              color: "rgba(250, 248, 244, 0.45)",
            }}>
              © {new Date().getFullYear()} C.U.R.B. Solutions. All rights reserved.
            </p>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "0.9rem",
              color: "rgba(200, 169, 81, 0.6)",
            }}>
              Something trashy has yet to be so classy.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}

import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Skills", "Projects", "Education"];

const SKILLS = {
  "Programming & ML": ["Python", "NumPy", "Pandas", "SciPy", "Matplotlib", "Scikit-learn"],
  "Visualization & BI": ["Power BI", "Microsoft Excel", "Power Query"],
  "Databases & Tools": ["MySQL", "Jupyter Notebook", "Git"],
  "Data Methods": ["Data Cleaning", "EDA", "Statistical Analysis", "Feature Engineering"],
};

const PROJECTS = [
  {
    title: "Customer Purchase Trend Analysis",
    tags: ["Python", "SQL", "Power BI", "EDA"],
    desc: "End-to-end data analysis workflow examining customer behaviour and revenue trends. Used Pandas for cleaning & transformation, SQL window functions for segmentation, and built an interactive Power BI dashboard with KPIs.",
    link: "https://github.com/rakeshsampathi/Customer_shopping_trends_data_analysis_python_sql_powerbi",
    color: "#00c6a7",
  },
  {
    title: "Bias & Fairness Detection in ML Models",
    tags: ["Python", "Scikit-learn", "Fairlearn", "ML Pipeline"],
    desc: "Built a full ML pipeline to detect and reduce gender bias in hiring data. Trained a logistic regression model, evaluated fairness with DPD & EOD metrics, and applied Fairlearn's Demographic Parity method for bias mitigation.",
    link: "https://github.com/rakeshsampathi/Bias-and-Fairness-mitigation-in-Machine-Learning-Models",
    color: "#f97316",
  },
];

const EDUCATION = [
  {
    degree: "M.Sc. Big Data & Business Analytics",
    school: "FOM Hochschule für Oekonomie & Management",
    period: "Sept 2024 – Present",
    location: "Essen, Germany",
    current: true,
  },
  {
    degree: "B.Tech Computer Science & Engineering",
    school: "Teegala Krishna Reddy Engineering College",
    period: "Aug 2019 – June 2023",
    location: "Hyderabad, India",
    current: false,
  },
];

const CERTS = [
  "Excel Basics for Data Analysis — IBM",
  "Data Visualization & Dashboards with Excel and Cognos — IBM",
  "Databases and SQL for Data Science — IBM",
  "Python for Data Science, AI & Development — IBM",
  "SQL — HackerRank",
  "Python — HackerRank",
];

export default function Portfolio() {
  const [active, setActive] = useState("About");
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState({});
  const sectionRefs = useRef({});

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActive(e.target.dataset.section);
            setVisible((v) => ({ ...v, [e.target.dataset.section]: true }));
          }
        });
      },
      { threshold: 0.3 }
    );
    NAV_LINKS.forEach((s) => {
      if (sectionRefs.current[s]) obs.observe(sectionRefs.current[s]);
    });
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={styles.root}>
      <style>{css}</style>

      {/* NAV */}
      <nav style={{ ...styles.nav, ...(scrolled ? styles.navScrolled : {}) }}>
        <span style={styles.logo}>RS<span style={styles.logoDot}>.</span></span>
        <div style={styles.navLinks}>
          {NAV_LINKS.map((l) => (
            <button key={l} onClick={() => scrollTo(l)} style={{ ...styles.navBtn, ...(active === l ? styles.navBtnActive : {}) }}>
              {l}
            </button>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <header style={styles.hero}>
        <div style={styles.heroGlow} />
        <div style={styles.heroGrid} />
        <div style={styles.heroContent}>
          <p style={styles.heroEyebrow} className="fade-up-1">Data Analyst · ML Enthusiast · MSc Candidate</p>
          <h1 style={styles.heroName} className="fade-up-2">
            Rakesh<br /><span style={styles.heroNameAccent}>Sampathi</span>
          </h1>
          <p style={styles.heroSub} className="fade-up-3">
            Turning raw data into decisions — through Python, SQL, Power BI &amp; beyond.
          </p>
          <div style={styles.heroCtas} className="fade-up-4">
            <a href="mailto:sampathirakeshreddy@gmail.com" style={styles.ctaPrimary}>Get in Touch</a>
            <a href="https://github.com/Rakesh-Sampathi" target="_blank" rel="noreferrer" style={styles.ctaSecondary}>GitHub ↗</a>
          </div>
          <div style={styles.heroPills} className="fade-up-5">
            {["Essen, Germany", "Open to Werkstudent roles", "English C1 · German A2"].map((t) => (
              <span key={t} style={styles.pill}>{t}</span>
            ))}
          </div>
        </div>
        <div style={styles.heroOrb} className="float" />
      </header>

      {/* ABOUT */}
      <section ref={(r) => (sectionRefs.current["About"] = r)} data-section="About" style={styles.section}>
        <div style={styles.container}>
          <SectionLabel label="About Me" visible={visible["About"]} />
          <div style={styles.aboutGrid}>
            <div style={{ ...styles.aboutText, ...(visible["About"] ? styles.slideIn : {}) }}>
              <p style={styles.aboutP}>
                I'm a Master's student in <strong style={styles.hl}>Big Data &amp; Business Analytics</strong> at FOM Hochschule, Essen. With a background in Computer Science Engineering, I bridge technical programming skills with business intelligence.
              </p>
              <p style={styles.aboutP}>
                I specialise in building <strong style={styles.hl}>end-to-end data workflows</strong> — from raw data cleaning to interactive dashboards — and applying <strong style={styles.hl}>ethical ML methods</strong> to real-world problems like bias detection and fairness mitigation.
              </p>
              <p style={styles.aboutP}>
                Currently seeking a <strong style={styles.hl}>Werkstudent position</strong> where I can support data-driven decision-making in a professional environment.
              </p>
            </div>
            <div style={styles.aboutStats}>
              {[["2", "Projects"], ["6+", "Certifications"], ["4", "Tech Stacks"], ["A2", "German Level"]].map(([n, l]) => (
                <div key={l} style={styles.statCard}>
                  <span style={styles.statNum}>{n}</span>
                  <span style={styles.statLabel}>{l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section ref={(r) => (sectionRefs.current["Skills"] = r)} data-section="Skills" style={{ ...styles.section, ...styles.sectionAlt }}>
        <div style={styles.container}>
          <SectionLabel label="Skills" visible={visible["Skills"]} />
          <div style={styles.skillsGrid}>
            {Object.entries(SKILLS).map(([cat, items], ci) => (
              <div key={cat} style={{ ...styles.skillCard, animationDelay: `${ci * 0.1}s`, ...(visible["Skills"] ? styles.fadeIn : styles.invisible) }}>
                <h3 style={styles.skillCat}>{cat}</h3>
                <div style={styles.skillTags}>
                  {items.map((s) => <span key={s} style={styles.skillTag}>{s}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section ref={(r) => (sectionRefs.current["Projects"] = r)} data-section="Projects" style={styles.section}>
        <div style={styles.container}>
          <SectionLabel label="Projects" visible={visible["Projects"]} />
          <div style={styles.projectsGrid}>
            {PROJECTS.map((p, i) => (
              <div key={p.title} style={{ ...styles.projectCard, borderColor: p.color, animationDelay: `${i * 0.15}s`, ...(visible["Projects"] ? styles.fadeIn : styles.invisible) }}>
                <div style={{ ...styles.projectAccent, background: p.color }} />
                <div style={styles.projectTags}>
                  {p.tags.map((t) => <span key={t} style={{ ...styles.projectTag, color: p.color, borderColor: p.color }}>{t}</span>)}
                </div>
                <h3 style={styles.projectTitle}>{p.title}</h3>
                <p style={styles.projectDesc}>{p.desc}</p>
                <a href={p.link} target="_blank" rel="noreferrer" style={{ ...styles.projectLink, color: p.color }}>
                  View on GitHub ↗
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION & CERTS */}
      <section ref={(r) => (sectionRefs.current["Education"] = r)} data-section="Education" style={{ ...styles.section, ...styles.sectionAlt }}>
        <div style={styles.container}>
          <SectionLabel label="Education & Certifications" visible={visible["Education"]} />
          <div style={styles.eduGrid}>
            <div>
              <h3 style={styles.subHead}>Academic Background</h3>
              <div style={styles.timeline}>
                {EDUCATION.map((e, i) => (
                  <div key={e.degree} style={{ ...styles.timelineItem, animationDelay: `${i * 0.15}s`, ...(visible["Education"] ? styles.fadeIn : styles.invisible) }}>
                    <div style={styles.timelineDot}>
                      {e.current && <span style={styles.timelinePulse} />}
                    </div>
                    <div style={styles.timelineContent}>
                      {e.current && <span style={styles.badge}>Current</span>}
                      <h4 style={styles.degreeTitle}>{e.degree}</h4>
                      <p style={styles.schoolName}>{e.school}</p>
                      <p style={styles.schoolMeta}>{e.period} · {e.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 style={styles.subHead}>Certifications</h3>
              <div style={styles.certList}>
                {CERTS.map((c, i) => (
                  <div key={c} style={{ ...styles.certItem, animationDelay: `${i * 0.08}s`, ...(visible["Education"] ? styles.fadeIn : styles.invisible) }}>
                    <span style={styles.certCheck}>✓</span>
                    <span style={styles.certText}>{c}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <p style={styles.footerText}>Rakesh Reddy Sampathi · Essen, Germany</p>
        <div style={styles.footerLinks}>
          <a href="mailto:sampathirakeshreddy@gmail.com" style={styles.footerLink}>Email</a>
          <a href="https://linkedin.com/in/rakesh-reddy-sampathi" target="_blank" rel="noreferrer" style={styles.footerLink}>LinkedIn</a>
          <a href="https://github.com/Rakesh-Sampathi" target="_blank" rel="noreferrer" style={styles.footerLink}>GitHub</a>
          <a href="https://leetcode.com/rakesh-reddy-sampathi" target="_blank" rel="noreferrer" style={styles.footerLink}>LeetCode</a>
        </div>
        <p style={{ ...styles.footerText, opacity: 0.3, marginTop: 8 }}>+49 17682324442</p>
      </footer>
    </div>
  );
}

function SectionLabel({ label, visible }) {
  return (
    <div style={{ ...styles.sectionLabelWrap, ...(visible ? styles.fadeIn : styles.invisible) }}>
      <span style={styles.sectionLabelLine} />
      <h2 style={styles.sectionLabel}>{label}</h2>
      <span style={styles.sectionLabelLine} />
    </div>
  );
}

const styles = {
  root: { fontFamily: "'Syne', 'DM Sans', sans-serif", background: "#0a0a0f", color: "#e8e8f0", minHeight: "100vh", overflowX: "hidden" },
  nav: { position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 48px", transition: "all 0.3s ease" },
  navScrolled: { background: "rgba(10,10,15,0.9)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "14px 48px" },
  logo: { fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 24, color: "#fff", letterSpacing: "-1px" },
  logoDot: { color: "#00c6a7" },
  navLinks: { display: "flex", gap: 8 },
  navBtn: { background: "none", border: "none", color: "rgba(232,232,240,0.5)", fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 14, cursor: "pointer", padding: "8px 16px", borderRadius: 8, transition: "all 0.2s", letterSpacing: "0.02em" },
  navBtnActive: { color: "#fff", background: "rgba(0,198,167,0.12)" },

  hero: { position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" },
  heroGlow: { position: "absolute", top: "-20%", left: "-10%", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,198,167,0.12) 0%, transparent 70%)", pointerEvents: "none" },
  heroGrid: { position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize: "60px 60px", maskImage: "radial-gradient(ellipse at 30% 50%, black 30%, transparent 80%)" },
  heroContent: { position: "relative", zIndex: 2, maxWidth: 700, padding: "120px 48px 80px" },
  heroEyebrow: { color: "#00c6a7", fontWeight: 700, fontSize: 13, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 20 },
  heroName: { fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(56px, 8vw, 96px)", lineHeight: 1, margin: "0 0 24px", letterSpacing: "-3px", color: "#fff" },
  heroNameAccent: { WebkitTextStroke: "2px rgba(0,198,167,0.7)", color: "transparent" },
  heroSub: { fontSize: 18, color: "rgba(232,232,240,0.65)", lineHeight: 1.7, maxWidth: 500, marginBottom: 36 },
  heroCtas: { display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 32 },
  ctaPrimary: { background: "#00c6a7", color: "#0a0a0f", fontWeight: 700, fontSize: 14, padding: "14px 28px", borderRadius: 10, textDecoration: "none", letterSpacing: "0.04em", transition: "all 0.2s" },
  ctaSecondary: { border: "1px solid rgba(255,255,255,0.15)", color: "#fff", fontWeight: 600, fontSize: 14, padding: "14px 28px", borderRadius: 10, textDecoration: "none", letterSpacing: "0.04em", transition: "all 0.2s" },
  heroPills: { display: "flex", gap: 10, flexWrap: "wrap" },
  pill: { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(232,232,240,0.6)", fontSize: 12, padding: "6px 14px", borderRadius: 100, letterSpacing: "0.02em" },
  heroOrb: { position: "absolute", right: "8%", top: "50%", transform: "translateY(-50%)", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle at 40% 40%, rgba(0,198,167,0.15), rgba(249,115,22,0.08), transparent 70%)", border: "1px solid rgba(0,198,167,0.1)", pointerEvents: "none" },

  section: { padding: "96px 0" },
  sectionAlt: { background: "rgba(255,255,255,0.018)" },
  container: { maxWidth: 1100, margin: "0 auto", padding: "0 48px" },
  sectionLabelWrap: { display: "flex", alignItems: "center", gap: 20, marginBottom: 56 },
  sectionLabelLine: { flex: 1, height: 1, background: "rgba(255,255,255,0.08)" },
  sectionLabel: { fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase", color: "#00c6a7", whiteSpace: "nowrap" },

  aboutGrid: { display: "grid", gridTemplateColumns: "1fr auto", gap: 64, alignItems: "start" },
  aboutText: { transition: "all 0.6s ease" },
  aboutP: { fontSize: 17, lineHeight: 1.8, color: "rgba(232,232,240,0.75)", marginBottom: 20 },
  hl: { color: "#fff", fontWeight: 700 },
  aboutStats: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
  statCard: { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "24px 20px", textAlign: "center", minWidth: 100 },
  statNum: { display: "block", fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 36, color: "#00c6a7", lineHeight: 1 },
  statLabel: { display: "block", fontSize: 12, color: "rgba(232,232,240,0.4)", marginTop: 6, letterSpacing: "0.06em", textTransform: "uppercase" },

  skillsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 },
  skillCard: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: "28px 24px" },
  skillCat: { fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 13, color: "#00c6a7", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 },
  skillTags: { display: "flex", flexWrap: "wrap", gap: 8 },
  skillTag: { background: "rgba(255,255,255,0.06)", color: "rgba(232,232,240,0.8)", fontSize: 13, padding: "6px 12px", borderRadius: 8, fontWeight: 500 },

  projectsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: 24 },
  projectCard: { background: "rgba(255,255,255,0.03)", border: "1px solid", borderRadius: 20, padding: "32px", position: "relative", overflow: "hidden", transition: "transform 0.3s ease" },
  projectAccent: { position: "absolute", top: 0, left: 0, right: 0, height: 3, borderRadius: "20px 20px 0 0" },
  projectTags: { display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 },
  projectTag: { fontSize: 11, fontWeight: 700, border: "1px solid", padding: "4px 10px", borderRadius: 6, letterSpacing: "0.06em", textTransform: "uppercase" },
  projectTitle: { fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 20, color: "#fff", marginBottom: 12, lineHeight: 1.3 },
  projectDesc: { fontSize: 14, color: "rgba(232,232,240,0.6)", lineHeight: 1.75, marginBottom: 24 },
  projectLink: { fontSize: 13, fontWeight: 700, textDecoration: "none", letterSpacing: "0.04em" },

  eduGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" },
  subHead: { fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 13, color: "rgba(232,232,240,0.4)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 28 },
  timeline: { display: "flex", flexDirection: "column", gap: 0 },
  timelineItem: { display: "flex", gap: 20, paddingBottom: 32, position: "relative" },
  timelineDot: { width: 14, height: 14, borderRadius: "50%", background: "#00c6a7", flexShrink: 0, marginTop: 5, position: "relative" },
  timelinePulse: { position: "absolute", inset: -4, borderRadius: "50%", border: "2px solid rgba(0,198,167,0.4)", animation: "pulse 2s infinite" },
  timelineContent: { flex: 1 },
  badge: { display: "inline-block", background: "rgba(0,198,167,0.15)", color: "#00c6a7", fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 100, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 },
  degreeTitle: { fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16, color: "#fff", marginBottom: 6 },
  schoolName: { fontSize: 14, color: "rgba(232,232,240,0.6)", marginBottom: 4 },
  schoolMeta: { fontSize: 12, color: "rgba(232,232,240,0.35)" },
  certList: { display: "flex", flexDirection: "column", gap: 12 },
  certItem: { display: "flex", gap: 12, alignItems: "flex-start" },
  certCheck: { color: "#00c6a7", fontWeight: 700, flexShrink: 0, marginTop: 1 },
  certText: { fontSize: 14, color: "rgba(232,232,240,0.7)", lineHeight: 1.5 },

  footer: { borderTop: "1px solid rgba(255,255,255,0.06)", padding: "48px", textAlign: "center" },
  footerText: { fontSize: 13, color: "rgba(232,232,240,0.4)", marginBottom: 16 },
  footerLinks: { display: "flex", justifyContent: "center", gap: 32 },
  footerLink: { color: "rgba(232,232,240,0.5)", fontSize: 13, fontWeight: 600, textDecoration: "none", letterSpacing: "0.04em", transition: "color 0.2s" },

  fadeIn: { animation: "fadeUp 0.6s ease forwards" },
  invisible: { opacity: 0 },
  slideIn: { animation: "slideIn 0.7s ease forwards" },
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideIn {
    from { opacity: 0; transform: translateX(-24px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 0.6; }
    50% { transform: scale(1.4); opacity: 0; }
  }
  @keyframes float {
    0%, 100% { transform: translateY(-50%) scale(1); }
    50% { transform: translateY(calc(-50% - 18px)) scale(1.02); }
  }

  .fade-up-1 { animation: fadeUp 0.7s 0.1s ease both; }
  .fade-up-2 { animation: fadeUp 0.7s 0.25s ease both; }
  .fade-up-3 { animation: fadeUp 0.7s 0.4s ease both; }
  .fade-up-4 { animation: fadeUp 0.7s 0.55s ease both; }
  .fade-up-5 { animation: fadeUp 0.7s 0.7s ease both; }
  .float { animation: float 6s ease-in-out infinite; }

  a[style*="ctaPrimary"]:hover { opacity: 0.85; transform: translateY(-1px); }
  a[style*="ctaSecondary"]:hover { background: rgba(255,255,255,0.06); }
  a[style*="footerLink"]:hover { color: #00c6a7 !important; }
`;

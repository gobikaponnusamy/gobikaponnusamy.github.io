import React, { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Briefcase,
  CheckCircle2,
  Code2,
  Database,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Moon,
  Phone,
  Send,
  Server,
  Shield,
  Sparkles,
  X
} from "lucide-react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import "./styles.css";
import resumePdf from "./assets/Gobika-resume.pdf";
import profilePhoto from "./assets/profile-photo.png";

const navItems = ["Home", "About", "Experience", "Project", "Skills", "Contact"];

const focusCards = [
  [Sparkles, "System Design", ["Distributed systems", "Scalability", "API design", "Caching strategies", "Reliability", "Performance optimization"]],
  [Server, "Cloud & DevOps", ["Azure", "Docker", "Kubernetes", "CI/CD pipelines", "Monitoring & logging"]],
  [Shield, "Security Engineering", ["OWASP fixes", "Secure coding", "Vulnerability remediation", "Authentication flows", "Authorization systems", "Penetration test fixes"]],
  [Code2, "Full Stack Development", ["Backend services", "REST APIs", "React interfaces", "Enterprise integrations", "Distributed environments"]],
  [Database, "Performance & Reliability", ["Root cause analysis", "Performance tuning", "Production debugging", "Load optimization", "System reliability"]],
  [Briefcase, "Identity & Authentication", ["SAML", "SCIM", "LDAP", "OAuth", "Entra ID"]],
  [CheckCircle2, "Engineering Practices", ["Problem solving", "Cross-team collaboration", "Feature ownership", "Agile development", "Code reviews", "Maintainable architecture"]],
  [Sparkles, "AI & Automation", ["AI agents", "MCP servers", "Workflow automation", "AI integrations"]]
];

const experience = [
  {
    role: "Software Engineer - I",
    company: "ARIS (R&D)",
    period: "May 2024 - Present",
    badge: "Full-time",
    award: "Design Focus Award",
    bullets: [
      "Led migration from legacy SharePoint integration to Microsoft Graph API and Entra ID, improving reliability and maintainability of document services",
      "Owned end-to-end optimization of document operations by introducing caching and refining backend workflows, reducing load time from 8s to <2s and move operations from 34s to <5s",
      "Built and maintained backend microservices powering core platform modules including User Management, Document Storage, Tenant Management, and Collaboration services",
      "Migrated ADS Documents module from GWT to React, modernizing the frontend and improving user experience",
      "Designed and developed key platform features including Flowstarter integration, exportAuditLog CLI, tenant usage limit detection API, and enhancements to license management and backup systems",
      "Improved system stability by debugging production issues, performing root cause analysis, and resolving memory leaks, out-of-memory issues, and resilience-related problems",
      "Strengthened application security by fixing vulnerabilities in password reset flows and resolving findings from OWASP, SCA, and penetration testing",
      "Contributed to AI-driven automation by building a QA agent that converts Selenium tests to Playwright and generates test cases from natural language inputs, Zephyr test cases, and Confluence documentation using MCP and Claude",
      "Built AI agents, reusable skills, and MCP servers as part of early Agentic AI initiatives for workflow automation",
      "Collaborated with cross-functional teams to deliver features across releases and participated in a one-week onsite engagement in Germany"
    ],
    tech: ["Java", "Spring Boot", "React", "REST APIs", "Azure", "Graph API", "GWT", "JUnit", "Maven"]
  },
  {
    role: "API Gateway Cloud Intern",
    company: "Software AG (R&D)",
    period: "Sep 2023 - May 2024",
    badge: "Internship",
    award: "Thank You Award",
    bullets: [
      "Built CI/CD pipelines with Kubernetes-based runners.",
      "Developed React dashboard for API ecosystem tools.",
      "Improved DevPortal automation workflows."
    ],
    tech: ["React", "Kubernetes", "Docker", "CI/CD"]
  }
];

const driftGuardProject = {
  title: "DriftGuard",
  subtitle: "Production Behavior Diff and Deploy Gate Platform",
  summary: "Detects API regressions before deployment by comparing real production traffic with staging responses.",
  sections: [
    {
      title: "Problem",
      items: [
        "Traditional tests miss real-world API behavior",
        "Silent contract changes break downstream systems",
        "No reliable way to validate production behavior before release"
      ]
    },
    {
      title: "Solution",
      items: [
        "Captures real production API request-response snapshots",
        "Replays traffic against staging environments",
        "Performs deep comparison to detect breaking changes and regressions",
        "Blocks unsafe deployments using deploy gate decisions"
      ]
    },
    {
      title: "Key Features",
      items: [
        "Production API snapshot capture",
        "Async replay engine",
        "Deep JSON diffing (field, type, value changes)",
        "Drift classification (breaking, warning, performance)",
        "WebSocket live replay tracking",
        "Monaco side-by-side diff viewer",
        "Deploy gate decisions (allow, pending, block)",
        "PII redaction and ignore rules",
        "Baseline management and replay control",
        "Endpoint risk scoring and drift reports"
      ]
    },
    {
      title: "Architecture / How It Works",
      items: [
        "Captures safe production traffic using sampling and redaction",
        "Stores baselines in PostgreSQL",
        "Replays requests asynchronously to staging APIs",
        "Compares responses using JSON diff engine",
        "Streams live replay progress using WebSockets",
        "Uses Redis for live state tracking and performance",
        "Provides dashboard for inspection, reporting, and release decisions"
      ]
    },
    {
      title: "Engineering Highlights",
      items: [
        "Designed scalable replay architecture for real-world traffic validation",
        "Built JSON diff engine for API contract comparison",
        "Implemented real-time replay tracking using WebSockets",
        "Developed deploy gate logic for CI/CD style release control",
        "Handled PII safely using redaction and filtering rules"
      ]
    }
  ],
  stack: [
    ["Backend", "Java 21, Spring Boot, WebSocket, JPA"],
    ["Frontend", "React, TypeScript, Tailwind CSS, Monaco Editor"],
    ["Database & State", "PostgreSQL, Redis"],
    ["Infrastructure", "Docker Compose, nginx, mock APIs"]
  ]
};

const skills = [
  ["Languages & Frameworks", Code2, ["Java", "Spring Boot", "Spring Framework", "React", "TypeScript", "GWT", "Node.js"]],
  ["APIs & Integrations", Server, ["REST APIs", "Microsoft Graph API", "WebSocket"]],
  ["Authentication & Identity", Briefcase, ["SAML", "SCIM", "LDAP", "OAuth", "Entra ID"]],
  ["Tools & Infra", Database, ["Git", "Github", "Maven", "Docker", "Kubernetes", "PostgreSQL", "Redis", "Azure"]],
  ["AI", Sparkles, ["Amazon Bedrock", "Github copilot cli", "Claude code"]]
];

const education = [
  "BE Computer Science - Kongu Engineering College - CGPA: 9.16",
  "HSC - Bharathi Vidhyalaya School - 81.83%",
  "SSLC - Bharathi Vidhyalaya School - 94.6%"
];

const awards = [
  "Design Focus Award - SharePoint Graph API Migration",
  "Thank You Award - CI/CD Contributions",
  "Best Performer - Co-Curricular Activities",
  "IoT Based Smart Mirror(Paper) - First Prize",
  "Types of Password Attack(Paper) - Second Prize"
];

const sectionMotion = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }
};

const staggerGroup = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } }
};

const riseItem = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] } }
};

export default function App() {
  const [active, setActive] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.dataset.nav)),
      { rootMargin: "-40% 0px -45% 0px" }
    );
    document.querySelectorAll("[data-nav]").forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <div className="site-shell">
        <Navbar active={active} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <main>
          <Hero />
          <About />
          <Experience />
          <Project />
          <Skills />
          <Contact />
        </main>
      </div>
    </LazyMotion>
  );
}

function Navbar({ active, menuOpen, setMenuOpen }) {
  return (
    <header className="topbar">
      <a className="brand" href="#home">Gobika<span>.dev</span></a>
      <button className="menu-button" type="button" aria-label="Toggle navigation" onClick={() => setMenuOpen((value) => !value)}>
        {menuOpen ? <X size={18} /> : <Menu size={18} />}
      </button>
      <nav className={menuOpen ? "open" : ""}>
        {navItems.map((item) => (
          <a key={item} className={active === item ? "active" : ""} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>
            {item}
          </a>
        ))}
      </nav>
      <Moon className="theme-mark" size={16} />
    </header>
  );
}

function Panel({ id, nav, children }) {
  return (
    <m.section id={id} data-nav={nav} className="page-panel" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.22 }} variants={sectionMotion}>
      {children}
    </m.section>
  );
}

function Hero() {
  return (
    <Panel id="home" nav="Home">
      <div className="hero-layout">
        <m.div className="hero-copy" initial="hidden" animate="show" variants={staggerGroup}>
          <m.p className="eyebrow" variants={riseItem}>Software Engineer I</m.p>
          <m.h1 variants={riseItem}>Gobika <span>Ponnusamy</span></m.h1>
          <m.p className="hero-text" variants={riseItem}>Full-stack engineer building scalable microservices, modern frontend applications, and secure enterprise integrations.</m.p>
          <m.div className="quick-contact" variants={riseItem}>
            <a href="mailto:gobikaponnusamy2003@gmail.com"><Mail size={14} /> gobikaponnusamy2003@gmail.com</a>
            <a href="tel:+919025619499"><Phone size={14} /> +91 9025619499</a>
          </m.div>
          <m.div className="action-row" variants={riseItem}>
            <a className="btn primary" href="#project">View Project</a>
            <a className="btn ghost" href={resumePdf} download="Gobika-Ponnusamy-Resume.pdf"><Download size={14} /> Download Resume</a>
          </m.div>
          <m.div className="socials" variants={riseItem}>
            <a href="https://github.com/gobikaponnusamy" target="_blank" rel="noreferrer"><Github size={18} /></a>
            <a href="https://www.linkedin.com/in/gobika-ponnusamy/" target="_blank" rel="noreferrer"><Linkedin size={18} /></a>
          </m.div>
        </m.div>
        <m.div className="hero-photo" initial={{ opacity: 0, scale: 0.96, x: 24 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
          <img src={profilePhoto} alt="Gobika Ponnusamy" />
        </m.div>
      </div>
      <m.a className="featured-strip" href="#project" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} whileHover={{ y: -6 }}>
        <div>
          <p>Featured Project</p>
          <strong>DriftGuard <ArrowUpRight size={14} /></strong>
          <span>Production behavior diff and release gate platform.</span>
        </div>
        <div className="mini-tags">
          {["Java 21", "Spring Boot", "React", "PostgreSQL", "Redis"].map((tag) => <span key={tag}>{tag}</span>)}
        </div>
      </m.a>
    </Panel>
  );
}

function About() {
  return (
    <Panel id="about" nav="About">
      <div className="two-column">
        <div>
          <h2>About Me</h2>
          <p>I am a full stack software engineer who enjoys building systems that are not just functional but scalable, reliable, and secure.</p>
          <p>I am particularly interested in how systems behave in real world scenarios such as how they scale, fail, recover, and evolve over time. This drives me to focus on clean architecture, performance optimization, and long term maintainability rather than quick solutions.</p>
          <p>I enjoy working across the stack by designing backend services, building APIs, and contributing to frontend experiences while making sure everything integrates smoothly in a distributed environment.</p>
          <p>I am also deeply interested in security and system design, especially in areas like authentication, data integrity, and protecting applications from real-world vulnerabilities.</p>
          <p>Beyond coding, I value problem-solving, ownership, and continuous learning - whether it is debugging complex production issues, improving existing systems, or exploring new technologies.</p>
        </div>
        <m.div className="drive-card about-side-card" initial={{ opacity: 0, x: 22 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }} whileHover={{ y: -6 }}>
          <h3>What drives me</h3>
          <div>
            {[
              "Solving real-world engineering problems",
              "Building systems that scale and last",
              "Writing clean, maintainable code",
              "Continuously learning and improving"
            ].map((item) => (
              <span key={item}><CheckCircle2 size={14} /> {item}</span>
            ))}
          </div>
        </m.div>
      </div>
      <div className="focus-grid">
        {focusCards.map(([Icon, title, items], index) => (
          <m.article key={title} className="focus-card" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06, duration: 0.45 }} whileHover={{ y: -6 }}>
            <Icon size={18} />
            <h3>{title}</h3>
            {items.map((item) => <span key={item}>{item}</span>)}
          </m.article>
        ))}
      </div>
    </Panel>
  );
}
function Experience() {
  return (
    <Panel id="experience" nav="Experience">
      <h2>Experience</h2>
      <div className="timeline">
        <m.div className="timeline-line" initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} />
        {experience.map((job, index) => (
          <m.article className="timeline-card" key={job.role} initial={{ opacity: 0, x: 22 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.5 }}>
            <div className="timeline-dot" />
            <div className="job-date">{job.period}</div>
            <div className="job-card">
              <div className="job-head">
                <h3>{job.role} - {job.company}</h3>
                <span>{job.badge}</span>
              </div>
              <ul>{job.bullets.map((item) => <li key={item}>{item}</li>)}</ul>
              <p className="award">Received {job.award}</p>
              <div className="tag-row">{job.tech.map((tag) => <span key={tag}>{tag}</span>)}</div>
            </div>
          </m.article>
        ))}
      </div>
    </Panel>
  );
}

function Project() {
  return (
    <Panel id="project" nav="Project">
      <h2>Project</h2>
      <m.article className="project-case-hero" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}>
        <div className="project-icon-wrap">
          <Shield size={38} />
        </div>
        <div className="project-hero-copy">
          <div className="project-title-row">
            <h3>{driftGuardProject.title}</h3>
            <a href="https://github.com/gobikaponnusamy/DriftGuard" target="_blank" rel="noreferrer" aria-label="View DriftGuard on GitHub">
              <Github size={18} />
              <ArrowUpRight size={14} />
            </a>
          </div>
          <h4>{driftGuardProject.subtitle}</h4>
          <p>{driftGuardProject.summary}</p>
        </div>
      </m.article>

      <div className="project-case-layout">
        {driftGuardProject.sections.map((section) => <ProjectSection key={section.title} section={section} />)}
      </div>

      <div className="project-tech-stack">
        <h3>Tech Stack</h3>
        <div>
          {driftGuardProject.stack.map(([title, items]) => (
            <p key={title}><strong>{title}</strong><span>{items}</span></p>
          ))}
        </div>
      </div>
    </Panel>
  );
}

function ProjectSection({ section }) {
  return (
    <m.section className="project-case-section" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
      <h3>{section.title}</h3>
      <ul>
        {section.items.map((item) => (
          <li key={item}><CheckCircle2 size={13} /> <span>{item}</span></li>
        ))}
      </ul>
    </m.section>
  );
}

function Skills() {
  return (
    <Panel id="skills" nav="Skills">
      <h2>Skills</h2>
      <div className="skills-grid">
        {skills.map(([title, Icon, items], index) => (
          <m.article className="skill-card" key={title} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05, duration: 0.45 }} whileHover={{ y: -6 }}>
            <Icon size={18} />
            <h3>{title}</h3>
            <div>{items.map((item) => <span key={item}>{item}</span>)}</div>
          </m.article>
        ))}
      </div>
      <div className="extra-grid">
        <InfoList title="Education" items={education} />
        <InfoList title="Awards" items={awards} />
      </div>
    </Panel>
  );
}

function InfoList({ title, items }) {
  return (
    <m.article className="info-list" whileHover={{ y: -6 }}>
      <h3>{title}</h3>
      {items.map((item) => <p key={item}>{item}</p>)}
    </m.article>
  );
}

function Contact() {
  const handleContactSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const message = formData.get("message")?.toString().trim();
    const subject = encodeURIComponent(`Portfolio message from ${name || "visitor"}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);

    window.location.href = `mailto:gobikaponnusamy2003@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <Panel id="contact" nav="Contact">
      <div className="contact-layout">
        <div className="contact-copy">
          <h2>Let's Work<br /><span>Together</span></h2>
          <p>Open to building scalable products, solving real engineering problems, and contributing to high-impact teams.</p>
          <div className="quick-contact">
            <a href="mailto:gobikaponnusamy2003@gmail.com"><Mail size={14} /> gobikaponnusamy2003@gmail.com</a>
            <a href="tel:+919025619499"><Phone size={14} /> +91 9025619499</a>
          </div>
          <div className="action-row">
            <a className="btn ghost" href="https://github.com/gobikaponnusamy" target="_blank" rel="noreferrer"><Github size={14} /> GitHub</a>
            <a className="btn ghost" href="https://www.linkedin.com/in/gobika-ponnusamy/" target="_blank" rel="noreferrer"><Linkedin size={14} /> LinkedIn</a>
          </div>
        </div>
        <form className="message-card" onSubmit={handleContactSubmit}>
          <h3>Send a Message</h3>
          <label>Name<input name="name" placeholder="Your name" required /></label>
          <label>Email<input name="email" type="email" placeholder="Your email" required /></label>
          <label>Message<textarea name="message" placeholder="Your message" required /></label>
          <button type="submit"><Send size={14} /> Send Message</button>
        </form>
      </div>
      <footer>© 2026 Gobika Ponnusamy. All rights reserved.</footer>
    </Panel>
  );
}

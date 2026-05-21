'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Terminal, Download, Activity, Upload, Thermometer, Droplets, 
  Code, Cpu, Database, Eye, ShieldAlert, Mail, MapPin, 
  ChevronRight, CheckCircle2, Server, Menu, X, Send, Award, ExternalLink
} from 'lucide-react';

// --- Types & Interfaces ---
interface IconProps {
  size?: number;
  className?: string;
}

interface ProjectCardProps {
  title: string;
  tech: string[];
  description: string;
  features: string[];
  icon: React.ReactNode;
}

interface TerminalWindowProps {
  title: string;
  children: React.ReactNode;
}

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  width?: "fit-content" | "100%";
  className?: string;
}

// --- Custom Brand Icons ---
const GithubIcon = ({ size = 24, className = "" }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.48-1.54 6.48-7.1a5.08 5.08 0 0 0-1.38-3.5 4.7 4.7 0 0 0-.13-3.4s-1.1-.35-3.5 1.25a11.7 11.7 0 0 0-6.2 0C6.1 2.8 5 3.15 5 3.15a4.7 4.7 0 0 0-.13 3.4A5.08 5.08 0 0 0 3.5 10c0 5.54 3.34 6.74 6.48 7.1a4.8 4.8 0 0 0-1 3.02V22"/>
    <path d="M9 20c-5 1.5-5-2.5-7-3"/>
  </svg>
);

const LinkedinIcon = ({ size = 24, className = "" }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

// --- Custom Hooks ---
const useTypewriter = (words: string[], typingSpeed = 100, deletingSpeed = 50, pauseTime = 2000) => {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(currentWord.substring(0, text.length + 1));
        if (text === currentWord) {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        setText(currentWord.substring(0, text.length - 1));
        if (text === '') {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseTime]);

  return text;
};

// --- Animation Wrapper Component ---
const Reveal = ({ children, delay = 0, width = "100%", className = "" }: RevealProps) => {
  return (
    <div className={className} style={{ position: "relative", width, overflow: "hidden" }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: delay }}
      >
        {children}
      </motion.div>
    </div>
  );
};

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const navLinks = [
    { name: '/about', href: '#about' },
    { name: '/skills', href: '#skills' },
    { name: '/projects', href: '#projects' },
    { name: '/demo', href: '#demo' },
    { name: '/credentials', href: '#credentials' },
    { name: '/contact', href: '#contact' }
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 w-full bg-gray-950/80 backdrop-blur-md border-b border-gray-800 z-50"
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <a href="#" className="font-mono font-bold text-xl text-white tracking-tighter flex items-center gap-2 group">
          <Activity className="text-emerald-500 group-hover:animate-spin transition-all" size={24} />
          <span>Tahir<span className="text-emerald-500 text-shadow-glow">.sys</span></span>
        </a>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex gap-6 text-sm font-mono text-gray-400">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="hover:text-emerald-400 hover:-translate-y-0.5 transition-all">
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Nav Toggle */}
        <button 
          className="md:hidden text-gray-400 hover:text-white transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden bg-gray-900 border-b border-gray-800"
        >
          <div className="flex flex-col px-4 py-4 space-y-4 text-sm font-mono text-gray-400">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsOpen(false)}
                className="hover:text-emerald-400 transition-colors block w-full"
              >
                {link.name}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

const Hero = ({ onDownload }: { onDownload: () => void }) => {
  const typingText = useTypewriter(['AI Systems', 'IoT Solutions', 'Full Stack Apps']);

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 px-4 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
      
      {/* Animated Glowing Orbs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/20 blur-[120px] rounded-full pointer-events-none"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-1/3 right-1/4 translate-x-1/4 -translate-y-1/4 w-[400px] h-[400px] bg-blue-500/20 blur-[100px] rounded-full pointer-events-none"
      />

      <div className="z-10 text-center max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-900 border border-gray-800 mb-8 backdrop-blur-sm shadow-[0_0_15px_rgba(16,185,129,0.1)]"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
          <span className="text-sm text-gray-400 font-mono flex items-center gap-2">
            System Online <MapPin size={12} className="ml-1"/> Gujarat, India
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight"
        >
          I build <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-emerald-400 to-emerald-500 animate-gradient-x">intelligent systems</span>,<br/>
          not just websites.
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-400 mb-10 font-mono h-12 flex items-center justify-center gap-2"
        >
          <span className="text-gray-500">&gt; Initializing module:</span> 
          <span className="text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]">{typingText}<span className="animate-ping">|</span></span>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a href="#projects" className="flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/50 rounded-lg hover:bg-emerald-500/20 hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] hover:-translate-y-1 transition-all duration-300 font-mono group">
            <Terminal size={18} className="group-hover:animate-pulse" />
            Execute // View Projects
          </a>
          <a 
            href="/resume.pdf" 
            download="Tahir_Miya_Resume.pdf"
            onClick={onDownload} 
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white border border-gray-700 rounded-lg hover:border-emerald-500/50 hover:bg-gray-800 hover:-translate-y-1 transition-all duration-300 font-mono group"
          >
            <Download size={18} className="group-hover:text-emerald-400 transition-colors" />
            Download Resume.pdf
          </a>
        </motion.div>
      </div>
    </section>
  );
};

const TerminalWindow = ({ title, children }: TerminalWindowProps) => (
  <motion.div 
    whileHover={{ boxShadow: "0 25px 50px -12px rgba(16,185,129,0.15)" }}
    className="bg-gray-950 border border-gray-800 rounded-xl overflow-hidden shadow-2xl transition-all duration-500"
  >
    <div className="bg-gray-900 border-b border-gray-800 px-4 py-2 flex items-center gap-2">
      <div className="flex gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 cursor-pointer"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 cursor-pointer"></div>
        <div className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-500 cursor-pointer shadow-[0_0_5px_rgba(16,185,129,0.5)]"></div>
      </div>
      <span className="ml-4 text-xs font-mono text-gray-500">{title}</span>
    </div>
    <div className="p-6 relative">
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-20"></div>
      {children}
    </div>
  </motion.div>
);

const About = () => (
  <section id="about" className="py-24 px-4 max-w-4xl mx-auto scroll-mt-28">
    <Reveal>
      <TerminalWindow title="user@tahir-sys:~/about_me">
        <div className="font-mono text-gray-300 space-y-4 relative z-10">
          <p className="flex gap-2"><span className="text-emerald-500">tahir@sys:~$</span> cat identity.txt</p>
          <p className="pl-4 text-gray-400">
            I am a Computer Engineering student specializing in <strong className="text-white text-shadow-sm">Full Stack Development, AI/ML, and IoT systems</strong>.
          </p>
          <p className="flex gap-2 mt-4"><span className="text-emerald-500">tahir@sys:~$</span> ./analyze_mindset.sh</p>
          <ul className="pl-4 space-y-3 text-gray-400 list-none">
            <motion.li initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="flex items-center gap-2 group">
              <CheckCircle2 size={16} className="text-blue-500 group-hover:text-emerald-400 transition-colors"/> 
              <span className="group-hover:text-gray-300 transition-colors">Problem-solving mindset oriented towards real-world impact.</span>
            </motion.li>
            <motion.li initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="flex items-center gap-2 group">
              <CheckCircle2 size={16} className="text-blue-500 group-hover:text-emerald-400 transition-colors"/> 
              <span className="group-hover:text-gray-300 transition-colors">Hands-on project experience bridging hardware and software.</span>
            </motion.li>
            <motion.li initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="flex items-center gap-2 group">
              <CheckCircle2 size={16} className="text-blue-500 group-hover:text-emerald-400 transition-colors"/> 
              <span className="group-hover:text-gray-300 transition-colors">Passionate about deploying intelligent, accessible, and secure systems.</span>
            </motion.li>
          </ul>
        </div>
      </TerminalWindow>
    </Reveal>
  </section>
);

const Skills = () => {
  const skillCategories = [
    { title: "Programming", icon: <Code size={20}/>, skills: "Java, Python, JavaScript" },
    { title: "Web Development", icon: <Server size={20}/>, skills: "React, Node.js, HTML, CSS, REST APIs" },
    { title: "AI / ML", icon: <Activity size={20}/>, skills: "Machine Learning, Image Processing (OpenCV)" },
    { title: "Hardware / IoT", icon: <Cpu size={20}/>, skills: "ESP8266, ESP32, Sensor Systems" },
    { title: "Tools & Databases", icon: <Database size={20}/>, skills: "Git, MySQL, MongoDB, VS Code" },
  ];

  return (
    <section id="skills" className="py-24 px-4 bg-gray-900/50 border-y border-gray-800 relative overflow-hidden scroll-mt-28">
      <div className="max-w-6xl mx-auto relative z-10">
        <Reveal>
          <h2 className="text-3xl font-bold text-white mb-10 font-mono flex items-center gap-3">
            <span className="text-emerald-500 animate-pulse">#</span> System Capabilities
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <motion.div 
                whileHover={{ scale: 1.02, translateY: -5 }}
                className="p-6 bg-gray-950 border border-gray-800 rounded-lg hover:border-emerald-500/50 hover:shadow-[0_0_25px_rgba(16,185,129,0.15)] transition-all group h-full"
              >
                <div className="flex items-center gap-3 mb-4 text-emerald-400 group-hover:text-emerald-300">
                  <div className="p-2 bg-emerald-500/10 rounded-md group-hover:bg-emerald-500/20 transition-colors">
                    {cat.icon}
                  </div>
                  <h3 className="font-mono font-bold">{cat.title}</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">{cat.skills}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ title, tech, description, features, icon }: ProjectCardProps) => (
  <motion.div 
    whileHover={{ y: -8 }}
    className="bg-gray-950 border border-gray-800 rounded-xl p-6 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all flex flex-col h-full group"
  >
    <div className="flex items-start justify-between mb-4">
      <div className="p-3 bg-gray-900 rounded-lg text-blue-400 group-hover:scale-110 group-hover:text-blue-300 transition-all duration-300">
        {icon}
      </div>
      <div className="flex gap-2 flex-wrap justify-end max-w-[60%]">
        {tech.map((t, i) => (
          <span key={i} className="text-[10px] uppercase tracking-wider font-mono px-2 py-1 bg-gray-900 text-gray-400 rounded-md border border-gray-800 group-hover:border-blue-500/30 transition-colors">
            {t}
          </span>
        ))}
      </div>
    </div>
    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{title}</h3>
    <p className="text-gray-400 text-sm mb-6 flex-grow group-hover:text-gray-300 transition-colors">{description}</p>
    <div className="space-y-2 mt-auto">
      {features.map((f, i) => (
        <div key={i} className="flex items-start gap-2 text-sm text-gray-300 font-mono">
          <ChevronRight size={16} className="text-blue-500 shrink-0 mt-0.5 group-hover:translate-x-1 transition-transform" />
          <span>{f}</span>
        </div>
      ))}
    </div>
  </motion.div>
);

const Projects = () => (
  <section id="projects" className="py-24 px-4 max-w-6xl mx-auto scroll-mt-28">
    <Reveal>
      <h2 className="text-3xl font-bold text-white mb-10 font-mono flex items-center gap-3">
        <span className="text-blue-500 animate-pulse">/</span> Deployed Architectures
      </h2>
    </Reveal>
    
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Reveal delay={0.1} className="lg:col-span-3">
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="bg-gradient-to-br from-gray-900 to-gray-950 border border-emerald-500/40 rounded-xl p-1 relative overflow-hidden shadow-[0_0_30px_rgba(16,185,129,0.15)] group"
        >
          <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute top-0 right-0 bg-emerald-500 text-black text-xs font-bold px-3 py-1 rounded-bl-lg z-10 shadow-[0_0_10px_rgba(16,185,129,0.5)]">FEATURED SYSTEM</div>
          <div className="bg-gray-950 rounded-lg p-6 md:p-8 flex flex-col md:flex-row gap-8 relative z-10">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <Activity className="text-emerald-400" size={28} />
                <h3 className="text-2xl font-bold text-white">Smart Agro System</h3>
              </div>
              <p className="text-gray-400 mb-6">A full-stack agricultural intelligence platform integrating machine learning diagnostics with simulated IoT environmental data.</p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm text-gray-300 font-mono bg-gray-900 p-3 rounded border border-gray-800 hover:border-emerald-500/50 transition-colors">
                  <Server size={16} className="text-emerald-500" />
                  <span>React + Flask Architecture</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-300 font-mono bg-gray-900 p-3 rounded border border-gray-800 hover:border-emerald-500/50 transition-colors">
                  <Cpu size={16} className="text-emerald-500" />
                  <span>AI Model (.h5) for Leaf Disease Detection</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-300 font-mono bg-gray-900 p-3 rounded border border-gray-800 hover:border-emerald-500/50 transition-colors">
                  <Thermometer size={16} className="text-emerald-500" />
                  <span>Sensor Data Simulation (Temp, Humidity)</span>
                </div>
              </div>
            </div>
            
            <div className="flex-1 flex flex-col justify-center bg-gray-900/50 rounded-lg border border-gray-800 p-6 relative overflow-hidden group-hover:border-emerald-500/30 transition-colors">
               <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-30 rounded-lg"></div>
               <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 to-transparent"></div>
               <div className="relative z-10 text-center">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 180 }}
                    transition={{ duration: 0.5 }}
                    className="w-16 h-16 rounded-full border-2 border-dashed border-emerald-500/50 flex items-center justify-center mx-auto mb-4 bg-gray-950 shadow-[0_0_20px_rgba(16,185,129,0.3)] cursor-pointer"
                  >
                    <Upload size={24} className="text-emerald-400" />
                  </motion.div>
                  <p className="font-mono text-sm text-emerald-400 mb-2">Image Upload → Prediction Flow</p>
                  <p className="text-xs text-gray-500">Integrated Crop Health Analysis Dashboard</p>
               </div>
            </div>
          </div>
        </motion.div>
      </Reveal>

      <Reveal delay={0.2}>
        <ProjectCard 
          title="Vision-to-Braille System"
          tech={['Python', 'OpenCV', 'Hardware']}
          description="Accessibility tool that converts visual input into tangible Braille output for visually impaired users."
          features={[
            "Real-time image processing via OpenCV",
            "Translates text/shapes to tactile signals",
            "Focus on real-world accessibility"
          ]}
          icon={<Eye size={24} />}
        />
      </Reveal>

      <Reveal delay={0.3}>
        <ProjectCard 
          title="IoT Telemetry Network"
          tech={['ESP32', 'MQTT', 'React']}
          description="Real-time environmental monitoring array utilizing microcontrollers to stream sensor telemetry to a centralized dashboard."
          features={[
            "ESP32 hardware integration",
            "Low-latency MQTT pub/sub protocol",
            "Live data visualization frontend"
          ]}
          icon={<Cpu size={24} />}
        />
      </Reveal>

      <Reveal delay={0.4}>
        <ProjectCard 
          title="Malware Detection Engine"
          tech={['Python', 'ML', 'Security']}
          description="Email-based security system utilizing pattern filtering to block malicious content."
          features={[
            "Pattern-based filtering algorithms",
            "Automated email content scanning",
            "Improves endpoint security protocols"
          ]}
          icon={<ShieldAlert size={24} />}
        />
      </Reveal>
    </div>
  </section>
);

const InteractiveDemo = () => {
  const [status, setStatus] = useState('idle');

  const handleUpload = () => {
    if (status !== 'idle') return;
    setStatus('processing');
    setTimeout(() => {
      setStatus('done');
    }, 3000);
  };

  const reset = () => setStatus('idle');

  return (
    <section id="demo" className="py-24 px-4 bg-gray-900 border-y border-gray-800 relative scroll-mt-28">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-500/5 blur-[150px] pointer-events-none"></div>
      <div className="max-w-4xl mx-auto relative z-10">
        <Reveal>
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-white mb-4 font-mono">Try My AI Model</h2>
            <p className="text-gray-400">Live simulation of the Smart Agro diagnostic pipeline.</p>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="bg-gray-950 border border-gray-800 rounded-xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
            {status === 'processing' && (
              <motion.div 
                initial={{ left: '-100%' }}
                animate={{ left: '200%' }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 w-1/2 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50 z-20"
              />
            )}

            <div className="flex justify-between items-center mb-6 border-b border-gray-800 pb-4">
              <h3 className="text-lg text-white font-mono flex items-center gap-2">
                <Activity className="text-blue-500" />
                Smart Agro // Diagnostic Module
              </h3>
              <span className="text-xs bg-blue-500/20 text-blue-400 border border-blue-500/30 px-3 py-1 rounded-full font-mono animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.3)]">
                Simulation Active
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div 
                onClick={handleUpload}
                whileHover={status === 'idle' ? { scale: 1.02 } : {}}
                className={`border-2 border-dashed rounded-lg p-12 flex flex-col items-center justify-center text-center transition-all ${status === 'idle' ? 'border-gray-700 cursor-pointer hover:border-emerald-500 hover:bg-emerald-500/5 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] hover:shadow-[inset_0_0_20px_rgba(16,185,129,0.1)]' : 'border-gray-800 bg-gray-900/50 cursor-not-allowed'}`}
              >
                {status === 'idle' && (
                  <>
                    <Upload className="mb-4 text-gray-500 group-hover:text-emerald-400 transition-colors" size={32} />
                    <p className="text-gray-300 font-mono text-sm mb-2">Click to upload leaf image</p>
                    <p className="text-xs text-gray-600">Simulates passing image to Flask backend</p>
                  </>
                )}
                {status === 'processing' && (
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 border-4 border-gray-800 border-t-emerald-500 rounded-full animate-spin mb-4 shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
                    <p className="text-emerald-400 font-mono text-sm animate-pulse">Processing via OpenCV...</p>
                  </div>
                )}
                {status === 'done' && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex flex-col items-center">
                    <CheckCircle2 className="mb-4 text-emerald-500 drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]" size={32} />
                    <p className="text-emerald-400 font-mono text-sm mb-4">Analysis Complete</p>
                    <button onClick={(e) => { e.stopPropagation(); reset(); }} className="text-xs bg-gray-800 px-3 py-1 rounded hover:bg-gray-700 text-white transition-colors border border-gray-700 hover:border-gray-500">Reset Demo</button>
                  </motion.div>
                )}
              </motion.div>

              <div className="bg-black border border-gray-800 rounded-lg p-6 font-mono text-sm flex flex-col justify-center relative overflow-hidden min-h-[200px]">
                 <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-10"></div>

                {status === 'idle' && (
                  <div className="text-gray-600 flex items-center gap-2 relative z-20">
                    <span className="w-2 h-2 bg-gray-600 rounded-full animate-pulse"></span> Awaiting telemetry...
                  </div>
                )}
                
                {status === 'processing' && (
                  <div className="text-blue-400 space-y-2 relative z-20">
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>&gt; Initializing TensorFlow backend...</motion.p>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="animate-pulse">&gt; Running .h5 model inference...</motion.p>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>&gt; Fetching IoT sensor data...</motion.p>
                  </div>
                )}

                {status === 'done' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 relative z-20">
                    <div className="text-emerald-500 pb-2 border-b border-gray-800">&gt; Results Generated</div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
                        <p className="text-gray-500 text-xs mb-1">Crop Health</p>
                        <p className="text-white text-lg font-bold">87.4%</p>
                      </motion.div>
                      <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                        <p className="text-gray-500 text-xs mb-1">Diagnosis</p>
                        <p className="text-red-400 text-lg font-bold">Early Blight</p>
                      </motion.div>
                    </div>
                    
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-4 pt-4 border-t border-gray-800 bg-gray-900/50 p-3 rounded flex justify-between text-gray-400">
                       <span className="flex items-center gap-2 text-xs"><Thermometer size={14} className="text-orange-500 animate-pulse"/> 28.5°C</span>
                       <span className="flex items-center gap-2 text-xs"><Droplets size={14} className="text-blue-500 animate-pulse"/> 64% Hum</span>
                    </motion.div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const EducationTimeline = () => {
  return (
    <section className="py-24 px-4 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <Reveal>
          <div>
            <h2 className="text-2xl font-bold text-white mb-8 font-mono border-b border-gray-800 pb-4">Education</h2>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-gray-950 border border-gray-800 p-6 rounded-lg relative overflow-hidden shadow-xl"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-bl-full blur-xl"></div>
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-bl-full"></div>
              <h3 className="text-xl font-bold text-white mb-2 relative z-10">MBIT</h3>
              <p className="text-emerald-400 font-mono text-sm mb-4 relative z-10">Computer Engineering</p>
              <div className="flex gap-4 mb-4 text-sm relative z-10">
                <span className="bg-gray-900 text-gray-300 px-3 py-1 rounded border border-gray-800 shadow-inner">CGPA: <strong className="text-white">8.82</strong></span>
                <span className="bg-gray-900 text-gray-300 px-3 py-1 rounded border border-gray-800 shadow-inner">Minor: <strong className="text-blue-400">IoT</strong></span>
              </div>
            </motion.div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div>
            <h2 className="text-2xl font-bold text-white mb-8 font-mono border-b border-gray-800 pb-4">System Growth</h2>
            <div className="relative border-l border-gray-800 ml-3 space-y-8">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} viewport={{ once: true }} className="relative pl-6 group">
                <div className="absolute w-3 h-3 bg-gray-600 rounded-full -left-[6.5px] top-1.5 border-2 border-gray-950 group-hover:bg-gray-400 transition-colors"></div>
                <h4 className="text-white font-bold group-hover:text-emerald-400 transition-colors">Programming Fundamentals</h4>
                <p className="text-sm text-gray-500 mt-1">Mastered core languages and algorithms.</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} viewport={{ once: true }} className="relative pl-6 group">
                <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[6.5px] top-1.5 border-2 border-gray-950 shadow-[0_0_10px_rgba(59,130,246,0.5)] group-hover:bg-blue-400 transition-colors"></div>
                <h4 className="text-white font-bold group-hover:text-blue-400 transition-colors">AI & Hardware Integration</h4>
                <p className="text-sm text-gray-500 mt-1">Built ML models and integrated ESP microcontrollers.</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} viewport={{ once: true }} className="relative pl-6 group">
                <div className="absolute w-3 h-3 bg-emerald-500 rounded-full -left-[6.5px] top-1.5 border-2 border-gray-950 shadow-[0_0_15px_rgba(16,185,129,0.8)] group-hover:bg-emerald-400 transition-colors"></div>
                <h4 className="text-white font-bold group-hover:text-emerald-400 transition-colors">Full System Architecture</h4>
                <p className="text-sm text-gray-500 mt-1">Deploying end-to-end intelligent systems.</p>
              </motion.div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const Certifications = () => {
  const credentials = [
    { title: "State-Level TECHNOVATION", issuer: "Sardar Patel University", date: "Jan 2026", link: "#" },
    { title: "AWS Academy Graduate", subtitle: "Cloud Foundations", issuer: "Amazon Web Services", date: "Mar 2026", link: "#" },
    { title: "CVMU Hackathon 2024", issuer: "A.D Patel Institute of Technology", date: "Mar 2024", link: "#" }
  ];

  return (
    <section id="credentials" className="py-24 px-4 bg-gray-900/30 border-t border-gray-800 scroll-mt-28">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <div className="mb-10 flex items-center gap-3">
            <Award className="text-emerald-500" size={28} />
            <h2 className="text-3xl font-bold text-white font-mono">Verified Credentials</h2>
          </div>
        </Reveal>

        <div className="space-y-4">
          {credentials.map((cred, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <motion.a 
                href={cred.link}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.01, x: 5 }}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-5 bg-gray-950 border border-gray-800 rounded-lg hover:border-emerald-500/50 group transition-all"
              >
                <div>
                  <h3 className="text-white font-bold text-lg flex items-center gap-2 group-hover:text-emerald-400 transition-colors">
                    {cred.title}
                    <ExternalLink size={14} className="text-gray-600 group-hover:text-emerald-500 transition-colors opacity-0 group-hover:opacity-100" />
                  </h3>
                  {cred.subtitle && <p className="text-emerald-500/80 text-sm font-mono mt-1">{cred.subtitle}</p>}
                  <p className="text-gray-500 text-sm mt-1">{cred.issuer}</p>
                </div>
                <div className="mt-3 sm:mt-0 font-mono text-sm px-3 py-1 bg-gray-900 border border-gray-800 rounded text-gray-400">
                  {cred.date}
                </div>
              </motion.a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactSection = ({ showToast }: { showToast: (msg: string) => void }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      showToast("Payload transmitted successfully. Awaiting response.");
      setFormData({ name: '', email: '', message: '' });
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 px-4 max-w-4xl mx-auto border-t border-gray-800 scroll-mt-28">
      <Reveal>
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-white mb-4 font-mono flex items-center justify-center gap-3">
             Establish Connection
          </h2>
          <p className="text-gray-400">Open a secure channel to discuss projects or opportunities.</p>
        </div>
      </Reveal>
      
      <Reveal delay={0.2}>
        <TerminalWindow title="user@tahir-sys:~/secure_comms">
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group">
                <label className="block text-gray-400 font-mono text-sm mb-2 flex items-center gap-2 group-hover:text-emerald-400 transition-colors">&gt; client_name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 transition-all font-mono text-sm placeholder-gray-600 hover:border-gray-500"
                  placeholder="Enter your name"
                />
              </div>
              <div className="group">
                <label className="block text-gray-400 font-mono text-sm mb-2 flex items-center gap-2 group-hover:text-emerald-400 transition-colors">&gt; return_address</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 transition-all font-mono text-sm placeholder-gray-600 hover:border-gray-500"
                  placeholder="Enter your email"
                />
              </div>
            </div>
            <div className="group">
              <label className="block text-gray-400 font-mono text-sm mb-2 flex items-center gap-2 group-hover:text-emerald-400 transition-colors">&gt; payload_data</label>
              <textarea 
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 transition-all font-mono text-sm resize-none placeholder-gray-600 hover:border-gray-500"
                placeholder="Type your message here..."
              ></textarea>
            </div>
            <motion.button 
              whileHover={!isSending ? { scale: 1.01 } : {}}
              whileTap={!isSending ? { scale: 0.98 } : {}}
              type="submit" 
              disabled={isSending}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded font-mono text-sm transition-all ${isSending ? 'bg-gray-800 text-gray-400 cursor-not-allowed' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/50 hover:bg-emerald-500/20 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]'}`}
            >
              {isSending ? (
                <><span className="animate-spin w-4 h-4 border-2 border-gray-400 border-t-emerald-500 rounded-full"></span> Transmitting...</>
              ) : (
                <><Send size={16} /> Transmit Payload</>
              )}
            </motion.button>
          </form>
        </TerminalWindow>
      </Reveal>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-black py-8 border-t border-gray-900 text-center relative overflow-hidden">
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-emerald-500/5 blur-[50px] pointer-events-none"></div>
    <div className="flex justify-center gap-6 mb-6 relative z-10">
      <motion.a whileHover={{ y: -5, scale: 1.1 }} href="mailto:tahir786605@gmail.com" className="text-gray-500 hover:text-emerald-400 transition-colors">
        <Mail size={22} />
      </motion.a>
      <motion.a whileHover={{ y: -5, scale: 1.1 }} href="https://github.com/TAHIRDON" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-colors">
        <GithubIcon size={22} />
      </motion.a>
      {/* UPDATE YOUR LINKEDIN URL HERE */}
      <motion.a whileHover={{ y: -5, scale: 1.1 }} href="https://www.linkedin.com/in/tahir-miya-a26089399" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-blue-500 transition-colors">
        <LinkedinIcon size={22} />
      </motion.a>
    </div>
    <p className="text-gray-600 text-xs font-mono flex items-center justify-center gap-2 relative z-10">
      <Terminal size={12}/> Engineered by Tahir Miya. All systems nominal.
    </p>
  </footer>
);

export default function App() {
  const [toast, setToast] = useState({ show: false, message: '' });

  const showToast = (message: string) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 3500);
  };

  const handleDownload = () => {
    showToast("Downloading Resume...");
  };

  return (
    <div className="bg-black min-h-screen text-slate-300 selection:bg-emerald-500/30 selection:text-emerald-200 font-sans scroll-smooth relative">
      <Navbar />
      
      <div 
        className={`fixed bottom-6 right-6 z-50 bg-gray-900 border border-emerald-500/50 text-emerald-400 px-4 py-3 rounded shadow-[0_0_20px_rgba(16,185,129,0.25)] font-mono text-sm flex items-center gap-3 transition-all duration-300 transform ${toast.show ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-95 pointer-events-none'}`}
      >
        <Activity size={18} className="animate-pulse" />
        {toast.message}
      </div>

      <main className="scroll-smooth">
        <Hero onDownload={handleDownload} />
        <About />
        <Skills />
        <Projects />
        <InteractiveDemo />
        <EducationTimeline />
        <Certifications />
        <ContactSection showToast={showToast} />
      </main>
      <Footer />
    </div>
  );
}
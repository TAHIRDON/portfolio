'use client';
import React, { useState, useEffect } from 'react';
import { 
  Terminal, Download, Activity, Upload, Thermometer, Droplets, 
  Code, Cpu, Database, Eye, ShieldAlert, Mail, MapPin, 
  ChevronRight, CheckCircle2, Server, Menu, X, Send
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

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const navLinks = [
    { name: '/about', href: '#about' },
    { name: '/skills', href: '#skills' },
    { name: '/projects', href: '#projects' },
    { name: '/demo', href: '#demo' },
    { name: '/contact', href: '#contact' }
  ];

  return (
    <nav className="fixed top-0 w-full bg-gray-950/80 backdrop-blur-md border-b border-gray-800 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <a href="#" className="font-mono font-bold text-xl text-white tracking-tighter flex items-center gap-2">
          <Activity className="text-emerald-500" size={24} />
          <span>Tahir<span className="text-emerald-500">.sys</span></span>
        </a>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex gap-6 text-sm font-mono text-gray-400">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="hover:text-emerald-400 transition-colors">
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
        <div className="md:hidden bg-gray-900 border-b border-gray-800">
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
        </div>
      )}
    </nav>
  );
};

const Hero = ({ onDownload }: { onDownload: () => void }) => {
  const typingText = useTypewriter(['AI Systems', 'IoT Solutions', 'Full Stack Apps']);

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 px-4 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
      
      <div className="z-10 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-900 border border-gray-800 mb-8">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-sm text-gray-400 font-mono flex items-center gap-2">
            System Online <MapPin size={12} className="ml-1"/> Gujarat, India
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
          I build <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-emerald-400">intelligent systems</span>,<br/>
          not just websites.
        </h1>

        <div className="text-xl md:text-2xl text-gray-400 mb-10 font-mono h-12 flex items-center justify-center gap-2">
          <span className="text-gray-500">&gt; Initializing module:</span> 
          <span className="text-emerald-400">{typingText}<span className="animate-ping">|</span></span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#projects" className="flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/50 rounded-lg hover:bg-emerald-500/20 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all font-mono">
            <Terminal size={18} />
            Execute // View Projects
          </a>
          <a 
            href="/resume.pdf" 
            download="Tahir_Miya_Resume.pdf"
            onClick={onDownload} 
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white border border-gray-700 rounded-lg hover:border-gray-500 hover:bg-gray-800 transition-all font-mono"
          >
            <Download size={18} />
            Download Resume.pdf
          </a>
        </div>
      </div>
    </section>
  );
};

const TerminalWindow = ({ title, children }: TerminalWindowProps) => (
  <div className="bg-gray-950 border border-gray-800 rounded-xl overflow-hidden shadow-2xl">
    <div className="bg-gray-900 border-b border-gray-800 px-4 py-2 flex items-center gap-2">
      <div className="flex gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
        <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
      </div>
      <span className="ml-4 text-xs font-mono text-gray-500">{title}</span>
    </div>
    <div className="p-6">
      {children}
    </div>
  </div>
);

const About = () => (
  <section id="about" className="py-20 px-4 max-w-4xl mx-auto pt-24">
    <TerminalWindow title="user@tahir-sys:~/about_me">
      <div className="font-mono text-gray-300 space-y-4">
        <p className="flex gap-2"><span className="text-emerald-500">tahir@sys:~$</span> cat identity.txt</p>
        <p className="pl-4 text-gray-400">
          I am a Computer Engineering student specializing in <strong className="text-white">Full Stack Development, AI/ML, and IoT systems</strong>.
        </p>
        <p className="flex gap-2 mt-4"><span className="text-emerald-500">tahir@sys:~$</span> ./analyze_mindset.sh</p>
        <ul className="pl-4 space-y-2 text-gray-400 list-none">
          <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-blue-500"/> Problem-solving mindset oriented towards real-world impact.</li>
          <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-blue-500"/> Hands-on project experience bridging hardware and software.</li>
          <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-blue-500"/> Passionate about deploying intelligent, accessible, and secure systems.</li>
        </ul>
      </div>
    </TerminalWindow>
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
    <section id="skills" className="py-20 px-4 bg-gray-900/50 border-y border-gray-800 pt-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-10 font-mono flex items-center gap-3">
          <span className="text-emerald-500">#</span> System Capabilities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat, i) => (
            <div key={i} className="p-6 bg-gray-950 border border-gray-800 rounded-lg hover:border-emerald-500/50 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)] transition-all group">
              <div className="flex items-center gap-3 mb-4 text-emerald-400 group-hover:text-emerald-300">
                {cat.icon}
                <h3 className="font-mono font-bold">{cat.title}</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">{cat.skills}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ title, tech, description, features, icon }: ProjectCardProps) => (
  <div className="bg-gray-950 border border-gray-800 rounded-xl p-6 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all flex flex-col h-full">
    <div className="flex items-start justify-between mb-4">
      <div className="p-3 bg-gray-900 rounded-lg text-blue-400">
        {icon}
      </div>
      <div className="flex gap-2 flex-wrap justify-end max-w-[60%]">
        {tech.map((t, i) => (
          <span key={i} className="text-[10px] uppercase tracking-wider font-mono px-2 py-1 bg-gray-900 text-gray-400 rounded-md border border-gray-800">
            {t}
          </span>
        ))}
      </div>
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-gray-400 text-sm mb-6 flex-grow">{description}</p>
    <div className="space-y-2 mt-auto">
      {features.map((f, i) => (
        <div key={i} className="flex items-start gap-2 text-sm text-gray-300 font-mono">
          <ChevronRight size={16} className="text-blue-500 shrink-0 mt-0.5" />
          <span>{f}</span>
        </div>
      ))}
    </div>
  </div>
);

const Projects = () => (
  <section id="projects" className="py-20 px-4 max-w-6xl mx-auto pt-24">
    <h2 className="text-3xl font-bold text-white mb-10 font-mono flex items-center gap-3">
      <span className="text-blue-500">/</span> Deployed Architectures
    </h2>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-3">
        <div className="bg-gradient-to-br from-gray-900 to-gray-950 border border-emerald-500/30 rounded-xl p-1 relative overflow-hidden shadow-[0_0_30px_rgba(16,185,129,0.1)]">
          <div className="absolute top-0 right-0 bg-emerald-500 text-black text-xs font-bold px-3 py-1 rounded-bl-lg z-10">FEATURED SYSTEM</div>
          <div className="bg-gray-950 rounded-lg p-6 md:p-8 flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <Activity className="text-emerald-400" size={28} />
                <h3 className="text-2xl font-bold text-white">Smart Agro System</h3>
              </div>
              <p className="text-gray-400 mb-6">A full-stack agricultural intelligence platform integrating machine learning diagnostics with simulated IoT environmental data.</p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm text-gray-300 font-mono bg-gray-900 p-3 rounded border border-gray-800">
                  <Server size={16} className="text-emerald-500" />
                  <span>React + Flask Architecture</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-300 font-mono bg-gray-900 p-3 rounded border border-gray-800">
                  <Cpu size={16} className="text-emerald-500" />
                  <span>AI Model (.h5) for Leaf Disease Detection</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-300 font-mono bg-gray-900 p-3 rounded border border-gray-800">
                  <Thermometer size={16} className="text-emerald-500" />
                  <span>Sensor Data Simulation (Temp, Humidity)</span>
                </div>
              </div>
            </div>
            
            <div className="flex-1 flex flex-col justify-center bg-gray-900/50 rounded-lg border border-gray-800 p-6 relative">
               <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-30 rounded-lg"></div>
               <div className="relative z-10 text-center">
                  <div className="w-16 h-16 rounded-full border-2 border-dashed border-emerald-500/50 flex items-center justify-center mx-auto mb-4 bg-gray-950 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                    <Upload size={24} className="text-emerald-400" />
                  </div>
                  <p className="font-mono text-sm text-emerald-400 mb-2">Image Upload -gt; Prediction Flow</p>
                  <p className="text-xs text-gray-500">Integrated Crop Health Analysis Dashboard</p>
               </div>
            </div>
          </div>
        </div>
      </div>

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
    <section id="demo" className="py-20 px-4 bg-gray-900 border-y border-gray-800 pt-24">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-white mb-4 font-mono">Try My AI Model</h2>
          <p className="text-gray-400">Live simulation of the Smart Agro diagnostic pipeline.</p>
        </div>

        <div className="bg-gray-950 border border-gray-800 rounded-xl p-6 md:p-8 shadow-2xl">
          <div className="flex justify-between items-center mb-6 border-b border-gray-800 pb-4">
            <h3 className="text-lg text-white font-mono flex items-center gap-2">
              <Activity className="text-blue-500" />
              Smart Agro // Diagnostic Module
            </h3>
            <span className="text-xs bg-blue-500/20 text-blue-400 border border-blue-500/30 px-3 py-1 rounded-full font-mono animate-pulse">
              Simulation Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div 
              onClick={handleUpload}
              className={`border-2 border-dashed rounded-lg p-12 flex flex-col items-center justify-center text-center transition-all ${status === 'idle' ? 'border-gray-700 cursor-pointer hover:border-emerald-500 hover:bg-emerald-500/5' : 'border-gray-800 bg-gray-900/50 cursor-not-allowed'}`}
            >
              {status === 'idle' && (
                <>
                  <Upload className="mb-4 text-gray-500" size={32} />
                  <p className="text-gray-300 font-mono text-sm mb-2">Click to upload leaf image</p>
                  <p className="text-xs text-gray-600">Simulates passing image to Flask backend</p>
                </>
              )}
              {status === 'processing' && (
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 border-4 border-gray-800 border-t-emerald-500 rounded-full animate-spin mb-4"></div>
                  <p className="text-emerald-400 font-mono text-sm animate-pulse">Processing via OpenCV...</p>
                </div>
              )}
              {status === 'done' && (
                <div className="flex flex-col items-center">
                  <CheckCircle2 className="mb-4 text-emerald-500" size={32} />
                  <p className="text-emerald-400 font-mono text-sm mb-4">Analysis Complete</p>
                  <button onClick={(e) => { e.stopPropagation(); reset(); }} className="text-xs bg-gray-800 px-3 py-1 rounded hover:bg-gray-700 text-white">Reset Demo</button>
                </div>
              )}
            </div>

            <div className="bg-black border border-gray-800 rounded-lg p-6 font-mono text-sm flex flex-col justify-center relative overflow-hidden min-h-[200px]">
               <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-10"></div>

              {status === 'idle' && (
                <div className="text-gray-600 flex items-center gap-2 relative z-20">
                  <span className="w-2 h-2 bg-gray-600 rounded-full"></span> Awaiting telemetry...
                </div>
              )}
              
              {status === 'processing' && (
                <div className="text-blue-400 space-y-2 relative z-20">
                  <p>&gt; Initializing TensorFlow backend...</p>
                  <p className="animate-pulse">&gt; Running .h5 model inference...</p>
                  <p>&gt; Fetching IoT sensor data...</p>
                </div>
              )}

              {status === 'done' && (
                <div className="space-y-4 relative z-20">
                  <div className="text-emerald-500 pb-2 border-b border-gray-800">&gt; Results Generated</div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Crop Health</p>
                      <p className="text-white text-lg">87.4%</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs mb-1">Diagnosis</p>
                      <p className="text-red-400 text-lg">Early Blight</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-800 bg-gray-900/50 p-3 rounded flex justify-between text-gray-400">
                     <span className="flex items-center gap-2 text-xs"><Thermometer size={14} className="text-orange-500"/> 28.5°C</span>
                     <span className="flex items-center gap-2 text-xs"><Droplets size={14} className="text-blue-500"/> 64% Hum</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const EducationTimeline = () => {
  return (
    <section className="py-20 px-4 max-w-4xl mx-auto pt-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold text-white mb-8 font-mono border-b border-gray-800 pb-4">Education</h2>
          <div className="bg-gray-950 border border-gray-800 p-6 rounded-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-bl-full"></div>
            <h3 className="text-xl font-bold text-white mb-2">MBIT</h3>
            <p className="text-emerald-400 font-mono text-sm mb-4">Computer Engineering</p>
            <div className="flex gap-4 mb-4 text-sm">
              <span className="bg-gray-900 text-gray-300 px-3 py-1 rounded border border-gray-800">CGPA: <strong className="text-white">8.82</strong></span>
              <span className="bg-gray-900 text-gray-300 px-3 py-1 rounded border border-gray-800">Minor: <strong className="text-blue-400">IoT</strong></span>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white mb-8 font-mono border-b border-gray-800 pb-4">System Growth</h2>
          <div className="relative border-l border-gray-800 ml-3 space-y-8">
            <div className="relative pl-6">
              <div className="absolute w-3 h-3 bg-gray-600 rounded-full -left-[6.5px] top-1.5 border-2 border-gray-950"></div>
              <h4 className="text-white font-bold">Programming Fundamentals</h4>
              <p className="text-sm text-gray-500 mt-1">Mastered core languages and algorithms.</p>
            </div>
            <div className="relative pl-6">
              <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[6.5px] top-1.5 border-2 border-gray-950 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
              <h4 className="text-white font-bold">AI & Hardware Integration</h4>
              <p className="text-sm text-gray-500 mt-1">Built ML models and integrated ESP microcontrollers.</p>
            </div>
            <div className="relative pl-6">
              <div className="absolute w-3 h-3 bg-emerald-500 rounded-full -left-[6.5px] top-1.5 border-2 border-gray-950 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
              <h4 className="text-white font-bold">Full System Architecture</h4>
              <p className="text-sm text-gray-500 mt-1">Deploying end-to-end intelligent systems.</p>
            </div>
          </div>
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
    <section id="contact" className="py-20 px-4 max-w-4xl mx-auto border-t border-gray-800 pt-24">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-white mb-4 font-mono flex items-center justify-center gap-3">
           Establish Connection
        </h2>
        <p className="text-gray-400">Open a secure channel to discuss projects or opportunities.</p>
      </div>
      
      <TerminalWindow title="user@tahir-sys:~/secure_comms">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-400 font-mono text-sm mb-2 flex items-center gap-2">&gt; client_name</label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white focus:border-emerald-500 focus:outline-none transition-colors font-mono text-sm placeholder-gray-600"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-gray-400 font-mono text-sm mb-2 flex items-center gap-2">&gt; return_address</label>
              <input 
                type="email" 
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white focus:border-emerald-500 focus:outline-none transition-colors font-mono text-sm placeholder-gray-600"
                placeholder="Enter your email"
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-400 font-mono text-sm mb-2 flex items-center gap-2">&gt; payload_data</label>
            <textarea 
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white focus:border-emerald-500 focus:outline-none transition-colors font-mono text-sm resize-none placeholder-gray-600"
              placeholder="Type your message here..."
            ></textarea>
          </div>
          <button 
            type="submit" 
            disabled={isSending}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded font-mono text-sm transition-all ${isSending ? 'bg-gray-800 text-gray-400 cursor-not-allowed' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/50 hover:bg-emerald-500/20 hover:shadow-[0_0_15px_rgba(16,185,129,0.2)]'}`}
          >
            {isSending ? (
              <><span className="animate-spin w-4 h-4 border-2 border-gray-400 border-t-emerald-500 rounded-full"></span> Transmitting...</>
            ) : (
              <><Send size={16} /> Transmit Payload</>
            )}
          </button>
        </form>
      </TerminalWindow>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-black py-8 border-t border-gray-900 text-center">
    <div className="flex justify-center gap-6 mb-6">
      <a href="mailto:contact@example.com" className="text-gray-500 hover:text-emerald-400 hover:scale-110 transition-all">
        <Mail size={22} />
      </a>
      <a href="https://github.com" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white hover:scale-110 transition-all">
        <GithubIcon size={22} />
      </a>
      <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-blue-500 hover:scale-110 transition-all">
        <LinkedinIcon size={22} />
      </a>
    </div>
    <p className="text-gray-600 text-xs font-mono flex items-center justify-center gap-2">
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
        className={`fixed bottom-6 right-6 z-50 bg-gray-900 border border-emerald-500/50 text-emerald-400 px-4 py-3 rounded shadow-[0_0_20px_rgba(16,185,129,0.25)] font-mono text-sm flex items-center gap-3 transition-all duration-300 transform ${toast.show ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'}`}
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
        <ContactSection showToast={showToast} />
      </main>
      <Footer />
    </div>
  );
}
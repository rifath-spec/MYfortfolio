
import { ProfileData } from './types';

export const PROFILE_DATA: ProfileData = {
  name: "Rifath Ahamed",
  title: "Graduate – IT & Operations | MIS, HR & Financial Support | Web & Business Systems Development",
  summary: "Results-driven IT & Operations specialist with a BSc in Management and Information Technology. I bridge the gap between complex technical infrastructure and strategic management to optimize organizational workflows. Expert in building bespoke MIS solutions, automating administrative processes, and coordinating large-scale logistics and construction projects.",
  profileImage: "https://miyqdfjfphrbusfnijur.supabase.co/storage/v1/object/public/portfolio-images/profile%20image.png",
  resumeUrl: "https://miyqdfjfphrbusfnijur.supabase.co/storage/v1/object/public/portfolio-cv/Rifath%20Ahamed%20CV.pdf",
  contact: {
    phone: "075 092 7652",
    email: "arifath98@gmail.com",
    location: "Trincomalee, Sri Lanka",
    linkedin: "rifath-ahamed-46b552326",
    linkedinUrl: "https://www.linkedin.com/in/rifath-ahamed-46b552326",
    githubUrl: "https://github.com/",
    instagramUrl: "https://instagram.com/",
    twitterUrl: "https://twitter.com/"
  },
  coreCompetencies: [
    "Project Management & Coordination",
    "Management Information Systems (MIS)",
    "Full-Stack Web Development",
    "Logistics & Transport Optimization",
    "Database Architecture (MySQL)",
    "Technical Support & Troubleshooting",
    "Strategic Resource Planning",
    "Business Process Automation"
  ],
  education: [
    {
      degree: "Bachelor of Science - BS, Management and Information Technology",
      institution: "South Eastern University of Sri Lanka",
      period: "August 2022 – December 2025",
      details: [
        "Specializing in the intersection of enterprise management and technical implementation.",
        "Dean's List candidate focusing on system analysis and operational efficiency."
      ]
    },
    {
      degree: "Association of Accounting Technicians (AAT Sri Lanka)",
      institution: "Zip Campus, Sri Lanka",
      period: "In Progress",
      details: ["Focusing on financial management systems and audit support."]
    }
  ],
  experience: [
    {
      role: "Transport Management Intern",
      company: "Jay Jay Mills Lanka (Pvt) Ltd – Trincomalee",
      period: "May 2025 – Present",
      location: "Kappalthurai Industrial Estate, Trincomalee",
      description: [
        "Optimizing daily transport logistics for a workforce of 1000+, reducing routing inefficiencies by 15%.",
        "Managing real-time vehicle performance tracking and driver safety compliance databases.",
        "Coordinating with HR to ensure seamless shift-based transportation planning across multiple industrial sites.",
        "Implementing digital scheduling tools to replace manual paper-based tracking systems."
      ]
    },
    {
      role: "Student Intern",
      company: "South Eastern University of Sri Lanka",
      period: "February 2023 – December 2024",
      description: [
        "Supported university-wide IT infrastructure, handling troubleshooting for over 200 workstations.",
        "Developed internal data entry tools that improved departmental record-keeping speed by 30%.",
        "Assisted in the maintenance of administrative databases and student portal synchronization."
      ]
    },
    {
      role: "Construction Project Coordinator",
      company: "Grace Construction Trincomalee",
      period: "August 2019 – January 2021",
      location: "Trincomalee, Sri Lanka",
      description: [
        "Managed project timelines and resource allocation for medium-scale civil construction projects.",
        "Liaised between on-site engineers and corporate stakeholders to ensure budget adherence.",
        "Oversaw procurement logistics for critical construction materials, minimizing on-site downtime."
      ]
    }
  ],
  projects: [
    {
      title: "Thampalahamam Pradeshiya Sabha Portal",
      technologies: ["PHP", "MySQL", "JavaScript", "Tailwind CSS"],
      description: [
        "A comprehensive digital governance portal designed to streamline public service delivery for the Thampalahamam region.",
        "Features include public notice boards, automated service requests, and an administrative back-end for local government staff."
      ],
      githubUrl: "#", 
      demoUrl: "https://thps.my-board.org/thps/",
      image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1470&auto=format&fit=crop" 
    },
    {
      title: "Home Repair & Renovation Platform",
      technologies: ["PHP", "HTML5", "CSS3", "MySQL"],
      description: [
        "End-to-end service management system allowing homeowners to book, track, and review renovation projects.",
        "Integrated a project bidding system for contractors and a secure client communication dashboard."
      ],
      githubUrl: "#",
      demoUrl: "https://webbasedrenovation.infinityfree.me/index.php",
      image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=1470&auto=format&fit=crop" 
    },
    {
      title: "FMC GPA Calculator",
      technologies: ["React", "TypeScript", "Tailwind CSS"],
      description: [
        "A precision tool for university students to track academic progress based on SEUSL specific grading weights.",
        "Developed to reduce manual calculation errors and provide visual progress tracking for degree completion."
      ],
      githubUrl: "#",
      demoUrl: "https://fmcs-gpa.vercel.app/",
      image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1470&auto=format&fit=crop"
    },
    {
      title: "AI Vital - Resource Hub",
      technologies: ["Next.js", "Vercel", "API Integration"],
      description: [
        "A curated ecosystem for artificial intelligence tools, providing categorized access to cutting-edge AI models.",
        "Designed with a focus on high-performance search and responsive discovery for technical professionals."
      ],
      githubUrl: "#",
      demoUrl: "https://ai-vital-zeta.vercel.app/",
      image: "https://miyqdfjfphrbusfnijur.supabase.co/storage/v1/object/public/portfolio-images/ai.png"
    }
  ],
  skills: [
    {
      category: "IT & Development",
      items: ["PHP / MySQL / SQL", "React / JavaScript / TS", "HTML5 / Tailwind CSS", "C# / Java Programming", "System Analysis & Design"]
    },
    {
      category: "Operations & Management",
      items: ["Logistics Coordination", "Project Lifecycle Management", "Transport Scheduling", "Resource Optimization", "HRIS & MIS Administration"]
    },
    {
      category: "Professional Tools",
      items: ["Visual Studio / VS Code", "MS Project / MS Office Suite", "Supabase / Firebase", "Git / GitHub", "AutoCAD (Basics)"]
    }
  ],
  languages: ["English (Professional)", "Tamil (Native)", "Sinhala (Intermediate)"]
};

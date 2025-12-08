
import { ProfileData } from './types';

export const PROFILE_DATA: ProfileData = {
  name: "Rifath Ahamed",
  title: "Management & IT Professional",
  summary: "Dedicated and results-oriented Management and IT professional with strong experience in project coordination, team supervision, and IT operations. Adept at managing workflows, planning schedules, and aligning technology with organizational goals. Skilled in database management, software support, route scheduling, and process optimization. A confident communicator and leader who bridges technical and administrative functions effectively.",
  // Replace this URL with your local file path (e.g., './images/profile.jpg') or your own photo URL
  profileImage: "/images/profile image.png",
  // Place your PDF in the 'public' folder and name it 'cv.pdf'
  resumeUrl: "/cv.pdf",
  contact: {
    phone: "075 092 7652",
    email: "arifath98@gmail.com",
    location: "Trincomalee, Sri Lanka",
    linkedin: "Rifath Ahamed",
    linkedinUrl: "https://www.linkedin.com/in/", // Update with your actual LinkedIn URL
    githubUrl: "https://github.com/", // Update with your actual GitHub URL
    instagramUrl: "https://instagram.com/", // Update with your actual Instagram URL
    twitterUrl: "https://twitter.com/" // Update with your actual Twitter URL
  },
  coreCompetencies: [
    "Project Coordination & Scheduling",
    "Team Leadership & Communication",
    "IT Support & Troubleshooting",
    "Database Management (SQL)",
    "Documentation & Reporting",
    "Workflow & Resource Optimization",
    "Transport & Route Planning",
    "Problem Solving & Analytical Thinking"
  ],
  education: [
    {
      degree: "Bachelor of Science (BSc) in Management and Information Technology",
      institution: "South Eastern University of Sri Lanka",
      period: "2021 – 2025",
      details: [
        "Specialization: 60% Management, 40% Information Technology",
        "Final Year Project: Home Repair & Renovation Website"
      ]
    },
    {
      degree: "Association of Accounting Technicians (AAT Sri Lanka)",
      institution: "Zip Campus, Sri Lanka",
      period: "In Progress"
    }
  ],
  experience: [
    {
      role: "Transport Management Intern",
      company: "Jay Jay Mills Lanka (Pvt) Ltd – Trincomalee",
      period: "2025",
      description: [
        "Assisted in scheduling travel plans, optimizing vehicle routes, and coordinating daily transport operations.",
        "Managed and updated transport schedules to ensure timely staff and goods movement across departments.",
        "Worked closely with the logistics and HR teams to maintain cost-efficient transportation plans.",
        "Monitored performance and safety compliance of company vehicles and drivers.",
        "Enhanced team communication and operational efficiency through organized scheduling systems."
      ]
    },
    {
      role: "IT Support",
      company: "South Eastern University of Sri Lanka",
      period: "2022 – 2025",
      description: [
        "Provided technical support for hardware, software, and networking systems across multiple university departments.",
        "Assisted in database management (SQL) and maintained IT-related documentation and event systems.",
        "Supported technology-driven events and workshops through technical setup and troubleshooting.",
        "Coordinated with vendors and faculty members to ensure consistent IT operations and infrastructure stability."
      ]
    },
    {
      role: "Supervisor & Accounts Checker",
      company: "Grace Construction, Trincomalee",
      period: "2019 – 2021",
      description: [
        "Supervised project activities, ensuring operational accuracy and timely task completion.",
        "Maintained financial records, budgets, and project documentation.",
        "Oversaw compliance with project requirements and coordinated workflow between field and office teams.",
        "Prepared financial reports and assisted in internal auditing processes."
      ]
    },
  ],
  projects: [
    {
      title: "School Management System",
      technologies: ["C#", "SQL Server", "Database Design"],
      description: [
        "Designed and implemented a relational database for managing student, teacher, course, and guardian data.",
        "Ensured data integrity, secure access, and user-friendly operation for administrators."
      ],
      githubUrl: "#", 
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?fit=crop&w=800&q=80" 
    },
    {
      title: "Home Repair & Renovation Website",
      technologies: ["PHP", "HTML", "CSS", "JavaScript", "MySQL"],
      description: [
        "Developed a complete web-based platform to manage renovation services, user registration, and task tracking.",
        "Handled both front-end design and back-end logic with a connected MySQL database."
      ],
      githubUrl: "#",
      demoUrl: "https://webbasedrenovation.infinityfree.me/index.php",
      image: "https://images.unsplash.com/photo-1581094794329-cd11965d2822?fit=crop&w=800&q=80" 
    },
    {
      title: "FMC GPA Calculator",
      technologies: ["React", "Web App", "Calculation Logic"],
      description: [
        "Developed a custom GPA calculator for the Faculty of Management and Information Technology.",
        "Allows students to accurately calculate their semester and cumulative GPA based on faculty grading schemes."
      ],
      githubUrl: "#",
      demoUrl: "https://fmcs-gpa.vercel.app/",
      image: "https://images.unsplash.com/photo-1587145820266-a5951eebebb1?fit=crop&w=800&q=80"
    },
    {
      title: "AI Vital - Resource Hub",
      technologies: ["React", "AI Integration", "Directory"],
      description: [
        "A centralized platform aggregating various Artificial Intelligence tools and resources.",
        "Provides users with streamlined access to essential AI technologies in one convenient location."
      ],
      githubUrl: "#",
      demoUrl: "https://ai-vital-zeta.vercel.app/",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?fit=crop&w=800&q=80"
    }
  ],
  skills: [
    {
      category: "Technical Skills",
      items: ["Programming: C#, Java, JavaScript, PHP, SQL", "Tools: Visual Studio, MySQL, MS Office (Word, Excel, Project)", "Systems: Windows, Linux (Basic)"]
    },
    {
      category: "Special Skills",
      items: ["Route Scheduling", "Data Management", "System Maintenance", "Project Coordination"]
    },
    {
      category: "Leadership & Activities",
      items: ["Workshop Organizer (SEUSL)", "Peer Mentor (Orientation Program)", "Environmental Awareness Volunteer"]
    }
  ],
  languages: ["English (Professional)", "Tamil (Native)", "Sinhala (Intermediate)"]
};

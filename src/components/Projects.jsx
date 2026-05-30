import {useState,useRef} from 'react';
import {useInView} from "../hooks/useInView";
import {SectionHeader} from "./About";

const PROJECTS = [
  {
    id: 1,
    title: "RST!! Portfolio",
    description:
      "My personal portfolio website built with React and Vite. Features smooth scrolling, dark mode, and responsive design.",
    tags: ["React", "Vite", "CSS3"],
    category: "frontend",
    image: "🛒",
    color: "#6366f1",
    github: "https://github.com/whorajtripathi/PortFolio_RST",
    live: "https://example.com",
    featured: true,
  },
  {
    id: 2,
    title: "Weather Dashboard",
    description:
      "Real-time weather app using OpenWeather API. Features 7-day forecast, city search, and animated weather icons.",
    tags: ["React", "API", "CSS3"],
    category: "frontend",
    image: "⛅",
    color: "#06b6d4",
    github: "https://github.com/whorajtripathi/Weather_Forecast_Website",
    live: "https://example.com",
    featured: true,
  },
  {
  id: 3,
  title: "DealLens – AI Deal Finder",
  description:
    "AI-powered MERN app that detects products from images or text and compares real-time deals across e-commerce platforms.",
  tags: [
    "React","Node.js","Express","MongoDB","Gemini AI","SerpAPI","JWT","Cloudinary","Multer"
  ],
  category: "fullstack",
  image: "🛍️",
  color: "#8b5cf6",
  github: "https://github.com/whorajtripathi/DealLens",
  live: null,
  featured: true,
},
  {
  id: 4,
  title: "ChatNova – AI Chat Platform",
  description:
    "AI-powered chat platform enabling intelligent real-time conversations through a modern and responsive web interface.",
  tags: [
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "AI",
    "JWT"
  ],
  category: ["fullstack","backend"],
  image: "💬",
  color: "#3b82f6",
  github: "https://github.com/whorajtripathi/ChatNova",
  live: null,
  featured: true,
},
  {
  id: 6,
  title: "Project Management System",
  description:
    "Role-based project management web app with real-time tracking, dashboards, and task monitoring features.",
  tags: [
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "JWT",
    "REST API"
  ],
  category: "fullstack",
  image: "📊",
  color: "#f59e0b",
  github: "https://github.com/whorajtripathi/TTL",
  live: null,
  featured: true,
},
  ,
];

const FILTERS=[
    {id:"all",label:"All Projects"},
    {id:"frontend",label:"Frontend"},
    {id:"backend",label:"Backend"},
    {id:"fullstack",label:"Full Stack"},
]

function Projects(){

    const [activeFilter,setActiveFilter]=useState("all");
    const [hoveredID,setHoveredID]=useState(null);
    const sectionRef=useRef(null);
    const isVisible=useInView(sectionRef);

    const filteredProjects=activeFilter==="all"
    ? PROJECTS
    : PROJECTS.filter(project=>project.category.includes(activeFilter));    

    return(

        <section id="projects" className="section projects">
            <div className="container">
                <SectionHeader 
                    eyebrow="What I've Built"
                    title="Projects"
                    subtitle="A selection of things I'm proud of"
                    />

                <div className="projects__filters">
                    {FILTERS.map((a)=>(
                        <button 
                            key={a.id}
                            className={`filter-btn ${activeFilter===a.id ? "filter-btn--active":""}`}
                            onClick={()=>setActiveFilter(a.id)}
                        >
                            {a.label}
                            <span className="filter-count">
                                {
                                    filter.id==="all"
                                    ? PROJECTS.length
                                    : PROJECTS.filter(project=>project.category.includes(filter.id)).length
                                }

                            </span>

                        </button>
                    ))

                    }
                </div>
                
            </div>

        </section>
    );
};

export default Projects;
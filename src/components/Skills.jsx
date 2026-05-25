import {useState, useRef} from 'react';
import useInView from '../hooks/useInView';
import {SectionHeader} from './About';
import "./Skills.css";

const skillCategories=[
    {
        id:"frontend",
        label:"Frontend",
        icon:"🎨",
        skills:[
            { name: "React", level: 85, color: "#61DAFB" },
            { name: "JavaScript (ES6+)", level: 88, color: "#F7DF1E" },
            { name: "HTML5 & CSS3", level: 92, color: "#E34F26" },
            { name: "TypeScript", level: 70, color: "#3178C6" },
            { name: "Tailwind CSS", level: 80, color: "#06B6D4" },
        ],
    },
    {
        id: "backend",
        label: "Backend",
        icon: "⚙️",
        skills: [
            { name: "Node.js", level: 72, color: "#339933" },
            { name: "Express.js", level: 68, color: "#ffffff" },
            { name: "MongoDB", level: 65, color: "#47A248" },
            { name: "REST APIs", level: 78, color: "#FF6B6B" },
            { name: "Firebase", level: 60, color: "#FFCA28" },
    ],
  },
  {
        id: "tools",
        label: "Tools & Others",
        icon: "🛠️",
        skills: [
            { name: "Git & GitHub", level: 85, color: "#F05032" },
            { name: "VS Code", level: 90, color: "#007ACC" },
            { name: "Figma", level: 75, color: "#F24E1E" },
            { name: "Webpack / Vite", level: 65, color: "#646CFF" },
            { name: "Linux CLI", level: 70, color: "#FCC624" },
        ],
  },
]

const techIcons = [
  "React", "JavaScript", "TypeScript", "HTML5", "CSS3",
  "Node.js", "MongoDB", "Git", "Figma", "Vite",
  "Express", "Firebase", "Tailwind", "Redux", "Next.js"
];

function Skills(){
    const [activeCategory, setActiveCategory] = useState("frontend");
    const sectionRef=useRef(null);
    const isVisible=useInView(sectionRef);

    const currentCategory=skillCategories.find((c)=> c.id===activeCategory);

    return(
        <section id="skills" className="section skills">
            <div className="container" ref={sectionRef}>

                <SectionHeader 
                eyebrow="What I Work With" 
                title="Skills & Technologies"
                subtitle="Constantly learning, always building"
                />

                {/* Tab Navigation */}
                <div className="skills__tabs">
                    {skillCategories.map((cat)=>(
                        <button
                            key={cat.id}
                            className={`tab-btn ${activeCategory===cat.id ?"tab-btn--active":""}`}
                            onClick={()=>setActiveCategory(cat.id)}
                        >
                            <span>{cat.icon}</span>
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Skill Bars */}
                <div ref={sectionRef} className="skills__bars">
                    {currentCategory.skills.map((skill,index)=>(
                        <SkillBar 
                        key={skill.name}
                        skill={skill}
                        isVisible={isVisible}
                        animationDelay={index * 0.1}
                        />
                    ))}
                </div>

                {/* Tech Bubble Cloud */}
                <div className="skills__cloud">
                    <p className="cloud-label">Also familiar with:</p>
                    <div className="tech-bubbles">
                        {
                            techIcons.map((tech)=>(
                                <span key={tech} className="tech-bubble">
                                    {tech}
                                </span>
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    );

}

function SkillBar({skill,isVisible,animationDelay}){
    return(
        <div className="skill-bar" style={{animationDelay: `${animationDelay}s`}}>
            <div className="skill-bar__header">
                <span className="skill-bar__name">{skill.name}</span>
                <span className="skill-bar__level">{skill.level}%</span>
            </div>

            <div className="skill-bar__track">
                <div
                className="skill-bar__fill"
                style={{
                    width: isVisible ? `${skill.level}%` : "0%",
                    backgroundColor: skill.color,
                    transitionDelay: `${animationDelay}s`,
                }}
                />
            </div>
        </div>
    );
}

export default Skills;
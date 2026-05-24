import { useRef } from "react";
import useInView from "../hooks/useInView";
import "./About.css";

function About(){

    const sectionRef=useRef(null);
    const isVisible=useInView(sectionRef);

    const facts=[
       { emoji: "🎓", label: "Education", value: "B.Tech Computer Science" },
        { emoji: "💼", label: "Experience", value: "2+ Years Coding" },
        { emoji: "🚀", label: "Projects", value: "15+ Completed" },
        { emoji: "☕", label: "Coffee", value: "∞ Cups" },
    ]

    return(
        <section id="about" className="section about">
            <div className="container">
                <SectionHeader eyebrow="Get To Know Me!!" title="About Me!!" subtitle="A developer who cares about the craft"/>
            

            <div ref={sectionRef} 
                className={`about__grid ${isVisible ? "animate-in": ""}`}
            >

                {/* //LEFT SIDE - IMAGE */}
                <div className="about__image-wrap">
                    <div className="about__avatar">
                        <div className="avatar-placeholder">
                            <span className="avatar-initials">RST!!</span>
                        </div>
                        <div className="avatar-ring"></div>
                        <div className="avatar-ring avatar-ring--2" ></div>
                    </div>

                    <div className="about__badge">
                        <span  className="badge-icon">⚡</span>
                        <div>
                            <p className="badge-title">Available for work</p>
                            <p className="badge-sub">Open to opportunities</p>
                        </div>
                    </div>
                </div>

                <div className="about__content">
                    <p className="about__para">
                        Hi! I'm a passionate frontend developer from{" "}
                        <strong>Pune, India</strong>. I love building things that live on
                        the internet — whether that's a pixel-perfect landing page, a
                        complex web app, or a fun side project that solves a real problem.
                    </p>
                    <p className="about__para">
                        I started my coding journey with HTML & CSS, fell in love with
                        JavaScript, and now React is my home. I believe great software is
                        built at the intersection of <em>technical excellence</em> and{" "}
                        <em>thoughtful design</em>.
                    </p>
                    <p className="about__para">
                        When I'm not coding, you'll find me exploring design trends,
                        reading tech blogs, or brewing the perfect cup of coffee ☕
                    </p>

                    <div className="facts-grid">
                        {facts.map(({ emoji, label, value }) => (
                            <div key={label} className="fact-card">
                                <span className="fact-emoji">{emoji}</span>
                                <p className="fact-value">{value}</p>
                                <p className="fact-label">{label}</p>
                            </div>
                        ))}
                    </div>

                </div>

            </div>
            </div>
        </section>
    );

}

export function SectionHeader({eyebrow,title,subtitle}){
    return(
        <div className="section-header">
            <p className="section-eyebrow">{eyebrow}</p>
            <h2 className="section-title">{title}</h2>
            {/* // subtitle is optional */}
            {subtitle && <p className="section-subtitle">{subtitle}</p>}        
        </div>
    );
}

export default About;
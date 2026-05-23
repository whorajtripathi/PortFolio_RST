import { useEffect,useRef,useState } from "react";
import "./Hero.css";


function Hero(){

    const canvasRef=useRef(null);

    const [displayText,setDisplayText]=useState("");
    const [roleIndex,setRoleIndex]=useState(0);
    const [charIndex,setCharIndex]=useState(0);
    const [isDeleting,setIsDeleting]=useState(false);

    const roles=[
        "Full Stack Developer",
        "UI/UX Designer",
        "React Enthusiast",
        "Tech Enthusiast",
        "Problem Solver",
        "Creative Coder",
    ];

    useEffect(()=>{
        const currentRole=roles[roleIndex];
        const speed=isDeleting ?60:120;

        const timer=setTimeout(()=>{
            if(!isDeleting){
                setDisplayText(currentRole.slice(0,charIndex+1));
                if(charIndex+1===currentRole.length){
                    setTimeout(()=> setIsDeleting(true),1500);
                }else{
                    setCharIndex((c)=> c+1);
                }
            }else{
                setDisplayText(currentRole.slice(0,charIndex-1));
                if(charIndex===0){
                    setIsDeleting(false);
                    setRoleIndex((r)=> (r+1)%roles.length);
                }else{
                    setCharIndex((c)=>c-1);
                }
            }
        },speed);   
        return ()=>clearTimeout(timer);
    },[charIndex,isDeleting,roleIndex]);


    useEffect(()=>{

        const canvas=canvasRef.current;
        if(!canvas) return;
        const ctx= canvas.getContext("2d");

        const resize=()=>{
            canvas.width=canvas.offsetWidth;
            canvas.height=canvas.offsetHeight;
        };
        resize();
        window.addEventListener("resize",resize);

        class Particle{
            constructor(){
                this.reset();
            }

            reset(){
                this.x=Math.random()* canvas.width;
                this.y=Math.random()*canvas.height;
                this.vx=(Math.random()-0.5)*0.4;
                this.vy=(Math.random()-0.5)*0.4;
                this.radius=Math.random()*1.5+0.5;
                this.alpha=Math.random()*0.5+0.2;
            }

            update(){
                this.x+=this.vx;
                this.y+=this.vy;
                if(this.x<0 || this.x>canvas.width) this.vx*=-1;
                if(this.y<0 || this.y>canvas.height) this.vy*=-1;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(100, 200, 255, ${this.alpha})`;
                ctx.fill();
                    }
        }

        const particles=Array.from({length:80},()=> new Particle());
        let animId;

        const animate=()=>{
            ctx.clearRect(0,0,canvas.width,canvas.height);
            particles.forEach((p)=>{
                p.update();
                p.draw();
            });
            for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(100, 200, 255, ${0.15 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
                window.removeEventListener("resize", resize);
                cancelAnimationFrame(animId);
                };
    },[]);

    const scrollToProjects=()=>{
        document.getElementById("projects")?.scrollIntoView({behavior:"smooth"});
    };

    const scrollToContact=()=>{
        document.getElementById("contact")?.scrollIntoView({behavior:"smooth"});
    };

    return(
        <section id="home" className="hero">
            <canvas ref={canvasRef} className="hero__canvas"/>

            {/* //Main content */}
            <div className="hero__content">

                {/* //Initial greeting and name */}
                <p className="hero__greeting"> HEY!! It's DON</p>

                {/* //Actual name with accent */}
                <h1 className="hero__name">
                    The{" "}
                    <span className="hero__name-accent">#DON!!</span>
                </h1>

                {/* //Role and text animation */}
                <div className="hero__role">
                    <span className="hero__role-text">{displayText}</span>
                    <span className="hero__cursor">|</span>
                </div>

                {/* //Short bio */}
                <p className="hero__bio">
                    I craft digital experiences that live at the intersection of{" "}
                    <span className="text-accent">beautiful design</span> and{" "}
                    <span className="text-accent">clean code</span>. Currently exploring
                    React, Node.js, and everything modern web.
                </p>

                {/* //Action buttons */}
                <div className="hero__actions">
                    <button className="btn btn--primary" onClick={scrollToProjects}>View My Work →</button>
                    <button className="btn btn--ghost" onClick={scrollToContact}>Contact Me →</button>
                </div>

                {/* //Social links */}
                <div className="hero__socials">
                    {[
                        { href: "https://github.com/whorajtripathi", label: "GitHub", icon: "⌨" },
                        { href: "https://www.linkedin.com/in/whorajtripathi/", label: "LinkedIn", icon: "💼" },
                        {href: "https://mail.google.com/mail/?view=cm&fs=1&to=rajsanjaykumartripathi@gmail.com",label: "Email",icon: "✉️"},
                    ].map(({ href, label, icon }) => (
                        <a
                        key={label}
                        href={href}
                        className="social-link"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        >
                        {icon}
                        </a>
                    ))}
                </div>

            </div>

            <div className="hero__scroll-hint">
                <span>Scroll</span>
                <div className="scroll-line" />
            </div>

        </section>
    );
}

export default Hero;
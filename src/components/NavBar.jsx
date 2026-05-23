import {useState,useEffect} from "react";
import "./NavBar.css";

function NavBar({activeSection,theme,onThemeToggle}){

    const [scrolled,setScrolled]=useState(false);
    const [menuOpen,setMenuOpen]=useState(false);

    const navLinks=[
        {id:"home",lable:"Home"},
        {id:"about",lable:"About"},
        {id:"skills",lable:"Skills"},
        {id:"projects",lable:"Projects"},
        {id:"experience",lable:"Experience"},
        {id:"contact",lable:"Contact"},
    ];

    useEffect(()=>{
        const handelScrolle=()=> setScrolled(window.scrollY>50);
        window.addEventListener("scroll",handelScrolle);
        return ()=> window.removeEventListener("scroll",handelScrolle);
    },[]);

    const scrollToSection=(id)=>{
        document.getElementById(id)?.scrollIntoView({behavior:"smooth"});
        setMenuOpen(false);
    }

    return(

        <nav className={`navbar ${scrolled ? "navbar--scrolled" : "" } `}>
            <div className="navbar__logo" onClick={()=> scrollToSection("home")}>
                <span className="logo-bracket">&lt;</span>
                <span className="logo-text">
                    RST!!
                </span>
                <span className="logo-bracket">&gt;</span>
            </div>


            <ul className="navbar__links">
                {navLinks.map((link)=>(
                    <li key={link.id}>
                        <button className={`nav-link ${activeSection===link.id ? "nav-link--active":""}`}
                            onClick={()=> scrollToSection(link.id)}
                        >
                            {link.lable}
                            {activeSection===link.id && <span className="nav-dot"/>}
                        </button>
                    </li>
                ))
                }
            </ul>

            <div className="navbar__actions">
                <button 
                    className="theme-toggle"
                    onClick={onThemeToggle}
                    aria-label="Toggle theme"
                >
                    {theme === "dark"? "☀️" : "🌙"}
                </button>
            

            <a href="/Raj_Tripathi_Resume.pdf" className="btn btn--outline btn--sm download" >
                Resume &#8595;
            </a>

            <button 
                className={`hamburger ${menuOpen ? "hamburger--open" : ""}`}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
            >
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
            </button>

            </div>

            {menuOpen && (
                <div className="mobile-menu">
                {navLinks.map((link) => (
                    <button
                    key={link.id}
                    className={`mobile-nav-link ${activeSection === link.id ? "mobile-nav-link--active" : ""}`}
                    onClick={() => scrollToSection(link.id)}
                    >
                    {link.lable}
                    </button>
                ))}
                </div>
            )}

        </nav>

    );
}

export default NavBar;
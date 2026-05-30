import { useState } from "react";
import { useEffect } from "react";

import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";

import "./App.css";


function App(){

  const [activeSection,setActiveSection]=useState("home");
  const [isLoading,setIsLoading]=useState(true);
  const [theme,setTheme]=useState("dark");

  useEffect(()=>{
    const timer=setTimeout(()=> setIsLoading(false),2000);
    return () => clearTimeout(timer);
  },[]);

  useEffect(()=>{
    document.documentElement.setAttribute("data-theme",theme);
  },[theme]);

  useEffect(()=>{
    const sections=document.querySelectorAll("section[id]");

    const observer=new IntersectionObserver(
      (entries)=>{
        entries.forEach((entry)=>{
          if(entry.isIntersecting){
            setActiveSection(entry.target.id);
          }
        });
      },
      {threshold:0.4}
    );

    sections.forEach((section)=> observer.observe(section));

    return ()=> sections.forEach((section)=> observer.unobserve(section));
    },[]);


    if(isLoading){
      return <LoadingScreen/>
    }

  return(
    <div className="app">

      <NavBar 
      activeSection={activeSection} 
      theme={theme}
      onThemeToggle={()=> setTheme(theme==="dark" ? "light" : "dark")}
      />

      <main>
        <Hero/>
        <About/>
        <Skills/>
        <Projects/>
      </main>

    </div>

  )

}

function LoadingScreen(){
  return(

    <div className="loading-screen">
      <div className="loading-logo">
        <span className="loading-bracket">&lt;</span>
        <span className="loading-name">RST!!</span>
        <span className="loading-bracket">/&gt;</span>
      </div>
      <div className="loading-bar">
        <div className="loading-fill"></div>
      </div>
    </div>

  )

}

export default App;
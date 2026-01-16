import React from 'react';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Header from './components/Header';
import { profileData, projectsData } from './data/data';
import Skills from './components/Skills';
// import Test from './components/Test';

function App() {
  return (
    <div className="relative bg-black">
      {/* Noise Texture Overlay */}
      <div className="noise-overlay" />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main>
        <Hero profile={profileData} />
        <About profile={profileData} />
         {/* <Skills /> */}
        <Projects projects={projectsData} profile={profileData} />
         <Skills />
        <Contact profile={profileData} />

      </main>

      {/* Footer */}
      <Footer profile={profileData} />
      
    </div>
  );
}

export default App;
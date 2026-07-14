import React from 'react'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import TechnicalSkills from './components/TechnicalSkills'
import Services from './components/Services'
import Projects from './components/Projects'
import GitHubStats from './components/GitHubStats'
import ContentCreator from './components/ContentCreator'
import Certificates from './components/Certificates'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import AskKarthik from './components/AskKarthik'
import { Analytics } from '@vercel/analytics/react'

function App() {
  return (
    <>
      <Preloader />
      <Navbar />
      <Hero />
      <About />
      <TechnicalSkills />
      <Services />
      <Projects />
      <GitHubStats />
      <ContentCreator />
      <Certificates />
      <Contact />
      <Footer />
      <CustomCursor />
      <AskKarthik />
      <Analytics />
    </>
  )
}

export default App


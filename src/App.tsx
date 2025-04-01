import React, { useState } from 'react';
import { Globe, Menu, X } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import GameList from './components/GameList';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-black text-white">
        <div className="relative">
          <Header />
          <main>
            <Hero />
            <GameList />
            <Features />
            <HowItWorks />
            <Testimonials />
            <FAQ />
          </main>
          <Footer />
        </div>
      </div>
    </LanguageProvider>
  );
}

export default App;
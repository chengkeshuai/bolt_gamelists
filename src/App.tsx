import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Globe, Menu, X } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import GameList from './components/GameList';
import GameDetail from './components/GameDetail';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import { LanguageProvider } from './context/LanguageContext';
import { SoundProvider } from './context/SoundContext';

function HomePage() {
  return (
    <>
      <Hero />
      <GameList />
      <Features />
      <Testimonials />
      <FAQ />
    </>
  );
}

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <LanguageProvider>
      <SoundProvider>
        <Router>
          <div className="min-h-screen bg-black text-white">
            <div className="relative">
              <Header />
              <main className="pt-16">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/games" element={<GameList />} />
                  <Route path="/games/:id" element={<GameDetail />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </div>
        </Router>
      </SoundProvider>
    </LanguageProvider>
  );
}

export default App;
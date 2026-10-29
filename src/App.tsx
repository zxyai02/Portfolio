/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Gallery } from './components/Gallery';
import { AboutSection } from './components/AboutSection';
import { BlogSection } from './components/BlogSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdminPanel } from './components/AdminPanel';
import { AdminLoginModal } from './components/AdminLoginModal';
import { ProfileZoomModal } from './components/ProfileZoomModal';
import { ProjectModal } from './components/ProjectModal';
import { BlogModal } from './components/BlogModal';
import { ToastContainer } from './components/ToastContainer';
import { TechCursor } from './components/TechCursor';
import { NeuralNetworkBackground } from './components/NeuralNetworkBackground';

function MainLayout() {
  const { theme, isAdmin } = usePortfolio();

  return (
    <div
      className={`min-h-screen relative transition-colors duration-300 font-sans flex flex-col ${
        theme === 'dark'
          ? 'bg-zinc-950 text-zinc-100 selection:bg-amber-400 selection:text-zinc-950'
          : 'bg-[#FAF8F5] text-zinc-900 selection:bg-amber-400 selection:text-zinc-950'
      }`}
    >
      {/* Dynamic Animated Neural Network & Globe Background */}
      <NeuralNetworkBackground />

      {/* Tech-Savvy Mouse Pointer Movement Effect */}
      <TechCursor />

      {/* Foreground Content Stack */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        {/* Only rendered when unlocked by password '00' */}
        {isAdmin && <AdminPanel />}
        <main className="flex-1">
          <Hero />
          <Gallery />
          <AboutSection />
          <BlogSection />
          <ContactSection />
        </main>
        <Footer />
        <ProjectModal />
        <BlogModal />
        <ProfileZoomModal />
        <AdminLoginModal />
        <ToastContainer />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <MainLayout />
    </PortfolioProvider>
  );
}

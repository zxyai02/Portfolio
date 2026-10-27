/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PortfolioProvider } from './context/PortfolioContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Gallery } from './components/Gallery';
import { AboutSection } from './components/AboutSection';
import { BlogSection } from './components/BlogSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdminPanel } from './components/AdminPanel';
import { ProjectModal } from './components/ProjectModal';
import { BlogModal } from './components/BlogModal';
import { ToastContainer } from './components/ToastContainer';

export default function App() {
  return (
    <PortfolioProvider>
      <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-amber-400 selection:text-zinc-950 flex flex-col font-sans">
        <Navbar />
        <AdminPanel />
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
        <ToastContainer />
      </div>
    </PortfolioProvider>
  );
}

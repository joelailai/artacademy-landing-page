import React, { useState, useEffect } from 'react';
import { Search, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import ContactModal from './ContactModal';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDarkPage = location.pathname === '/faculty';
  const headerBg = isScrolled 
    ? (isDarkPage ? 'bg-background-dark/90 text-white' : 'bg-white/90 text-slate-900') 
    : (isDarkPage ? 'bg-transparent text-white' : 'bg-transparent text-slate-900');

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 backdrop-blur-md ${isScrolled ? 'shadow-sm py-4' : 'py-6'} ${headerBg}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-sm flex items-center justify-center shrink-0">
            <span className="font-black text-background-dark text-xl">A</span>
          </div>
          <div className="flex flex-col">
            <span className="font-black text-sm md:text-base tracking-tight leading-none mb-1">Apennines Art & Design Studio</span>
            <span className="font-bold text-xs tracking-widest leading-none">亚平宁工作室</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">首页 HOME</Link>
          <Link to="/courses" className="text-sm font-medium hover:text-primary transition-colors">课程 COURSES</Link>
          <Link to="/faculty" className="text-sm font-medium hover:text-primary transition-colors">师资 FACULTY</Link>
          <Link to="/cases" className="text-sm font-medium hover:text-primary transition-colors">优秀案例 CASES</Link>
          <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">关于 ABOUT</Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <button className={`p-2 rounded-full transition-colors ${isDarkPage ? 'hover:bg-white/10' : 'hover:bg-slate-100'}`}>
            <Search size={20} />
          </button>
          <button 
            onClick={() => setIsContactModalOpen(true)}
            className="bg-primary text-background-dark px-6 py-2.5 rounded-full text-sm font-bold hover:bg-white hover:text-background-dark transition-all"
          >
            立即咨询
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white text-slate-900 shadow-lg py-4 px-6 flex flex-col gap-4">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium py-2 border-b border-slate-100">首页 HOME</Link>
          <Link to="/courses" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium py-2 border-b border-slate-100">课程 COURSES</Link>
          <Link to="/faculty" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium py-2 border-b border-slate-100">师资 FACULTY</Link>
          <Link to="/cases" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium py-2 border-b border-slate-100">优秀案例 CASES</Link>
          <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium py-2 border-b border-slate-100">关于 ABOUT</Link>
          <button 
            onClick={() => {
              setIsMobileMenuOpen(false);
              setIsContactModalOpen(true);
            }}
            className="bg-background-dark text-white px-6 py-3 rounded-full text-sm font-medium mt-4"
          >
            立即咨询
          </button>
        </div>
      )}
      
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </header>
  );
}

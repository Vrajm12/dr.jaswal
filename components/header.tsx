"use client"

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X, Phone, ChevronRight } from "lucide-react"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  const navLinks = [
    { href: "/home", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/consultation", label: "Consultation" },
    { href: "/blog", label: "Blog" },
    { href: "/ai-products", label: "AI Products" },
    { href: "/contact", label: "Contact" },
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <>
      {/* Blur backdrop when mobile menu is open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 xl:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out font-[Poppins,sans-serif] ${
          isScrolled 
            ? "bg-white/95 backdrop-blur-md shadow-lg py-4 sm:py-5" 
            : "bg-transparent py-4 sm:py-5"
        }`}
      >
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          {/* Navbar container - changes from pill to simple horizontal on scroll */}
          <div 
            className={`flex justify-between items-center transition-all duration-500 ${
              isScrolled 
                ? "bg-transparent px-0 py-0" 
                : "bg-white rounded-xl sm:rounded-full px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-5 shadow-xl border border-gray-100"
            }`}
          >
            {/* Logo */}
            <Link to="/home" className="flex items-center gap-2 sm:gap-3 group shrink-0">
              <img
                src="/images/logo.png"
                alt="Eternawell AI Logo"
                className={`w-auto transition-all duration-300 group-hover:scale-105 ${
                  isScrolled ? "h-9 sm:h-11" : "h-10 sm:h-14"
                }`}
              />
              <div className="flex flex-col">
                <span className={`font-bold text-gray-900 whitespace-nowrap transition-all duration-300 ${
                  isScrolled ? "text-sm sm:text-base" : "text-sm sm:text-lg"
                }`}>
                  Dr. Gaurav Jaswal
                </span>
                <span className={`text-[#2F72B8] font-medium transition-all duration-300 ${
                  isScrolled ? "text-[10px] sm:text-xs" : "text-xs sm:text-sm"
                }`}>
                  Leading Oncologist
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`font-medium transition-all duration-300 relative group text-sm whitespace-nowrap ${
                    isActive(link.href) 
                      ? "text-[#2F72B8]" 
                      : "text-gray-700 hover:text-[#2F72B8]"
                  }`}
                >
                  {link.label}
                  <span 
                    className={`absolute -bottom-1 left-0 h-0.5 bg-[#2F72B8] transition-all duration-300 ${
                      isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </Link>
              ))}
            </nav>

            {/* Right side: Phone & CTA */}
            <div className="hidden xl:flex items-center gap-4 lg:gap-5 shrink-0">
              {/* Phone number */}
              <a
                href="tel:+919070555101"
                className="flex items-center gap-2 text-gray-700 hover:text-[#2F72B8] transition-all duration-300 group"
              >
                <div className="bg-[#EBF3FA] group-hover:bg-[#D6E7F5] p-2 rounded-full transition-colors duration-300">
                  <Phone size={16} className="text-[#2F72B8]" />
                </div>
                <span className="font-medium text-sm whitespace-nowrap">+91 7009521950</span>
              </a>

              {/* CTA Button */}
              <Link
                to="/consultation"
                className={`bg-[#2F72B8] hover:bg-[#255A92] text-white rounded-full font-semibold transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-xl hover:scale-105 whitespace-nowrap ${
                  isScrolled ? "px-4 py-2 text-xs" : "px-5 py-2.5 text-sm"
                }`}
              >
                Book Appointment
                <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="xl:hidden text-gray-700 hover:text-[#2F72B8] transition-colors p-2 hover:bg-[#EBF3FA] rounded-lg"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <span className={`absolute left-0 block w-6 h-0.5 bg-current transform transition-all duration-300 ${
                  isOpen ? "top-3 rotate-45" : "top-1"
                }`}></span>
                <span className={`absolute left-0 top-3 block w-6 h-0.5 bg-current transition-all duration-300 ${
                  isOpen ? "opacity-0" : "opacity-100"
                }`}></span>
                <span className={`absolute left-0 block w-6 h-0.5 bg-current transform transition-all duration-300 ${
                  isOpen ? "top-3 -rotate-45" : "top-5"
                }`}></span>
              </div>
            </button>
          </div>

          {/* Mobile Navigation */}
          <div 
            className={`xl:hidden overflow-hidden transition-all duration-500 ease-out ${
              isOpen ? "max-h-[500px] opacity-100 mt-3" : "max-h-0 opacity-0 mt-0"
            }`}
          >
            <nav className="bg-white rounded-2xl shadow-2xl p-4 border border-gray-100">
              <div className="flex flex-col gap-1">
                {navLinks.map((link, index) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`font-medium transition-all duration-300 py-3 px-4 rounded-xl flex items-center justify-between ${
                      isActive(link.href)
                        ? "bg-brand-blue-50 text-[#2F72B8]"
                        : "text-gray-700 hover:text-[#2F72B8] hover:bg-gray-50"
                    }`}
                    style={{ transitionDelay: `${index * 50}ms` }}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                    <ChevronRight size={16} className={isActive(link.href) ? "text-[#2F72B8]" : "text-gray-400"} />
                  </Link>
                ))}
                
                <hr className="my-3 border-gray-200" />
                
                <a
                  href="tel:+919070555101"
                  className="flex items-center gap-3 py-3 px-4 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  <div className="bg-brand-blue-50 p-2 rounded-full">
                    <Phone size={18} className="text-[#2F72B8]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Call us now</span>
                    <span className="font-semibold">+91 7009521950</span>
                  </div>
                </a>
                
                <Link
                  to="/consultation"
                  className="bg-[#2F72B8] hover:bg-brand-blue-700 text-white px-6 py-4 rounded-xl font-semibold text-center flex items-center justify-center gap-2 mt-2 shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  Schedule an Appointment
                  <ChevronRight size={18} />
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header

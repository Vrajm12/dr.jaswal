import { Link } from "react-router-dom"
import { Phone, Mail, MapPin, Facebook, Linkedin, Twitter, Instagram, Youtube, ArrowRight, Heart } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-linear-to-b from-gray-900 via-gray-900 to-black text-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#2F72B8]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#5E3491]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">
          {/* About Column - Logo same as navbar */}
          <div className="lg:col-span-1">
            <Link to="/home" className="flex items-center gap-3 group mb-5">
              <img
                src="/images/logo.png"
                alt="Eternawell AI Logo"
                className="h-12 w-auto transition-transform duration-300 group-hover:scale-105"
              />
              <div className="flex flex-col">
                <span className="font-bold text-white text-base whitespace-nowrap">
                  Dr. Gaurav Jaswal
                </span>
                <span className="text-[#3B96D7] font-medium text-xs">
                  Leading Oncologist
                </span>
              </div>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Dedicated to providing world-class cancer care with cutting-edge treatments and compassionate support for patients and families.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              <a 
                href="https://www.facebook.com/gaurav.jaswal" 
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#2F72B8] flex items-center justify-center transition-all duration-300 hover:scale-110" 
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="https://www.instagram.com/dr_gaurav_onco/#" 
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#E4405F] flex items-center justify-center transition-all duration-300 hover:scale-110" 
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://www.youtube.com/@gauravjaswal6543" 
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#FF0000] flex items-center justify-center transition-all duration-300 hover:scale-110" 
                aria-label="YouTube"
              >
                <Youtube size={18} />
              </a>
              <a 
                href="https://www.linkedin.com/in/gaurav-jaswal-0586aa13/" 
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#0077B5] flex items-center justify-center transition-all duration-300 hover:scale-110" 
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#1DA1F2] flex items-center justify-center transition-all duration-300 hover:scale-110" 
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-5 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-linear-to-r from-[#2F72B8] to-[#3B96D7] rounded-full"></span>
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/home" className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 flex items-center gap-2 group">
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 flex items-center gap-2 group">
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  About
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 flex items-center gap-2 group">
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/ai-products" className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 flex items-center gap-2 group">
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  AI Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-5 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-linear-to-r from-[#3B96D7] to-[#5E3491] rounded-full"></span>
              Services
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/consultation" className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 flex items-center gap-2 group">
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  Online Consultation
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 flex items-center gap-2 group">
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  Emergency Contact
                </Link>
              </li>
              <li>
                <Link to="/second-opinion" className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 flex items-center gap-2 group">
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  Second Opinion
                </Link>
              </li>
              <li>
                <Link to="/treatment-plans" className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 flex items-center gap-2 group">
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  Treatment Plans
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-5 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-linear-to-r from-[#5E3491] to-[#2F72B8] rounded-full"></span>
              Contact
            </h4>
            <div className="space-y-4 text-sm">
              <a href="tel:+917009521950" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group">
                <div className="w-10 h-10 rounded-lg bg-white/10 group-hover:bg-[#2F72B8] flex items-center justify-center transition-all duration-300">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Call Us</p>
                  <p className="font-medium">+91 7009521950</p>
                </div>
              </a>
              <a href="mailto:info@drgauravjaswal.com" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group">
                <div className="w-10 h-10 rounded-lg bg-white/10 group-hover:bg-[#3B96D7] flex items-center justify-center transition-all duration-300">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Email Us</p>
                  <p className="font-medium">gaurav.jaswal@gmail.com</p>
                </div>
              </a>
              <div className="flex items-start gap-3 text-gray-400">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Visit Us</p>
                  <p className="font-medium">Pune Cancer Center, Pune 411001</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider with gradient */}
        <div className="h-px bg-linear-to-r from-transparent via-gray-700 to-transparent mb-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500 text-center md:text-left">
            &copy; 2025 Dr. Gaurav Jaswal. All rights reserved.
          </p>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            Made with <Heart size={14} className="text-red-500 fill-red-500" /> for better healthcare
          </p>
          <div className="flex gap-6 text-sm">
            <Link to="/privacy" className="text-gray-500 hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-500 hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

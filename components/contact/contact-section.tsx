"use client"

import type React from "react"

import { useState } from "react"
import { useInView } from "@/components/home/use-in-view"
import { Phone, Mail, MapPin, Clock, ArrowRight, Loader2 } from "lucide-react"

const ContactSection = () => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    inquiryType: "",
    subject: "",
    message: "",
    privacy: false,
  })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  // Google Apps Script URL for contact form
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzneYY_dLj01wFomN0XtoiRUVdr7RZp_lWvzuq-k_aLdb2ND7N7fFooR_hLZInLzglZ/exec"

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      // Send to Google Apps Script (which will save to sheet and send email)
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          formType: "contact", // To differentiate from consultation form
          timestamp: new Date().toISOString(),
        }),
      })

      setSubmitted(true)
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          inquiryType: "",
          subject: "",
          message: "",
          privacy: false,
        })
        setSubmitted(false)
      }, 5000)
    } catch (err) {
      setError("Something went wrong. Please try again or contact us directly.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const locations = [
    {
      name: "Pune Cancer Center (Main)",
      address: "456 Wellness Avenue, Koregaon Park, Pune 411001",
      phone: "+91 7009521950",
      hours: "Mon-Sat: 9:00 AM - 6:00 PM",
    },
    {
      name: "Emergency Care",
      address: "24/7 Emergency Services",
      phone: "+91 7009521950",
      hours: "Available round the clock",
    },
  ]

  return (
    <section ref={ref} className="pt-28 sm:pt-32 md:pt-36 pb-0 bg-linear-to-b from-brand-blue-50 via-brand-purple-50/50 to-white relative overflow-hidden min-h-screen">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-brand-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-brand-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-0 w-64 h-64 bg-brand-blue-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className={`transition-all duration-1000 transform ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Get In <span className="bg-linear-to-r from-[#2F72B8] via-[#3B96D7] to-[#5E3491] bg-clip-text text-transparent">Touch</span>
            </h1>
            <p className="text-base text-foreground/70 max-w-2xl mx-auto">
              We're here to help with your cancer care journey. Reach out for consultations, second opinions, or any
              questions about our services.
            </p>
          </div>

          {/* Main Contact Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            {/* Left - Contact Info */}
            <div
              className={`transition-all duration-700 transform ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
            >
              <div className="space-y-6">
                {/* Phone */}
                <div className="group p-6 rounded-xl bg-card border border-border hover:border-primary hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <Phone size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-1">Phone</h3>
                      <a href="tel:+917009521950" className="text-primary hover:underline font-semibold text-lg">
                        +91 7009521950
                      </a>
                      <p className="text-sm text-foreground/60 mt-1">Available 24/7 for emergencies</p>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="group p-6 rounded-xl bg-card border border-border hover:border-primary hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <Mail size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2">Email</h3>
                      <div className="space-y-1">
                        <a
                          href="mailto:info@drgauravjaswal.com"
                          className="block text-primary hover:underline font-semibold"
                        >
                          gaurav.jaswal@gmail.com
                        </a>
                      </div>
                      <p className="text-sm text-foreground/60 mt-2">Response within 2 hours</p>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="group p-6 rounded-xl bg-card border border-border hover:border-primary hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <MapPin size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-1">Address</h3>
                      <p className="text-foreground/80 font-semibold mb-1">Pune Cancer Center</p>
                      <p className="text-foreground/70 text-sm">TGH OncoLife Cancer Centre,</p>
                      <p className="text-foreground/70 text-sm">Pune 411001</p>
                    </div>
                  </div>
                </div>

                {/* Hours */}
                <div className="group p-6 rounded-xl bg-card border border-border hover:border-primary hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <Clock size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2">Hours</h3>
                      <p className="text-foreground/80 font-semibold text-sm">Mon, Thurs, Sat : 9:30 AM - 6:00 PM</p>
                      <p className="text-foreground/80 font-semibold text-sm">Wednesday - Manchar OPD (Outstation)</p>
                      <p className="text-foreground/80 font-semibold text-sm">Tue & Fri - 9:30 - 4 (TGH) & 5 to 7 (PCMC OPD)</p>
                      <p className="text-sm text-primary font-semibold mt-1">Emergency care available 24/7</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Contact Form */}
            <div
              className={`transition-all duration-700 transform delay-200 ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
            >
              <div className="bg-card p-8 rounded-2xl border border-border shadow-lg">
                <h2 className="text-xl font-bold text-foreground mb-2">Send us a Message</h2>
                <p className="text-foreground/70 mb-8">
                  Fill out the form below and we'll get back to you as soon as possible
                </p>

                {submitted ? (
                  <div className="bg-green-50 border-2 border-green-300 rounded-xl p-8 text-center animate-slide-up">
                    <div className="text-5xl mb-4">✓</div>
                    <h3 className="text-xl font-bold text-green-900 mb-2">Message Sent!</h3>
                    <p className="text-green-800">Thank you for reaching out. We'll contact you shortly.</p>
                    <p className="text-green-700 text-sm mt-2">An email notification has been sent to Dr. Gaurav.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {error && (
                      <div className="bg-red-50 border border-red-300 rounded-lg p-4 text-red-800 text-sm">
                        {error}
                      </div>
                    )}
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Your full name"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your.email@example.com"
                          required
                          className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          Phone <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                          required
                          className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Inquiry Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      >
                        <option value="">Select inquiry type</option>
                        <option value="consultation">Consultation Request</option>
                        <option value="second-opinion">Second Opinion</option>
                        <option value="ai-products">AI Products Inquiry</option>
                        <option value="general">General Question</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Subject <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Brief subject of your message"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Please describe your inquiry, symptoms, or questions in detail..."
                        rows={5}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                      />
                    </div>

                    <div className="flex items-start gap-3 bg-blue-50/50 p-4 rounded-lg border border-blue-200">
                      <input
                        type="checkbox"
                        name="privacy"
                        checked={formData.privacy}
                        onChange={handleChange}
                        required
                        className="w-5 h-5 rounded border-border text-primary cursor-pointer mt-1 shrink-0"
                      />
                      <p className="text-xs text-foreground/70">
                        I agree to the privacy policy. All personal and medical information shared is kept strictly
                        confidential and secure according to medical privacy standards.
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-bold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Locations with Centered 3D Card over Full-Width Map */}
          <div className="relative">
            {/* 3D Floating Location Card - Centered */}
            <div className="flex justify-center px-4 relative z-20">
              <div 
                className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-[500px] md:max-w-[600px] lg:max-w-[750px] xl:max-w-[850px] transform hover:-translate-y-1 transition-transform duration-300"
                style={{
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35), 0 10px 30px -5px rgba(47, 114, 184, 0.2)',
                }}
              >
                {/* Header */}
                <div className="bg-linear-to-r from-[#2F72B8] to-[#3B96D7] px-6 py-4">
                  <h2 className="text-xl font-bold text-white">Our Locations</h2>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 space-y-5">
                  {/* Main Location */}
                  <div className="pb-5 border-b border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Pune Cancer Center (Main)</h3>
                    <div className="space-y-2.5 text-gray-600">
                      <div className="flex items-start gap-3">
                        <MapPin size={18} className="text-[#2F72B8] shrink-0 mt-0.5" />
                        <p className="text-sm">TGH OncoLife Cancer Centre, Pune 411001</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone size={18} className="text-[#2F72B8] shrink-0" />
                        <a href="tel:+917009521950" className="text-[#2F72B8] hover:underline font-semibold text-sm">
                          +91 7009521950
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Emergency Care */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Emergency Care</h3>
                    <div className="space-y-2.5 text-gray-600">
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                        </div>
                        <p className="text-sm">24/7 Emergency Services</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone size={18} className="text-[#2F72B8] shrink-0" />
                        <a href="tel:+917009521950" className="text-[#2F72B8] hover:underline font-semibold text-sm">
                          +91 7009521950
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock size={18} className="text-[#2F72B8] shrink-0" />
                        <p className="text-sm text-green-600 font-medium">Available round the clock</p>
                      </div>
                    </div>
                  </div>

                  {/* Live Chat Button */}
                  <button className="w-full bg-linear-to-r from-[#2F72B8] to-[#3B96D7] text-white py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 mt-4">
                    <Mail size={18} />
                    LIVE CHAT
                  </button>
                </div>
              </div>
            </div>

            {/* Map Below - Full Width, overlapping with card */}
            <div className="-mt-20 sm:-mt-72 md:-mt-70 lg:-mt-32 relative z-10">
              <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] h-[420px] sm:h-[480px] md:h-[520px] lg:h-[550px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.2547158278226!2d73.8867!3d18.5362!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDMyJzEwLjMiTiA3M8KwNTMnMTIuMSJF!5e0!3m2!1sen!2sin!4v1699000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Pune Cancer Center Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection

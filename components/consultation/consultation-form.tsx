"use client"

import type React from "react"

import { useState } from "react"
import { useInView } from "@/components/home/use-in-view"
import { Phone, Mail, AlertCircle } from "lucide-react"

const ConsultationForm = () => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    consultationType: "",
    preferredDate: "",
    symptoms: "",
    medicalHistory: "",
    consent: false,
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission logic
    setSubmitted(true)
    setTimeout(() => {
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        consultationType: "",
        preferredDate: "",
        symptoms: "",
        medicalHistory: "",
        consent: false,
      })
      setSubmitted(false)
    }, 3000)
  }

  return (
    <section ref={ref} className="py-20 bg-card/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`transition-all duration-1000 transform ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left - Emergency Info */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Need Immediate Help?</h2>

              <div className="space-y-6">
                <div className="p-6 bg-linear-to-br from-red-50 to-red-100/50 border-2 border-red-300 rounded-xl">
                  <div className="flex items-start gap-4">
                    <AlertCircle className="text-red-600 shrink-0 mt-1" size={28} />
                    <div>
                      <h3 className="text-xl font-bold text-red-900 mb-2">Emergency Contact</h3>
                      <p className="text-red-800 mb-4">For urgent medical concerns, please call immediately:</p>
                      <a
                        href="tel:+917009521950"
                        className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition-all duration-300 transform hover:scale-105"
                      >
                        Call Now: +91 7009521950
                      </a>
                      <p className="text-sm text-red-700 mt-3">Available 24/7 for emergencies</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-foreground">Regular Contact Information</h3>

                  <div className="flex items-center gap-4 p-4 bg-background rounded-lg border border-border">
                    <Phone size={24} className="text-primary shrink-0" />
                    <div>
                      <p className="text-sm text-foreground/60">Phone</p>
                      <a href="tel:+917009521950" className="font-semibold text-primary hover:underline">
                        +91 7009521950
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-background rounded-lg border border-border">
                    <Mail size={24} className="text-primary shrink-0" />
                    <div>
                      <p className="text-sm text-foreground/60">Email</p>
                      <div className="flex flex-col">
                        <a
                          href="mailto:info@drgauravjaswal.com"
                          className="font-semibold text-primary hover:underline text-sm"
                        >
                          info@drgauravjaswal.com
                        </a>
                        <a
                          href="mailto:appointments@drgauravjaswal.com"
                          className="font-semibold text-primary hover:underline text-sm"
                        >
                          appointments@drgauravjaswal.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-primary/10 rounded-lg border border-primary/30">
                  <p className="text-sm text-foreground/70">
                    <span className="font-semibold text-primary">Response time:</span> We typically respond to emails
                    within 2 hours during business hours.
                  </p>
                </div>
              </div>
            </div>

            {/* Right - Booking Form */}
            <div>
              <div className="bg-card p-8 rounded-2xl border border-border shadow-lg">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Book a Consultation</h2>

                {submitted ? (
                  <div className="bg-green-50 border-2 border-green-300 rounded-xl p-8 text-center animate-slide-up">
                    <div className="text-5xl mb-4">✓</div>
                    <h3 className="text-xl font-bold text-green-900 mb-2">Booking Submitted!</h3>
                    <p className="text-green-800">
                      Thank you for scheduling a consultation. We'll confirm your appointment within 2 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
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

                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Email Address <span className="text-red-500">*</span>
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
                        Phone Number <span className="text-red-500">*</span>
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

                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Consultation Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="consultationType"
                        value={formData.consultationType}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      >
                        <option value="">Select consultation type</option>
                        <option value="initial">Initial Consultation</option>
                        <option value="video">Video Consultation</option>
                        <option value="emergency">Emergency Appointment</option>
                        <option value="second-opinion">Second Opinion</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Preferred Date</label>
                      <input
                        type="date"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Current Symptoms</label>
                      <textarea
                        name="symptoms"
                        value={formData.symptoms}
                        onChange={handleChange}
                        placeholder="Describe your symptoms..."
                        rows={3}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Relevant Medical History
                      </label>
                      <textarea
                        name="medicalHistory"
                        value={formData.medicalHistory}
                        onChange={handleChange}
                        placeholder="Any relevant medical history or previous treatments..."
                        rows={3}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                      />
                    </div>

                    <div className="flex items-start gap-3 bg-blue-50/50 p-4 rounded-lg border border-blue-200">
                      <input
                        type="checkbox"
                        name="consent"
                        checked={formData.consent}
                        onChange={handleChange}
                        required
                        className="w-5 h-5 rounded border-border text-primary cursor-pointer mt-1 shrink-0"
                      />
                      <p className="text-sm text-foreground/70">
                        I agree to the privacy policy. All personal and medical information is kept strictly
                        confidential and secure according to medical privacy standards.
                      </p>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-bold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                    >
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ConsultationForm

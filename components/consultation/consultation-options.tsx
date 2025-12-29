"use client"

import type React from "react"
import { useState } from "react"
import { useInView } from "@/components/home/use-in-view"
import { Video, Calendar, AlertCircle, Share2, Phone, Mail, Loader2 } from "lucide-react"

const ConsultationOptions = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    email: "",
    phone: "",
    consultationType: "",
    urgencyLevel: "",
    preferredDate: "",
    preferredTime: "",
    symptoms: "",
    medicalHistory: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  // Demo configuration - Replace with actual values in production
  const DOCTOR_WHATSAPP = "918446552477" // WhatsApp: 8446552477
  const DOCTOR_EMAIL = "veerajmatnale@gmail.com"
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzneYY_dLj01wFomN0XtoiRUVdr7RZp_lWvzuq-k_aLdb2ND7N7fFooR_hLZInLzglZ/exec" // Replace with your deployed script URL

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const sendToGoogleSheets = async (data: typeof formData) => {
    try {
      // Using Google Apps Script Web App to store data
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          timestamp: new Date().toISOString(),
        }),
      })
      return true
    } catch (err) {
      console.error("Error sending to Google Sheets:", err)
      return false
    }
  }

  const sendWhatsAppMessage = (data: typeof formData) => {
    const message = `🏥 *New Consultation Booking*

👤 *Patient Details:*
• Name: ${data.fullName}
• Age: ${data.age}
• Phone: ${data.phone}
• Email: ${data.email}

📋 *Consultation Info:*
• Type: ${data.consultationType}
• Urgency: ${data.urgencyLevel}
• Date: ${data.preferredDate}
• Time: ${data.preferredTime}

🩺 *Symptoms:*
${data.symptoms || "Not specified"}

📝 *Medical History:*
${data.medicalHistory || "Not specified"}

⏰ Submitted: ${new Date().toLocaleString()}`

    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${DOCTOR_WHATSAPP}?text=${encodedMessage}`
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, "_blank")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      // 1. Send to Google Sheets
      await sendToGoogleSheets(formData)

      // 2. Send WhatsApp notification
      sendWhatsAppMessage(formData)

      // 3. Email is sent automatically via Google Apps Script

      // Show success
      setSubmitted(true)

      // Reset form after 5 seconds
      setTimeout(() => {
        setFormData({
          fullName: "",
          age: "",
          email: "",
          phone: "",
          consultationType: "",
          urgencyLevel: "",
          preferredDate: "",
          preferredTime: "",
          symptoms: "",
          medicalHistory: "",
        })
        setSubmitted(false)
      }, 5000)
    } catch (err) {
      setError("Something went wrong. Please try again or contact us directly.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const consultationOptions = [
    { icon: Calendar, text: "In-person consultation" },
    { icon: Video, text: "Video consultation available" },
    { icon: AlertCircle, text: "Emergency appointments" },
    { icon: Share2, text: "Second opinion consultations" },
  ]

  return (
    <section ref={ref} className="pt-28 sm:pt-32 md:pt-36 pb-16 sm:pb-20 bg-linear-to-b from-brand-blue-50 via-brand-purple-50/50 to-white relative overflow-hidden min-h-screen">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className={`absolute top-20 left-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-brand-blue-300 rounded-full mix-blend-multiply filter blur-3xl transition-all duration-1000 ${inView ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}></div>
        <div className={`absolute bottom-20 right-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-brand-purple-300 rounded-full mix-blend-multiply filter blur-3xl transition-all duration-1000 delay-300 ${inView ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Online <span className="bg-linear-to-r from-[#2F72B8] via-[#3B96D7] to-[#5E3491] bg-clip-text text-transparent">Consultation</span>
          </h1>
          <p className="text-base text-foreground/70 max-w-2xl mx-auto">
            Convenient, professional medical consultations tailored to your needs
          </p>
        </div>

        {/* Two Column Layout: Left - Options & Info, Right - Form (wider) */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10">
          
          {/* Left Column - Consultation Options & Info */}
          <div className={`lg:col-span-2 space-y-3 lg:space-y-4 transition-all duration-700 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`} style={{ transitionDelay: '200ms' }}>
            
            {/* Consultation Options Card - Compact */}
            <div className="bg-card p-5 lg:p-6 rounded-2xl border border-border shadow-lg lg:min-h-[180px]">
              <h2 className="text-xl font-bold text-foreground mb-4 lg:mb-4">Consultation Options</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-2">
                {consultationOptions.map((option, index) => {
                  const Icon = option.icon
                  return (
                    <div 
                      key={index} 
                      className={`flex items-center gap-3 lg:gap-2 p-3 lg:p-2.5 rounded-lg bg-linear-to-r from-brand-blue-50/50 to-brand-purple-50/50 border border-brand-blue-100 hover:border-primary transition-all duration-300 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
                      style={{ transitionDelay: `${300 + index * 100}ms` }}
                    >
                      <div className="p-2 lg:p-1.5 bg-linear-to-br from-[#2F72B8] to-[#5E3491] rounded-lg shrink-0">
                        <Icon size={20} className="text-white lg:w-4 lg:h-4" />
                      </div>
                      <span className="text-sm lg:text-sm font-medium text-foreground leading-tight">{option.text}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Consultation Duration Card */}
            <div className={`bg-linear-to-r from-brand-blue-50 to-brand-purple-50 p-4 sm:p-5 lg:p-5 rounded-2xl border border-brand-blue-200 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '700ms' }}>
              <h3 className="text-lg sm:text-xl font-bold text-foreground mb-3 sm:mb-4 lg:mb-4">Consultation Duration</h3>
              <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:gap-2">
                <div className="bg-white/70 p-2.5 sm:p-4 lg:p-2.5 rounded-lg text-center border border-brand-blue-100">
                  <p className="font-bold text-primary text-base sm:text-xl lg:text-lg">45-60</p>
                  <p className="text-[11px] sm:text-sm lg:text-xs text-foreground/60">min Initial</p>
                </div>
                <div className="bg-white/70 p-2.5 sm:p-4 lg:p-2.5 rounded-lg text-center border border-brand-blue-100">
                  <p className="font-bold text-primary text-base sm:text-xl lg:text-lg">30-45</p>
                  <p className="text-[11px] sm:text-sm lg:text-xs text-foreground/60">min Follow-up</p>
                </div>
                <div className="bg-white/70 p-2.5 sm:p-4 lg:p-2.5 rounded-lg text-center border border-brand-blue-100">
                  <p className="font-bold text-primary text-base sm:text-xl lg:text-lg">Flexible</p>
                  <p className="text-[11px] sm:text-sm lg:text-xs text-foreground/60">Emergency</p>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className={`bg-red-50 p-4 lg:p-4 rounded-xl border border-red-200 flex items-center gap-4 lg:gap-3 transition-all duration-700 lg:min-h-[90px] ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '800ms' }}>
              <div className="p-2.5 lg:p-2 bg-red-100 rounded-lg">
                <AlertCircle className="text-red-600 w-6 h-6 lg:w-5 lg:h-5" />
              </div>
              <div>
                <p className="text-sm lg:text-xs text-red-700 font-medium">Emergency</p>
                <a href="tel:+917009521950" className="font-bold text-red-800 hover:underline text-base lg:text-sm">+91 7009521950</a>
              </div>
            </div>


            {/* Email Contact */}
            <div className={`flex items-center gap-4 lg:gap-3 p-4 lg:p-4 bg-card rounded-xl border border-border transition-all duration-700 lg:min-h-[90px] ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '900ms' }}>
              <div className="p-2.5 lg:p-2 bg-primary/10 rounded-lg">
                <Mail className="text-primary w-6 h-6 lg:w-5 lg:h-5" />
              </div>
              <div>
                <p className="text-sm lg:text-xs text-foreground/60 font-medium">Email</p>
                <a href="mailto:gaurav.jaswal@gmail.com" className="font-semibold text-primary hover:underline text-base lg:text-sm">gaurav.jaswal@gmail.com</a>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Form */}
          <div className={`lg:col-span-3 transition-all duration-700 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`} style={{ transitionDelay: '300ms' }}>
            <div className="bg-card p-6 sm:p-8 rounded-2xl border border-border shadow-lg">
              {/* Form Header */}
              <div className="mb-6 sm:mb-8">
                <h2 className="text-xl font-bold text-foreground mb-2">Book Your Consultation</h2>
                <p className="text-foreground/70">Fill out the form below and we'll confirm your appointment shortly</p>
              </div>

              {submitted ? (
                <div className="bg-green-50 border-2 border-green-300 rounded-xl p-8 text-center">
                  <div className="text-5xl mb-4">✓</div>
                  <h3 className="text-xl font-bold text-green-900 mb-2">Booking Submitted!</h3>
                  <p className="text-green-800 mb-2">We'll confirm your appointment within 2 hours.</p>
                  <p className="text-green-700 text-sm">WhatsApp and Email notifications have been sent to Dr. Gaurav.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {error && (
                    <div className="bg-red-50 border border-red-300 rounded-lg p-4 text-red-800 text-sm">
                      {error}
                    </div>
                  )}
                  {/* Full Name */}
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

                  {/* Age, Email, Phone Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Age <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        placeholder="Age"
                        required
                        min="1"
                        max="120"
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      />
                    </div>
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

                  {/* Consultation Type & Urgency Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        <option value="in-person">In-Person</option>
                        <option value="video">Video Consultation</option>
                        <option value="emergency">Emergency</option>
                        <option value="second-opinion">Second Opinion</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Urgency Level <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="urgencyLevel"
                        value={formData.urgencyLevel}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      >
                        <option value="">Select urgency level</option>
                        <option value="routine">Routine</option>
                        <option value="soon">Within a Week</option>
                        <option value="urgent">Urgent (1-2 days)</option>
                        <option value="emergency">Emergency</option>
                      </select>
                    </div>
                  </div>

                  {/* Date & Time Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Preferred Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Preferred Time <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      >
                        <option value="">Select preferred time</option>
                        <option value="morning">Morning (9 AM - 12 PM)</option>
                        <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
                        <option value="evening">Evening (4 PM - 6 PM)</option>
                      </select>
                    </div>
                  </div>

                  {/* Symptoms */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Current Symptoms or Concerns
                    </label>
                    <textarea
                      name="symptoms"
                      value={formData.symptoms}
                      onChange={handleChange}
                      placeholder="Please describe your symptoms or reason for consultation..."
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                    />
                  </div>

                  {/* Medical History */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Medical History
                    </label>
                    <textarea
                      name="medicalHistory"
                      value={formData.medicalHistory}
                      onChange={handleChange}
                      placeholder="Any previous medical conditions, surgeries, allergies, or ongoing treatments..."
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                    />
                  </div>

                  {/* Privacy Note */}
                  <div className="flex items-start gap-3 bg-blue-50/50 p-4 rounded-lg border border-blue-200">
                    <div className="text-primary text-lg mt-0.5">ℹ️</div>
                    <p className="text-sm text-foreground/70">
                      All personal and medical information shared is kept strictly confidential and secure according to medical privacy standards.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-bold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Book Consultation"
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ConsultationOptions

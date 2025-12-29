"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowLeft, Calendar, Clock, User, Tag, Share2, Facebook, Twitter, Linkedin, Mail, BookOpen, ChevronUp, Heart, Bookmark, Copy, Check } from "lucide-react"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { BlogArticle, getRelatedArticles } from "../../lib/blog-data"

interface BlogArticleViewProps {
  article: BlogArticle
  allArticles: BlogArticle[]
  onBack: () => void
}

const BlogArticleView = ({ article, allArticles, onBack }: BlogArticleViewProps) => {
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [readingProgress, setReadingProgress] = useState(0)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [copied, setCopied] = useState(false)
  const articleRef = useRef<HTMLDivElement>(null)

  // Reading progress indicator
  useEffect(() => {
    const handleScroll = () => {
      if (articleRef.current) {
        const element = articleRef.current
        const totalHeight = element.scrollHeight - window.innerHeight
        const progress = (window.scrollY / totalHeight) * 100
        setReadingProgress(Math.min(100, Math.max(0, progress)))
        setShowBackToTop(window.scrollY > 500)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = (platform: string) => {
    const url = window.location.href
    const title = article.title
    const text = article.excerpt

    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')
        break
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank')
        break
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank')
        break
      case 'email':
        window.open(`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text + '\n\n' + url)}`, '_blank')
        break
    }
    setShowShareMenu(false)
  }

  // Get related articles
  const relatedArticles = getRelatedArticles(allArticles, article.id, article.category, 2)

  return (
    <div ref={articleRef} className="min-h-screen bg-white">
      {/* Reading Progress Bar - above navbar */}
      <div className="fixed top-0 left-0 right-0 z-60 h-1 bg-gray-200">
        <div 
          className="h-full bg-linear-to-r from-[#2F72B8] via-[#3B96D7] to-[#5E3491] transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Hero Section with Image - starts from top, goes behind navbar */}
      <div className="relative h-[60vh] sm:h-[65vh] md:h-[70vh] overflow-hidden">
        <img 
          src={article.image || "/placeholder.svg"} 
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/50 to-black/40" />
        
        {/* Back Button - compact, responsive, with good spacing from navbar */}
        <div className="absolute top-28 sm:top-32 md:top-36 right-4 sm:right-6 md:right-10 z-10">
          <button 
            onClick={() => onBack()}
            className="flex items-center gap-1.5 sm:gap-2 bg-white/20 hover:bg-white/30 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl transition-all duration-300 group cursor-pointer shadow-lg backdrop-blur-md border border-white/30 hover:border-white/50 hover:scale-105 text-xs sm:text-sm"
          >
            <ArrowLeft size={14} className="sm:w-4 sm:h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-semibold">Back</span>
          </button>
        </div>

        {/* Hero Content - positioned at bottom with proper spacing */}
        <div className="absolute bottom-0 left-0 right-0 p-4 pb-6 sm:p-6 sm:pb-8 md:p-10 md:pb-12 lg:p-12 lg:pb-16">
          <div className="max-w-4xl mx-auto">
            {/* Category & Featured Badge */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <span className="bg-white/20 backdrop-blur-sm text-white px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold border border-white/30">
                {article.category}
              </span>
              {article.featured && (
                <span className="bg-linear-to-r from-[#2F72B8] to-[#5E3491] text-white px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-1.5 sm:gap-2">
                  <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                  Featured
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 sm:mb-4 leading-tight drop-shadow-lg">
              {article.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 md:gap-6 text-white/80 text-xs sm:text-sm">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-linear-to-r from-[#2F72B8] to-[#5E3491] rounded-full flex items-center justify-center text-white text-[10px] sm:text-xs font-bold">
                  {article.author.split(' ').map(name => name[0]).join('')}
                </div>
                <span className="font-medium hidden xs:inline">{article.author}</span>
                <span className="font-medium xs:hidden">{article.author.split(' ')[0]}</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <Calendar size={12} className="sm:w-3.5 sm:h-3.5" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <Clock size={12} className="sm:w-3.5 sm:h-3.5" />
                <span>{article.readTime}</span>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <BookOpen size={14} />
                <span>Medical Insights</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        {/* Excerpt Box */}
        <div className="bg-linear-to-r from-primary/5 via-primary/10 to-accent/5 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border border-primary/20 mb-8 sm:mb-10 md:mb-12">
          <p className="text-base sm:text-lg md:text-xl text-foreground/80 leading-relaxed italic">
            "{article.excerpt}"
          </p>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 sm:pb-8 border-b border-border mb-8 sm:mb-10">
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-full transition-all duration-300 ${isLiked 
                  ? 'bg-red-100 text-red-600' 
                  : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-500'
              }`}
            >
              <Heart size={16} className={`sm:w-[18px] sm:h-[18px] ${isLiked ? 'fill-current' : ''}`} />
              <span className="text-xs sm:text-sm font-medium">{isLiked ? 'Liked' : 'Like'}</span>
            </button>
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-full transition-all duration-300 ${isBookmarked 
                  ? 'bg-primary/20 text-primary' 
                  : 'bg-gray-100 text-gray-600 hover:bg-primary/10 hover:text-primary'
              }`}
            >
              <Bookmark size={16} className={`sm:w-[18px] sm:h-[18px] ${isBookmarked ? 'fill-current' : ''}`} />
              <span className="text-xs sm:text-sm font-medium">{isBookmarked ? 'Saved' : 'Save'}</span>
            </button>
          </div>

          {/* Share Options */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={copyLink}
              className={`p-2 sm:p-2.5 rounded-full transition-all duration-300 ${copied ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              title="Copy link"
            >
              {copied ? <Check size={16} className="sm:w-[18px] sm:h-[18px]" /> : <Copy size={16} className="sm:w-[18px] sm:h-[18px]" />}
            </button>
            <button
              onClick={() => handleShare('twitter')}
              className="p-2 sm:p-2.5 rounded-full bg-gray-100 text-gray-600 hover:bg-sky-100 hover:text-sky-500 transition-all duration-300"
              title="Share on Twitter"
            >
              <Twitter size={16} className="sm:w-[18px] sm:h-[18px]" />
            </button>
            <button
              onClick={() => handleShare('linkedin')}
              className="p-2 sm:p-2.5 rounded-full bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-700 transition-all duration-300"
              title="Share on LinkedIn"
            >
              <Linkedin size={16} className="sm:w-[18px] sm:h-[18px]" />
            </button>
            <button
              onClick={() => handleShare('facebook')}
              className="p-2 sm:p-2.5 rounded-full bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-all duration-300"
              title="Share on Facebook"
            >
              <Facebook size={16} className="sm:w-[18px] sm:h-[18px]" />
            </button>
          </div>
        </div>

        {/* Article Content */}
        <article 
          className="prose prose-lg max-w-none article-content"
        >
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            // Explicitly define how paragraphs and list items are rendered to ensure proper spacing.
            // This helps if default prose styles are insufficient or overridden, or if Markdown
            // input sometimes generates elements without expected margins.
            components={{
              p: (props) => <p className="mb-2" {...props} />,
              ul: ({node, ...props}) => <ul className="mb-4 pl-5 list-disc" {...props} />,
              ol: ({node, ...props}) => <ol className="mb-4 pl-5 list-decimal" {...props} />,
              li: ({node, ...props}) => <li className="mb-1" {...props} />,
            }}
          >{article.content}</ReactMarkdown>
        </article>

        {/* Tags Section */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-border">
          <div className="flex items-center gap-2 mb-4 sm:mb-5">
            <Tag size={16} className="sm:w-[18px] sm:h-[18px] text-primary" />
            <span className="font-semibold text-foreground text-sm sm:text-base">Related Topics</span>
          </div>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {article.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-linear-to-r from-primary/10 to-accent/10 text-foreground/80 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium hover:from-primary/20 hover:to-accent/20 transition-all cursor-pointer border border-primary/10"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Author Card */}
        <div className="mt-8 sm:mt-12 p-4 sm:p-6 md:p-8 bg-linear-to-br from-[#2F72B8]/5 via-white to-[#5E3491]/5 rounded-2xl sm:rounded-3xl border border-primary/20 shadow-lg sm:shadow-xl">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-linear-to-br from-[#2F72B8] to-[#5E3491] rounded-xl sm:rounded-2xl flex items-center justify-center text-white font-bold text-lg sm:text-xl md:text-2xl shadow-lg shrink-0">
              {article.author.split(' ').map(name => name[0]).join('')}
            </div>
            <div className="text-center sm:text-left">
              <span className="text-primary text-xs sm:text-sm font-semibold uppercase tracking-wide">Written by</span>
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2 sm:mb-3">{article.author}</h3>
              <p className="text-foreground/70 leading-relaxed mb-4 text-sm sm:text-base">
                Board-certified radiation oncologist with over 15 years of experience in advanced cancer treatment. 
                Specializing in precision radiotherapy, AI-assisted treatment planning, and patient-centered care.
              </p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-3">
                <a href="/consultation" className="bg-primary text-white px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
                  Book Consultation
                </a>
                <a href="/about" className="bg-primary/10 text-primary px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold hover:bg-primary/20 transition-all duration-300">
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-12 sm:mt-16">
            <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-6 sm:mb-8 flex items-center gap-2 sm:gap-3">
              <span className="w-1 h-6 sm:h-8 bg-linear-to-b from-[#2F72B8] to-[#5E3491] rounded-full"></span>
              Continue Reading
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {relatedArticles.map((relatedArticle) => (
                <div 
                  key={relatedArticle.id}
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                    // Trigger parent to change article
                  }}
                  className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                  <div className="h-40 overflow-hidden">
                    <img 
                      src={relatedArticle.image || "/placeholder.svg"} 
                      alt={relatedArticle.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-primary text-xs font-semibold">{relatedArticle.category}</span>
                    <h4 className="font-bold text-foreground mt-2 group-hover:text-primary transition-colors line-clamp-2">
                      {relatedArticle.title}
                    </h4>
                    <div className="flex items-center gap-3 mt-3 text-xs text-foreground/60">
                      <span>{relatedArticle.readTime}</span>
                      <span>•</span>
                      <span>{relatedArticle.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="mt-12 sm:mt-16 p-5 sm:p-8 md:p-10 bg-linear-to-br from-[#2F72B8] via-[#3B96D7] to-[#5E3491] rounded-2xl sm:rounded-3xl text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-32 sm:w-40 h-32 sm:h-40 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
          <div className="absolute bottom-0 right-0 w-40 sm:w-60 h-40 sm:h-60 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3 blur-2xl"></div>
          
          <div className="relative z-10">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3">
              Enjoyed this article?
            </h3>
            <p className="text-white/80 mb-4 sm:mb-6 max-w-lg mx-auto text-sm sm:text-base">
              Subscribe to receive more medical insights, treatment updates, and health tips directly to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border-2 border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/60 focus:outline-none focus:border-white/50 transition-all text-sm sm:text-base"
              />
              <button className="bg-white text-[#2F72B8] px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-300 whitespace-nowrap text-sm sm:text-base">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 bg-primary text-white rounded-full shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center z-50"
        >
          <ChevronUp size={20} className="sm:w-6 sm:h-6" />
        </button>
      )}

      {/* Floating Share Bar (Desktop) */}
      <div className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 flex-col gap-3 z-40">
        <button
          onClick={() => setIsLiked(!isLiked)}
          className={`w-11 h-11 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center ${isLiked ? 'bg-red-500 text-white' : 'bg-white text-gray-600 hover:bg-red-50 hover:text-red-500'}`}
        >
          <Heart size={18} className={isLiked ? 'fill-current' : ''} />
        </button>
        <button
          onClick={() => setIsBookmarked(!isBookmarked)}
          className={`w-11 h-11 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center ${isBookmarked ? 'bg-primary text-white' : 'bg-white text-gray-600 hover:bg-primary/10 hover:text-primary'}`}
        >
          <Bookmark size={18} className={isBookmarked ? 'fill-current' : ''} />
        </button>
        <div className="w-8 h-px bg-gray-300 mx-auto my-1"></div>
        <button
          onClick={() => handleShare('twitter')}
          className="w-11 h-11 rounded-full bg-white text-gray-600 shadow-lg hover:bg-sky-500 hover:text-white transition-all duration-300 flex items-center justify-center"
        >
          <Twitter size={18} />
        </button>
        <button
          onClick={() => handleShare('linkedin')}
          className="w-11 h-11 rounded-full bg-white text-gray-600 shadow-lg hover:bg-blue-700 hover:text-white transition-all duration-300 flex items-center justify-center"
        >
          <Linkedin size={18} />
        </button>
        <button
          onClick={() => handleShare('facebook')}
          className="w-11 h-11 rounded-full bg-white text-gray-600 shadow-lg hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center justify-center"
        >
          <Facebook size={18} />
        </button>
        <button
          onClick={copyLink}
          className={`w-11 h-11 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center ${copied ? 'bg-green-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
        >
          {copied ? <Check size={18} /> : <Copy size={18} />}
        </button>
      </div>
    </div>
  )
}

export default BlogArticleView

"use client"

import { useState, useEffect } from "react"
import { useInView } from "../../components/home/use-in-view"
import { Search, Zap, Clock, Calendar } from "lucide-react"
import { blogArticles, BlogArticle } from "../../lib/blog-data"
import BlogArticleView from "./blog-article-view"

export default function BlogSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [allArticles, setAllArticles] = useState<BlogArticle[]>([])
  const [filteredArticles, setFilteredArticles] = useState<BlogArticle[]>([])
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null)
  const [email, setEmail] = useState("")

  const categories = ["All", "General", "AI", "Health", "Technology", "Education", "Prevention", "Treatment", "Research"]

  useEffect(() => {
    fetch("http://localhost:3001/api/blogs")
      .then(res => res.json())
      .then(apiBlogs => {
        const combinedArticles = [...blogArticles];
        apiBlogs.forEach((apiBlog: any) => {
          if (!combinedArticles.some(article => article.id === apiBlog._id)) {
            combinedArticles.push({
              id: apiBlog._id,
              title: apiBlog.title,
              category: apiBlog.category,
              excerpt: apiBlog.excerpt,
              content: apiBlog.content,
              date: new Date(apiBlog.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
              featured: apiBlog.featured,
              image: apiBlog.image || "/placeholder.svg",
              readTime: apiBlog.readTime,
              author: apiBlog.author,
              tags: apiBlog.tags,
            });
          }
        });
        setAllArticles(combinedArticles);
      })
      .catch(err => {
        console.error("Error fetching blogs:", err)
        setAllArticles(blogArticles);
      });
  }, [])

  useEffect(() => {
    let filtered = allArticles

    if (selectedCategory !== "All") {
      filtered = allArticles.filter(article => article.category === selectedCategory)
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (article.tags && article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
      )
    }

    setFilteredArticles(filtered)
  }, [searchTerm, selectedCategory, allArticles])

  const featuredArticles = allArticles.filter(article => article.featured)
  const featuredArticle = featuredArticles[0]

  const handleArticleClick = (article: BlogArticle) => {
    setSelectedArticle(article)
    // Scroll to top when opening article
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const handleBackToBlog = () => {
    setSelectedArticle(null)
    // Scroll to top when going back
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email)
    setEmail('')
    // You can integrate with your email service here
  }

  // Show article view if an article is selected
  if (selectedArticle) {
    return <BlogArticleView article={selectedArticle} allArticles={allArticles} onBack={handleBackToBlog} />
  }

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
            Medical <span className="bg-linear-to-r from-[#2F72B8] via-[#3B96D7] to-[#5E3491] bg-clip-text text-transparent">Blog</span>
          </h1>
          <p className="text-base text-foreground/70 max-w-2xl mx-auto">
            Stay informed with the latest medical insights, treatment advances, and patient care tips from Dr. Gaurav Jaswal
          </p>
        </div>

        {/* Search Bar */}
        <div className={`mb-10 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '200ms' }}>
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-foreground/40" size={22} />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-4 rounded-xl border border-border bg-card text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className={`mb-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '300ms' }}>
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
            {categories.map((category, index) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 sm:px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-card text-foreground border border-border hover:border-primary hover:shadow-md"
                }`}
                style={{ transitionDelay: `${400 + index * 50}ms` }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Article */}
        {featuredArticle && selectedCategory === "All" && !searchTerm && (
          <div className={`mb-12 sm:mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '500ms' }}>
            <div 
              onClick={() => handleArticleClick(featuredArticle)}
              className="relative overflow-hidden rounded-2xl bg-card border border-border group cursor-pointer hover:border-primary hover:shadow-xl transition-all duration-300"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                {/* Image */}
                <div className="overflow-hidden h-64 md:h-auto">
                  <img
                    src={featuredArticle.image || "/placeholder.svg"}
                    alt={featuredArticle.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col justify-center p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Zap size={18} className="text-primary" />
                    <span className="bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-semibold">
                      Featured Article
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                    {featuredArticle.title}
                  </h2>
                  <p className="text-foreground/70 mb-6 text-base">{featuredArticle.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-foreground/60">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{new Date(featuredArticle.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{featuredArticle.readTime}</span>
                      </div>
                    </div>
                    <button className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-semibold hover:shadow-lg transition-all group-hover:scale-105">
                      Read Article
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Articles Grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {filteredArticles.map((article, index) => (
              <div
                key={article.id.toString()}
                onClick={() => handleArticleClick(article)}
                className={`group rounded-2xl overflow-hidden bg-card border border-border hover:border-primary hover:shadow-xl transition-all duration-500 cursor-pointer mb-8 ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${600 + index * 100}ms` }}
              >
                {/* Image */}
                <div className="overflow-hidden h-48 bg-muted">
                  <img
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold">
                      {article.category}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-foreground/60">
                      <Clock size={12} />
                      <span>{article.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-foreground/70 text-sm mb-4 line-clamp-3">{article.excerpt}</p>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-foreground/60">{new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    <span className="text-xs text-foreground/60">By {article.author}</span>
                  </div>

                  <button className="w-full bg-primary/10 text-primary px-4 py-2.5 rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300 group-hover:scale-105">
                    Read Article
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={`text-center py-16 transition-all duration-700 ${inView ? 'opacity-100' : 'opacity-0'}`}>
            <p className="text-base text-foreground/60 mb-4">No articles found matching your search.</p>
            <button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("All")
              }}
              className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Newsletter Section */}
        <div className={`mt-16 sm:mt-20 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '800ms' }}>
          <div className="relative overflow-hidden bg-linear-to-br from-[#2F72B8] via-[#3B96D7] to-[#5E3491] p-8 sm:p-12 rounded-2xl shadow-2xl text-center">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3 blur-2xl"></div>
            <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-white/5 rounded-full blur-xl"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <span className="text-white/90 text-sm font-medium">📬 Newsletter</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Stay Updated with Medical Insights
              </h2>
              <p className="text-white/80 max-w-xl mx-auto mb-8 text-base">
                Subscribe to our newsletter for the latest articles, treatment updates, and health tips delivered directly to your inbox.
              </p>
              
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-5 py-4 rounded-xl border-2 border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/50 focus:outline-none focus:border-white/50 focus:bg-white/20 transition-all"
                />
                <button
                  type="submit"
                  className="bg-white text-[#2F72B8] px-8 py-4 rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  Subscribe
                </button>
              </form>
              
              <p className="text-sm text-white/60 mt-6">
                🔒 We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
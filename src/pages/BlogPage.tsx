import Header from "../../components/header"
import Footer from "../../components/footer"
import BlogSection from "../../components/blog/blog-section"

const BlogPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <BlogSection />
      </main>
      <Footer />
    </div>
  )
}

export default BlogPage

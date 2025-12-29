"use client"

import { useState, useEffect } from "react"
import { Lock, LogOut, Eye, EyeOff } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import AdminBlogManager from "../../components/admin/admin-blog-manager"
import AdminImageManager from "../../components/admin/admin-image-manager"

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [passwordInput, setPasswordInput] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [images, setImages] = useState<string[]>([])
  const [blogs, setBlogs] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchBlogs = () => {
    fetch("http://localhost:3001/api/blogs")
      .then(res => res.json())
      .then(data => setBlogs(data))
      .catch(err => console.error("Error fetching blogs:", err))
  }

  useEffect(() => {
    // Check auth status
    fetch("http://localhost:3001/api/auth/status", { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        setIsAuthenticated(data.isAuthenticated)
        setIsLoading(false)
      })
      .catch(() => {
        setIsAuthenticated(false)
        setIsLoading(false)
      })

    // Load images from local storage
    const storedImages = localStorage.getItem("adminImages")
    if (storedImages) {
      setImages(JSON.parse(storedImages))
    }
    
    fetchBlogs()
  }, [])

  const handleLogin = () => {
    fetch("http://localhost:3001/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: passwordInput }),
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setIsAuthenticated(true)
          setPasswordInput("")
          setError("")
          fetchBlogs() // Refresh blogs after login
        } else {
          setError(data.message || "Invalid password")
          setPasswordInput("")
        }
      })
      .catch(() => {
        setError("An error occurred during login.")
        setPasswordInput("")
      })
  }

  const handleLogout = () => {
    fetch("http://localhost:3001/api/logout", { method: "POST", credentials: 'include' })
      .then(() => {
        setIsAuthenticated(false)
      })
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin()
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex justify-center mb-6">
              <div className="bg-indigo-100 p-4 rounded-full">
                <Lock className="w-8 h-8 text-indigo-600" />
              </div>
            </div>

            <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
              Admin Access
            </h1>
            <p className="text-center text-gray-600 mb-6">
              Enter your password to manage content
            </p>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter admin password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pr-10"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-500"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              <Button
                onClick={handleLogin}
                className="w-full bg-indigo-600 hover:bg-indigo-700"
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
            <p className="text-gray-600 mt-1">Manage your blog and images</p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleLogout}
              variant="outline"
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AdminBlogManager images={images} blogs={blogs} setBlogs={setBlogs} />
          <AdminImageManager images={images} setImages={setImages} />
        </div>
      </div>
    </div>
  )
}

export default AdminPage

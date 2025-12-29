import React, { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

const CATEGORIES = ["General", "AI", "Health", "Technology", "Education"];

interface Blog {
  _id: string;
  title: string;
  category: string;
  content: string;
  featured: boolean;
  image?: string;
  date: string;
}

interface Props {
  images: string[];
  blogs: Blog[];
  setBlogs: React.Dispatch<React.SetStateAction<Blog[]>>;
}

const AdminBlogManager = ({ images, blogs, setBlogs }: Props) => {
  const [authChecked, setAuthChecked] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: "",
    category: CATEGORIES[0],
    content: "",
    featured: false,
    image: "",
    date: new Date().toISOString().split("T")[0],
  });

  /* ================= AUTH CHECK ================= */
  useEffect(() => {
    fetch("http://localhost:3001/api/auth/status", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.isAuthenticated) {
          window.location.href = "/login";
        } else {
          setAuthChecked(true);
        }
      })
      .catch(() => {
        window.location.href = "/login";
      });
  }, []);

  if (!authChecked) {
    return <div className="p-6">Checking authentication…</div>;
  }

  /* ================= HANDLERS ================= */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, type, value, checked } = e.target as any;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({
      title: "",
      category: CATEGORIES[0],
      content: "",
      featured: false,
      image: "",
      date: new Date().toISOString().split("T")[0],
    });
  };

  const handlePublish = async () => {
    if (!form.title.trim() || !form.content.trim()) {
      alert("Title and content are required");
      return;
    }

    const url = editingId
      ? `http://localhost:3001/api/blogs/${editingId}`
      : `http://localhost:3001/api/blogs`;

    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      alert("Failed to save blog");
      return;
    }

    const blog = await res.json();

    if (editingId) {
      setBlogs(blogs.map((b) => (b._id === editingId ? blog : b)));
    } else {
      setBlogs([blog, ...blogs]);
    }
    resetForm();
  };

  const handleEdit = (blog: Blog) => {
    setEditingId(blog._id);
    setForm({
      title: blog.title,
      category: blog.category,
      content: blog.content,
      featured: blog.featured,
      image: blog.image || "",
      date: new Date(blog.date).toISOString().split("T")[0],
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this blog?")) return;

    await fetch(`http://localhost:3001/api/blogs/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    setBlogs(blogs.filter((b) => b._id !== id));
    if (editingId === id) resetForm();
  };

  /* ================= UI ================= */
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-10">
      {/* FORM */}
      <div className="border rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-semibold">
          {editingId ? "Edit Blog" : "Create Blog"}
        </h2>

        <Input
          name="title"
          placeholder="Blog title"
          value={form.title}
          onChange={handleChange}
        />

        <Input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
        />

        <Select
          value={form.category}
          onValueChange={(value) =>
            setForm((prev) => ({ ...prev, category: value }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={form.image}
          onValueChange={(value) =>
            setForm((prev) => ({ ...prev, image: value }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select image (optional)" />
          </SelectTrigger>
          <SelectContent>
            {images.map((img, i) => (
              <SelectItem key={i} value={img}>
                Image {i + 1}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <textarea
          name="content"
          rows={6}
          className="w-full border rounded-md p-2"
          placeholder="Blog content"
          value={form.content}
          onChange={handleChange}
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="featured"
            checked={form.featured}
            onChange={handleChange}
          />
          Featured
        </label>

        <div className="flex gap-3">
          <Button onClick={handlePublish}>
            {editingId ? "Update Blog" : "Publish Blog"}
          </Button>
          {editingId && (
            <Button variant="outline" onClick={resetForm}>
              Cancel
            </Button>
          )}
        </div>
      </div>

      {/* BLOG LIST */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Existing Blogs</h3>

        {blogs.length === 0 && (
          <div className="text-gray-500">No blogs yet.</div>
        )}

        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="border rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <div className="font-medium">{blog.title}</div>
              <div className="text-xs text-gray-500">
                {blog.category}{" "}
                {blog.featured && (
                  <span className="text-yellow-600 ml-2">★ Featured</span>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => handleEdit(blog)}>
                Edit
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleDelete(blog._id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminBlogManager;

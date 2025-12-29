import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"

import App from "./App"
import { ThemeProvider } from "../components/theme-provider"
import "./styles.css"

const rootElement = document.getElementById("root")

if (!rootElement) {
  throw new Error("Root element with id 'root' not found")
}

// Force light theme in localStorage before render
if (typeof window !== 'undefined') {
  localStorage.setItem('theme', 'light')
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
    <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light" enableSystem={false} disableTransitionOnChange>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)

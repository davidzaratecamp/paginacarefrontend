import { Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header.jsx'
import Footer from './components/layout/Footer.jsx'
import FloatingButtons from './components/ui/FloatingButtons.jsx'
import HomePage from './pages/HomePage.jsx'
import QuienesSomos from './pages/QuienesSomos.jsx'
import FAQ from './pages/FAQ.jsx'
import Blog from './pages/Blog.jsx'
import BlogPost from './pages/BlogPost.jsx'
import Contacto from './pages/Contacto.jsx'
import Admin from './pages/admin/Admin.jsx'
import AdminLogin from './pages/admin/AdminLogin.jsx'
import AdminBlogs from './pages/admin/AdminBlogs.jsx'
import AdminForms from './pages/admin/AdminForms.jsx'
import AdminNewBlog from './pages/admin/AdminNewBlog.jsx'
import AdminEditBlog from './pages/admin/AdminEditBlog.jsx'
import AdminReviews from './pages/admin/AdminReviews.jsx'
import { useLocation } from 'react-router-dom'

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen">
      {!isAdminRoute && <Header />}

      <main className={!isAdminRoute ? "pt-16 lg:pt-20" : ""}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quienes-somos" element={<QuienesSomos />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/blog" element={<AdminBlogs />} />
          <Route path="/admin/blog/new" element={<AdminNewBlog />} />
          <Route path="/admin/blog/edit/:id" element={<AdminEditBlog />} />
          <Route path="/admin/forms" element={<AdminForms />} />
          <Route path="/admin/reviews" element={<AdminReviews />} />
        </Routes>
      </main>

      {!isAdminRoute && (
        <>
          <FloatingButtons />
          <Footer />
        </>
      )}
    </div>
  )
}

export default App
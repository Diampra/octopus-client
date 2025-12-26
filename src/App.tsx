import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AdminPostForm from "./pages/AdminPostForm";
// import Admin from "./pages/Admin";
import AdminRoute from "./components/Route/adminRoute";
import Auth from "./pages/Auth";
import AdminCategories from "./pages/AdminCategories";
import AdminDashboard from "./pages/AdminDashboard";
import AdminPosts from "./pages/AdminPosts";
import AdminLayout from "./layouts/AdminLayout";
import AdminPortfolio from "./pages/AdminPortfolio";
import AdminPortfolioForm from "./pages/AdminPortfolioForm";
import AdminPortfolioCategories from "./pages/AdminPortfolioCategories";
import AdminServiceForm from "./pages/AdminServiceForm";
import AdminServiceList from "./pages/AdminServiceList";
import AdminTestimonialsList from "./pages/AdminTestimonialsList";
import AdminTestimonialForm from "./pages/AdminTestimonialForm";
import AdminStorageAudit from "./pages/AdminStorageAudit";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import DMCA from "./pages/DMCA";
import AdminMediaGallery from "./pages/media/AdminMediaGallery";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />


      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/services" element={<Services />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="posts" element={<AdminPosts />} />
          <Route path="posts/:id" element={<AdminPostForm />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="portfolio" element={<AdminPortfolio />} />
          <Route path="portfolio/new" element={<AdminPortfolioForm />} />
          <Route path="portfolio/:id" element={<AdminPortfolioForm />} />
          <Route path="portfolio/categories" element={<AdminPortfolioCategories />} />
          <Route path="services" element={<AdminServiceList />} />
          <Route path="services/new" element={<AdminServiceForm />} />
          <Route path="services/:id" element={<AdminServiceForm />} />
          <Route path="testimonials" element={<AdminTestimonialsList />} />
          <Route path="testimonials/:id" element={<AdminTestimonialForm />} />

          <Route path="storage" element={<AdminStorageAudit />} />
          {/* <Route path="media-gallery" element={<AdminMediaGallery />} /> */}
        </Route>
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/dmca" element={<DMCA />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

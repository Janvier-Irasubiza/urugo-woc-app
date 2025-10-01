import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import Index from "../pages/Index";
import About from "../pages/about";
import Events from "../pages/events";
import Accommodations from "../pages/accommodations";
import Dining from "../pages/dining";
import Marketplace from "../pages/marketplace";
import ProductInfo from "../pages/product-info";
import PostDetails from "../pages/news";
import EventDetails from "../pages/info";
import Dashboard from "../pages/dashboard/home";
import Settings from "../pages/dashboard/settings";
import ProtectedRoute from "../configs/protect-route";
import MyCart from "../pages/dashboard/my-cart";
import NotFound from "../pages/not-found";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/events" element={<Events />} />
        <Route path="/accommodations" element={<Accommodations />} />
        <Route path="/dining" element={<Dining />} />
        <Route path="/dng/:slug" element={<EventDetails />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/itm/:slug" element={<ProductInfo />} />
        <Route path="/atl/:slug" element={<PostDetails />} />

        {/* Protected dashboard routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/me" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="settings" element={<Settings />} />
            <Route path="cart" element={<MyCart />} />
          </Route>
        </Route>

        {/* 404 fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

// Dashboard layout component
function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <Outlet />
    </div>
  );
}

export default Router;

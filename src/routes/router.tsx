import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "../pages/Index";
import About from "../pages/about";
import Events from "../pages/events";
import Accommodations from "../pages/accommodations";
import Dining from "../pages/dining";
import Marketplace from "../pages/marketplace";
import Cultural from "../pages/cultural";
import ProductInfo from "../pages/product-info";
import PostDetails from "../pages/news";
import EventDetails from "../pages/info";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/events" element={<Events />} />
        <Route path="/accommodations" element={<Accommodations />} />
        <Route path="/dining" element={<Dining />} />
        <Route path="/dng/:slug" element={<EventDetails />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/cultural" element={<Cultural />} />
        <Route path="/itm/:slug" element={<ProductInfo />} />
        <Route path="/atl/:slug" element={<PostDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

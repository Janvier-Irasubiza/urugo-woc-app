import Footer from "../partials/footer";
import Nav from "../partials/nav";
import { useSitemap } from "../utils/sitemap";

interface AppProps {
  children: React.ReactNode;
}

function App({ children }: AppProps) {
  // Add SEO utilities
  useSitemap();

  return (
    <div>
      <Nav />
      {children}
      <Footer />
    </div>
  );
}

export default App;

import Footer from "../partials/footer";
import Nav from "../partials/nav";

interface AppProps {
  children: React.ReactNode;
}

function App({ children }: AppProps) {
  return (
    <div>
      <Nav />
      {children}
      <Footer />
    </div>
  );
}

export default App;

import "./App.css";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Jne from "./pages/Jne";
import Jnt from "./pages/Jnt";
import Pos from "./pages/Pos";
import Sicepat from "./pages/Sicepat";
import Anteraja from "./pages/Anteraja";
import Ninja from "./pages/Ninja";
import Tiki from "./pages/Tiki";
import Spx from "./pages/Spx";
import About from "./pages/About";
import { Routes, Route } from "react-router-dom";
import Notfound from "./pages/Notfound";

function App() {
  return (
    <>
      <div className="px-5 lg:px-60">
        <Nav />
        <Routes>
          <Route path="*" element={<Notfound />} />
          <Route path="cek-resi-all" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="jne" element={<Jne />} />
          <Route path="jnt" element={<Jnt />} />
          <Route path="pos" element={<Pos />} />
          <Route path="spx" element={<Spx />} />
          <Route path="ninja" element={<Ninja />} />
          <Route path="tiki" element={<Tiki />} />
          <Route path="anteraja" element={<Anteraja />} />
          <Route path="sicepat" element={<Sicepat />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

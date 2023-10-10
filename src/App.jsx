import "./App.css";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Jne from "./pages/Jne";
import Jnt from "./pages/Jnt";
import Pos from "./pages/Pos";
import { Routes, Route } from "react-router-dom";
import Sicepat from "./pages/Sicepat";
import Anteraja from "./pages/Anteraja";
import Ninja from "./pages/Ninja";
import Tiki from "./pages/Tiki";
import Spx from "./pages/Spx";

function App() {
  return (
    <>
      <div className="px-5">
        <Nav />
        <Routes>
          <Route path="/cek-resi-all" element={<Home />} />
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

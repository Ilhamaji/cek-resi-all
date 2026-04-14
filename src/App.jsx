import { lazy, Suspense } from "react";
import Nav from "./components/Nav";
import { Routes, Route } from "react-router-dom";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Notfound = lazy(() => import("./pages/Notfound"));

function App() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col relative overflow-hidden">
      {/* Background Decorative Blur Blobs */}
      <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 z-0 pointer-events-none"></div>
      <div className="absolute top-40 -left-32 w-[600px] h-[600px] bg-sky-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 z-0 pointer-events-none"></div>
      <div className="absolute -bottom-32 left-1/3 w-[600px] h-[600px] bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 z-0 pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 lg:px-8 flex-grow flex flex-col">
        <Nav />
        <main className="flex-grow flex flex-col pt-8 pb-16">
          <Suspense fallback={
            <div className="flex-grow flex items-center justify-center">
              <div className="animate-spin h-8 w-8 text-indigo-500 border-4 border-indigo-200 border-t-indigo-600 rounded-full"></div>
            </div>
          }>
            <Routes>
              <Route path="*" element={<Notfound />} />
              <Route path="/" element={<Home />} />
              <Route path="about" element={<About />} />
            </Routes>
          </Suspense>
        </main>
      </div>

      <footer className="relative z-10 py-6 text-center text-sm text-slate-500 font-medium">
        &copy; {new Date().getFullYear()} Cek Resi All. Auto-detects 8+ Couriers
        in Indonesia.
      </footer>
    </div>
  );
}

export default App;

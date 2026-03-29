import React from "react";

export default function About() {
  return (
    <div className="flex-grow flex flex-col items-center justify-center w-full transition-all duration-500 animate-slide-up px-4">
      <div className="glass-card w-full max-w-2xl p-8 md:p-12 text-center relative overflow-hidden">
        
        {/* Dekorasi Latar Belakang */}
        <div className="absolute top-0 right-0 -m-16 w-32 h-32 bg-indigo-100 rounded-full mix-blend-multiply opacity-50"></div>
        <div className="absolute bottom-0 left-0 -m-16 w-32 h-32 bg-sky-100 rounded-full mix-blend-multiply opacity-50"></div>

        {/* Icon / Avatar App */}
        <div className="w-20 h-20 mx-auto bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-200 mb-6 relative z-10">
          <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4 tracking-tight relative z-10">
          Tentang <span className="text-gradient">Cek Resi All</span>
        </h1>
        
        <p className="text-slate-500 font-medium leading-relaxed mb-8 max-w-lg mx-auto relative z-10">
          Platform pelacakan resi canggih dengan satu input yang mampu mendeteksi secara presisi dan melacak paket Anda dari berbagai layanan ekspedisi populer di Indonesia.
        </p>

        {/* Garis Pemisah */}
        <div className="w-16 h-1 bg-slate-200 mx-auto rounded-full mb-8"></div>

        {/* Developer Info */}
        <div className="flex flex-col items-center relative z-10">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Dikembangkan Oleh</p>
          
          <a 
            href="https://www.instagram.com/ilhmsap" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center gap-3 bg-white border border-slate-200 px-6 py-3 rounded-xl hover:shadow-md hover:border-indigo-200 transition-all duration-300"
          >
            {/* Instagram Icon */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </div>
            <span className="font-bold text-slate-700 group-hover:text-indigo-600 transition-colors">@Ilhmsap</span>
          </a>
        </div>

      </div>
    </div>
  );
}

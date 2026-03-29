import axios from "axios";
import React, { useState } from "react";

const COURIERS = [
  { id: "jnt", name: "J&T Express" },
  { id: "jne", name: "JNE" },
  { id: "sicepat", name: "SiCepat" },
  { id: "spx", name: "Shopee Express" },
  { id: "ninja", name: "Ninja Xpress" },
  { id: "anteraja", name: "AnterAja" },
  { id: "tiki", name: "TIKI" },
  { id: "pos", name: "POS Indonesia" },
];

const guessCourierPriority = (courierId, resi) => {
  const upperResi = resi.toUpperCase();
  const isNumeric = /^\d+$/.test(resi);
  const length = resi.length;

  switch (courierId) {
    case 'spx':
      if (upperResi.startsWith("SPXID") || upperResi.startsWith("ID")) return 3;
      break;
    case 'jnt':
      if (["JP", "JX", "JZ", "JD", "JT", "JB"].some(prefix => upperResi.startsWith(prefix))) return 3;
      if (isNumeric && length === 12) return 1;
      break;
    case 'sicepat':
      if (upperResi.startsWith("00") && isNumeric && length >= 12) return 3;
      break;
    case 'jne':
      if (["TJE", "JNA", "CGK", "SOC", "BDO", "SUB"].some(prefix => upperResi.startsWith(prefix))) return 3;
      if (isNumeric && (length === 15 || length === 16)) return 2;
      break;
    case 'ninja':
      if (["NLID", "NVID", "NINJA", "ZILGO"].some(prefix => upperResi.startsWith(prefix))) return 3;
      break;
    case 'anteraja':
      if (isNumeric && length >= 13 && upperResi.startsWith("100")) return 3;
      break;
    case 'pos':
      if (upperResi.startsWith("P") && !upperResi.startsWith("SPX")) return 2;
      if (isNumeric && length === 11) return 1;
      break;
    case 'tiki':
      if (isNumeric && length === 12) return 1;
      break;
    default:
      return 0;
  }
  return 0;
};

export default function Home() {
  const [resi, setResi] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingCourier, setCheckingCourier] = useState(null);
  const [trackingData, setTrackingData] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [jnePhoneReq, setJnePhoneReq] = useState(false);
  const [jnePhone, setJnePhone] = useState("");

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!resi.trim()) {
      setErrorMsg("Mohon masukkan nomor resi terlebih dahulu.");
      return;
    }

    setLoading(true);
    setErrorMsg(null);
    setTrackingData(null);
    setCheckingCourier(null);
    setJnePhoneReq(false);
    setJnePhone("");

    let found = false;

    // Gunakan fungsi pendeteksi pintar untuk mengurutkan probabilitas kurir
    let couriersToTry = [...COURIERS].sort((a, b) => {
      return guessCourierPriority(b.id, resi) - guessCourierPriority(a.id, resi);
    });

    // Sequential checking to avoid simultaneous rate limits
    for (let i = 0; i < couriersToTry.length; i++) {
      const courier = couriersToTry[i];
      setCheckingCourier(courier.name);

      try {
        const response = await axios.get(
          `https://api.binderbyte.com/v1/track?api_key=${
            import.meta.env.VITE_API_KEY
          }&courier=${courier.id}&awb=${resi}`
        );

        const responseData = response.data?.data;
        const history = responseData?.history;
        
        // JNE mengembalikan status 200 meskipun resi salah (memiliki history: [[]])
        // Kita wajib memvalidasi apakah 'history' berisi array object riwayat perjalanan asli.
        const hasValidHistory = Array.isArray(history) && history.length > 0 && history[0] && typeof history[0] === 'object' && !Array.isArray(history[0]) && (history[0].desc || history[0].date);

        if (response.data?.status === 200 && hasValidHistory) {
          if (courier.id === 'jne' && history[0].desc && history[0].desc.includes("UNTUK MENDAPATKAN HISTORY LENGKAP")) {
            setJnePhoneReq(true);
          } else {
            setJnePhoneReq(false);
          }
          // Success!
          setTrackingData(responseData);
          found = true;
          break;
        }
      } catch (e) {
        // Lanjut ke ekspedisi berikutnya
      }
    }

    if (!found) {
      setErrorMsg("Nomor resi tidak ditemukan di semua ekspedisi. Pastikan nomor resi benar.");
    }

    setLoading(false);
    setCheckingCourier(null);
  };

  const handleTrackJneWithPhone = async (e) => {
    e.preventDefault();
    if (!jnePhone.trim() || jnePhone.length !== 5) {
      setErrorMsg("Mohon masukkan 5 digit terakhir nomor HP dengan benar.");
      return;
    }

    setLoading(true);
    setErrorMsg(null);
    setCheckingCourier("JNE Detail");

    try {
      const response = await axios.get(
        `https://api.binderbyte.com/v1/track?api_key=${
          import.meta.env.VITE_API_KEY
        }&courier=jne&awb=${resi}&number=${jnePhone}`
      );

      const responseData = response.data?.data;
      const history = responseData?.history;
      
      const hasValidHistory = Array.isArray(history) && history.length > 0 && history[0] && typeof history[0] === 'object' && !Array.isArray(history[0]) && (history[0].desc || history[0].date);

      if (response.data?.status === 200 && hasValidHistory) {
        if (history[0].desc && history[0].desc.includes("UNTUK MENDAPATKAN HISTORY LENGKAP")) {
          setErrorMsg("Gagal mendapatkan history. 5 digit terakhir nomor HP mungkin salah.");
        } else {
          setJnePhoneReq(false);
          setTrackingData(responseData);
        }
      } else {
        setErrorMsg("Gagal mendapatkan history lengkap.");
      }
    } catch (e) {
      setErrorMsg("Terjadi kesalahan sistem saat mencoba fetch data JNE.");
    }

    setLoading(false);
    setCheckingCourier(null);
  };

  return (
    <div className="flex-grow flex flex-col items-center justify-start w-full transition-all duration-500 animate-slide-up">
      {/* Title Area */}
      <div className="text-center mt-10 mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4 tracking-tight">
          Lacak Paket Anda <br className="md:hidden" />
          <span className="text-gradient">Lebih Mudah</span>
        </h1>
        <p className="text-slate-500 font-medium max-w-lg mx-auto">
          Cukup masukkan SATU nomor resi. Sistem kami akan mendeteksi dari sekian banyak ekspedisi secara otomatis.
        </p>
      </div>

      {/* Input Form Area */}
      <form onSubmit={handleTrack} className="w-full max-w-2xl relative z-20">
        <div className="glass-card p-2 md:p-3 flex flex-col md:flex-row gap-3">
          <div className="relative flex-grow flex items-center">
            <svg
              className="w-6 h-6 text-slate-400 absolute left-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              className="w-full h-14 pl-12 pr-4 bg-transparent border-none text-slate-800 font-medium placeholder:text-slate-400 focus:outline-none focus:ring-0 text-lg"
              type="text"
              placeholder="Masukkan Nomor Resi..."
              value={resi}
              onChange={(e) => setResi(e.target.value)}
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`h-14 px-8 rounded-xl font-bold text-white transition-all shadow-lg flex items-center justify-center min-w-[140px]
                     ${loading ? 'bg-indigo-400 cursor-not-allowed shadow-indigo-200' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-indigo-300 hover:scale-[1.02] active:scale-[0.98]'}`}
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              "Lacak Resi"
            )}
          </button>
        </div>
        
        {/* Loading Indicator */}
        <div className={`mt-6 text-center transition-all duration-300 ${loading ? 'opacity-100' : 'opacity-0 h-0 hidden'}`}>
           <div className="flex flex-col items-center gap-3">
             <div className="h-2 w-32 bg-slate-200 rounded-full overflow-hidden relative">
               <div className="absolute inset-0 bg-indigo-500 rounded-full animate-[pulse_1.5s_ease-in-out_infinite]"></div>
             </div>
             <p className="text-indigo-600 font-semibold text-sm">Sedang mencoba: {checkingCourier}...</p>
           </div>
        </div>

        {/* Error Message */}
        {errorMsg && (
          <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-center text-sm font-medium animate-fade-in flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {errorMsg}
          </div>
        )}
      </form>

      {/* Results Rendering */}
      {trackingData && (
        <div className="w-full max-w-2xl mt-12 animate-slide-up pb-10">
          
          {/* Summary Card */}
          <div className="glass-card p-6 md:p-8 mb-8 relative overflow-hidden">
             {/* decorative ribbon */}
             <div className="absolute top-0 right-0 py-1 px-8 bg-indigo-600 text-white text-xs font-bold rotate-45 translate-x-[25px] translate-y-[15px] shadow-sm">
               {trackingData.summary?.courier}
             </div>
             
             <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="min-w-0 flex-1">
                   <h2 className="text-xl font-bold text-slate-800 mb-1 truncate">{trackingData.summary?.awb}</h2>
                   <p className="text-slate-500 text-sm font-medium mb-4">Dikirim via {trackingData.summary?.courier}</p>
                   
                   <div className="flex flex-col gap-2 mt-4 text-sm w-full">
                     <div className="flex items-start gap-2 w-full">
                       <span className="text-slate-400 font-medium min-w-[70px] shrink-0">Pengirim:</span>
                       <span className="text-slate-700 font-semibold break-all min-w-0 flex-1">{trackingData.detail?.shipper || trackingData.detail?.origin || "-"}</span>
                     </div>
                     <div className="flex items-start gap-2 w-full">
                       <span className="text-slate-400 font-medium min-w-[70px] shrink-0">Penerima:</span>
                       <span className="text-slate-700 font-semibold break-all min-w-0 flex-1">{trackingData.detail?.receiver || "-"} <br/> {trackingData.detail?.destination || ""}</span>
                     </div>
                   </div>
                </div>
                <div className="flex flex-col items-start md:items-end md:justify-center border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0 md:pl-6 text-left md:text-right shrink-0">
                   <div className="text-slate-400 font-medium text-xs uppercase tracking-wider mb-1">Status Terkini</div>
                   <div className={`px-4 py-2 rounded-lg font-bold text-sm mb-2 shadow-sm
                      ${trackingData.summary?.status === 'DELIVERED' 
                        ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
                        : 'bg-indigo-100 text-indigo-700 border border-indigo-200'}`}
                   >
                     {trackingData.summary?.status}
                   </div>
                   <p className="text-slate-500 font-medium text-sm">{trackingData.summary?.date}</p>
                </div>
             </div>
           </div>

           {/* JNE Phone Requirement Form */}
           {jnePhoneReq && (
            <div className="glass-card p-6 md:p-8 mb-8 relative border-l-4 border-l-indigo-500 bg-indigo-50/40">
               <div className="flex items-start gap-4 flex-col md:flex-row">
                 <div className="bg-indigo-100 p-3 rounded-full shrink-0 text-indigo-600">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                 </div>
                 <div className="flex-grow w-full">
                   <h3 className="text-lg font-bold text-slate-800 mb-1">Dibutuhkan Nomor Handphone (JNE)</h3>
                   <p className="text-sm text-slate-600 mb-4 leading-relaxed">Pihak ekspedisi menyembunyikan riwayat lengkap untuk keamanan. Masukkan <strong>5 digit terakhir</strong> nomor HP penerima.</p>
                   
                   <form onSubmit={handleTrackJneWithPhone} className="flex flex-col sm:flex-row gap-3">
                     <div className="relative flex-grow">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 font-bold">***-****-</span>
                        <input
                          type="text"
                          maxLength={5}
                          placeholder="12345"
                          className="w-full h-12 pl-24 pr-4 rounded-xl border border-slate-200 bg-white/70 focus:bg-white focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all font-bold text-slate-700 tracking-widest placeholder:font-normal placeholder:tracking-normal"
                          value={jnePhone}
                          onChange={(e) => setJnePhone(e.target.value.replace(/\D/g, ''))}
                          disabled={loading}
                        />
                     </div>
                     <button
                       type="submit"
                       disabled={loading}
                       className={`h-12 px-6 rounded-xl font-bold text-white transition-all sm:w-auto w-full whitespace-nowrap shadow-sm
                          ${loading ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-200 active:scale-95'}`}
                     >
                       Tampilkan Detail
                     </button>
                   </form>
                 </div>
               </div>
            </div>
           )}

           {/* Timeline History */}
           {!jnePhoneReq && (
             <>
               <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2 px-2">
                 <svg className="w-6 h-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                 </svg>
                 Riwayat Perjalanan
               </h3>
               
               <div className="glass-card p-6 md:p-8 relative">
                  <div className="absolute left-10 md:left-12 top-10 bottom-10 w-0.5 bg-slate-200"></div>
                  
                  <div className="flex flex-col gap-6">
                     {(trackingData.history || []).map((history, index) => {
                       const isLatest = index === 0;
                       return (
                         <div key={index} className="flex gap-4 relative z-10">
                           <div className="flex flex-col items-center mt-1 w-10 shrink-0">
                              <div className={`w-4 h-4 rounded-full border-2 shadow-sm flex items-center justify-center ring-4 ring-white
                                 ${isLatest 
                                   ? trackingData.summary?.status === 'DELIVERED' 
                                      ? 'bg-emerald-500 border-emerald-600'
                                      : 'bg-indigo-500 border-indigo-600 ring-indigo-50'
                                   : 'bg-white border-slate-300'}`}
                              ></div>
                           </div>
                           <div className={`pb-6 border-b border-slate-100 w-full last:border-b-0 last:pb-0 ${isLatest ? 'opacity-100' : 'opacity-70'}`}>
                              <p className="text-sm font-semibold text-slate-800 mb-1">{history.desc}</p>
                              <p className="text-xs font-medium text-slate-400">{history.date}</p>
                           </div>
                         </div>
                       );
                     })}
                  </div>
               </div>
             </>
           )}

         </div>
      )}
    </div>
  );
}

import axios from "axios";
import React, { useState } from "react";

export default function Jne() {
  const [resi, setResi] = useState("");
  const [hasil, setHasil] = useState([{}]);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState(false);
  const [jmlData, setJmlData] = useState(0);
  const [err, setErr] = useState(false);
  const key =
    "6fdb77034d89a14bdbf4c395d145ed49858dfb180a432336be30fda9fa29aeb6";

  const handleResi = async (e) => {
    setLoading(true);
    e.preventDefault();
    const res = await axios
      .get(
        "https://api.binderbyte.com/v1/track?api_key=" +
          key +
          `&courier=jne&awb=` +
          resi
      )
      .then((response) => {
        setHasil(response.data.data.history);
        setLoading(false);
        setErr(false);
        setList(true);
        setJmlData(hasil.length);
      })
      .catch((e) => {
        console.log("Error : " + e);
        setLoading(false);
        setErr(true);
      });
  };

  return (
    <div className="align-center text-center my-16">
      <div className="font-black">JNE</div>
      <label htmlFor="resi">
        Resi :{" "}
        <input
          className="border border-md my-2"
          name="resi"
          onChange={(e) => setResi(e.target.value)}
          type="text"
        />
      </label>
      <br />
      <button
        className="border border-md px-20 py-1 mb-10"
        onClick={handleResi}
      >
        Track
      </button>

      {err ? (
        <div className="text-red-500">Nomor resi tidak ditemukan</div>
      ) : (
        ""
      )}

      {list
        ? hasil.map((h, i) => {
            return (
              <center key={i}>
                {jmlData > i ? "Success" : "|"}
                <div className="my-2 bg-zinc-100 py-3 rounded-md md:w-4/5 lg:w-3/5">
                  <b>{h.date}</b>
                  <br />
                  <hr />
                  {h.desc}
                </div>
              </center>
            );
          })
        : ""}
      {loading ? (
        <div className="block">
          Loading...<div className="animate-spin text-4xl">⊕</div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

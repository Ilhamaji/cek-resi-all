import React from "react";
import { useState } from "react";

export default function Anteraja() {
  const [resi, setResi] = useState("");
  const [hasil, setHasil] = useState([{}]);
  const [loading, setLoading] = useState(false);

  const key =
    "6fdb77034d89a14bdbf4c395d145ed49858dfb180a432336be30fda9fa29aeb6";

  const handleResi = async (e) => {
    setLoading(true);
    e.preventDefault();
    const res = await axios
      .get(
        "https://api.binderbyte.com/v1/track?api_key=" +
          key +
          `&courier=anteraja&awb=` +
          resi
      )
      .then((response) => {
        setHasil(response.data.data.history);
        setLoading(false);
      })
      .catch((e) => {
        console.log("Error : " + e);
        setLoading(false);
      });
  };

  return (
    <div className="align-center text-center my-16">
      <div className="font-black">Anteraja</div>
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

      {hasil
        ? hasil.map((h, i) => {
            return (
              <div className="my-2" key={i}>
                {h.date} {h.desc}
              </div>
            );
          })
        : ""}

      {loading ? <div className="animate-spin text-4xl">⊕</div> : ""}
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <div className="w-100 py-5 flex justify-between text-center">
      <ul className="flex">
        <li>Cek Resi</li>
      </ul>
      <ul className="flex">
        <li className="mr-5">About</li>
        <li className="group">
          Ekspedisi
          <ul className="hidden group-hover:block absolute">
            <li>
              <Link to={"jne"}>JNE</Link>
            </li>
            <li>
              <Link to={"jnt"}>JNT</Link>
            </li>
            <li>
              <Link to={"pos"}>POS</Link>
            </li>
            <li>
              <Link to={"anteraja"}>Anteraja</Link>
            </li>
            <li>
              <Link to={"sicepat"}>SiCepat</Link>
            </li>
            <li>
              <Link to={"tiki"}>Tiki</Link>
            </li>
            <li>
              <Link to={"spx"}>Shopee Express</Link>
            </li>
            <li>
              <Link to={"ninja"}>Ninja</Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

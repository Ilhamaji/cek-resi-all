import React from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <div className="w-100 py-5 flex justify-between">
      <ul className="flex text-center">
        <li>
          <Link to={"/"}>Cek Resi</Link>
        </li>
      </ul>
      <ul className="flex">
        <li className="mr-5 text-center">
          <Link to={"about"}>About</Link>
        </li>
        <li className="group">
          Ekspedisi
          <ul className="hidden group-hover:block w-24 fixed text-center border border-md">
            <li className="list-none py-1 hover:bg-black hover:text-white">
              <Link className="py-1" to={"jne"}>
                JNE
              </Link>
            </li>
            <li className="list-none py-1 hover:bg-black hover:text-white">
              <Link className="py-1" to={"jnt"}>
                JNT
              </Link>
            </li>
            <li className="list-none py-1 hover:bg-black hover:text-white">
              <Link className="py-1" to={"pos"}>
                POS
              </Link>
            </li>
            <li className="list-none py-1 hover:bg-black hover:text-white">
              <Link className="py-1" to={"anteraja"}>
                Anteraja
              </Link>
            </li>
            <li className="list-none py-1 hover:bg-black hover:text-white">
              <Link className="py-1" to={"sicepat"}>
                SiCepat
              </Link>
            </li>
            <li className="list-none py-1 hover:bg-black hover:text-white">
              <Link className="py-1" to={"tiki"}>
                Tiki
              </Link>
            </li>
            <li className="list-none py-1 hover:bg-black hover:text-white">
              <Link className="py-1" to={"spx"}>
                Shopee Express
              </Link>
            </li>
            <li className="list-none py-1 hover:bg-black hover:text-white">
              <Link className="py-1" to={"ninja"}>
                Ninja
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

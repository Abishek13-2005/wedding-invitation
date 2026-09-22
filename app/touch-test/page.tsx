"use client";

import { useEffect, useState } from "react";

export default function TouchTest() {
  const [hydrated, setHydrated] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <main
      style={{
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 25,
        background: "#f5efe4",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>React Touch Test</h1>

      <div
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color: hydrated ? "green" : "red",
        }}
      >
        {hydrated ? "REACT HYDRATED ✅" : "REACT NOT HYDRATED ❌"}
      </div>

      <button
        type="button"
        onClick={() => setClicked(true)}
        style={{
          padding: "20px 30px",
          border: 0,
          borderRadius: 12,
          background: "#b99652",
          color: "#fff",
          fontSize: 18,
          fontWeight: "bold",
          touchAction: "manipulation",
        }}
      >
        TAP THIS BUTTON
      </button>

      {clicked && (
        <div
          style={{
            padding: "15px 25px",
            borderRadius: 10,
            background: "green",
            color: "white",
            fontWeight: "bold",
          }}
        >
          REACT CLICK WORKS ✅
        </div>
      )}
    </main>
  );
}
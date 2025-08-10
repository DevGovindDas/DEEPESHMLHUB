import React from "react";
import { Outlet } from "react-router-dom";
import Logo from "./Logo";
import Footer from "./Footer";

export default function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Logo />

      {/* Main content area - will expand to push footer down */}
      <main className="flex-1">
        {/* Nested route content renders here */}
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

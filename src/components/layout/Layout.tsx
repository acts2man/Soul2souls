import { useState } from "react";
import { Outlet } from "react-router-dom";
import TopBar from "./TopBar";
import Header from "./Header";
import OffCanvasMenu from "./OffCanvasMenu";
import SubscribePanel from "./SubscribePanel";
import Footer from "./Footer";
import AudioPlayer from "./AudioPlayer";
import BackToTop from "./BackToTop";

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [subOpen, setSubOpen] = useState(false);

  return (
    <>
      <TopBar />
      <Header
        onMenu={() => setMenuOpen(true)}
        onSubscribe={() => setSubOpen(true)}
      />
      <OffCanvasMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <SubscribePanel open={subOpen} onClose={() => setSubOpen(false)} />

      <main id="main">
        <Outlet />
      </main>

      <Footer />
      <BackToTop />
      <AudioPlayer />
    </>
  );
}

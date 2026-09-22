/*
 * Soul2SoulsJazz — re-added interactivity for the preserved static pages.
 * The SingleFile exports keep the exact Sonaar/Elementor markup + CSS but ship
 * no JavaScript, so this restores the behaviour the theme's JS provided:
 *   - off-canvas MENU + SUBSCRIBE panels (open/close, backdrop, scroll lock)
 *   - the sticky audio player controls (play/pause)
 * It changes no layout or styling — it only toggles state.
 */
(function () {
  "use strict";

  /* ---------- Off-canvas panels (MENU / SUBSCRIBE) ---------- */
  var openContent = null;

  function idFromToggle(el) {
    var m = (el.className || "").match(/sr-offcanvas-toogle-([a-z0-9]+)/i);
    return m ? m[1] : null;
  }

  function ensureBackdrop() {
    var b = document.querySelector(".s2s-oc-backdrop");
    if (!b) {
      b = document.createElement("div");
      b.className = "s2s-oc-backdrop";
      b.addEventListener("click", closePanel);
      document.body.appendChild(b);
    }
    return b;
  }

  function openPanel(content) {
    if (!content) return;
    closePanel();
    content.classList.add("sr-offcanvas-content-visible", "s2s-oc-open");
    content.style.transform = "translateX(0)";
    content.style.webkitTransform = "translateX(0)";
    content.style.opacity = "1"; // base rule is opacity:0
    ensureBackdrop().classList.add("is-visible");
    document.documentElement.classList.add("sr-offcanvas-content-open");
    document.body.style.overflow = "hidden";
    openContent = content;
  }

  function closePanel() {
    if (openContent) {
      openContent.classList.remove("sr-offcanvas-content-visible", "s2s-oc-open");
      openContent.style.transform = "";
      openContent.style.webkitTransform = "";
      openContent.style.opacity = "";
      openContent = null;
    }
    var b = document.querySelector(".s2s-oc-backdrop");
    if (b) b.classList.remove("is-visible");
    document.documentElement.classList.remove("sr-offcanvas-content-open");
    document.body.style.overflow = "";
  }

  document.addEventListener("click", function (e) {
    var toggle = e.target.closest(".sr-offcanvas-toggle");
    if (toggle) {
      e.preventDefault();
      var id = idFromToggle(toggle);
      var contents = id ? document.querySelectorAll(".sr-offcanvas-content-" + id) : [];
      var content = null;
      contents.forEach(function (c) {
        if (!c.classList.contains("sf-hidden")) content = c;
      });
      if (!content && contents.length) content = contents[0];
      if (content === openContent) closePanel();
      else openPanel(content);
      return;
    }
    if (e.target.closest(".sr-offcanvas-close")) {
      e.preventDefault();
      closePanel();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closePanel();
  });

  /* ---------- Sticky audio player ---------- */
  function initPlayer() {
    var player = document.querySelector(".srt_player-container, .iron-audioplayer");
    if (!player) return;
    var audio = player.querySelector("audio");
    if (!audio) {
      audio = document.createElement("audio");
      audio.preload = "none";
      var src = player.getAttribute("data-src") || "";
      if (src) audio.src = src;
      player.appendChild(audio);
    }
    var playBtns = player.querySelectorAll(
      ".sr_it-play-pause-button, .play-pause-button, .btn-player, .sr-player-btn--play, [class*='play']"
    );
    playBtns.forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        if (!audio.src) return;
        if (audio.paused) audio.play().catch(function () {});
        else audio.pause();
        player.classList.toggle("is-playing", !audio.paused);
      });
    });
  }

  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }
  ready(function () {
    initPlayer();
  });
})();

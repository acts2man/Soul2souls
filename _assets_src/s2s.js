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

  function pageWrap() {
    // SingleFile pages have .sr-offcanvas-container; the raw product pages (server
    // HTML, before the theme JS wraps the page) expose #pusher-wrap / #pusher.
    return (
      document.querySelector(".sr-offcanvas-container") ||
      document.querySelector("#pusher-wrap") ||
      document.querySelector("#pusher")
    );
  }

  function openPanel(content) {
    if (!content) return;
    closePanel();
    var is3d = content.classList.contains("sr-offcanvas-3dyatch");
    content.classList.add("sr-offcanvas-content-visible", "s2s-oc-open");
    content.style.transform = "translateX(0)";
    content.style.webkitTransform = "translateX(0)";
    content.style.opacity = "1"; // base rule is opacity:0
    ensureBackdrop().classList.add("is-visible");
    document.documentElement.classList.add("sr-offcanvas-content-open");

    // MENU uses the theme's 3D "reveal" push: the page tilts back in perspective
    // while the panel slides in. SUBSCRIBE (slide) just overlays.
    var wrap = pageWrap();
    if (is3d && wrap) {
      var originY = window.scrollY + window.innerHeight / 2;
      document.documentElement.classList.add("s2s-3d-open");
      wrap.classList.add("s2s-3d-wrap");
      wrap.style.transformOrigin = "50% " + originY + "px";
      // force reflow so the transition runs from the untransformed state
      void wrap.offsetWidth;
      wrap.style.transform =
        "perspective(1500px) translateX(-2%) rotateY(34deg) scale(0.52)";
      wrap.style.webkitTransform = wrap.style.transform;
      wrap.style.boxShadow = "0 50px 110px rgba(0,0,0,0.5)";
    }

    // The theme starts each menu item at opacity:0 and animates it in via JS.
    // Reveal them with a staggered entrance (the "anim-enable" effect).
    var items = content.querySelectorAll(".menu-item");
    items.forEach(function (li, i) {
      li.style.transition = "opacity .5s ease " + (140 + i * 70) + "ms, transform .5s ease " + (140 + i * 70) + "ms";
      li.style.opacity = "1";
      li.style.transform = "none";
    });

    // The captured panel leaves a fixed height on the nav that lets the last items
    // paint below their box and overlap the FOLLOW US row. Measure the real last
    // item and push the social row clear of it. (Robust against that layout quirk.)
    fixSocialClearance(content);

    document.body.style.overflow = "hidden";
    openContent = content;
  }

  function socialSection(content) {
    // The innermost block that holds FOLLOW US + social links but NOT the nav.
    var cands = content.querySelectorAll(
      ".elementor-inner-section, .elementor-section, .elementor-widget, .elementor-column"
    );
    var best = null;
    cands.forEach(function (s) {
      if (
        /FOLLOW\s*US/i.test(s.textContent) &&
        s.querySelector("a") &&
        !s.querySelector(".menu-item")
      ) {
        if (!best || s.getBoundingClientRect().height < best.getBoundingClientRect().height) best = s;
      }
    });
    return best;
  }

  function fixSocialClearance(content) {
    var run = function () {
      var items = content.querySelectorAll(".menu-item");
      var social = socialSection(content);
      if (!items.length || !social) return;
      var lastBottom = 0;
      items.forEach(function (li) {
        lastBottom = Math.max(lastBottom, li.getBoundingClientRect().bottom);
      });
      social.style.marginTop = ""; // reset before measuring
      var top = social.getBoundingClientRect().top;
      if (top < lastBottom + 10) {
        social.style.setProperty("margin-top", lastBottom - top + 40 + "px", "important");
      }
    };
    window.setTimeout(run, 80);
  }

  function closePanel() {
    // Nothing open -> nothing to reverse. (openPanel calls closePanel() first;
    // without this guard it would schedule a timer that wipes the transform-origin
    // of the panel that's about to open, pushing the page off-screen.)
    if (!openContent) return;

    openContent.classList.remove("sr-offcanvas-content-visible", "s2s-oc-open");
    openContent.style.transform = "";
    openContent.style.webkitTransform = "";
    openContent.style.opacity = "";
    openContent.querySelectorAll(".menu-item").forEach(function (li) {
      li.style.transition = "";
      li.style.opacity = "";
      li.style.transform = "";
    });
    var soc = socialSection(openContent);
    if (soc) soc.style.marginTop = "";
    openContent = null;

    var wrap = pageWrap();
    if (wrap) {
      // Clearing the transform lets it animate back to normal (reverse push),
      // then drop the transition class once the animation has finished.
      wrap.style.transform = "";
      wrap.style.webkitTransform = "";
      wrap.style.boxShadow = "";
      var w = wrap;
      window.setTimeout(function () {
        w.style.transformOrigin = "";
        w.classList.remove("s2s-3d-wrap");
      }, 650);
    }
    var b = document.querySelector(".s2s-oc-backdrop");
    if (b) b.classList.remove("is-visible");
    document.documentElement.classList.remove("sr-offcanvas-content-open", "s2s-3d-open");
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
    // Play/pause — exclude the minimize handle (.close) which shares .btn-player.
    var playBtns = player.querySelectorAll(
      ".sr_it-play-pause-button, .play-pause-button, .sr-player-btn--play, .btn-player:not(.close)"
    );
    playBtns.forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        if (btn.closest(".close")) return;
        e.preventDefault();
        if (!audio.src) return;
        if (audio.paused) audio.play().catch(function () {});
        else audio.pause();
        player.classList.toggle("is-playing", !audio.paused);
      });
    });
  }

  // The sticky player slides up from the bottom on load and can be minimized
  // (tucked down) via the little handle at its top-right, then restored.
  // Inline styles are used so they win over the theme's own transform rules.
  function initStickyPlayer() {
    var bar = document.querySelector("#sonaar-player, .srt_sticky-player");
    if (!bar) return;
    // The player's `transform` is contested by the theme (the transition never
    // settles). Animate `bottom` instead — it's a simple position the theme leaves
    // at 0, so inline !important controls it cleanly.
    var h = bar.offsetHeight || 90;
    var setBottom = function (px) {
      bar.style.setProperty("bottom", px + "px", "important");
    };
    bar.style.setProperty("transition", "bottom .6s cubic-bezier(.22,1,.36,1)", "important");
    setBottom(-h); // start tucked below the viewport

    var slid = false,
      minimized = false;
    function slideUp() {
      if (slid || minimized) return;
      slid = true;
      setBottom(0);
    }
    window.setTimeout(slideUp, 160);
    window.addEventListener("load", slideUp);
    window.setTimeout(slideUp, 1400);

    var handle = bar.querySelector(".close.btn-player") || bar.querySelector(".close");
    if (handle) {
      handle.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        slid = true;
        minimized = !minimized;
        setBottom(minimized ? -(h - 26) : 0);
        bar.classList.toggle("s2s-player-min", minimized);
      });
    }
  }

  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }
  ready(function () {
    initPlayer();
    initStickyPlayer();
  });
})();

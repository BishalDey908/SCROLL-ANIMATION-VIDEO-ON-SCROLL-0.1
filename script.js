gsap.registerPlugin(ScrollTrigger);

const tl1 = gsap.timeline({
  scrollTrigger: {
    trigger: ".after-canvas-continer",
    start: "top top",
    end: "+=2500", // adjust scroll length
    scrub: 2,
    pin: true,
    anticipatePin: 1,
  },
});

/* ================= CONFIG ================= */
const frames = {
  currentIndex: 0,
  maxIndex: 1344,
};

const images = [];
let imagesLoaded = 0;

const canvas = document.getElementById("frame");
const context = canvas.getContext("2d");

/* ================= RESIZE ================= */
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

/* ================= PRELOAD ================= */
function preloadImages() {
  for (let i = 0; i <= frames.maxIndex; i++) {
    const img = new Image();
    img.src = `./compressed_images/frame_${(i + 1)
      .toString()
      .padStart(4, "0")}.jpg`;
    img.onload = () => {
      imagesLoaded++;
      if (imagesLoaded === frames.maxIndex + 1) {
        loadImage(0);
        startAnimation();
      }
    };
    images.push(img);
  }
}

/* ================= DRAW IMAGE ================= */
function loadImage(index) {
  const img = images[index];
  if (!img) return;

  context.clearRect(0, 0, canvas.width, canvas.height);

  const scaleX = canvas.width / img.width;
  const scaleY = canvas.height / img.height;
  const scale = Math.max(scaleX, scaleY);

  const newWidth = img.width * scale;
  const newHeight = img.height * scale;

  const offsetX = (canvas.width - newWidth) / 2;
  const offsetY = (canvas.height - newHeight) / 2;

  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";

  context.drawImage(img, offsetX, offsetY, newWidth, newHeight);

  frames.currentIndex = index;
}

function updateFrame(index) {
  return {
    currentIndex: index,
    ease: "none",
    onUpdate: () => {
      loadImage(Math.floor(frames.currentIndex));
    },
  };
}

/* ================= GSAP SCROLL ================= */
function startAnimation() {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".parent",
      start: "top top",
      end: "bottom bottom",
      scrub: 2,
      markers: true,
    },
  });

  tl.to(frames, updateFrame(50), "first")
    .to(".animate1", { opacity: 0, ease: "linear" }, "first")

    .to(frames, updateFrame(80), "second")
    .to(".animate2", { opacity: 1, ease: "linear" }, "second")

    .to(frames, updateFrame(140), "third")
    .to(".animate2", { opacity: 1, ease: "linear" }, "third")

    .to(frames, updateFrame(150), "fourth")
    .to(".animate2", { opacity: 0, ease: "linear" }, "fourth")

    .to(frames, updateFrame(180), "fifth")
    .to(".animate3", { opacity: 1, ease: "linear" }, "fifth")

    .to(frames, updateFrame(210), "sixth")
    .to(".animate3", { opacity: 1, ease: "linear" }, "sixth")

    .to(frames, updateFrame(240), "seventh")
    .to(".animate3", { opacity: 0, ease: "linear" }, "seventh")

    .to(frames, updateFrame(270), "eighth")
    .to(".panel", { x: "0%", ease: "expo" }, "eighth")

    .to(frames, updateFrame(320), "ningth")
    .to(".panel", { x: "0%", ease: "expo" }, "ningth")

    .to(frames, updateFrame(350), "tenth")
    .to(".panel", { opacity: 0, ease: "linear" }, "tenth")

    .to(frames, updateFrame(380), "eleventh")
    .to("canvas", { scale: 0.5, ease: "linear" }, "eleventh")

    .to(frames, updateFrame(410), "twelveth")
    .to(".panelism", { opacity: 1, ease: "expo" }, "twelveth")

    .to(frames, updateFrame(440), "twelveth")
    .to(".panelism span", { width: 200, ease: "expo" }, "twelveth")

    .to(frames, updateFrame(470), "thirteenth")
    .to(".panelism-child", { opacity: 1, ease: "linear" }, "thirteenth")

    .to(frames, updateFrame(500), "thirteenth")
    .to(".panelism-child span", { width: 400, ease: "linear" }, "thirteenth")

    .to(frames, updateFrame(530), "fourteenth")
    .to(".panelism-child span", { opacity: 0, ease: "linear" }, "fourteenth")

    // .to(frames, updateFrame(560), "fefteenth")
    // .to(".panelism", { opacity: 0, ease: "linear" }, "fefteenth")

    .to(frames, updateFrame(590), "fefteenth")
    .to("canvas", { scale: 1, ease: "linear" }, "fefteenth")
    .to(".panelism", { scale: 2, ease: "linear" }, "fefteenth")

    .to(frames, updateFrame(670), "sixteenth")
    .to("canvas", { scale: 1, ease: "linear" }, "sixteenth")
    .to(".panelism", { scale: 2, ease: "linear" }, "sixteenth")

    .to(frames, updateFrame(700), "seventeenth")
    .to("canvas", { scale: 1, ease: "linear" }, "seventeenth")
    .to(".panelism", { opacity: 1, ease: "linear" }, "seventeenth")

    .to(frames, updateFrame(750), "eighteenth")
    .to("canvas", { opacity: 1, ease: "linear" }, "eighteenth")

    .to(frames, updateFrame(780), "nineteenth")
    .to(".after-canvas-continer", { opacity: 1, ease: "linear" }, "nineteenth");

  tl1.addLabel("tenth").to(frames, updateFrame(810), "tenth").to(
    ".after-canvas-continer h1",
    {
      xPercent: -100, // better than "-100%"
      ease: "linear",
    },
    "tenth"
  );
}

/// Initialize Lenis
const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

/* ================= INIT ================= */
preloadImages();

document.querySelectorAll(".headings h3").forEach(function (elem) {
  gsap.from(elem, {
    scrollTrigger: {
      trigger: elem,
      start: "top 90%",
      end: "bottom 20%",
      scrub: 2,
    },
    opacity: ".3",
  });
});

//   card animation

gsap.registerPlugin(ScrollTrigger);

const container = document.querySelector(".card-container");
const cards = gsap.utils.toArray(".card");

// total scroll width (container width - viewport)
const totalScroll = container.scrollWidth - window.innerWidth +200;

gsap.to(container, {
  x: () => -totalScroll,
  ease: "none",
  scrollTrigger: {
    trigger: container,
    start: "top 20%",
    end: () => `+=${container.scrollWidth}`,
    scrub: 1,
    pin: true,
    anticipatePin: 1,
  },
});

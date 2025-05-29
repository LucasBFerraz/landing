import React, { useEffect, useRef, useState } from "react";
import "./Carousel.css";

const carouselDuplicates = 3;

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function getTouchMidpoint(touches) {
  let midpoint = {
    x: touches[0].clientX,
    y: touches[0].clientY,
  };

  for (let i = 1; i < touches.length; i++) {
    const touch = touches[i];
    midpoint.x = lerp(midpoint.x, touch.clientX, 0.5);
    midpoint.y = lerp(midpoint.y, touch.clientY, 0.5);
  }

  return midpoint;
}

function Carousel() {
  const carouselRef = useRef(null);
  const carouselContentRef = useRef(null);

  // Use refs for mutable variables to avoid re-renders
  const carouselHasMouse = useRef(false);
  const carouselTouches = useRef(0);
  const lastMouseX = useRef(null);
  const lastTouchX = useRef(null);
  const scrollDelta = useRef(0);
  const lastTimestamp = useRef(0);

  useEffect(() => {
    const carousel = carouselRef.current;
    const carouselContent = carouselContentRef.current;
    if (!carousel || !carouselContent) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hasFinePointer = window.matchMedia("(pointer: fine)");

    // Handlers from your original code
    const handleTouchRemove = (event) => {
      carouselTouches.current -= event.changedTouches.length;
      if (carouselTouches.current <= 0 && !carouselHasMouse.current) {
        lastTouchX.current = null;
      }
    };

    const updateScroll = (timestamp) => {
      const deltaTime = timestamp - lastTimestamp.current;

      carousel.scrollBy({ left: scrollDelta.current });

      if (carouselHasMouse.current || carouselTouches.current > 0 || prefersReducedMotion.matches) {
        scrollDelta.current = 0;
      } else {
        scrollDelta.current = lerp(scrollDelta.current, 0, 0.045);
      }

      lastTimestamp.current = timestamp;
      requestAnimationFrame(updateScroll);
    };

    // Mouse events
    const onMouseDown = () => (carouselHasMouse.current = true);
    const onMouseUp = () => {
      carouselHasMouse.current = false;
      lastMouseX.current = null;
    };
    const onMouseMove = (e) => {
      if (carouselHasMouse.current) {
        if (lastMouseX.current !== null) {
          scrollDelta.current = lastMouseX.current - e.clientX;
        }
        lastMouseX.current = e.clientX;
      }
    };

    // Wheel event
    const onWheel = (e) => {
      if (hasFinePointer.matches && e.shiftKey) {
        e.preventDefault();
        const scrollMultiplier = prefersReducedMotion.matches ? 2 : 0.1;
        scrollDelta.current += e.deltaY * scrollMultiplier;
      }
    };

    // Touch events
    const onTouchStart = (e) => {
      if (lastTouchX.current === null) {
        lastTouchX.current = getTouchMidpoint(e.touches).x;
      }
      carouselTouches.current += e.changedTouches.length;
    };
    const onTouchMove = (e) => {
      if (lastTouchX.current !== null) {
        const touchMidpoint = getTouchMidpoint(e.touches);
        scrollDelta.current = -(touchMidpoint.x - lastTouchX.current);
        lastTouchX.current = touchMidpoint.x;
      }
    };

    const onScroll = () => {
      const carouselRect = carouselContent.getBoundingClientRect();
      if (carouselRect.left > window.innerWidth) {
        carousel.scrollLeft += carouselRect.width;
      } else if (carouselRect.right < 0) {
        carousel.scrollLeft -= carouselRect.width;
      }
    };

    // Duplicate content for infinite scrolling illusion
    for (let i = 0; i < carouselDuplicates; i++) {
      const duplicate = carouselContent.cloneNode(true);
      duplicate.setAttribute("aria-hidden", "true");
      duplicate.querySelectorAll("a").forEach((a) => (a.tabIndex = -1));
      carousel.prepend(duplicate);

      const duplicate2 = carouselContent.cloneNode(true);
      duplicate2.setAttribute("aria-hidden", "true");
      duplicate2.querySelectorAll("a").forEach((a) => (a.tabIndex = -1));
      carousel.append(duplicate2);
    }

    // Start scroll in the middle
    carousel.scrollLeft += carouselContent.offsetWidth * carouselDuplicates;

    // Add event listeners
    carousel.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mousemove", onMouseMove);
    carousel.addEventListener("wheel", onWheel);
    carousel.addEventListener("touchstart", onTouchStart);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", handleTouchRemove);
    window.addEventListener("touchcancel", handleTouchRemove);
    carousel.addEventListener("scroll", onScroll);

    // Start animation
    requestAnimationFrame(updateScroll);

    // Cleanup on unmount
    return () => {
      carousel.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mousemove", onMouseMove);
      carousel.removeEventListener("wheel", onWheel);
      carousel.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", handleTouchRemove);
      window.removeEventListener("touchcancel", handleTouchRemove);
      carousel.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="carousel" ref={carouselRef} tabIndex={0}>
      <div className="carousel-content" ref={carouselContentRef}>
        <div className="card">
          <img className="icon" src="https://simpleicons.org/icons/javascript.svg" alt="JavaScript Logo" />
          <p>JavaScript</p>
          {/* <p>
            <a href="https://ecma-international.org/publications-and-standards/standards/ecma-262/" target="_blank" rel="noreferrer">
              More Info ➞
            </a>
          </p> */}
        </div>
        <div className="card">
          <img className="icon" src="https://static-00.iconduck.com/assets.00/logo-python-icon-2025x2048-b9y5g0s5.png" alt="Python Logo" />
          <p>Python</p>
          {/* <p>
            <a href="https://www.python.org/doc/" target="_blank" rel="noreferrer">
              More Info ➞
            </a>
          </p> */}
        </div>
        <div className="card">
          <img className="icon" src="https://www.vectorlogo.zone/logos/java/java-icon.svg" alt="Java Logo" />
          <p>Java</p>
        </div>
        <div className="card">
          <img className="icon" src="https://cdn-icons-png.flaticon.com/512/4701/4701380.png" alt="HTML Logo" />
          <p>HTML</p>
        </div>
        <div className="card">
          <img className="icon" src="https://cdn-icons-png.flaticon.com/512/732/732007.png" alt="CSS Logo" />
          <p>CSS</p>
        </div>
        <div className="card">
          <img className="icon" src={`${process.env.PUBLIC_URL}/icons/docker.png`} alt="Docker Logo" />
          <p>Docker</p>
          {/* <p><a href="https://docs.docker.com/" target="_blank">More Info ➞</a></p> */}
        </div>
        <div className="card">
          <img className="icon" src="https://github.com/cncf/artwork/blob/main/projects/kubernetes/icon/white/kubernetes-icon-white.png?raw=true" alt="Kubernetes Logo" />
          <p>Kubernetes</p>
        </div>
        <div className="card">
          <img className="icon" src="https://icon.icepanel.io/Technology/png-shadow-512/Helm.png" alt="Helm Logo" />
          <p>Helm</p>
        </div>
        <div className="card">
          <img className="icon" src="https://icon.icepanel.io/Technology/svg/GitHub-Actions.svg" alt="GitHub Actions Logo" />
          <p>GitHub Actions</p>
        </div>
        <div className="card">
          <img className="icon" src="https://static-00.iconduck.com/assets.00/jenkins-icon-465x512-nwgocauc.png" alt="Jenkins Logo" />
          <p>Jenkins</p>
        </div>
        <div className="card">
          <img className="icon" src="https://swimburger.net/media/ppnn3pcl/azure.png" alt="Azure Logo" />
          <p>Azure</p>
        </div>
        <div className="card">
          <img className="icon" src="https://img.icons8.com/?size=256&id=G0CnLqqcRBXl&format=png" alt="AWS Logo" />
          <p>AWS</p>
        </div>
      </div>
    </div>
  );
}

export default Carousel;

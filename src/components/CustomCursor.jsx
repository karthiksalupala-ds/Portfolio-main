import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Don't show on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let dotX = 0, dotY = 0;
    let ringX = 0, ringY = 0;
    let animId;

    const onMove = (e) => {
      dotX = e.clientX;
      dotY = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const onEnter = () => setIsVisible(true);
    const onLeave = () => setIsVisible(false);

    const onMouseOver = (e) => {
      if (e.target && typeof e.target.closest === 'function') {
        const el = e.target.closest('a, button, [role="button"], input, textarea, select, label, [data-cursor-hover], .cursor-pointer');
        setIsHovering(!!el);
      }
    };

    // Smooth ring lag via lerp animation loop
    const animate = () => {
      ringX += (dotX - ringX) * 0.12;
      ringY += (dotY - ringY) * 0.12;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotX - 4}px, ${dotY - 4}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;
      }
      animId = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseenter', onEnter);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseover', onMouseOver);
    animId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Touch devices — render nothing
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  if (typeof document === 'undefined') return null;

  return createPortal(
    <>
      {/* Custom decorative cursor elements */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0"
        style={{
          pointerEvents: 'none',
          zIndex: 999999,
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.3s ease',
          willChange: 'transform',
        }}
      >
        <div
          className="rounded-full"
          style={{
            width: '8px',
            height: '8px',
            background: '#ffffff',
            boxShadow: '0 0 4px 1px rgba(0,0,0,0.5)',
            transition: 'transform 0.1s ease, width 0.2s ease, height 0.2s ease',
            transform: isHovering ? 'scale(1.8)' : 'scale(1)',
          }}
        />
      </div>

      {/* Ring — lags behind for a smooth trail effect */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0"
        style={{
          pointerEvents: 'none',
          zIndex: 999998,
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.3s ease',
          willChange: 'transform',
        }}
      >
        <div
          style={{
            width: isHovering ? '50px' : '40px',
            height: isHovering ? '50px' : '40px',
            border: '1.5px solid #ffffff',
            borderRadius: '50%',
            boxShadow: '0 0 6px rgba(0,0,0,0.3), inset 0 0 6px rgba(0,0,0,0.3)',
            transition: 'width 0.2s ease, height 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
          }}
        />
      </div>
    </>,
    document.body
  );
};

export default CustomCursor;

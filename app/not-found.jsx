"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export default function NotFound() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let stars = [];
    const numStars = 200;

    function resizeCanvas() {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    }

    function Star() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2;
      this.speed = Math.random() * 0.5;
      this.brightness = Math.random();
    }

    function createStars() {
      stars = [];
      for (let i = 0; i < numStars; i++) {
        stars.push(new Star());
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      stars.forEach(star => {
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness})`;
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        star.y += star.speed;
        
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });

      requestAnimationFrame(animate);
    }

    resizeCanvas();
    createStars();
    animate();

    window.addEventListener("resize", () => {
      resizeCanvas();
      createStars();
    });

    const astronaut = document.querySelector(`.${styles.astronaut}`);
    if (astronaut) {
      document.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.005;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.005;
        astronaut.style.transform = `translateX(calc(-50% + ${moveX}px)) translateY(${moveY}px)`;
      });
    }

    // Add mouse parallax effect
    const handleMouseMove = (e) => {
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;
      
      // Parallax effect for stars
      stars.forEach(star => {
        star.x += (mouseX - 0.5) * star.size;
        star.y += (mouseY - 0.5) * star.size;
      });

      // Container tilt effect
      const container = document.querySelector(`.${styles.container}`);
      if (container) {
        const rotateX = (mouseY - 0.5) * 10;
        const rotateY = (mouseX - 0.5) * 10;
        container.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (astronaut) {
        document.removeEventListener('mousemove', null);
      }
    };
  }, []);

  return (
    <div className={styles.pageContainer}>
      <canvas ref={canvasRef} className={styles.canvas}></canvas>
      <div className={styles.container}>
        <div className={styles.astronaut}></div>
        <h1 className={styles.title}>404: Lost in Space</h1>
        <p className={styles.description}>
          You've drifted too far! This page doesn't exist.
        </p>
        <Link href="/" className={styles.button}>
          Return to Earth
        </Link>
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";
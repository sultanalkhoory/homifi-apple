'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { fadeRise, scaleIn } from '@/lib/animations';

/**
 * PerfectPrivacy Section Component
 * 
 * Curtain control with seamless video transitions using canvas capture technique.
 * Eliminates black flash by holding last frame while new video loads.
 * 
 * Features:
 * - Auto-plays closing video when section enters viewport (once only)
 * - Canvas snapshot prevents black flash during video transitions
 * - Control Center card with muted teal gradient
 * - Button ignores clicks during video playback
 * 
 * Layout:
 * - Mobile: Text first, video second
 * - Desktop: Video LEFT (7 cols), Text RIGHT (5 cols)
 */
export default function PerfectPrivacy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [curtainsState, setCurtainsState] = useState<'open' | 'closed'>('closed');
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasAutoTriggered, setHasAutoTriggered] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false);

  // Preload initial video (opening)
  useEffect(() => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    video.src = '/video/curtains-opening.mp4';
    const onLoad = () => {
      video.currentTime = 0;
      video.pause();
      setVideoLoaded(true);
    };
    video.addEventListener('loadeddata', onLoad, { once: true });
    video.load();
    return () => video.removeEventListener('loadeddata', onLoad);
  }, []);

  // Auto-trigger effect using IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAutoTriggered && curtainsState === 'closed' && videoLoaded) {
            setTimeout(() => {
              playCurtainVideo('opening');
              setHasAutoTriggered(true);
            }, 800);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasAutoTriggered, videoLoaded]);

  // Capture current frame for seamless source swap
  const captureCurrentFrame = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = video.videoWidth || 1920;
    canvas.height = video.videoHeight || 1080;
    try {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      setShowCanvas(true);
    } catch {
      // ignore draw errors
    }
  };

  // Play opening/closing video with canvas technique
  const playCurtainVideo = (action: 'opening' | 'closing') => {
    if (!videoRef.current || isAnimating || !videoLoaded) return;
    setIsAnimating(true);

    const video = videoRef.current;
    const newSrc = action === 'opening' ? '/video/curtains-opening.mp4' : '/video/curtains-closing.mp4';
    const currentName = (video.src.split('/').pop() || '').toLowerCase();
    const newName = (newSrc.split('/').pop() || '').toLowerCase();

    if (currentName === newName) {
      // Same video, just replay
      setShowCanvas(false);
      video.currentTime = 0;
      video.play().catch(() => {});
    } else {
      // Different video, use canvas technique
      captureCurrentFrame();
      
      // Preload new video in background
      const preload = document.createElement('video');
      preload.src = newSrc;
      preload.muted = true;
      preload.playsInline = true;
      preload.preload = 'auto';
      document.body.appendChild(preload);

      const onReady = () => {
        video.src = newSrc;
        video.currentTime = 0;
        const onLoaded = () => {
          setShowCanvas(false);
          video.play().catch(() => {});
          document.body.removeChild(preload);
        };
        video.addEventListener('loadeddata', onLoaded, { once: true });
        video.load();
      };

      preload.addEventListener('canplaythrough', onReady, { once: true });
      preload.load();
    }

    video.onended = () => {
      video.pause();
      setCurtainsState(action === 'opening' ? 'open' : 'closed');
      video.currentTime = Math.max(video.duration - 0.1, 0);
      setIsAnimating(false);
    };
  };

  const handleToggle = () => {
    if (isAnimating || !videoLoaded) return;
    playCurtainVideo(curtainsState === 'open' ? 'closing' : 'opening');
  };

  const getStatusText = () => {
    if (isAnimating) {
      return curtainsState === 'open' ? 'Closing...' : 'Opening...';
    }
    return curtainsState === 'open' ? 'Curtains Open' : 'Curtains Closed';
  };

  return (
    <section 
      ref={containerRef} 
      id="perfect-privacy" 
      className="py-20 md:py-28 bg-white"
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          
          {/* ===== TEXT + CONTROL (First on mobile, Right on desktop) ===== */}
          <motion.div
            variants={fadeRise}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="md:col-span-5 space-y-6 order-1 md:order-2"
          >
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-black">
              Perfect Privacy
            </h2>
            
            <p className="text-gray-600 text-lg">
              Smart curtains that adapt to your day. Open for morning light, close for movie nights.
            </p>
            
            {/* ===== CONTROL CENTER CARD ===== */}
            <div className="pt-4">
              <button
                onClick={handleToggle}
                className={`
                  group relative overflow-hidden
                  rounded-xl sm:rounded-2xl
                  w-full max-w-[160px] sm:max-w-[200px] md:max-w-[240px] lg:max-w-[256px]
                  p-3 sm:p-4 md:p-5 lg:p-6
                  transition-all duration-500 ease-out
                  hover:scale-[1.02] active:scale-[0.98]
                  ${curtainsState === 'open' && !isAnimating
                    ? 'bg-gradient-to-br from-cyan-600 via-teal-600 to-cyan-700 shadow-xl shadow-teal-500/20'
                    : 'bg-gray-200 shadow-lg'
                  }
                `}
                aria-label={`Toggle curtains ${curtainsState === 'open' ? 'closed' : 'open'}`}
              >
                {/* Top Row: Icon + Status Indicator */}
                <div className="flex items-start justify-between mb-2 sm:mb-3 md:mb-4">
                  <div className={`
                    p-1.5 sm:p-2 md:p-2.5 lg:p-3 rounded-full transition-all duration-300
                    ${curtainsState === 'open' && !isAnimating
                      ? 'bg-white/20 backdrop-blur-sm' 
                      : 'bg-white/60'
                    }
                  `}>
                    <svg 
                      className={`
                        w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 
                        transition-colors duration-300
                        ${curtainsState === 'open' && !isAnimating ? 'text-white' : 'text-gray-500'}
                      `}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M4 6h16M4 12h16M4 18h16" 
                      />
                    </svg>
                  </div>
                  
                  <div className={`
                    h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full transition-all duration-300
                    ${curtainsState === 'open' && !isAnimating
                      ? 'bg-white shadow-lg shadow-white/50' 
                      : 'bg-gray-400'
                    }
                  `} />
                </div>
                
                {/* Bottom Row: Room name + Status text */}
                <div className="text-left">
                  <p className={`
                    text-xs sm:text-sm md:text-base font-semibold transition-colors duration-300
                    ${curtainsState === 'open' && !isAnimating ? 'text-white' : 'text-gray-700'}
                  `}>
                    Living Room
                  </p>
                  
                  <p className={`
                    text-[10px] sm:text-xs md:text-sm mt-0.5 transition-colors duration-300
                    ${curtainsState === 'open' && !isAnimating ? 'text-white/90' : 'text-gray-500'}
                  `}>
                    {getStatusText()}
                  </p>
                </div>
                
                {/* Subtle inner glow effect when curtains are open */}
                {curtainsState === 'open' && !isAnimating && (
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                )}
              </button>
            </div>
          </motion.div>

          {/* ===== VIDEO DISPLAY (Second on mobile, Left on desktop) ===== */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="md:col-span-7 order-2 md:order-1"
          >
            <div className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl bg-gray-800">
              {/* Canvas for seamless transitions */}
              <canvas
                ref={canvasRef}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-100 ${
                  showCanvas ? 'opacity-100 z-20' : 'opacity-0 z-10'
                }`}
              />

              {/* Video element */}
              <video
                ref={videoRef}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                  videoLoaded ? 'opacity-100' : 'opacity-0'
                } ${showCanvas ? 'z-10' : 'z-20'}`}
                muted
                playsInline
                preload="auto"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

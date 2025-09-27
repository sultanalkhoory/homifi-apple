'use client';
import { motion } from 'framer-motion';
import { scaleIn } from '@/lib/animations';

/**
 * iPhone Frame Component - CSS-only, pixel-perfect iPhone 15/16 Pro mockup
 * 
 * Key Features:
 * - 9:19.5 aspect ratio (accurate to real iPhone dimensions)
 * - Responsive sizing with hard caps to prevent oversized desktop display
 * - Truly transparent screen window (no background, shows parent content through)
 * - Accurate Dynamic Island size and positioning
 * - Realistic side buttons (mute, volume, power) with metallic gradients
 * - Subtle bezel highlights and shadows for depth
 * 
 * Usage:
 * <IPhoneFrame>
 *   <img src="/photo.png" alt="Room" className="w-full h-full object-cover" />
 *   // Optional: Add glass UI controls as children
 * </IPhoneFrame>
 */

export default function IPhoneFrame({ children }: { children?: React.ReactNode }) {
  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      animate="show"
      /**
       * Responsive sizing with hard maximum cap
       * - Mobile (default): 220px
       * - Small screens: 260px
       * - Medium screens: 300px
       * - Large screens: 320px
       * - Extra large: 340px
       * - NEVER exceeds 360px (max-w-[360px])
       * 
       * This ensures the phone looks realistic and never dominates on large displays
       */
      className="relative inline-block w-[220px] sm:w-[260px] md:w-[300px] lg:w-[320px] xl:w-[340px] max-w-[360px]"
    >
      {/* 
        Main iPhone Body
        - aspect-[9/19.5] = accurate iPhone 15/16 Pro proportions
        - rounded-[40px] = smooth corner radius matching real device
        - bg-black = device body color
        - overflow-visible = allows side buttons to extend outside
        - drop-shadow = creates depth and separation from background
      */}
      <div className="relative aspect-[9/19.5] rounded-[40px] bg-black overflow-visible
                      drop-shadow-[0_14px_40px_rgba(0,0,0,0.35)]">

        {/* 
          Subtle Metal Rim Highlight
          - Creates a thin light reflection around the edge
          - ring-1 ring-white/10 = very subtle white border
          - inset shadow = adds depth to the rim
          - pointer-events-none = doesn't interfere with clicks
        */}
        <div className="pointer-events-none absolute inset-0 rounded-[40px]
                        ring-1 ring-white/10 shadow-[inset_0_0_10px_rgba(255,255,255,0.10)]" />

        {/* 
          ========== SIDE BUTTONS (percentage-based positioning for responsive scaling) ==========
          All buttons use:
          - Metallic gradient (neutral-700 → neutral-900) for realistic appearance
          - Small shadows for depth
          - Percentage-based top/height values to scale with device size
        */}
        
        {/* Mute Switch (left side, top) */}
        <div className="absolute -left-[3px] top-[12%] w-[4px] h-[7%] rounded-l-[4px]
                        bg-gradient-to-b from-neutral-700 via-neutral-800 to-neutral-900 shadow-md" />
        
        {/* Volume Up Button (left side, upper-middle) */}
        <div className="absolute -left-[3px] top-[22%] w-[4px] h-[9%] rounded-l-[4px]
                        bg-gradient-to-b from-neutral-700 via-neutral-800 to-neutral-900 shadow-md" />
        
        {/* Volume Down Button (left side, lower-middle) */}
        <div className="absolute -left-[3px] top-[33%] w-[4px] h-[9%] rounded-l-[4px]
                        bg-gradient-to-b from-neutral-700 via-neutral-800 to-neutral-900 shadow-md" />
        
        {/* Power Button (right side, middle) */}
        <div className="absolute -right-[3px] top-[24%] w-[4px] h-[16%] rounded-r-[4px]
                        bg-gradient-to-b from-neutral-700 via-neutral-800 to-neutral-900 shadow-md" />

        {/* 
          Inner Bezel (thin black border around screen area)
          - inset-[6px] = creates 6px bezel width around screen
          - rounded-[34px] = maintains rounded corners (40px outer - 6px = 34px inner)
          - bg-black = bezel color
          - inset shadow = adds subtle depth to screen edge
        */}
        <div className="absolute inset-[6px] rounded-[34px] bg-black
                        shadow-[inset_0_0_10px_rgba(0,0,0,0.65)]">

          {/* 
            ========== SCREEN WINDOW - TRUE TRANSPARENCY ==========
            
            CRITICAL: This is the actual screen area where content displays
            
            Key characteristics:
            - NO background color (transparent)
            - NO ring/border (clean edges)
            - NO gloss overlay (shows parent content directly)
            - overflow-hidden with rounded corners for clean masking
            - Starts closer to top to minimize bezel thickness
            
            How transparency works:
            1. Parent photo block sits behind entire iPhone
            2. This screen window has no background
            3. Photo shows through this "window" naturally
            4. Children (glass UI controls) float on top of transparent screen
            
            Result: Same photo visible both outside and "inside" the phone
          */}
          <div
            className="
              absolute left-[9px] right-[9px]
              top-[12px] sm:top-[12px] md:top-[14px] lg:top-[16px]
              bottom-[12px] sm:bottom-[12px] md:bottom-[14px]
              rounded-[28px] overflow-hidden
            "
          >
            {/* 
              Dynamic Island (notch replacement on iPhone 15/16 Pro)
              - Positioned at top center of screen area
              - left-1/2 -translate-x-1/2 = perfect horizontal centering
              - mt-2 = small margin from top of screen
              - Width scales: 100px (mobile) → 118px (large screens)
              - Height scales: 26px (mobile) → 30px (large screens)
              - bg-black = creates cutout effect against transparent screen
              - z-10 = floats above any screen content
            */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 mt-2 z-10
                            w-[100px] sm:w-[104px] md:w-[110px] lg:w-[118px]
                            h-[26px] sm:h-[27px] md:h-[28px] lg:h-[30px]
                            rounded-full bg-black" />
            {/* 
              Children render here (optional glass UI controls, or duplicate photo for sync)
              Examples:
              - Glass buttons (lights toggle, curtains controls)
              - HUD overlays (temperature, doorbell)
              - Duplicate background photo to ensure visual sync
            */}
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

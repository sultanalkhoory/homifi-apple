'use client';
import { motion } from 'framer-motion';
import { scaleIn } from '@/lib/animations';

/**
 * iPhone Frame Component - CSS-only, pixel-perfect iPhone 15/16 Pro mockup
 * 
 * Key Features:
 * - 9:19.5 aspect ratio (accurate to real iPhone dimensions)
 * - Responsive sizing optimized for desktop/mobile balance
 * - Truly transparent screen window (no background, shows parent content through)
 * - Accurate Dynamic Island size and positioning
 * - Clean bezel only (no side buttons for minimal aesthetic)
 * - Subtle shadows for depth
 * 
 * Usage:
 * <IPhoneFrame>
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
       * Responsive sizing - REDUCED for better desktop balance
       * - Mobile (default): 180px
       * - Small screens: 220px
       * - Medium screens: 260px
       * - Large screens: 280px
       * - NEVER exceeds 300px (max-w-[300px])
       * 
       * This ensures the phone is elegant and proportional, not overwhelming
       */
      className="relative inline-block w-[180px] sm:w-[220px] md:w-[260px] lg:w-[280px] max-w-[300px]"
    >
      {/* 
        Main iPhone Body (TRANSPARENT - shows photo behind)
        - aspect-[9/19.5] = accurate iPhone 15/16 Pro proportions
        - rounded-[40px] = smooth corner radius matching real device
        - NO bg-black = transparent body to show photo through
        - overflow-visible = allows proper shadow rendering
        - drop-shadow = creates depth and separation from background
      */}
      <div className="relative aspect-[9/19.5] rounded-[40px] overflow-visible
                      drop-shadow-[0_14px_40px_rgba(0,0,0,0.35)]">

        {/* 
          BLACK BEZEL FRAME (ring around the edge)
          - Creates the visible black iPhone frame
          - ring-[8px] = 8px thick black border (matches reference image)
          - ring-black = bezel color
          - rounded-[40px] = matches outer body radius
          - pointer-events-none = doesn't interfere with clicks
          - This creates the substantial bezel while keeping the center transparent
        */}
        <div className="pointer-events-none absolute inset-0 rounded-[40px]
                        ring-[8px] ring-inset ring-black
                        shadow-[inset_0_0_10px_rgba(0,0,0,0.65)]">

          {/* 
            ========== SCREEN WINDOW - TRUE TRANSPARENCY ==========
            
            CRITICAL: This is the actual screen area where content displays
            
            Key characteristics:
            - NO background color (transparent)
            - NO ring/border (clean edges)
            - NO gloss overlay (shows parent content directly)
            - overflow-hidden with rounded corners for clean masking
            - Tighter corner radius to follow bezel curve
            - pointer-events-auto = allows interaction with glass controls
            
            How transparency works:
            1. Parent photo block sits behind entire iPhone
            2. iPhone body is transparent (no bg-black)
            3. Only the bezel ring is black (ring-[8px])
            4. This screen window cuts through showing photo
            5. Children (glass UI controls) float on top of transparent screen
            
            Result: Same photo visible both outside and "inside" the phone
          */}
          <div
            className="
              pointer-events-auto absolute left-[8px] right-[8px]
              top-[8px] bottom-[8px]
              rounded-[32px] overflow-hidden
            "
          >
            {/* 
              Dynamic Island (notch replacement on iPhone 15/16 Pro)
              - Positioned at top center of screen area
              - left-1/2 -translate-x-1/2 = perfect horizontal centering
              - mt-2 = small margin from top of screen
              - Fixed size: 80px width × 24px height (matches reference image)
              - bg-black = creates cutout effect against transparent screen
              - z-10 = floats above any screen content
            */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 mt-2 z-10
                            w-[80px] h-[24px]
                            rounded-full bg-black" />
            {/* 
              Children render here (ONLY for glass UI controls - NO background images)
              
              The screen is transparent - the parent photo block shows through naturally.
              Only add glass UI elements here:
              - Glass buttons (lights toggle, curtains controls)
              - HUD overlays (temperature, doorbell)
              - Status text or indicators
              
              DO NOT add background images here - that defeats the transparency!
            */}
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

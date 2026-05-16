---
name: S. K. Electronics
description: Landing site for an electrical appliance wholesaler in Sitamarhi, Bihar
colors:
  deep-shop-teal: "oklch(0.30 0.06 175)"
  deep-shop-teal-deep: "oklch(0.24 0.06 175)"
  sitamarhi-gold: "oklch(0.72 0.15 80)"
  sitamarhi-gold-hover: "oklch(0.78 0.16 80)"
  warm-cream: "oklch(0.97 0.008 80)"
  warm-cream-alt: "oklch(0.94 0.008 80)"
  near-white-warm: "oklch(0.99 0.005 80)"
  near-black-warm: "oklch(0.18 0.012 55)"
  medium-warm-gray: "oklch(0.40 0.015 55)"
  muted-warm-gray: "oklch(0.58 0.012 55)"
  light-warm-border: "oklch(0.88 0.010 80)"
typography:
  display:
    fontFamily: "'Bricolage Grotesque', system-ui, sans-serif"
    fontWeight: 800
    lineHeight: 1.08
  headline:
    fontFamily: "'Bricolage Grotesque', system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 3vw, 2.4rem)"
    fontWeight: 700
  title:
    fontFamily: "'Bricolage Grotesque', system-ui, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 700
  body:
    fontFamily: "'Mukta', system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "'Mukta', system-ui, sans-serif"
    fontSize: "0.7rem"
    fontWeight: 600
    letterSpacing: "2.5px"
rounded:
  pill: "50px"
  card: "14px"
  icon: "12px"
  thumb: "8px"
  mark: "10px"
spacing:
  section-y: "5rem"
  section-x: "2rem"
  card-padding: "1.5rem"
components:
  button-primary:
    backgroundColor: "{colors.sitamarhi-gold}"
    textColor: "{colors.near-black-warm}"
    rounded: "{rounded.pill}"
    padding: "0.85rem 1.75rem"
  button-primary-hover:
    backgroundColor: "{colors.sitamarhi-gold-hover}"
  button-ghost:
    backgroundColor: "oklch(0.95 0.01 175 / 0.1)"
    textColor: "oklch(0.95 0.01 175)"
    rounded: "{rounded.pill}"
    padding: "0.85rem 1.75rem"
  card:
    backgroundColor: "{colors.near-white-warm}"
    rounded: "{rounded.card}"
    padding: "1.75rem 1.5rem"
  nav-cta:
    backgroundColor: "{colors.sitamarhi-gold}"
    textColor: "{colors.near-black-warm}"
    rounded: "{rounded.pill}"
    padding: "0.55rem 1.25rem"
---

# Design System: S. K. Electronics

## 1. Overview

**Creative North Star: "The Copper Wire"**

A design system rooted in what the shop sells. Copper is warm, conductive, essential. Every element serves a purpose, just like every wire in a well-built circuit. The system trades decoration for trust: a 4.9 rating and a clear phone number beat any animation.

The palette splits between two worlds. Deep Shop Teal wraps the hero and contact sections in the authority of a well-run establishment. Warm Cream fills the product and content sections with the approachability of a well-lit showroom. Sitamarhi Gold threads through as the conductive accent, the color of action, appearing only on CTAs, stars, and badges where it means "call this number" or "this is trustworthy."

The system is bilingual by nature, not by afterthought. Bricolage Grotesque carries English headlines with shopfront confidence. Mukta renders Hindi with equal weight and natural cadence. Neither is decorative. Both are load-bearing.

**Key Characteristics:**
- Pill-shaped buttons you want to press, cards that lift on hover
- Flat surfaces at rest, shadows only on interaction
- Two-tone structure: dark hero/contact bookending light content sections
- Touch targets at 44px minimum, high contrast for outdoor phone screens
- Motion that respects slow connections and budget devices

## 2. Colors

A restrained palette with one committed accent. Deep Shop Teal carries the identity. Sitamarhi Gold drives action. Everything else is warm-tinted neutral.

### Primary
- **Deep Shop Teal** (oklch(0.30 0.06 175)): Hero background, contact section, navbar deep state. The color of a well-run establishment. Used where authority and trust matter most.
- **Deep Shop Teal Deep** (oklch(0.24 0.06 175)): Footer and deepest surfaces. The "closed" end of the teal scale.

### Neutral
- **Sitamarhi Gold** (oklch(0.72 0.15 80)): CTAs, star ratings, logo mark, accent elements. The color of trust earned over years. Appears on call-to-action buttons, star icons, and the navbar badge.
- **Sitamarhi Gold Hover** (oklch(0.78 0.16 80)): Interactive lift state for gold elements.
- **Warm Cream** (oklch(0.97 0.008 80)): Page background. Warm-tinted neutral that keeps light sections from feeling clinical.
- **Warm Cream Alt** (oklch(0.94 0.008 80)): Alternate surface for subtle differentiation.
- **Near White Warm** (oklch(0.99 0.005 80)): Card backgrounds. Just warm enough to sit comfortably against the cream page.
- **Near Black Warm** (oklch(0.18 0.012 55)): Primary text on light surfaces. Never pure black.
- **Medium Warm Gray** (oklch(0.40 0.015 55)): Secondary text, descriptions, supporting content.
- **Muted Warm Gray** (oklch(0.58 0.012 55)): Tertiary text, labels, timestamps.
- **Light Warm Border** (oklch(0.88 0.010 80)): Card borders, dividers. Tinted toward the warm axis.

### Named Rules

**The Conductor Rule.** Sitamarhi Gold is the accent. It appears on CTAs, star ratings, and trust signals. If it shows up on more than 10% of a light surface, the system has lost its restraint. The gold conducts attention toward the call or visit action. It does not decorate.

**The Warm Neutral Rule.** Every neutral tints toward hue 80 (warm amber axis) or hue 55 (warm brown axis). No pure grays. A gray that could exist on any website has no place here.

## 3. Typography

**Display Font:** Bricolage Grotesque (system-ui, sans-serif fallback)
**Body Font:** Mukta (system-ui, sans-serif fallback)

**Character:** A shopfront display face paired with a Hindi-native body. Bricolage Grotesque carries English with the weight and personality of a painted shop sign. Mukta renders both Hindi and English with even color and natural rhythm. The pairing works because neither font fights the other: display carries identity, body carries reading.

### Hierarchy
- **Display** (weight 800, clamp(2.4rem, 5vw, 3.5rem), line-height 1.08): Hero headline only. The shop name. Tight leading, maximum impact.
- **Headline** (weight 700, clamp(1.75rem, 3vw, 2.4rem)): Section titles. Bricolage Grotesque at the scale that says "this is a new section."
- **Title** (weight 700, 1.05rem): Product names, contact values. Small but weighty. Uses display font for continuity.
- **Body** (weight 400, 1rem, line-height 1.6): Paragraph text, descriptions. Mukta at comfortable reading size. Capped at 65ch max-width where line length matters.
- **Label** (weight 600, 0.7rem, letter-spacing 2.5px, uppercase): Section labels. Spaced and small. Sets the bilingual rhythm ("What We Offer / हमारे उत्पाद").

### Named Rules

**The Bilingual Weight Rule.** Hindi text always appears at the same or lower visual weight than its English counterpart. Hindi subtitles use lighter weight or reduced opacity (0.55 to 0.75). Never let Hindi visually overpower English in the same section.

**The Scale Ratio Rule.** Between any two consecutive type steps, the size ratio is at least 1.25. Flat type scales (where headline and body are close in size) undermine the shopfront confidence.

## 4. Elevation

Flat by default. Shadows appear only as a response to interaction. Resting state is clean and confident; hover state rewards attention.

The shadows are tinted, not generic. Card hover shadows pull teal from the hero palette. Button hover shadows pull gold from the accent. This keeps the elevation system part of the color story rather than a separate layer.

### Shadow Vocabulary
- **Card Hover** (box-shadow: 0 12px 40px oklch(0.30 0.06 175 / 0.08)): Lifts product cards on hover. Teal-tinted, diffuse, barely visible on dark surfaces but adds depth on cream.
- **Button Glow** (box-shadow: 0 4px 20px oklch(0.72 0.15 80 / 0.3)): Gold glow on primary button hover. Warm, inviting, reinforces the CTA.
- **Map Ambient** (box-shadow: 0 4px 24px oklch(0.30 0.06 175 / 0.06)): Subtle shadow under the embedded map. Grounds it without competing.
- **Navbar Hairline** (box-shadow: 0 1px 0 oklch(0.88 0.010 80)): Scroll state. Not a shadow so much as a boundary. Marks where the floating nav ends and content begins.

### Named Rules

**The Earned Shadow Rule.** Shadows are earned through interaction, not given by default. A resting card has no shadow. A hovered card earns one. A resting button is flat. A hovered button glows. If a shadow appears without a user action, it was free and therefore meaningless.

## 5. Components

Tactile and confident. Pill-shaped buttons you want to press, cards that lift when you reach for them, and a navbar that earns its background as you scroll.

### Buttons
- **Shape:** Fully rounded pill (50px radius), minimum height 48px
- **Primary:** Sitamarhi Gold background with near-black text (0.85rem 1.75rem padding). The call-to-action. Phone icon precedes "Call Now." Arrow follows review link text.
- **Hover:** Lighter gold, gold glow shadow (0 4px 20px), 0.2s ease-out transition
- **Active:** Scale 0.97, instant feedback
- **Ghost:** Transparent teal-tinted background (10% opacity), teal text, 25% opacity teal border. Used for "Directions" and secondary actions.
- **Ghost Hover:** Background fills to 18% opacity

### Cards
- **Corner Style:** Gently rounded (14px)
- **Background:** Near White Warm on cream pages; transparent teal-tinted (6 to 8% opacity) on dark surfaces
- **Shadow Strategy:** None at rest. Card Hover shadow on interaction.
- **Border:** 1px Light Warm Border on light surfaces; 1px teal-tinted border (10 to 12% opacity) on dark
- **Internal Padding:** 1.25 to 1.75rem depending on content density
- **Hover:** translateY(-4px) over 0.35s ease-out-quart

### Navigation
- **Shape:** Fixed top, full width, transparent initially. Transitions to scrolled state with backdrop blur (16px) and near-white background (95% opacity) after 50px scroll.
- **Logo:** "SK" mark (10px rounded gold square, 38px) + text stack (name + "Wholesale Electrical" uppercase sub-label)
- **CTA:** Pill-shaped gold button, right-aligned. On mobile (640px and below), text label hides, icon-only.
- **Scroll Transition:** Background and shadow appear over 0.3s ease-out. Logo text color shifts from light to dark.

### Hero Rating Block
- **Shape:** Rounded (16px), centered text
- **Background:** Teal at 8% opacity, 12% opacity teal border
- **Content:** 3.5rem gold number (display weight 800), five gold stars, "160+ ratings" label. The singular trust anchor.

### Review Cards
- **Corner Style:** 12px radius
- **Background:** Near White Warm, 1px Light Warm Border
- **Structure:** Stars and date top, text body, optional photo thumbnails (52px, 8px radius), footer with avatar (26px circle) and name
- **Pagination:** Pill-shaped ghost-style buttons with chevron icons, page counter centered

### Image Carousel
- **Shape:** 16px radius, 16:9 aspect ratio (4:3 on mobile)
- **Controls:** 44px circular dark buttons (60% opacity) at left and right center. Bottom-center dot indicators, 8px circles with gold active state.
- **Transition:** 0.4s ease-out fade with subtle scale (1.02 to 1.0)

### Trust Strip
- **Shape:** 14px rounded card, horizontal layout
- **Background:** Near White Warm, 1px border
- **Content:** Four trust signals in a row with 1px vertical dividers. Icon + main text (bold) + sub text. On mobile, stacks vertically, dividers hide.

### Footer
- **Background:** Deep Shop Teal Deep, the darkest surface
- **Layout:** Centered, name in Hindi and English, navigation links (hover lightens from 45% to 85% opacity), copyright

## 6. Do's and Don'ts

### Do:
- **Do** keep Sitamarhi Gold to CTAs, stars, and trust signals. If it appears on more than 10% of a light surface, reduce.
- **Do** pair Hindi and English in every section. "What We Offer / हमारे उत्पाद" is the pattern, not a separate Hindi section.
- **Do** use 44px minimum touch targets on every interactive element. The audience is on mobile phones, often outdoors.
- **Do** respect prefers-reduced-motion. Fade-in animations become instant. Scroll behavior becomes auto. The content arrives without choreography.
- **Do** tint every neutral toward hue 80 or hue 55. No pure grays. No untinted blacks or whites.
- **Do** use OKLCH for all color definitions. The project's color system is OKLCH-native.
- **Do** cap body text at 65 to 75ch max-width for comfortable reading on mobile.

### Don't:
- **Don't** use purple gradients, glassmorphism, or SaaS landing-page cliches. Per PRODUCT.md: "generic SaaS landing pages with purple gradients and glassmorphism" are explicitly rejected.
- **Don't** use heavy animations or effects that slow down on budget phones. The audience is on 3-4G connections with Android devices. Performance is a design choice.
- **Don't** create English-only or Hindi-only sections. Per PRODUCT.md: "Sites that are English-only or Hindi-only (must be bilingual)" are anti-references.
- **Don't** over-design in a way that feels foreign to Sitamarhi. Per PRODUCT.md: "Over-designed tech startup sites that feel foreign to Sitamarhi." This is a local business, not a venture-backed startup.
- **Don't** use gradient text (background-clip: text). Decorative, never meaningful. Use a single solid color.
- **Don't** use border-left or border-right greater than 1px as a colored accent stripe. Full borders or background tints instead.
- **Don't** add shadows to resting state elements. Shadows are earned through hover or interaction, never given by default.

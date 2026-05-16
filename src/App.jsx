import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import { Analytics } from '@vercel/analytics/react'
import { track } from '@vercel/analytics'
import { SpeedInsights } from '@vercel/speed-insights/react'
import './App.css'
import { reviews } from './reviewsData'

const prefersReduced = typeof window !== 'undefined'
  ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
  : false

/* ===== Animation Variants ===== */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 }
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 }
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08
    }
  }
}

/* ===== SVG Icons ===== */

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
)

const MapPinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
)

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
)

const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)

const ChevronIcon = ({ dir }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {dir === 'left' ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 18 15 12 9 6" />}
  </svg>
)

const FanIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="2" />
    <path d="M12 10c0-3.5-1.5-7-5.5-7-.5 3.5 1 6 3 8" />
    <path d="M14 12c3.5 0 7-1.5 7-5.5-3.5-.5-6 1-8 3" />
    <path d="M12 14c0 3.5 1.5 7 5.5 7 .5-3.5-1-6-3-8" />
    <path d="M10 12c-3.5 0-7 1.5-7 5.5 3.5.5 6-1 8-3" />
  </svg>
)

const BulbIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 21h6M10 17h4" />
    <path d="M12 3a6 6 0 0 0-4 10.5V17h8v-3.5A6 6 0 0 0 12 3z" />
  </svg>
)

const PlugIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 22v-6M9 7V2M15 7V2" />
    <path d="M6 7h12a2 2 0 0 1 2 2v2a6 6 0 0 1-6 6h-4a6 6 0 0 1-6-6V9a2 2 0 0 1 2-2z" />
  </svg>
)

const BoltIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
)

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
)

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

/* ===== Data ===== */

const products = [
  {
    icon: <FanIcon />,
    name: 'Fans',
    hindi: 'पंखे',
    desc: 'Ceiling, table, pedestal, and exhaust fans. Energy-efficient BLDC models and decorative fans for every room.',
    brandSlugs: ['havells', 'bajaj'],
  },
  {
    icon: <BulbIcon />,
    name: 'Lighting',
    hindi: 'लाइटिंग',
    desc: 'LED bulbs, tube lights, panel lights, battens, and street lights. Complete indoor and outdoor lighting.',
    brandSlugs: ['bajaj', 'greatwhite'],
  },
  {
    icon: <PlugIcon />,
    name: 'Switches & Wiring',
    hindi: 'स्विच और वायरिंग',
    desc: 'Modular switches, sockets, MCBs, and DB boxes. House wires and cables for every installation.',
    brandSlugs: ['anchor', 'rrkabel', 'greatwhite'],
  },
  {
    icon: <BoltIcon />,
    name: 'Kitchen Appliances',
    hindi: 'किचन उपकरण',
    desc: 'Chimneys, hobs, and cooktops. Mixer grinders, kettles, toasters, and irons.',
    brandSlugs: ['elica', 'hindware', 'morphy-richards'],
  },
]

const brands = [
  {
    name: 'Havells',
    slug: 'havells',
    categories: ['Wiring', 'Fans', 'Capacitors'],
    hindi: 'वायरिंग · पंखे · कैपेसिटर',
    desc: 'Ceiling fans, BLDC fans, wiring accessories, switchgear, and capacitors. India\'s most trusted electrical brand, available at wholesale rates.',
    featured: true,
  },
  {
    name: 'Bajaj',
    slug: 'bajaj',
    suffix: 'Electricals',
    categories: ['Fans', 'Lighting', 'Appliances'],
    hindi: 'पंखे · लाइटिंग · उपकरण',
    desc: 'Ceiling fans, LED bulbs, tube lights, irons, mixer grinders, and kitchen appliances. A household name across India.',
  },
  {
    name: 'Anchor',
    slug: 'anchor',
    suffix: 'by Panasonic',
    categories: ['Switches', 'Sockets', 'MCBs'],
    hindi: 'स्विच · सॉकेट · एमसीबी',
    desc: 'Modular switches, sockets, distribution boards, and circuit breakers. Premium wiring accessories for homes and commercial spaces.',
  },
  {
    name: 'RR Kabel',
    slug: 'rrkabel',
    categories: ['Wires', 'Cables'],
    hindi: 'वायर · केबल',
    desc: 'House wires, flexible cables, industrial cables, and FR-LSH wires. Safety-first wiring for every installation.',
  },
  {
    name: 'Elica',
    slug: 'elica',
    categories: ['Chimneys', 'Cooktops'],
    hindi: 'चिमनी · कुकटॉप',
    desc: 'Auto-clean chimneys, built-in hobs, and gas cooktops. Italian-engineered kitchen solutions for modern Indian homes.',
  },
  {
    name: 'Hindware',
    slug: 'hindware',
    categories: ['Chimneys', 'Cooktops'],
    hindi: 'चिमनी · कुकटॉप',
    desc: 'Kitchen chimneys with baffle and mesh filters, stainless steel hobs, and glass-top cooktops. Reliable performance at competitive prices.',
  },
  {
    name: 'Morphy Richards',
    slug: 'morphy-richards',
    categories: ['Kitchen', 'Home Appliances'],
    hindi: 'किचन · होम अप्लायंसेस',
    desc: 'Mixer grinders, electric kettles, pop-up toasters, sandwich makers, and steam irons. British heritage, everyday reliability.',
  },
  {
    name: 'Greatwhite',
    slug: 'greatwhite',
    categories: ['Wiring', 'Lighting'],
    hindi: 'वायरिंग · लाइटिंग',
    desc: 'LED panels, battens, downlights, and modern wiring accessories. Contemporary designs built for safety and durability.',
  },
]

const BRAND_FILES = {
  havells: 'havells.svg',
  bajaj: 'bajaj.png',
  anchor: 'anchor.svg',
  rrkabel: 'rrkabel.svg',
  elica: 'elica.png',
  hindware: 'hindware.svg',
  'morphy-richards': 'morphy-richards.png',
  greatwhite: 'greatwhite.png',
}

const LIGHT_LOGOS = new Set(['elica', 'greatwhite'])

function BrandLogo({ slug, name }) {
  const file = BRAND_FILES[slug]
  if (!file) return <div className="brand-mark">{name.charAt(0)}</div>
  return (
    <img
      src={`/brands/${file}`}
      alt={`${name} logo`}
      className="brand-logo-img"
      data-light={LIGHT_LOGOS.has(slug) ? 'true' : undefined}
      loading="lazy"
    />
  )
}

const MAPS_URL = 'https://maps.google.com/maps?q=S+K+Electronics+Gaushala+Road+Ring+Bandh+Rd+Chakmahila+Sitamarhi+Bihar&t=&z=15&ie=UTF8&iwloc=&output=embed'
const DIRECTIONS_URL = 'https://maps.app.goo.gl/7ZJPWBfTbXs9MuMN6'
const REVIEWS_URL = 'https://www.google.com/maps/place/S.+K.+Electronics/@26.5883622,85.4873171,17z/data=!4m8!3m7!1s0x39ecf12c7e6fa777:0xe2013697c9b54a21!8m2!3d26.5883574!4d85.489892!9m1!1b1!16s%2Fg%2F11wy5qq8fk'
const PHONE = '+91 90654 73333'
const PHONE_HREF = 'tel:+919065473333'
const WHATSAPP_MSG = encodeURIComponent('Namaste! I would like to inquire about wholesale electrical products.')
const WHATSAPP_HREF = `https://wa.me/919065473333?text=${WHATSAPP_MSG}`

/* ===== Custom Hooks ===== */

function useScrollNavbar() {
  useEffect(() => {
    const handler = () => {
      document.querySelector('.navbar')?.classList.toggle('scrolled', window.scrollY > 50)
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])
}

/* ===== Motion Components ===== */

function MotionSection({ children, className, ...props }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  
  if (prefersReduced) {
    return <section className={className} {...props}>{children}</section>
  }
  
  return (
    <motion.section
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeUp}
      transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
      {...props}
    >
      {children}
    </motion.section>
  )
}

function MotionDiv({ children, className, delay = 0, ...props }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-30px" })
  
  if (prefersReduced) {
    return <div className={className} {...props}>{children}</div>
  }
  
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeUp}
      transition={{ duration: 0.5, delay, ease: [0.25, 1, 0.5, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

/* ===== Components ===== */

function Navbar() {
  useScrollNavbar()
  const handlePhoneClick = () => track('phone_call', { source: 'navbar' })
  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-logo">
        <div className="logo-mark" aria-hidden="true">SK</div>
        <div className="logo-text">
          <span className="logo-name">S. K. Electronics</span>
          <span className="logo-sub">Wholesale Electrical</span>
        </div>
      </div>
      <a href={PHONE_HREF} className="navbar-cta" aria-label={`Call ${PHONE}`} onClick={handlePhoneClick}>
        <PhoneIcon />
        <span>{PHONE}</span>
      </a>
    </nav>
  )
}

function Hero() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  const brandLogos = [
    { src: '/brands/havells.svg', slug: 'havells', x: '8%', y: '18%', size: '90px' },
    { src: '/brands/bajaj.png', slug: 'bajaj', x: '88%', y: '15%', size: '75px' },
    { src: '/brands/anchor.svg', slug: 'anchor', x: '18%', y: '75%', size: '70px' },
    { src: '/brands/rrkabel.svg', slug: 'rrkabel', x: '78%', y: '70%', size: '80px' },
    { src: '/brands/elica.png', slug: 'elica', x: '52%', y: '22%', size: '65px' },
    { src: '/brands/hindware.svg', slug: 'hindware', x: '92%', y: '82%', size: '75px' },
    { src: '/brands/morphy-richards.png', slug: 'morphy-richards', x: '12%', y: '48%', size: '85px' },
    { src: '/brands/greatwhite.png', slug: 'greatwhite', x: '62%', y: '85%', size: '70px' },
    { src: '/brands/havells.svg', slug: 'havells', x: '45%', y: '55%', size: '60px' },
    { src: '/brands/anchor.svg', slug: 'anchor', x: '82%', y: '40%', size: '65px' },
  ]

  return (
    <section className="hero" id="home">
      <div className="hero-gradient-orb hero-gradient-orb-1" aria-hidden="true" />
      <div className="hero-gradient-orb hero-gradient-orb-2" aria-hidden="true" />
      <motion.div 
        className="hero-bg-logos" 
        aria-hidden="true"
        style={prefersReduced ? {} : { y }}
      >
        {brandLogos.map((logo, i) => (
          <motion.img
            key={`logo-${i}`}
            src={logo.src}
            alt=""
            data-light={LIGHT_LOGOS.has(logo.slug) ? 'true' : undefined}
            initial={prefersReduced ? {} : { opacity: 0, scale: 0.8 }}
            animate={prefersReduced ? {} : { opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + i * 0.05, duration: 0.6 }}
            style={{
              position: 'absolute',
              left: logo.x,
              top: logo.y,
              width: logo.size,
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </motion.div>
      <div className="hero-inner">
        <motion.div 
          className="hero-left"
          initial={prefersReduced ? {} : { opacity: 0, y: 30 }}
          animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
        >
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-dot" />
            <span>Wholesale Electrical &middot; Sitamarhi &middot; Since 2017</span>
          </div>
          <h1>
            <span className="hero-line">S. K.</span>
            <span className="hero-line hero-line-accent">Electronics</span>
            <span className="sr-only"> — Wholesale Electrical Distributor in Sitamarhi, Bihar</span>
          </h1>
          <p className="hero-hindi" lang="hi">एस. के. इलेक्ट्रॉनिक्स</p>
        </motion.div>
        <motion.div 
          className="hero-right"
          initial={prefersReduced ? {} : { opacity: 0, y: 30 }}
          animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 1, 0.5, 1] }}
          style={prefersReduced ? {} : { opacity }}
        >
          <a href={PHONE_HREF} className="hero-phone" onClick={() => track('phone_call', { source: 'hero-display' })}>
            <PhoneIcon />
            <span>{PHONE}</span>
          </a>
          <p className="hero-tagline">
            Authorised distributor of Havells, Bajaj, Anchor, RR Kabel, Elica, Hindware, Morphy Richards, and Greatwhite.
          </p>
          <p className="hero-tagline-hindi" lang="hi">
            हैवल्स, बजाज, एंकर, आरआर केबल, एलिका, हिंदवेयर, मोर्फी रिचर्ड्स और ग्रेटव्हाइट के अधिकृत वितरक।
          </p>
          <div className="hero-actions">
            <motion.a 
              href={PHONE_HREF} 
              className="btn btn-primary" 
              onClick={() => track('phone_call', { source: 'hero-cta' })}
              whileHover={prefersReduced ? {} : { scale: 1.02 }}
              whileTap={prefersReduced ? {} : { scale: 0.98 }}
            >
              <PhoneIcon /> Call Now
            </motion.a>
            <motion.a 
              href={WHATSAPP_HREF} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-whatsapp" 
              onClick={() => track('whatsapp_click', { source: 'hero' })}
              whileHover={prefersReduced ? {} : { scale: 1.02 }}
              whileTap={prefersReduced ? {} : { scale: 0.98 }}
            >
              <WhatsAppIcon /> WhatsApp
            </motion.a>
            <motion.a 
              href={DIRECTIONS_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-ghost" 
              onClick={() => track('get_directions', { source: 'hero' })}
              whileHover={prefersReduced ? {} : { scale: 1.02 }}
              whileTap={prefersReduced ? {} : { scale: 0.98 }}
            >
              <MapPinIcon /> Get Directions
            </motion.a>
          </div>
          <div className="hero-rating">
            <span className="hero-rating-num">4.9</span>
            <span className="hero-rating-stars" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => <StarIcon key={i} />)}
            </span>
            <span>160+ on Google</span>
          </div>
        </motion.div>
      </div>
      <div className="hero-line-accent-bar" aria-hidden="true" />
    </section>
  )
}

function TrustStrip() {
  const items = [
    { icon: <StarIcon />, label: '4.9 Rating', detail: '160+ Google reviews' },
    { icon: <ShieldIcon />, label: '8+ Brands', detail: 'Authorised distributor' },
    { icon: <BoltIcon />, label: 'Wholesale Prices', detail: 'सबसे अच्छे थोक दाम' },
    { icon: <ClockIcon />, label: 'Open 7 Days', detail: '10 AM to 8 PM' },
  ]
  
  return (
    <section className="trust-strip" aria-label="Trust signals">
      <motion.div 
        className="trust-strip-inner"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
      >
        {items.map((item, i) => (
          <motion.div 
            key={i} 
            className="trust-item"
            variants={fadeUp}
            transition={{ duration: 0.4 }}
          >
            <div className="trust-item-icon" aria-hidden="true">{item.icon}</div>
            <div className="trust-item-body">
              <span className="trust-item-label">{item.label}</span>
              <span className="trust-item-detail" lang={item.detail.match(/[\u0900-\u097F]/) ? 'hi' : undefined}>{item.detail}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

function Products() {
  return (
    <section className="products" id="products" aria-labelledby="products-title">
      <MotionDiv className="products-header">
        <p className="section-label">What We Offer / हमारे उत्पाद</p>
        <h2 className="section-title" id="products-title">Our Products</h2>
        <p className="section-hindi" lang="hi">थोक मूल्य पर उपलब्ध</p>
      </MotionDiv>
      <motion.div 
        className="products-list" 
        role="list"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
      >
        {products.map((p, i) => (
          <motion.div
            key={p.name}
            className="product-row"
            role="listitem"
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            whileHover={prefersReduced ? {} : { x: 8 }}
          >
            <div className="product-row-icon" aria-hidden="true">{p.icon}</div>
            <div className="product-row-body">
              <h3 className="product-row-name">{p.name}</h3>
              <p className="product-row-hindi" lang="hi">{p.hindi}</p>
            </div>
            <p className="product-row-desc">{p.desc}</p>
            <div className="product-row-brands">
              {p.brandSlugs.map(slug => (
                <div key={slug} className="product-brand-logo">
                  <BrandLogo slug={slug} name={slug} />
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

function Brands() {
  return (
    <section className="brands" id="brands" aria-labelledby="brands-title">
      <MotionDiv className="brands-header">
        <p className="section-label">Our Brands / हमारे ब्रांड</p>
        <h2 className="section-title" id="brands-title">Authorised Distributor</h2>
        <p className="section-hindi" lang="hi">अधिकृत वितरक</p>
      </MotionDiv>
      <motion.div 
        className="brands-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
      >
        {brands.map((b, i) => (
          <motion.div 
            key={b.slug} 
            className="brand-card"
            variants={scaleIn}
            transition={{ duration: 0.4 }}
            whileHover={prefersReduced ? {} : { y: -4, transition: { duration: 0.2 } }}
          >
            <div className="brand-card-logo">
              <BrandLogo slug={b.slug} name={b.name} />
            </div>
            <div className="brand-card-body">
              <h3 className="brand-card-name">
                {b.name}
                {b.suffix && <span className="brand-card-suffix">{b.suffix}</span>}
              </h3>
              <p className="brand-card-cats">{b.categories.join(' · ')}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

function Gallery() {
  const photos = reviews
    .filter(r => r.images.length > 0)
    .flatMap(r => r.images.map(src => ({ src, name: r.name, date: r.date, avatar: r.avatar })))

  const [index, setIndex] = useState(0)
  const count = photos.length
  if (count === 0) return null

  const select = (i) => setIndex(i)
  const prev = () => setIndex((i) => (i - 1 + count) % count)
  const next = () => setIndex((i) => (i + 1) % count)

  return (
    <section className="gallery" id="gallery" aria-labelledby="gallery-title">
      <MotionDiv>
        <p className="section-label">Photos / फ़ोटो</p>
        <h2 className="section-title" id="gallery-title">Customer Photos</h2>
        <p className="section-hindi" lang="hi">ग्राहक फ़ोटो</p>
      </MotionDiv>
      <MotionDiv className="gallery-viewer" delay={0.1}>
        <div className="gallery-main">
          <AnimatePresence mode="wait">
            <motion.img
              key={index}
              src={photos[index].src}
              alt={`${photos[index].name} review photo`}
              loading="lazy"
              width="800"
              height="450"
              className="gallery-main-img"
              initial={prefersReduced ? {} : { opacity: 0 }}
              animate={prefersReduced ? {} : { opacity: 1 }}
              exit={prefersReduced ? {} : { opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          </AnimatePresence>
          <div className="gallery-main-overlay">
            {photos[index].avatar && (
              <img src={photos[index].avatar} alt="" className="gallery-overlay-avatar" width="28" height="28" loading="lazy" />
            )}
            <span className="gallery-overlay-name">{photos[index].name}</span>
            <span className="gallery-overlay-date">{photos[index].date}</span>
          </div>
          {count > 1 && (
            <>
              <motion.button 
                className="gallery-nav-btn gallery-prev" 
                onClick={prev} 
                aria-label="Previous photo"
                whileHover={prefersReduced ? {} : { scale: 1.1 }}
                whileTap={prefersReduced ? {} : { scale: 0.9 }}
              >
                <ChevronIcon dir="left" />
              </motion.button>
              <motion.button 
                className="gallery-nav-btn gallery-next" 
                onClick={next} 
                aria-label="Next photo"
                whileHover={prefersReduced ? {} : { scale: 1.1 }}
                whileTap={prefersReduced ? {} : { scale: 0.9 }}
              >
                <ChevronIcon dir="right" />
              </motion.button>
            </>
          )}
        </div>
        <div className="gallery-thumbs">
          {photos.map((p, i) => (
            <motion.button
              key={i}
              className={`gallery-thumb${i === index ? ' active' : ''}`}
              onClick={() => select(i)}
              aria-label={`Photo by ${p.name}`}
              whileHover={prefersReduced ? {} : { scale: 1.05 }}
              whileTap={prefersReduced ? {} : { scale: 0.95 }}
            >
              <img src={p.src} alt="" loading="lazy" />
            </motion.button>
          ))}
        </div>
      </MotionDiv>
    </section>
  )
}

function ReviewCard({ review, index }) {
  const [expanded, setExpanded] = useState(false)
  const isLong = review.snippet.length > 120
  
  return (
    <motion.div 
      className="review-card"
      variants={fadeUp}
      transition={{ duration: 0.4 }}
      whileHover={prefersReduced ? {} : { y: -4, transition: { duration: 0.2 } }}
    >
      <div className="review-top">
        <div className="review-stars" aria-label={`${review.rating} out of 5 stars`}>
          {Array.from({ length: review.rating }).map((_, j) => (
            <span key={j} className="review-star"><StarIcon /></span>
          ))}
        </div>
        <span className="review-time">{review.date}</span>
      </div>
      <p className={`review-text${isLong && !expanded ? ' review-clamped' : ''}`}>{review.snippet}</p>
      {isLong && !expanded && (
        <button className="review-read-more" onClick={() => setExpanded(true)}>
          Read more / और पढ़ें
        </button>
      )}
      {review.images.length > 0 && (
        <div className="review-images">
          {review.images.slice(0, 3).map((img, i) => (
            <img key={i} src={img} alt={`${review.name} photo ${i + 1}`} className="review-thumb" loading="lazy" width="80" height="80" />
          ))}
          {review.images.length > 3 && <span className="review-more">+{review.images.length - 3}</span>}
        </div>
      )}
      <div className="review-footer">
        {review.avatar ? (
          <img src={review.avatar} alt="" className="review-avatar-img" width="28" height="28" loading="lazy" />
        ) : (
          <div className="review-avatar">{review.name.charAt(0)}</div>
        )}
        <span className="review-name">{review.name}</span>
      </div>
    </motion.div>
  )
}

function Reviews() {
  const [page, setPage] = useState(0)
  const perPage = 6
  const totalPages = Math.ceil(reviews.length / perPage)
  const visible = reviews.slice(page * perPage, page * perPage + perPage)
  
  return (
    <section className="reviews-section" id="reviews" aria-labelledby="reviews-title">
      <MotionDiv>
        <p className="section-label">Customer Reviews / ग्राहक समीक्षा</p>
        <h2 className="section-title" id="reviews-title">What Customers Say</h2>
        <p className="section-hindi" lang="hi">ग्राहक क्या कहते हैं</p>
        <div className="reviews-count">{reviews.length} reviews &middot; 4.9</div>
      </MotionDiv>
      <motion.div 
        className="reviews-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
        key={page}
      >
        {visible.map((r, i) => (
          <ReviewCard key={`${page}-${i}`} review={r} index={i} />
        ))}
      </motion.div>
      {totalPages > 1 && (
        <div className="reviews-pagination" role="navigation" aria-label="Review pagination">
          <motion.button
            className="pagination-btn"
            onClick={() => setPage(p => Math.max(0, p - 1))}
            disabled={page === 0}
            aria-label="Previous page"
            whileHover={prefersReduced ? {} : { scale: 1.02 }}
            whileTap={prefersReduced ? {} : { scale: 0.98 }}
          >
            <ChevronIcon dir="left" /> <span>पिछला / Previous</span>
          </motion.button>
          <span className="pagination-info">Page {page + 1} of {totalPages}</span>
          <motion.button
            className="pagination-btn"
            onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
            disabled={page === totalPages - 1}
            aria-label="Next page"
            whileHover={prefersReduced ? {} : { scale: 1.02 }}
            whileTap={prefersReduced ? {} : { scale: 0.98 }}
          >
            <span>अगला / Next</span> <ChevronIcon dir="right" />
          </motion.button>
        </div>
      )}
      <MotionDiv className="reviews-cta" delay={0.2}>
        <motion.a
          href={REVIEWS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
          whileHover={prefersReduced ? {} : { scale: 1.02 }}
          whileTap={prefersReduced ? {} : { scale: 0.98 }}
        >
          See all reviews on Google Maps / सभी समीक्षा देखें <ArrowRightIcon />
        </motion.a>
      </MotionDiv>
    </section>
  )
}

function About() {
  return (
    <section className="about" id="about" aria-labelledby="about-title">
      <div className="about-inner">
        <MotionDiv className="about-left">
          <p className="section-label">About Us / हमारे बारे में</p>
          <h2 className="section-title" id="about-title">Visit Our Store</h2>
          <p className="section-hindi" lang="hi">हमारे स्टोर पर आएं</p>
          <p className="about-body">
            S. K. Electronics is an authorised distributor of Havells, Bajaj Electricals, Anchor by
            Panasonic, RR Kabel, Elica, Hindware, Morphy Richards, and Greatwhite on Gaushala Road,
            Ring Bandh Rd, Chakmahila, Sitamarhi. We stock ceiling fans, LED lighting, modular switches, wires and
            cables, kitchen chimneys, cooktops, and home appliances at wholesale prices for
            electricians, contractors, and retailers across Bihar.
          </p>
          <p className="about-body hindi" lang="hi">
            एस. के. इलेक्ट्रॉनिक्स गौशाला रोड, रिंग बांध रोड, चकमहिला, सीतामढ़ी में हैवल्स, बजाज इलेक्ट्रिकल्स, एंकर बाई पैनसोनिक, आरआर केबल, एलिका, हिंदवेयर, मोर्फी रिचर्ड्स और ग्रेटव्हाइट का अधिकृत वितरक है। हम बिहार भर के इलेक्ट्रीशियन, ठेकेदारों और खुदरा विक्रेताओं के लिए पंखे, एलईडी लाइटिंग, मॉड्यूलर स्विच, तार और केबल, किचन चिमनी, कुकटॉप और घरेलू उपकरण थोक मूल्य पर उपलब्ध कराते हैं।
          </p>
          <motion.a
            href={DIRECTIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-dark"
            whileHover={prefersReduced ? {} : { scale: 1.02 }}
            whileTap={prefersReduced ? {} : { scale: 0.98 }}
          >
            <MapPinIcon /> Get Directions <ArrowRightIcon />
          </motion.a>
        </MotionDiv>
        <MotionDiv className="about-right" delay={0.15}>
          <iframe
            src={MAPS_URL}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            sandbox="allow-scripts allow-same-origin allow-popups"
            title="S. K. Electronics, Gaushala Road, Ring Bandh Rd, Sitamarhi"
          />
          <div className="about-map-fallback">
            <MapPinIcon />
            <p>Gaushala Road, Ring Bandh Rd, Chakmahila, Sitamarhi, Bihar 843302</p>
            <a href={DIRECTIONS_URL} target="_blank" rel="noopener noreferrer">
              Open in Google Maps
            </a>
          </div>
        </MotionDiv>
      </div>
    </section>
  )
}


function Footer() {
  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#products', label: 'Products' },
    { href: '#brands', label: 'Brands' },
    { href: '#gallery', label: 'Photos' },
    { href: '#reviews', label: 'Reviews' },
    { href: '#about', label: 'About' },
  ]
  
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-col footer-col-brand">
            <div className="footer-logo">
              <span className="footer-logo-text">S. K. Electronics</span>
              <span className="footer-logo-hindi" lang="hi">एस. के. इलेक्ट्रॉनिक्स</span>
            </div>
            <p className="footer-tagline">Sitamarhi&apos;s trusted wholesale electrical distributor since 2017.</p>
          </div>
          
          <nav className="footer-col footer-col-nav" aria-label="Footer navigation">
            <h3 className="footer-col-title">Quick Links</h3>
            <ul className="footer-nav-list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="footer-nav-link">{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="footer-col footer-col-contact">
            <h3 className="footer-col-title">Contact</h3>
            <div className="footer-contact-list">
              <a href={PHONE_HREF} className="footer-contact-item">
                <PhoneIcon />
                <span>{PHONE}</span>
              </a>
              <div className="footer-contact-item">
                <ClockIcon />
                <span>10 AM - 8 PM, 7 days</span>
              </div>
              <address className="footer-contact-item footer-address-item">
                <MapPinIcon />
                <span>Gaushala Road, Ring Bandh Rd, Chakmahila, Sitamarhi, Bihar 843302</span>
              </address>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="footer-copy">
            &copy; {new Date().getFullYear()} S. K. Electronics, Sitamarhi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

function FloatingCTA() {
  const [visible, setVisible] = useState(false)
  
  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])
  
  return (
    <AnimatePresence>
      {visible && (
        <motion.div 
          className="floating-cta" 
          aria-label="Quick contact actions"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
        >
          <motion.a 
            href={PHONE_HREF} 
            className="floating-cta-btn floating-cta-call" 
            aria-label={`Call ${PHONE}`}
            whileHover={prefersReduced ? {} : { scale: 1.1 }}
            whileTap={prefersReduced ? {} : { scale: 0.9 }}
          >
            <PhoneIcon />
          </motion.a>
          <motion.a 
            href={WHATSAPP_HREF} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="floating-cta-btn floating-cta-whatsapp" 
            aria-label="Chat on WhatsApp"
            whileHover={prefersReduced ? {} : { scale: 1.1 }}
            whileTap={prefersReduced ? {} : { scale: 0.9 }}
          >
            <WhatsAppIcon />
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function App() {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <TrustStrip />
        <Products />
        <Brands />
        <Gallery />
        <Reviews />
        <About />
      </main>
      <Footer />
      <FloatingCTA />
      <Analytics />
      <SpeedInsights />
    </>
  )
}

export default App

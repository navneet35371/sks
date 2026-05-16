import { useEffect, useRef, useState } from 'react'
import './App.css'
import { reviews } from './reviewsData'

const prefersReduced = typeof window !== 'undefined'
  ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
  : false

const fadeObserver = prefersReduced ? null : new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        fadeObserver.unobserve(entry.target)
      }
    }
  },
  { threshold: 0.1 }
)

function useFadeIn() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReduced) {
      el.classList.add('visible')
      return
    }
    fadeObserver.observe(el)
    return () => fadeObserver.unobserve(el)
  }, [])
  return ref
}

function useScrollNavbar() {
  useEffect(() => {
    const handler = () => {
      document.querySelector('.navbar')?.classList.toggle('scrolled', window.scrollY > 50)
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])
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

/* ===== Components ===== */

function Navbar() {
  useScrollNavbar()
  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-logo">
        <div className="logo-mark" aria-hidden="true">SK</div>
        <div className="logo-text">
          <span className="logo-name">S. K. Electronics</span>
          <span className="logo-sub">Wholesale Electrical</span>
        </div>
      </div>
      <a href={PHONE_HREF} className="navbar-cta" aria-label={`Call ${PHONE}`}>
        <PhoneIcon />
        <span>{PHONE}</span>
      </a>
    </nav>
  )
}

function Hero() {
  const brandLogos = [
    { src: '/brands/havells.svg', slug: 'havells', x: '10%', y: '15%', size: '80px' },
    { src: '/brands/bajaj.png', slug: 'bajaj', x: '85%', y: '12%', size: '70px' },
    { src: '/brands/anchor.svg', slug: 'anchor', x: '20%', y: '78%', size: '65px' },
    { src: '/brands/rrkabel.svg', slug: 'rrkabel', x: '75%', y: '72%', size: '75px' },
    { src: '/brands/elica.png', slug: 'elica', x: '50%', y: '20%', size: '60px' },
    { src: '/brands/hindware.svg', slug: 'hindware', x: '90%', y: '85%', size: '70px' },
    { src: '/brands/morphy-richards.png', slug: 'morphy-richards', x: '15%', y: '50%', size: '80px' },
    { src: '/brands/greatwhite.png', slug: 'greatwhite', x: '60%', y: '88%', size: '65px' },
    { src: '/brands/havells.svg', slug: 'havells', x: '42%', y: '58%', size: '55px' },
    { src: '/brands/anchor.svg', slug: 'anchor', x: '80%', y: '38%', size: '60px' },
  ]

  return (
    <section className="hero" id="home">
      <div className="hero-bg-logos" aria-hidden="true">
        {brandLogos.map((logo, i) => (
          <img
            key={`logo-${i}`}
            src={logo.src}
            alt=""
            data-light={LIGHT_LOGOS.has(logo.slug) ? 'true' : undefined}
            style={{
              position: 'absolute',
              left: logo.x,
              top: logo.y,
              width: logo.size,
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </div>
      <div className="hero-inner">
        <div className="hero-left fade-in" ref={useFadeIn()}>
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
        </div>
        <div className="hero-right fade-in fade-in-delay-1" ref={useFadeIn()}>
          <a href={PHONE_HREF} className="hero-phone">
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
            <a href={PHONE_HREF} className="btn btn-primary">
              <PhoneIcon /> Call Now
            </a>
            <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
              <WhatsAppIcon /> WhatsApp
            </a>
            <a href={DIRECTIONS_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <MapPinIcon /> Get Directions
            </a>
          </div>
          <div className="hero-rating">
            <span className="hero-rating-num">4.9</span>
            <span className="hero-rating-stars" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => <StarIcon key={i} />)}
            </span>
            <span>160+ on Google</span>
          </div>
        </div>
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
      <div className="trust-strip-inner fade-in" ref={useFadeIn()}>
        {items.map((item, i) => (
          <div key={i} className="trust-item">
            <div className="trust-item-icon" aria-hidden="true">{item.icon}</div>
            <div className="trust-item-body">
              <span className="trust-item-label">{item.label}</span>
              <span className="trust-item-detail" lang={item.detail.match(/[\u0900-\u097F]/) ? 'hi' : undefined}>{item.detail}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function FadeInRow({ delay, children, ...props }) {
  const ref = useFadeIn()
  return (
    <div
      ref={ref}
      className={`product-row fade-in fade-in-delay-${delay}`}
      {...props}
    >
      {children}
    </div>
  )
}

function Products() {
  return (
    <section className="products" id="products" aria-labelledby="products-title">
      <div className="products-header fade-in" ref={useFadeIn()}>
        <p className="section-label">What We Offer / हमारे उत्पाद</p>
        <h2 className="section-title" id="products-title">Our Products</h2>
        <p className="section-hindi" lang="hi">थोक मूल्य पर उपलब्ध</p>
      </div>
      <div className="products-list" role="list">
        {products.map((p, i) => (
          <FadeInRow
            key={p.name}
            delay={i + 1}
            role="listitem"
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
          </FadeInRow>
        ))}
      </div>
    </section>
  )
}

function Brands() {
  return (
    <section className="brands" id="brands" aria-labelledby="brands-title">
      <div className="brands-header fade-in" ref={useFadeIn()}>
        <p className="section-label">Our Brands / हमारे ब्रांड</p>
        <h2 className="section-title" id="brands-title">Authorised Distributor</h2>
        <p className="section-hindi" lang="hi">अधिकृत वितरक</p>
      </div>
      <div className="brands-grid fade-in fade-in-delay-1" ref={useFadeIn()}>
        {brands.map(b => (
          <div key={b.slug} className="brand-card">
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
          </div>
        ))}
      </div>
    </section>
  )
}

function Gallery() {
  const headerRef = useFadeIn()
  const viewerRef = useFadeIn()
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
      <div className="fade-in" ref={headerRef}>
        <p className="section-label">Photos / फ़ोटो</p>
        <h2 className="section-title" id="gallery-title">Customer Photos</h2>
        <p className="section-hindi" lang="hi">ग्राहक फ़ोटो</p>
      </div>
      <div className="gallery-viewer fade-in fade-in-delay-1" ref={viewerRef}>
        <div className="gallery-main">
          <img
            src={photos[index].src}
            alt={`${photos[index].name} review photo`}
            loading="lazy"
            width="800"
            height="450"
            key={index}
            className="gallery-main-img"
          />
          <div className="gallery-main-overlay">
            {photos[index].avatar && (
              <img src={photos[index].avatar} alt="" className="gallery-overlay-avatar" width="28" height="28" loading="lazy" />
            )}
            <span className="gallery-overlay-name">{photos[index].name}</span>
            <span className="gallery-overlay-date">{photos[index].date}</span>
          </div>
          {count > 1 && (
            <>
              <button className="gallery-nav-btn gallery-prev" onClick={prev} aria-label="Previous photo">
                <ChevronIcon dir="left" />
              </button>
              <button className="gallery-nav-btn gallery-next" onClick={next} aria-label="Next photo">
                <ChevronIcon dir="right" />
              </button>
            </>
          )}
        </div>
        <div className="gallery-thumbs">
          {photos.map((p, i) => (
            <button
              key={i}
              className={`gallery-thumb${i === index ? ' active' : ''}`}
              onClick={() => select(i)}
              aria-label={`Photo by ${p.name}`}
            >
              <img src={p.src} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

function ReviewCard({ review }) {
  const [expanded, setExpanded] = useState(false)
  const isLong = review.snippet.length > 120
  return (
    <div className="review-card">
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
    </div>
  )
}

function Reviews() {
  const [page, setPage] = useState(0)
  const perPage = 6
  const totalPages = Math.ceil(reviews.length / perPage)
  const visible = reviews.slice(page * perPage, page * perPage + perPage)
  return (
    <section className="reviews-section" id="reviews" aria-labelledby="reviews-title">
      <div className="fade-in" ref={useFadeIn()}>
        <p className="section-label">Customer Reviews / ग्राहक समीक्षा</p>
        <h2 className="section-title" id="reviews-title">What Customers Say</h2>
        <p className="section-hindi" lang="hi">ग्राहक क्या कहते हैं</p>
        <div className="reviews-count">{reviews.length} reviews &middot; 4.9</div>
      </div>
      <div className="reviews-grid">
        {visible.map((r, i) => (
          <ReviewCard key={`${page}-${i}`} review={r} />
        ))}
      </div>
      {totalPages > 1 && (
        <div className="reviews-pagination" role="navigation" aria-label="Review pagination">
          <button
            className="pagination-btn"
            onClick={() => setPage(p => Math.max(0, p - 1))}
            disabled={page === 0}
            aria-label="Previous page"
          >
            <ChevronIcon dir="left" /> <span>पिछला / Previous</span>
          </button>
          <span className="pagination-info">Page {page + 1} of {totalPages}</span>
          <button
            className="pagination-btn"
            onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
            disabled={page === totalPages - 1}
            aria-label="Next page"
          >
            <span>अगला / Next</span> <ChevronIcon dir="right" />
          </button>
        </div>
      )}
      <div className="reviews-cta fade-in" ref={useFadeIn()}>
        <a
          href={REVIEWS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          See all reviews on Google Maps / सभी समीक्षा देखें <ArrowRightIcon />
        </a>
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="about" id="about" aria-labelledby="about-title">
      <div className="about-inner">
        <div className="about-left fade-in" ref={useFadeIn()}>
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
          <a
            href={DIRECTIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-dark"
          >
            <MapPinIcon /> Get Directions <ArrowRightIcon />
          </a>
        </div>
        <div className="about-right fade-in fade-in-delay-1" ref={useFadeIn()}>
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
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="contact-inner">
        <div className="fade-in" ref={useFadeIn()}>
          <p className="section-label">Get In Touch / संपर्क करें</p>
          <h2 className="section-title" id="contact-title">Contact Us</h2>
          <p className="section-hindi" lang="hi">फ़ोन करें या स्टोर आएं</p>
        </div>
        <div className="contact-grid">
          <div className="contact-block fade-in fade-in-delay-1" ref={useFadeIn()}>
            <div className="contact-block-icon"><PhoneIcon /></div>
            <div className="contact-block-value">
              <a href={PHONE_HREF}>{PHONE}</a>
            </div>
            <div className="contact-block-label">Phone / फ़ोन</div>
          </div>
          <div className="contact-block fade-in fade-in-delay-2" ref={useFadeIn()}>
            <div className="contact-block-icon"><MapPinIcon /></div>
            <div className="contact-block-value">
              <a href={DIRECTIONS_URL} target="_blank" rel="noopener noreferrer">
                Gaushala Road, Ring Bandh Rd, Chakmahila, Sitamarhi
              </a>
            </div>
            <div className="contact-block-label">Bihar 843302 / सीतामढ़ी, बिहार</div>
          </div>
          <div className="contact-block fade-in fade-in-delay-3" ref={useFadeIn()}>
            <div className="contact-block-icon"><ClockIcon /></div>
            <div className="contact-block-value">10 AM to 8 PM</div>
            <div className="contact-block-label">Open 7 days / सोम से रवि</div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-name">S. K. Electronics</div>
          <div className="footer-hindi" lang="hi">एस. के. इलेक्ट्रॉनिक्स</div>
        </div>
        <div className="footer-contact">
          <a href={PHONE_HREF} className="footer-phone">
            <PhoneIcon />
            <span>{PHONE}</span>
          </a>
          <address className="footer-address">
            Gaushala Road, Ring Bandh Rd, Chakmahila, Sitamarhi, Bihar 843302
          </address>
        </div>
        <nav className="footer-links" aria-label="Footer navigation">
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#products">Products</a></li>
            <li><a href="#brands">Brands</a></li>
            <li><a href="#gallery">Photos</a></li>
            <li><a href="#reviews">Reviews</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
        <div className="footer-bottom">
          <p className="footer-copy">
            &copy; {new Date().getFullYear()} S. K. Electronics, Sitamarhi. All rights reserved.
          </p>
          <p className="footer-hours" lang="hi">
            खुला 7 दिन / Open 7 days, 10 AM &ndash; 8 PM
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
  if (!visible) return null
  return (
    <div className="floating-cta" aria-label="Quick contact actions">
      <a href={PHONE_HREF} className="floating-cta-btn floating-cta-call" aria-label={`Call ${PHONE}`}>
        <PhoneIcon />
      </a>
      <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className="floating-cta-btn floating-cta-whatsapp" aria-label="Chat on WhatsApp">
        <WhatsAppIcon />
      </a>
    </div>
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
        <Contact />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  )
}

export default App

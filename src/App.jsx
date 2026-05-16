import { useEffect, useRef, useState } from 'react'
import './App.css'
import { reviews, reviewImages } from './reviewsData'

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
  { threshold: 0.12 }
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

const TagIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
    <line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>
)

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
)

const FlameIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 2c-2 4-5 6-5 10a5 5 0 0 0 10 0c0-4-3-6-5-10z" />
  </svg>
)

/* ===== Data ===== */

const products = [
  {
    icon: <FanIcon />,
    name: 'Fans',
    hindi: 'पंखे',
    desc: 'Ceiling, table, and exhaust fans from Havells and other top brands at wholesale prices.',
  },
  {
    icon: <BulbIcon />,
    name: 'Lighting',
    hindi: 'लाइटिंग',
    desc: 'LED bulbs, tube lights, panel lights, and street lights. Complete lighting solutions.',
  },
  {
    icon: <PlugIcon />,
    name: 'Electrical Fittings',
    hindi: 'इलेक्ट्रिकल फिटिंग्एस',
    desc: 'MCB, DB boxes, wires, cables, switches, and sockets. Everything for your wiring needs.',
  },
  {
    icon: <BoltIcon />,
    name: 'Power Backup',
    hindi: 'पावर बैकअप',
    desc: 'Inverters, batteries, solar panels, and stabilizers. Reliable backup for every need.',
  },
]

const trustItems = [
  { icon: <StarIcon />, main: '4.9 Rating', sub: '160+ reviews on Google' },
  { icon: <TagIcon />, main: 'Wholesale Prices', sub: 'एसबएसे अच्छे थोक दाम' },
  { icon: <ShieldIcon />, main: 'Havells Dealer', sub: 'Top brands available' },
  { icon: <ClockIcon />, main: 'Open 7 Days', sub: '10 AM to 8 PM, एसोम–रवि' },
]

const brands = [ // eslint-disable-line no-unused-vars
  {
    name: 'Havells',
    slug: 'havells',
    categories: ['Wiring', 'Fans', 'Capacitors'],
    hindi: 'वायरिंग · पंखे · कैपेएसिटर',
    desc: 'India\'s leading electrical equipment company. We carry their complete range of ceiling fans, wiring accessories, switchgear, and capacitors at wholesale prices.',
    featured: true,
  },
  {
    name: 'Bajaj',
    slug: 'bajaj',
    suffix: 'Electricals',
    categories: ['Fans', 'Lighting', 'Appliances'],
    hindi: 'पंखे · लाइटिंग · उपकरण',
    desc: 'A household name in Indian electricals. Bajaj ceiling fans, LED lighting, and home appliances available at competitive wholesale rates.',
  },
  {
    name: 'Anchor',
    slug: 'anchor',
    suffix: 'by Panasonic',
    categories: ['Switches', 'Sockets', 'MCBs'],
    hindi: 'एस्विच · एसॉकेट · एमएसीबी',
    desc: 'Panasonic\'s wiring accessories division in India. Premium switches, sockets, and circuit protection trusted in homes and businesses nationwide.',
  },
  {
    name: 'RR Kabel',
    slug: 'rrkabel',
    categories: ['Wires', 'Cables'],
    hindi: 'वायर · केबल',
    desc: 'Leading wire and cable manufacturer. Superior quality house wires, industrial cables, and communication cables for every installation.',
  },
  {
    name: 'Elica',
    slug: 'elica',
    categories: ['Chimneys', 'Cooktops'],
    hindi: 'चिमनी · कुकटॉप',
    desc: 'Italian-designed kitchen chimneys and cooktops. Premium range hoods and gas stoves built for modern Indian kitchens.',
  },
  {
    name: 'Hindware',
    slug: 'hindware',
    categories: ['Chimneys', 'Cooktops'],
    hindi: 'चिमनी · कुकटॉप',
    desc: 'Iconic Indian brand for kitchen chimneys and cooktops. Reliable performance, stylish designs, and competitive pricing for every budget.',
  },
  {
    name: 'Greatwhite',
    slug: 'greatwhite',
    categories: ['Wiring', 'Lighting'],
    hindi: 'वायरिंग · लाइटिंग',
    desc: 'Modern electrical wiring accessories and LED lighting solutions. Innovative products designed for safety, durability, and contemporary style.',
  },
]

const BRAND_FILES = {
  havells: 'havells.svg',
  bajaj: 'bajaj.jpg',
  anchor: 'anchor.svg',
  rrkabel: 'rrkabel.svg',
  elica: 'elica.png',
  hindware: 'hindware.svg',
  greatwhite: 'greatwhite.png',
}

function BrandLogo({ slug, name }) {
  const file = BRAND_FILES[slug]
  if (!file) return <div className="brand-mark">{name.charAt(0)}</div>
  return (
    <img
      src={`/brands/${file}`}
      alt={`${name} logo`}
      className="brand-logo-img"
      loading="lazy"
    />
  )
}

function Brands() {
  return (
    <section className="brands" id="brands" aria-labelledby="brands-title">
      <div className="fade-in" ref={useFadeIn()}>
        <p className="section-label">Our Brands / {'हमारे ब्रांड'}</p>
        <h2 className="section-title" id="brands-title">Authorized Dealer</h2>
        <p className="section-hindi" lang="hi">{'अधिकृत डीलर'}</p>
      </div>
      <div className="brands-list fade-in fade-in-delay-1" ref={useFadeIn()}>
        {brands.map(b => (
          <div key={b.slug} className="brand-row">
            <div className="brand-row-logo">
              <BrandLogo slug={b.slug} name={b.name} />
            </div>
            <div className="brand-row-body">
              <div className="brand-row-head">
                <h3 className="brand-row-name">
                  {b.name}
                  {b.suffix && <small>{b.suffix}</small>}
                </h3>
                <span className="brand-row-cats">{b.categories.join(' · ')}</span>
              </div>
              <p className="brand-row-hindi" lang="hi">{b.hindi}</p>
              <p className="brand-row-desc">{b.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
const MAPS_URL = 'https://maps.google.com/maps?q=S+K+Electronics+Ring+Bandh+Road+Sitamarhi+Bihar&t=&z=15&ie=UTF8&iwloc=&output=embed'
const DIRECTIONS_URL = 'https://maps.app.goo.gl/7ZJPWBfTbXs9MuMN6'
const REVIEWS_URL = 'https://www.google.com/maps/place/S.+K.+Electronics/@26.5883622,85.4873171,17z/data=!4m8!3m7!1s0x39ecf12c7e6fa777:0xe2013697c9b54a21!8m2!3d26.5883574!4d85.489892!9m1!1b1!16s%2Fg%2F11wy5qq8fk'
const PHONE = '+91 90654 73333'
const PHONE_HREF = 'tel:+919065473333'

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
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <div className="hero-text fade-in" ref={useFadeIn()}>
          <div className="hero-badge">
            <StarIcon /> <span>Trusted Since 2017</span>
          </div>
          <h1>S. K. Electronics</h1>
          <span className="hero-hindi" lang="hi">{'एस. के. इलेक्ट्रॉनिक्एस'}</span>
          <p className="hero-tagline">
            Your trusted electrical wholesale partner in Sitamarhi.
          </p>
          <p className="hero-tagline-hindi" lang="hi">
            {'एसीतामढ़ी में आपका विश्वएसनीय इलेक्ट्रिकल थोक पार्टनर।'}
          </p>
          <div className="hero-actions">
            <a href={PHONE_HREF} className="btn btn-primary">
              <PhoneIcon /> Call Now
            </a>
            <a href="#about" className="btn btn-ghost">
              <MapPinIcon /> Directions
            </a>
          </div>
          <div className="hero-rating-inline">
            <span className="hero-rating-stars" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => <StarIcon key={i} />)}
            </span>
            <span>4.9 &middot; 160+ Google ratings</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function ProductCard({ product, index }) {
  return (
    <div
      className={`product-card fade-in fade-in-delay-${index + 1}`}
      ref={useFadeIn()}
      role="listitem"
    >
      <div className="product-icon" aria-hidden="true">{product.icon}</div>
      <h3 className="product-name">{product.name}</h3>
      <p className="product-hindi" lang="hi">{product.hindi}</p>
      <p className="product-desc">{product.desc}</p>
    </div>
  )
}

function Products() {
  return (
    <section className="products" id="products" aria-labelledby="products-title">
      <div className="fade-in" ref={useFadeIn()}>
        <p className="section-label">What We Offer / {'हमारे उत्पाद'}</p>
        <h2 className="section-title" id="products-title">Our Products</h2>
        <p className="section-hindi" lang="hi">{'थोक मूल्य पर उपलब्ध'}</p>
      </div>
      <div className="products-grid" role="list">
        {products.map((p, i) => (
          <ProductCard key={p.name} product={p} index={i} />
        ))}
      </div>
    </section>
  )
}

function Trust() {
  return (
    <section className="trust" aria-label="Trust signals">
      <div className="trust-strip fade-in" ref={useFadeIn()}>
        {trustItems.map((item, i) => (
          <span key={item.main}>
            <div className="trust-item">
              <span className="trust-item-icon" aria-hidden="true">{item.icon}</span>
              <div className="trust-item-text">
                <span className="trust-item-main">{item.main}</span>
                <span className="trust-item-sub">{item.sub}</span>
              </div>
            </div>
            {i < trustItems.length - 1 && (
              <span className="trust-divider" aria-hidden="true" />
            )}
          </span>
        ))}
      </div>
    </section>
  )
}

function ImageCarousel({ images }) {
  const [index, setIndex] = useState(0)
  const count = images.length
  if (count === 0) return null
  const prev = () => setIndex((i) => (i - 1 + count) % count)
  const next = () => setIndex((i) => (i + 1) % count)
  return (
    <div className="carousel">
      <div className="carousel-track">
        <img
          src={images[index].src}
          alt={images[index].alt}
          loading="lazy"
          key={index}
        />
      </div>
      {count > 1 && (
        <>
          <button className="carousel-btn carousel-prev" onClick={prev} aria-label="Previous photo">
            <ChevronIcon dir="left" />
          </button>
          <button className="carousel-btn carousel-next" onClick={next} aria-label="Next photo">
            <ChevronIcon dir="right" />
          </button>
          <div className="carousel-counter">
            {index + 1} / {count}
          </div>
        </>
      )}
    </div>
  )
}

function Gallery() {
  return (
    <section className="gallery" id="gallery" aria-labelledby="gallery-title">
      <div className="fade-in" ref={useFadeIn()}>
        <p className="section-label">Photos / {'फ़ोटो'}</p>
        <h2 className="section-title" id="gallery-title">Customer Photos</h2>
        <p className="section-hindi" lang="hi">{'ग्राहक फ़ोटो'}</p>
      </div>
      <div className="fade-in fade-in-delay-1" ref={useFadeIn()}>
        <ImageCarousel images={reviewImages} />
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
          Read more / {'और पढ़ें'}
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
        <p className="section-label">Customer Reviews / {'ग्राहक एसमीक्षा'}</p>
        <h2 className="section-title" id="reviews-title">What Customers Say</h2>
        <p className="section-hindi" lang="hi">{'ग्राहक क्या कहते हैं'}</p>
        <div className="reviews-count">{reviews.length} reviews &middot; 4.9</div>
      </div>
      <div className="reviews-grid">
        {visible.map((r, i) => (
          <ReviewCard key={`${page}-${i}`} review={r} />
        ))}
      </div>
      {totalPages > 1 && (
        <div className="reviews-pagination">
          <button
            className="pagination-btn"
            onClick={() => setPage(p => Math.max(0, p - 1))}
            disabled={page === 0}
            aria-label="Previous page"
          >
            <ChevronIcon dir="left" /> Previous
          </button>
          <span className="pagination-info">Page {page + 1} of {totalPages}</span>
          <button
            className="pagination-btn"
            onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
            disabled={page === totalPages - 1}
            aria-label="Next page"
          >
            Next <ChevronIcon dir="right" />
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
          See all reviews on Google Maps <ArrowRightIcon />
        </a>
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="about" id="about" aria-labelledby="about-title">
      <div className="fade-in" ref={useFadeIn()}>
        <p className="section-label">About Us / {'हमारे बारे में'}</p>
        <h2 className="section-title" id="about-title">Visit Our Store</h2>
        <p className="section-hindi" lang="hi">{'हमारे एस्टोर पर आएं'}</p>
      </div>
      <div className="about-grid">
        <div className="about-text fade-in" ref={useFadeIn()}>
          <p>
            S. K. Electronics is a leading electrical appliance wholesaler on Ring Bandh Road,
            Sitamarhi. We supply fans, lighting, electrical fittings, and power backup solutions
            at unbeatable wholesale prices.
          </p>
          <p className="hindi" lang="hi">
            {'एस. के. इलेक्ट्रॉनिक्एस रिंग बांध रोड, एसीतामढ़ी पर एक प्रमुख इलेक्ट्रिकल उपकरण थोक विक्रेता है। हम पंखे, लाइटिंग, इलेक्ट्रिकल फिटिंग्एस और पावर बैकअप एसमाधान एसबएसे अच्छे थोक मूल्य पर उपलब्ध कराते हैं।'}
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
        <div className="about-map fade-in fade-in-delay-2" ref={useFadeIn()}>
          <iframe
            src={MAPS_URL}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="S. K. Electronics, Ring Bandh Road, Sitamarhi"
          />
          <div className="about-map-fallback">
            <MapPinIcon />
            <p>Ring Bandh Rd, Sitamarhi, Bihar 843302</p>
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
          <p className="section-label">Get In Touch / {'एसंपर्क करें'}</p>
          <h2 className="section-title" id="contact-title">Contact Us</h2>
          <p className="section-hindi" lang="hi">{'फ़ोन करें या एस्टोर आएं'}</p>
        </div>
        <div className="contact-grid">
          <div className="contact-block fade-in fade-in-delay-1" ref={useFadeIn()}>
            <div className="contact-block-icon"><PhoneIcon /></div>
            <div className="contact-block-value">
              <a href={PHONE_HREF}>{PHONE}</a>
            </div>
            <div className="contact-block-label">Phone / {'फ़ोन'}</div>
          </div>
          <div className="contact-block fade-in fade-in-delay-2" ref={useFadeIn()}>
            <div className="contact-block-icon"><MapPinIcon /></div>
            <div className="contact-block-value">
              <a href={DIRECTIONS_URL} target="_blank" rel="noopener noreferrer">
                Ring Bandh Rd, Sitamarhi
              </a>
            </div>
            <div className="contact-block-label">Bihar 843302 / {'एसीतामढ़ी, बिहार'}</div>
          </div>
          <div className="contact-block fade-in fade-in-delay-3" ref={useFadeIn()}>
            <div className="contact-block-icon"><ClockIcon /></div>
            <div className="contact-block-value">10 AM to 8 PM</div>
            <div className="contact-block-label">Open 7 days / {'एसोम एसे रवि'}</div>
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
        <div className="footer-name">S. K. Electronics</div>
        <div className="footer-hindi" lang="hi">{'एस. के. इलेक्ट्रॉनिक्एस'}</div>
        <nav className="footer-links" aria-label="Footer navigation">
          <a href="#home">Home</a>
          <a href="#products">Products</a>
          <a href="#brands">Brands</a>
          <a href="#gallery">Photos</a>
          <a href="#reviews">Reviews</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <a href={PHONE_HREF}>Call Now</a>
        </nav>
        <p className="footer-copy">
          &copy; {new Date().getFullYear()} S. K. Electronics, Sitamarhi. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Trust />
        <Products />
        <Brands />
        <Gallery />
        <Reviews />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App

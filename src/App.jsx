import { useEffect, useRef, useState } from 'react'
import './App.css'
import { reviews, reviewImages } from './reviewsData'

function useFadeIn() {
  const ref = useRef(null)
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced && ref.current) {
      ref.current.classList.add('visible')
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.12 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
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

const products = [
  {
    icon: '🔄',
    name: 'Fans',
    hindi: 'पंखे',
    desc: 'Ceiling, table, and exhaust fans from Havells and other top brands at wholesale prices.',
  },
  {
    icon: '💡',
    name: 'Lighting',
    hindi: 'लाइटिंग',
    desc: 'LED bulbs, tube lights, panel lights, and street lights. Complete lighting solutions.',
  },
  {
    icon: '🔌',
    name: 'Electrical Fittings',
    hindi: 'इलेक्ट्रिकल फिटिंग्स',
    desc: 'MCB, DB boxes, wires, cables, switches, and sockets. Everything for your wiring needs.',
  },
  {
    icon: '⚡',
    name: 'Power Backup',
    hindi: 'पावर बैकअप',
    desc: 'Inverters, batteries, solar panels, and stabilizers. Reliable backup for every need.',
  },
]

const trustItems = [
  { icon: '⭐', main: '4.9 Rating', sub: '160+ reviews on Google' },
  { icon: '🏷️', main: 'Wholesale Prices', sub: 'सबसे अच्छे थोक दाम' },
  { icon: '🏭', main: 'Havells Dealer', sub: 'Top brands available' },
  { icon: '📅', main: 'Open 7 Days', sub: '10 AM to 8 PM, सोम–रवि' },
]

const MAPS_URL = 'https://maps.google.com/maps?q=S+K+Electronics+Ring+Bandh+Road+Sitamarhi+Bihar&t=&z=15&ie=UTF8&iwloc=&output=embed'
const DIRECTIONS_URL = 'https://maps.app.goo.gl/7ZJPWBfTbXs9MuMN6'
const REVIEWS_URL = 'https://maps.app.goo.gl/7ZJPWBfTbXs9MuMN6'
const PHONE = '+91 90654 73333'
const PHONE_HREF = 'tel:+919065473333'

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=600&q=80', alt: 'Colorful electrical wires bundled together' },
  { src: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=600&q=80', alt: 'Electrical circuit breaker panel' },
  { src: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=600&q=80', alt: 'Electrical wiring and components' },
  { src: 'https://images.unsplash.com/photo-1555436169-20e93ea9a7ff?auto=format&fit=crop&w=600&q=80', alt: 'LED light bulbs on display' },
  { src: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=600&q=80', alt: 'Electrical supply store shelves' },
  { src: 'https://images.unsplash.com/photo-1581249809804-22b43a7e8e9e?auto=format&fit=crop&w=600&q=80', alt: 'Power cables and electrical fittings' },
]

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
      <div className="hero-grain" aria-hidden="true" />
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-content">
        <div className="hero-text fade-in" ref={useFadeIn()}>
          <div className="hero-badge">
            <span className="star" aria-hidden="true">★</span> 4.9 Rating · Trusted Since 2017
          </div>
          <h1>S. K. Electronics</h1>
          <span className="hero-hindi">स. के. इलेक्ट्रॉनिक्स</span>
          <p className="hero-tagline">
            Your trusted electrical wholesale partner in Sitamarhi.
          </p>
          <p className="hero-tagline-hindi" lang="hi">
            सीतामढ़ी में आपका विश्वसनीय इलेक्ट्रिकल थोक पार्टनर।
          </p>
          <div className="hero-actions">
            <a href={PHONE_HREF} className="btn btn-primary">
              <PhoneIcon /> Call Now
            </a>
            <a
              href={DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              <MapPinIcon /> Directions
            </a>
          </div>
        </div>
        <div className="hero-aside fade-in fade-in-delay-2" ref={useFadeIn()}>
          <div className="hero-rating">
            <div className="hero-rating-number">4.9</div>
            <div className="hero-rating-stars" aria-label="4.9 out of 5 stars">
              ★★★★★
            </div>
            <div className="hero-rating-label">160+ ratings on Google</div>
          </div>
          <div className="hero-categories">
            {products.map((p) => (
              <div key={p.name} className="hero-cat">
                <span className="hero-cat-icon" aria-hidden="true">{p.icon}</span>
                <div>
                  {p.name}
                  <span className="hero-cat-hindi" lang="hi">{p.hindi}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Products() {
  return (
    <section className="products" id="products" aria-labelledby="products-title">
      <div className="fade-in" ref={useFadeIn()}>
        <p className="section-label">What We Offer / हमारे उत्पाद</p>
        <h2 className="section-title" id="products-title">Our Products</h2>
        <p className="section-hindi" lang="hi">थोक मूल्य पर उपलब्ध</p>
      </div>
      <div className="products-grid" role="list">
        {products.map((p, i) => (
          <div
            key={p.name}
            className={`product-card fade-in fade-in-delay-${i + 1}`}
            ref={useFadeIn()}
            role="listitem"
          >
            <div className="product-icon" aria-hidden="true">{p.icon}</div>
            <h3 className="product-name">{p.name}</h3>
            <p className="product-hindi" lang="hi">{p.hindi}</p>
            <p className="product-desc">{p.desc}</p>
          </div>
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

const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)

const ChevronIcon = ({ dir }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {dir === 'left' ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 18 15 12 9 6" />}
  </svg>
)

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
          <div className="carousel-dots">
            {images.map((_, i) => (
              <button
                key={i}
                className={`carousel-dot ${i === index ? 'active' : ''}`}
                onClick={() => setIndex(i)}
                aria-label={`Go to photo ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function Gallery() {
  const allPhotos = [...reviewImages, ...galleryImages.map(g => ({ src: g.src, alt: g.alt }))]
  return (
    <section className="gallery" id="gallery" aria-labelledby="gallery-title">
      <div className="fade-in" ref={useFadeIn()}>
        <p className="section-label">Gallery / गैलरी</p>
        <h2 className="section-title" id="gallery-title">See Our Store</h2>
        <p className="section-hindi" lang="hi">हमारी दुकान देखें</p>
      </div>
      <div className="fade-in fade-in-delay-1" ref={useFadeIn()}>
        <ImageCarousel images={allPhotos} />
      </div>
    </section>
  )
}

function ReviewCard({ review }) {
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
      <p className="review-text">{review.snippet}</p>
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
        <div className="reviews-count">{reviews.length} reviews · ★★★★★ 4.9</div>
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
        <p className="section-label">About Us / हमारे बारे में</p>
        <h2 className="section-title" id="about-title">Visit Our Store</h2>
        <p className="section-hindi" lang="hi">हमारे स्टोर पर आएं</p>
      </div>
      <div className="about-grid">
        <div className="about-text fade-in" ref={useFadeIn()}>
          <p>
            S. K. Electronics is a leading electrical appliance wholesaler on Ring Bandh Road,
            Sitamarhi. We supply fans, lighting, electrical fittings, and power backup solutions
            at unbeatable wholesale prices.
          </p>
          <p className="hindi" lang="hi">
            स. के. इलेक्ट्रॉनिक्स रिंग बांध रोड, सीतामढ़ी पर एक प्रमुख इलेक्ट्रिकल उपकरण थोक विक्रेता है।
            हम पंखे, लाइटिंग, इलेक्ट्रिकल फिटिंग्स और पावर बैकअप समाधान सबसे अच्छे थोक मूल्य पर उपलब्ध कराते हैं।
          </p>
          <a
            href={DIRECTIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="about-cta"
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
                Ring Bandh Rd, Sitamarhi
              </a>
            </div>
            <div className="contact-block-label">Bihar 843302 / सीतामढ़ी, बिहार</div>
          </div>
          <div className="contact-block fade-in fade-in-delay-3" ref={useFadeIn()}>
            <div className="contact-block-icon">🕐</div>
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
        <div className="footer-name">S. K. Electronics</div>
        <div className="footer-hindi" lang="hi">स. के. इलेक्ट्रॉनिक्स</div>
        <nav className="footer-links" aria-label="Footer navigation">
          <a href="#home">Home</a>
          <a href="#products">Products</a>
          <a href="#gallery">Gallery</a>
          <a href="#reviews">Reviews</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <a href={PHONE_HREF}>Call Now</a>
        </nav>
        <p className="footer-copy">
          © {new Date().getFullYear()} S. K. Electronics, Sitamarhi. All rights reserved.
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
        <Products />
        <Trust />
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

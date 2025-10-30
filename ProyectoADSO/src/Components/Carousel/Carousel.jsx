import { useEffect, useState } from 'react'
import styles from './Carousel.module.css'

const images = [
  'https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?w=1600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=1600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=1600&q=80&auto=format&fit=crop'
]

export default function Carousel({ autoplay = true, interval = 4000 }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!autoplay) return
    const id = setInterval(() => {
      setIndex(prev => (prev + 1) % images.length)
    }, interval)
    return () => clearInterval(id)
  }, [autoplay, interval])

  const prev = () => setIndex(prev => (prev - 1 + images.length) % images.length)
  const next = () => setIndex(prev => (prev + 1) % images.length)
  const goTo = i => setIndex(i)

  return (
    <section className={styles.carousel}>
      <div
        className={styles.track}
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((src, i) => (
          <div className={styles.slide} key={i}>
            <img className={styles.image} src={src} alt={`Slide ${i + 1}`} />
          </div>
        ))}
      </div>

      <button className={styles.prev} onClick={prev} aria-label="Anterior">❮</button>
      <button className={styles.next} onClick={next} aria-label="Siguiente">❯</button>

      <div className={styles.indicators}>
        {images.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === index ? styles.active : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Ir al slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

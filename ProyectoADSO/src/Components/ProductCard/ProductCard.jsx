import React from 'react'
import PropTypes from 'prop-types'
import styles from './ProductCard.module.css'

const ProductCard = ({ productImage, productName, productDescription, productPrice, formattedPrice, layout, onView }) => {
  const isHorizontal = layout === 'horizontal'

  return (
    <div className={isHorizontal ? styles.cardHorizontal : styles.cardGrid}>
      <div className={styles.imageWrapper}>
        <img className={styles.image} src={productImage} alt={productName} />
        <div className={styles.overlay}>
            <button className={styles.quickViewBtn} onClick={onView}>Vista Rápida</button>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
            <span className={styles.category}>{productDescription}</span>
            <h3 className={styles.name}>{productName}</h3>
        </div>
        
        <div className={styles.footer}>
            <span className={styles.price}>{formattedPrice || `$${productPrice.toLocaleString()}`}</span>
            <div className={styles.actions}>
                <button className={`${styles.btn} ${styles.primary}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                    Agregar
                </button>
                <button className={`${styles.btn} ${styles.secondary}`} onClick={onView}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                    Ver
                </button>
            </div>
        </div>
      </div>
    </div>
  )
}

ProductCard.propTypes = {
  productImage: PropTypes.string.isRequired,
  productName: PropTypes.string.isRequired,
  productDescription: PropTypes.string.isRequired,
  productPrice: PropTypes.number.isRequired,
  formattedPrice: PropTypes.string,
  layout: PropTypes.oneOf(['horizontal', 'grid']),
  onView: PropTypes.func
}

ProductCard.defaultProps = {
  layout: 'horizontal',
  onView: () => {}
}

export default ProductCard

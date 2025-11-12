import React from 'react'
import PropTypes from 'prop-types'
import styles from './ProductCard.module.css'

const ProductCard = ({ productImage, productName, productDescription, productPrice, layout }) => {
  const isHorizontal = layout === 'horizontal'

  return (
    <div className={isHorizontal ? styles.cardHorizontal : styles.cardGrid}>
      <div className={styles.imageWrapper}>
        <img className={styles.image} src={productImage} alt={productName} />
      </div>

      <div className={styles.content}>
        <span className={styles.name}>{productName}</span>
        <span className={styles.description}>{productDescription}</span>
        <span className={styles.price}>${productPrice.toLocaleString()}</span>

        <div className={styles.actions}>
          <span className={`${styles.btn} ${styles.primary}`}>🛒 Agregar</span>
          <span className={`${styles.btn} ${styles.secondary}`}>🔍 Ver</span>
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
  layout: PropTypes.oneOf(['horizontal', 'grid'])
}

ProductCard.defaultProps = {
  layout: 'horizontal'
}

export default ProductCard

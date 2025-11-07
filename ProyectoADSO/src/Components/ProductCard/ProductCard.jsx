import styles from './ProductCard.module.css';
import React from 'react'; 
import PropTypes from 'prop-types';

const ProductCard = (props) => {
    return (
        <div className={styles.Container}>
            <img className={styles.Image} src={props.productImage} alt={props.productName} />
            <span className={styles.Name}>{props.productName}</span>
            <span className={styles.Description}>{props.productDescription}</span>
            <span className={styles.Price}>Price: ${props.productPrice}</span>
        </div>
    );
};

ProductCard.propTypes = {
    productImage: PropTypes.string.isRequired,
    productName: PropTypes.string.isRequired,
    productDescription: PropTypes.string.isRequired,
    productPrice: PropTypes.number.isRequired
};

export default ProductCard;


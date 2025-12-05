import React from 'react';
import styles from './HomeProductCard.module.css';

const HomeProductCard = ({ image, title, price, onClick }) => {
    return (
        <div className={styles.card}>
            <div className={styles.imageWrapper}>
                <img src={image} alt={title} className={styles.image} />
            </div>
            <div className={styles.content}>
                <h3 className={styles.title}>{title}</h3>
                <button className={styles.priceButton} onClick={onClick}>
                    {price} <span className={styles.arrow}>→</span>
                </button>
            </div>
        </div>
    );
};

export default HomeProductCard;

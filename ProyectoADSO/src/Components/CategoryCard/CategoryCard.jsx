import React from 'react';
import styles from './CategoryCard.module.css';

const CategoryCard = ({ image, title, onClick }) => {
    return (
        <div className={styles.card} onClick={onClick}>
            <div className={styles.imageOverlay}></div>
            <img src={image} alt={title} className={styles.image} />
            <h3 className={styles.title}>{title}</h3>
        </div>
    );
};

export default CategoryCard;

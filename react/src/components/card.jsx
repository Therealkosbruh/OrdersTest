import React from 'react';
import styles from '../css/card.module.css';

export default function Card({ product, onAddToCart }) {
    return (
        <div className={styles.card}>
            <div className={styles.imgBox}>
                <img src={product.img} alt={product.product_name} className={styles.prodImg} />
            </div>
            <div className={styles.contentBox}>
                <h3 className={styles.productTitle}>{product.product_name}</h3>
                <h2 className={styles.price}>{product.product_price} ₽</h2>
                <button className={styles.buy} onClick={() => onAddToCart(product)}>
                    В корзину
                </button>
            </div>
        </div>
    );
}

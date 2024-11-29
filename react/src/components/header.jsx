import React, { useState } from "react";
import styles from "../css/header.module.css";

const Headerr = ({ cartItems = [], onUpdateQuantity, onOrder }) => {
    // Вычисление общей стоимости корзины
    const totalPrice = cartItems.reduce(
        (sum, item) => sum + item.product_price * item.quantity,
        0
    );

    const [isCartOpen, setCartOpen] = useState(false);

    // Обработчик изменения количества товара
    const handleQuantityChange = (id, quantity) => {
        console.log('изменение количества:', id, quantity);
        const parsedQuantity = parseInt(quantity, 10);  // Преобразуем в число
        if (!isNaN(parsedQuantity) && parsedQuantity >= 0) {
            onUpdateQuantity(id, parsedQuantity); // Вызываем функцию обновления
        }
    };

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <button
                    className={styles.cartButton}
                    onClick={() => setCartOpen(!isCartOpen)}
                >
                    <i className="fa fa-shopping-cart"></i>
                    <span className={styles.cartCount}>
                        {cartItems.reduce((count, item) => count + item.quantity, 0)}
                    </span>
                </button>
            </div>
            {isCartOpen && (
                <div className={styles.cartModal}>
                    <div className={styles.cartContent}>
                        <h2>Ваша корзина</h2>
                        <ul className={styles.cartItems}>
                            {cartItems.length === 0 ? (
                                <li>Ваша корзина пуста</li>
                            ) : (
                                cartItems.map((item) => (
                                    <li className={styles.cartItem} key={item.product_id}>
                                        <img
                                            src={item.img}
                                            alt={item.product_name}
                                            className={styles.itemImage}
                                        />
                                        <div className={styles.itemDetails}>
                                            <span className={styles.itemName}>{item.product_name}</span>
                                            <input
                                                type="number"
                                                className={styles.itemQuantity}
                                                value={item.quantity}
                                                onChange={(e) =>
                                                    handleQuantityChange(item.product_id, e.target.value)
                                                }
                                                min="0"  // Не разрешаем отрицательные значения
                                            />
                                            <span className={styles.itemPrice}>
                                                {item.product_price * item.quantity} ₽
                                            </span>
                                        </div>
                                    </li>
                                ))
                            )}
                        </ul>
                        <div className={styles.cartFooter}>
                            <span className={styles.totalPrice}>
                                Итог: {totalPrice} ₽
                            </span>
                            <button className={styles.checkoutButton} onClick={onOrder}>
                                Заказать
                            </button>
                        </div>
                        <button
                            className={styles.closeButton}
                            onClick={() => setCartOpen(false)}
                        >
                            X
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Headerr;


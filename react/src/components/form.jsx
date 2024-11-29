import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "../css/form.module.css";

const Popup = ({ cartItems, onClose }) => {
    const [clientName, setClientName] = useState('');
    const [orderSent, setOrderSent] = useState(false);
    const [orderId, setOrderId] = useState(null); 

    const handleSubmit = async (e) => {
        e.preventDefault();

        const totalPrice = cartItems.reduce((sum, item) => sum + item.product_price * item.quantity, 0);

        const orderData = {
            client_name: clientName,
            total_price: totalPrice,
            products: cartItems.map(item => ({
                product_id: item.product_id,
                price: item.product_price,
            })),
        };

        try {
            const response = await axios.post(
                'http://localhost:8080/api/order/create',
                orderData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true, 
                }
            );

            if (response.data.status === 'success') {
                setOrderSent(true);
                setOrderId(response.data.order_id); 
            } else {
                console.error('Ошибка при оформлении заказа:', response.data);
                alert('Ошибка при оформлении заказа');
            }
        } catch (error) {
            console.error('Ошибка при отправке данных:', error.message);
            alert('Произошла ошибка при отправке данных');
        }
    };

    useEffect(() => {
        if (orderSent) {
            const timer = setTimeout(() => {
                window.location.reload(); 
            }, 5000);
            return () => clearTimeout(timer); 
        }
    }, [orderSent]);

    const handleOkClick = () => {
        window.location.reload(); 
    };

    return (
        <div className={styles.popup}>
            <div className={styles.popupContent}>
                <button className={styles.closeButton} onClick={onClose}>X</button>
                <h2>Оформление заказа</h2>

                {orderSent ? (
                    <div>
                        <h3>Ваш заказ успешно оформлен!</h3>
                        <p>Спасибо за покупку.</p>
                        <p>Номер вашего заказа: {orderId}</p>
                        <button onClick={handleOkClick}>OK</button> 
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>
                                {/* Ваше имя: */}
                                <input
                                    type="text"
                                    id="clientName"
                                    name="client_name" 
                                    placeholder='Ваше имя'
                                    value={clientName}
                                    onChange={(e) => setClientName(e.target.value)}
                                    required
                                />
                            </label>
                        </div>

                        {/* Корзина скрыта сразу и не занимает место */}
                        <div className={styles.hidden}>
                            <h3>Корзина:</h3>
                            <ul>
                                {cartItems.map(item => (
                                    <li key={item.product_id}>
                                        {item.product_name} x {item.quantity} - {item.product_price * item.quantity} ₽
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <button type="submit">Подтвердить заказ</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Popup;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from "../components/card";
import Headerr from "../components/header";
import styles from "../css/main.module.css";
import Popup from '../components/form';

export default function ProductView() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cartItems, setCartItems] = useState([]);
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/products');
                setProducts(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Ошибка при загрузке продуктов:', error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const addToCart = (product) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.product_id === product.product_id);
            if (existingItem) {
                return prevItems.map((item) =>
                    item.product_id === product.product_id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
    };

    const handleUpdateQuantity = (id, quantity) => {
        setCartItems((prevItems) => 
            prevItems.map(item =>
                item.product_id === id ? { ...item, quantity } : item
            )
        );
    };

    const handlePopupClose = () => {
        setIsPopupVisible(false);
    };

    const handleOrder = () => {
        setIsPopupVisible(true);
    };

    if (loading) {
        return <div>Загрузка...</div>;
    }

    return (
        <section>
            <Headerr 
                cartItems={cartItems} 
                onUpdateQuantity={handleUpdateQuantity} 
                onOrder={handleOrder} 
            />
            <div className={styles.title}>
                <h2 className={styles.sectionTitle}>Наш ассортимент</h2>
            </div>
            <div className={styles.productList}>
                {products.map((product) => (
                    <Card key={product.product_id} product={product} onAddToCart={addToCart} />
                ))}
            </div>
            {isPopupVisible && (
                <Popup
                    cartItems={cartItems}
                    onClose={handlePopupClose}
                />
            )}
        </section>
    );
}

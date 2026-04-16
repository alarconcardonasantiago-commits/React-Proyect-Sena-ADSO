import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    // Inicializar carrito desde localStorage si existe
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const [isCartOpen, setIsCartOpen] = useState(false);

    // Sincronizar el estado del carrito con localStorage cada vez que cambie
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    const addToCart = (product) => {
        setCart(prevCart => {
            // Verificar si el producto ya está en el carrito
            const existingItem = prevCart.find(item => item.id_producto === product.id_producto);
            
            if (existingItem) {
                const maxStock = product.stock || product.cantidad || 99;
                // Si existe, incrementamos la cantidad solo si no supera el stock
                if (existingItem.quantity < maxStock) {
                    return prevCart.map(item =>
                        item.id_producto === product.id_producto
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    );
                } else {
                    alert('No hay más stock disponible de este producto.');
                    return prevCart;
                }
            }
            
            // Si no existe, lo agregamos con cantidad 1
            return [...prevCart, { ...product, quantity: 1 }];
        });
        
        // Abrimos el carrito visualmente para darle feedback al usuario
        setIsCartOpen(true);
    };

    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item.id_producto !== productId));
    };

    const updateQuantity = (productId, amount) => {
        setCart(prevCart => {
            return prevCart.map(item => {
                if (item.id_producto === productId) {
                    const newQuantity = item.quantity + amount;
                    const maxStock = item.stock || item.cantidad || 99;
                    // Asegurarse de que esté entre 1 y el stock
                    if (newQuantity >= 1 && newQuantity <= maxStock) {
                        return { ...item, quantity: newQuantity };
                    }
                }
                return item;
            });
        });
    };

    const clearCart = () => {
        setCart([]);
    };

    // Calcular el total a pagar
    const cartTotal = cart.reduce((total, item) => total + (parseFloat(item.precio) * item.quantity), 0);
    // Calcular conteo total de items (sumatoria de cantidades)
    const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            cartTotal,
            cartCount,
            isCartOpen,
            toggleCart,
            setIsCartOpen
        }}>
            {children}
        </CartContext.Provider>
    );
};

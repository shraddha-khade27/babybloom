import { createContext, useState, useEffect, useContext } from 'react';

const StoreContext = createContext();

export const useStore = () => useContext(StoreContext);

export const StoreProvider = ({ children }) => {
    // Initialize state from localStorage if available
    const [cartItems, setCartItems] = useState(() => {
        const localData = localStorage.getItem('babybloom_cart');
        return localData ? JSON.parse(localData) : [];
    });

    const [wishlistItems, setWishlistItems] = useState(() => {
        const localData = localStorage.getItem('babybloom_wishlist');
        return localData ? JSON.parse(localData) : [];
    });

    const [userInfo, setUserInfo] = useState(() => {
        const localData = localStorage.getItem('userInfo');
        return localData ? JSON.parse(localData) : null;
    });

    // Sync to localStorage whenever state changes
    useEffect(() => {
        localStorage.setItem('babybloom_cart', JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        localStorage.setItem('babybloom_wishlist', JSON.stringify(wishlistItems));
    }, [wishlistItems]);

    useEffect(() => {
        if (userInfo) {
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
        } else {
            localStorage.removeItem('userInfo');
        }
    }, [userInfo]);

    // Cart Functions
    const addToCart = (product, quantity = 1) => {
        setCartItems(prev => {
            const existingKey = prev.findIndex(item => (item._id || item.id) === (product._id || product.id));
            if (existingKey >= 0) {
                // Product already in cart, update quantity
                const newCart = [...prev];
                newCart[existingKey].quantity += quantity;
                return newCart;
            } else {
                // Add new product
                return [...prev, { ...product, quantity }];
            }
        });
    };

    const removeFromCart = (productId) => {
        setCartItems(prev => prev.filter(item => (item._id || item.id) !== productId));
    };

    const updateCartQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) return;
        setCartItems(prev => prev.map(item =>
            (item._id || item.id) === productId ? { ...item, quantity: newQuantity } : item
        ));
    };

    const clearCart = () => setCartItems([]);

    // Wishlist Functions
    const addToWishlist = (product) => {
        setWishlistItems(prev => {
            if (!prev.find(item => (item._id || item.id) === (product._id || product.id))) {
                return [...prev, product];
            }
            return prev;
        });
    };

    const removeFromWishlist = (productId) => {
        setWishlistItems(prev => prev.filter(item => (item._id || item.id) !== productId));
    };

    const toggleWishlist = (product) => {
        const exists = wishlistItems.some(item => (item._id || item.id) === (product._id || product.id));
        if (exists) {
            removeFromWishlist(product._id || product.id);
        } else {
            addToWishlist(product);
        }
    };

    // Derived Values
    const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);
    const wishlistCount = wishlistItems.length;

    const value = {
        cartItems,
        wishlistItems,
        userInfo,
        setUserInfo,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        cartTotal,
        cartCount,
        wishlistCount,
    };

    return (
        <StoreContext.Provider value={value}>
            {children}
        </StoreContext.Provider>
    );
};

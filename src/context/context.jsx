import React, { useState, useEffect } from "react";
import { ProductsData } from "../data";

const Context = React.createContext();

function ContextProvider({ children }) {
  const [allProducts, setAllProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("productFavorites")) || []
  );
  const [cartTotal, setCartTotal] = useState(0);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortBy, setSortBy] = useState("falling");

  const url = "https://fakestoreapi.com/products";
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const dataWithNewPrice = data.map((product) => ({
          ...product,
          price: (product.price * 10).toFixed(2),
        }));
        setAllProducts([...dataWithNewPrice]);
      });
  }, []);

  useEffect(() => {
    JSON.parse(localStorage.getItem("productFavorites"));
  }, [favorites]);

  function saveToLocalStorage(products) {
    localStorage.setItem("productFavorites", JSON.stringify(products));
  }
  function addToFavorites(product) {
    const newFavorites = [...favorites, product];
    if (!favorites.includes(product)) {
      setFavorites(newFavorites);
      saveToLocalStorage(newFavorites);
    }
  }
  function removeFromFavorites(id) {
    const newFavorites = favorites.filter((favorite) => favorite.id !== id);
    setFavorites(newFavorites);
    saveToLocalStorage(newFavorites);
  }

  function addItemToCart(newItem) {
    const existingItemInCart = cartItems.find(
      (cartItem) => cartItem.id === newItem.id
    );
    if (existingItemInCart) {
      return cartItems.map((cartItem) =>
        cartItem.id === newItem.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    }

    return [...cartItems, { ...newItem, quantity: 1 }];
  }

  function addToCart(newItem) {
    setCartItems(addItemToCart(newItem));
  }

  function removeItemFromCart(id) {
    const existingItemInCart = cartItems.find((cartItem) => cartItem.id === id);
    if (existingItemInCart.quantity === 1) {
      return cartItems.filter((cartItem) => cartItem.id !== id);
    } else {
      return cartItems.map((cartItem) =>
        cartItem.id === id
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      );
    }
  }

  function removeFromCart(id) {
    setCartItems(removeItemFromCart(id));
  }

  function filteredProductsBySearch(searchTerm) {
    const filteredProducts = allProducts.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filteredProducts);
  }

  function clearItemFromCart(id) {
    const newCartItems = cartItems.filter((cartItem) => cartItem.id !== id);
    setCartItems(newCartItems);
  }

  function sortProducts(productsArray) {
    if (sortBy === "rising") {
      return productsArray.sort(
        (productA, productB) => productA.price - productB.price
      );
    } else if (sortBy === "falling") {
      return productsArray.sort(
        (productA, productB) => productB.price - productA.price
      );
    } else if (sortBy === "rating") {
      return productsArray.sort(
        (productA, productB) => productB.rating.rate - productA.rating.rate
      );
    }
  }

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);

  const value = {
    allProducts,
    filteredProductsBySearch,
    filteredProducts,
    favorites,
    addToFavorites,
    removeFromFavorites,
    cartItems,
    addToCart,
    removeFromCart,
    cartTotal,
    clearItemFromCart,
    sortProducts,
    setSortBy,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export { ContextProvider, Context };

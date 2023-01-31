import React, { useState, useEffect } from "react";

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

  //https://fakestoreapi.com/products
  const url = "https://shopzone-server.onrender.com/products";
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // const dataWithNewPrice = data.map((product) => ({
        //   ...product,
        //   price: (product.price * 10).toFixed(2),
        // }));
        setAllProducts(data);
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
    const newFavorites = favorites.filter((favorite) => favorite._id !== id);
    setFavorites(newFavorites);
    saveToLocalStorage(newFavorites);
  }

  function addItemToCart(newItem) {
    const existingItemInCart = cartItems.find(
      (cartItem) => cartItem._id === newItem._id
    );
    if (existingItemInCart) {
      return cartItems.map((cartItem) =>
        cartItem._id === newItem._id
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
    const existingItemInCart = cartItems.find(
      (cartItem) => cartItem._id === id
    );
    if (existingItemInCart.quantity === 1) {
      return cartItems.filter((cartItem) => cartItem._id !== id);
    } else {
      return cartItems.map((cartItem) =>
        cartItem._id === id
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      );
    }
  }

  function removeFromCart(id) {
    setCartItems(removeItemFromCart(id));
  }

  function filteredProductsBySearch(searchTerm) {
    const filteredProducts = allProducts.filter((product) => {
      const name =
        product.title.toLowerCase() || product.description.toLowerCase;
      return name.includes(searchTerm.toLowerCase());
    });
    setFilteredProducts(filteredProducts);
  }

  function clearItemFromCart(id) {
    const newCartItems = cartItems.filter((cartItem) => cartItem._id !== id);
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
    setCartItems,
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

import React, {useState, useEffect} from "react"

const Context = React.createContext()

function ContextProvider({children}) {
    const [allProducts, setAllProducts] = useState([])
    const [cartItems, setCartItems] = useState([])
    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem("productFavorites")) || [])
    const [cartTotal, setCartTotal] = useState(0)
    // const [categories, setCategories] = useState({
    //     mens: [],
    //     womens: [],
    //     jewelery: [],
    //     electronics: []
    // })
    // const [mensCategory, setMensCategory] = useState([])
    // const [womensCategory, setWomensCategory] = useState([])
    // const [jeweleryCategory, setJeweleryCategory] = useState([])
    // const [electronicsCategory, setElectronicsCategory] = useState([])
    
    const url = "https://fakestoreapi.com/products"
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                // const products = data.map((item, i) => ({...item, id: item.id.toString(), isFavorite: false})
                // )
                setAllProducts(data)})
    }, [])
    
    // console.log(categories)
    // useEffect(() => {
    //     fetch(`https://fakestoreapi.com/products/category/${category}`)
    //         .then(res=>res.json())
    //         .then(data=>console.log(data))
    // })
    
   
    
    useEffect(()=> {
        JSON.parse(localStorage.getItem("productFavorites"))
    })
    const menCategory = allProducts.filter(product => product.category === "men's clothing")
    const womenCategory = allProducts.filter(product => product.category === "women's clothing")
    const jewelCategory = allProducts.filter(product => product.category === "jewelery")
    const electronicCategory = allProducts.filter(product => product.category === "electronics")
    
    
   
  //  useEffect(() => {
  //      const {mens, womens, jewelery, electronic} = categories
  //       setCategories({...categories, mens: menCategory})
        
  //       setCategories({...categories, womens: womenCategory})
        
  //       setCategories({...categories, jewelery: jewelCategory})
        
  //       setCategories({...categories, electronics: electronicCategory})   
  //  }, [])

  //  console.log(categories.mens)
   
   
  //  console.log(categories.mens)
   
    function saveToLocalStorage(products){
        localStorage.setItem("productFavorites", JSON.stringify(products))
    }
    function addToFavorites(product){
        const newFavorites = [...favorites, product]
        if(!favorites.includes(product)){
          setFavorites(newFavorites)
          saveToLocalStorage(newFavorites)
        }
        
    }
    function removeFromFavorites(id){
        const newFavorites = favorites.filter(favorite => favorite.id !== id)
        setFavorites(newFavorites)
        saveToLocalStorage(newFavorites)
    }
    //console.log(allProducts)
    
    function addItemToCart(newItem){
        const existingItemInCart = cartItems.find(cartItem => cartItem.id === newItem.id)
        if(existingItemInCart){
            return cartItems.map(cartItem => cartItem.id === newItem.id ?
             {...cartItem, quantity: cartItem.quantity + 1} 
            :  cartItem
            )
        }
        
        return[...cartItems, {...newItem, quantity: 1}]
    }
    
    function addToCart(newItem){
        setCartItems(addItemToCart(newItem))
    }
     
     
     function removeItemFromCart(id){
         const existingItemInCart = cartItems.find(cartItem => cartItem.id === id)
         if(existingItemInCart.quantity === 1){
            return cartItems.filter(cartItem => cartItem.id !== id)
        } else{
            return cartItems.map(cartItem => cartItem.id === id ?
            {...cartItem, quantity: cartItem.quantity - 1} 
            :  cartItem
            )
        }
     }
     
     function removeFromCart(id){
         setCartItems(removeItemFromCart(id))
       
     }
     
     function clearItemFromCart(id){
         const newCartItems = cartItems.filter(cartItem => cartItem.id !== id)
         setCartItems(newCartItems)
     }
     
     useEffect(() => {
         const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0)
         setCartTotal(newCartTotal)
     }, [cartItems])
    
    
    // function emptyCart() {
    //     setCartItems([])
    // }
    return (
        <Context.Provider value={{allProducts, favorites, addToFavorites, removeFromFavorites, cartItems, addToCart, removeFromCart, cartTotal, clearItemFromCart}}>
            {children}
        </Context.Provider>
    )
}    
    
export {ContextProvider, Context}
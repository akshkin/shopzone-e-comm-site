import { useState, useEffect, useContext } from "react"
import { useParams, Outlet} from "react-router-dom"
import Product from "../../components/product/product.component"
import  {Context} from "../../context/context"
import { CategoryContainer } from "./category.style"


function Category(){       
  const {category} = useParams()
  const {allProducts}= useContext(Context)
  const [products, setProducts] = useState([])

  
  useEffect(() => {
    const categories = {
      mens: mensCategory,
      womens: womensCategory,
      jewelery: jeweleryCategory,
      electronics: electronicsCategory
    }
    setProducts(categories[category])
  }, [category, allProducts])

  const mensCategory = allProducts.filter(product => product.category === "men's clothing")
  const womensCategory = allProducts.filter(product => product.category === "women's clothing")
  const jeweleryCategory = allProducts.filter(product => product.category === "jewelery")
  const electronicsCategory = allProducts.filter(product => product.category === "electronics")

  
 
   return (
    <>
    <h2>{category.toUpperCase()}</h2>
    <CategoryContainer>
        { products && 
            products.map(product => {
                return (
                    <Product key={product.id} product={product} />
                )
        })
        }
     </CategoryContainer>
     <Outlet />     
    </>
   ) 
}

export default Category
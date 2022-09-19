import  {useContext} from "react"
import {Context} from "../../context/context"
import Product from "../../components/product/product.component"

function Products() {
    const {allProducts} = useContext(Context)
    const productElements = allProducts.map(product => <Product key={product.id} product={product}/>)
    return (
        <main className="products">
            {productElements}
        </main>
    )
}

export default Products
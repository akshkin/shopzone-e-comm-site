import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import Product from '../../components/product/product.component'
import { Context } from '../../context/context'

function SearchPage() {
  const { query } = useParams()
  const { filteredProducts } = useContext(Context)
  //console.log(searchTerm)

  return (
    <>
      <h2>Showing results for {query}</h2>
      <div>
        {filteredProducts.map(product => <Product product={product}/>)}
      </div>
    </>
  )
}

export default SearchPage
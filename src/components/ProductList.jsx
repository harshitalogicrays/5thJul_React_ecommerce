import React from 'react'
import ProductItem from './ProductItem'

const ProductList = ({products}) => {
  return (
    <>
      {products.length==0 && <h1>No product Found</h1>}
  <div className='container'>
      <div className='row my-2'>
              {products.map((product,i)=><ProductItem key={i} product={product}/>)}
      </div>
      </div>
    </>
  )
}

export default ProductList

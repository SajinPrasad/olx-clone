import React, { createContext, useState } from 'react'
import Posts from '../Components/Posts/Posts'
import View from '../Components/View/View'


export const ProductContext = createContext(null)

const ProductProvider = ({children}) => {
    const [productInfo, setProductInfo] = useState(null)
  return (
    <div>
      <ProductContext.Provider value={{productInfo, setProductInfo}}>
        {children}
      </ProductContext.Provider>
    </div>
  )
}

export default ProductProvider

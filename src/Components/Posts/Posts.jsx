import React, { useContext, useEffect, useState } from 'react';

import Heart from '../../assets/Heart';
import './Post.css';
import { getProducts } from '../../Firebase/Config';
import { ProductContext } from '../../contexts/productContext';
import { useNavigate } from 'react-router-dom';

function Posts() {
  const [products, setProducts] = useState([])
  const {setProductInfo} = useContext(ProductContext)
  const navigate = useNavigate()

  useEffect(() => {
    const productsFetched = getProducts()
    productsFetched.then((response) => {
      setProducts(response)
    })
  }, [])

  return (
    <div className="postParentDiv">
      {/* <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        {
          products.map((product) => {
            return (
              <div className="cards" key={product.id}>
                <div className="card">
                  <div className="favorite">
                    <Heart></Heart>
                  </div>
                  <div className="image">
                    <img src={product.imageUrl} alt="" />
                  </div>
                  <div className="content">
                    <p className="rate">&#x20B9; {product.price}</p>
                    <span className="kilometer">{product.category}</span>
                    <p className="name">{product.name}</p>
                  </div>
                  <div className="date">
                    <span>{product.createdAt}</span>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div> */}

      <div className="heading">
        <span>Fresh recommendations</span>
      </div>
      <div className="recommendations">
        {
          products.map((product) => {
            return (
              <div key={product.id}
                onClick={() => {
                  localStorage.setItem('product', JSON.stringify(product));
                  setProductInfo(product)
                  navigate('/view')
                }}>
                <div className="card">
                  <div className="favorite">
                    <Heart></Heart>
                  </div>
                  <div className="image">
                    <img src={product.imageUrl} alt="" />
                  </div>
                  <div className="content">
                    <p className="rate">&#x20B9; {product.price}</p>
                    <span className="kilometer">{product.category}</span>
                    <p className="name">{product.name}</p>
                  </div>
                  <div className="date">
                    <span>{product.createdAt}</span>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default Posts;

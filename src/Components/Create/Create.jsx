import React, { Fragment, useContext, useEffect, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { UserContext } from '../../contexts/userProvider';
import { useNavigate } from 'react-router-dom';
import { productUpload } from '../../Firebase/Config';

const Create = () => {
  const [productName, setProductName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState(null)
  const navigagte = useNavigate()
  const {user} = useContext(UserContext)

  useEffect(() => {
    if (!user) {
      navigagte('/login')
    }
  }, [])

  const handleSubmit = async () => {
    if (!user) {
      navigagte('/login')
      return
    } else {
        const productUploaded = await productUpload(image, productName, category, price, user)
        if (productUploaded) {
          navigagte('/')
        }
    }
  }

  return (
    <Fragment>
      <Header />
        <div className="centerDiv">
            <label >Name</label>
            <br />
            <input
              className="input"
              type="text"
              name="Name"
              value={productName}
              onChange={(e) => {setProductName(e.target.value)}}
            />
            <br />
            <label>Category</label>
            <br />
            <input
              className="input"
              type="text"
              name="category"
              value={category}
              onChange={(e) => {setCategory(e.target.value)}}
            />
            <br />
            <label >Price</label>
            <br />
            <input 
            className="input" 
            type="number" 
            name="Price" 
            value={price}
              onChange={(e) => {setPrice(e.target.value)}} />
            <br />
            <br />
            <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image):''}></img>
            <br />
            <input onChange={(e) => {setImage(e.target.files[0])}} type="file" />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
        </div>
    </Fragment>
  );
};

export default Create;

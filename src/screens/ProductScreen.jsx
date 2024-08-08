import React, { useEffect, useState } from 'react'
import style from '../style/productScreen.module.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function ProductScreen() {

    const navigate = useNavigate();

    const [response, setResponse] = useState([])

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/v1/product/')
            .then(function (response) {
                setResponse(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
            });
    }, [])


    return (
        <div className={style.productScreen}>
            {
                response.map((item, index) =>
                    <div className={style.productCard} key={index} onClick={() => navigate(`/dashboard/products/${item.id}`)}>
                        <p>{item.ProductID}</p>
                        <p>{item.ProductCode}</p>
                        <p>{item.ProductName}</p>
                        <p>{item.TotalStock}</p>
                    </div>
                )
            }
            <div className={style.createButton} onClick={() => navigate('/dashboard/products/create')}>
                <FontAwesomeIcon icon={faPlus} />
            </div>
        </div>
    )
}

export default ProductScreen
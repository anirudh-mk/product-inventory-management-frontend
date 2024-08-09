import React, { useEffect, useState } from 'react'
import style from '../style/productScreen.module.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function ProductScreen() {

    const navigate = useNavigate();

    const [response, setResponse] = useState([])
    const [page, setPage] = useState(1)
    const [pageCount, setPageCount] = useState()

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');

        axios.get(`http://127.0.0.1:8000/api/v1/product/?page=${page}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(function (response) {
                setResponse(response.data.response)
                setPageCount(response.data.pages)
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
            });
    }, [page])


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
            <button onClick={() => setPage(page - 1)} disabled={page === 1}>previous</button>

            <button onClick={() => setPage(page + 1)} disabled={page === pageCount}>next</button>

            <div className={style.createButton} onClick={() => navigate('/dashboard/products/create')}>
                <FontAwesomeIcon icon={faPlus} />
            </div>
        </div>
    )
}

export default ProductScreen

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import style from '../style/productDetailsScreen.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

function ProductDetailsScreen() {

    const navigate = useNavigate();
    const { id } = useParams();
    const [response, setResponse] = useState({});

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        axios.get(`${import.meta.env.VITE_SERVER}/product/${id}/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(function (response) {
                setResponse(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [id]);

    return (
        <div>
            <div className={style.topContainer}>
                <img src="" alt="" />
                <div>
                    <h2>{response.ProductName}</h2>
                    <p>Id: {response.ProductID}</p>
                    <p>Code: {response.ProductCode}</p>
                    <p>Created Date: {response.CreatedDate ? format(new Date(response.CreatedDate), 'yyyy-MM-dd') : 'None'}</p>
                    <p>Updated Date: {response.UpdatedDate ? format(new Date(response.UpdatedDate), 'yyyy-MM-dd') : 'None'}</p>
                    <p>Is Favourite: {response.IsFavourite ? response.IsFavourite : 'None'}</p>
                    <p>HSN Code: {response.HSNCode ? response.HSNCode : 'None'}</p>
                    <p>Total Stock: {response.TotalStock}</p>
                </div>
            </div>
            <div className={style.bottomContainer}>
                {response.variants && response.variants.length > 0 ? (
                    response.variants.map((variant, variantIndex) => (
                        <div key={variantIndex} className={style.card}>
                            <h3>{variant.name}</h3>
                            {variant.sub_variants.map((subVariant, subVariantIndex) => (
                                <div key={subVariantIndex}>
                                    <p>{subVariant.options}</p>
                                </div>
                            ))}
                        </div>
                    ))
                ) : (
                    <p>No variants available</p>
                )}
                <div className={style.createCard} onClick={() => navigate(`create/${response.id}`)}>
                    <FontAwesomeIcon icon={faPlus} />
                </div>
            </div>
        </div>
    );
}

export default ProductDetailsScreen;

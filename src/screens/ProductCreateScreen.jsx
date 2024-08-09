import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import style from '../style/productCreateScreen.module.css'

const ProductCreateScreen = () => {

    const navigate = useNavigate();

    const [product, setProduct] = useState({
        ProductID: '',
        ProductCode: '',
        ProductName: '',
        CreatedUser: '',
        IsFavourite: false,
        Active: false,
        HSNCode: '',
        TotalStock: '',
        variants: [
            {
                name: '',
                options: ['']
            }
        ]
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct(prevProduct => ({
            ...prevProduct,
            [name]: value
        }));
    };

    const handleBooleanChange = (name) => {
        setProduct(prevProduct => ({
            ...prevProduct,
            [name]: !prevProduct[name]
        }));
    };

    const handleVariantChange = (index, e) => {
        const { name, value } = e.target;
        const updatedVariants = product.variants.map((variant, i) =>
            i === index ? { ...variant, [name]: value } : variant
        );
        setProduct(prevProduct => ({
            ...prevProduct,
            variants: updatedVariants
        }));
    };

    const handleOptionChange = (variantIndex, optionIndex, value) => {
        const updatedVariants = product.variants.map((variant, i) =>
            i === variantIndex ? {
                ...variant,
                options: variant.options.map((opt, j) => j === optionIndex ? value : opt)
            } : variant
        );
        setProduct(prevProduct => ({
            ...prevProduct,
            variants: updatedVariants
        }));
    };

    const removeOption = (variantIndex, optionIndex) => {
        const updatedVariants = product.variants.map((variant, i) =>
            i === variantIndex ? {
                ...variant,
                options: variant.options.filter((_, j) => j !== optionIndex)
            } : variant
        );
        setProduct(prevProduct => ({
            ...prevProduct,
            variants: updatedVariants
        }));
    };

    const addOption = (variantIndex) => {
        const updatedVariants = product.variants.map((variant, i) =>
            i === variantIndex ? { ...variant, options: [...variant.options, ''] } : variant
        );
        setProduct(prevProduct => ({
            ...prevProduct,
            variants: updatedVariants
        }));
    };

    const removeVariant = (index) => {
        const updatedVariants = product.variants.filter((_, i) => i !== index);
        setProduct(prevProduct => ({
            ...prevProduct,
            variants: updatedVariants
        }));
    };

    const addVariant = () => {
        setProduct(prevProduct => ({
            ...prevProduct,
            variants: [...prevProduct.variants, { name: '', options: [''] }]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const jsonProduct = JSON.stringify(product);

        const accessToken = localStorage.getItem('accessToken');

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/v1/product/', jsonProduct, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            navigate(-1)
            setErrors({});
        } catch (error) {
            if (error.response && error.response.data) {
                setErrors(error.response.data);
            } else {
                console.error('Error:', error);
            }
        }
    };

    return (
        <div className={style.productCreateScreen}>
            <div className={style.card}>
                <form onSubmit={handleSubmit}>
                    <div className={style.container}>
                        <div className={style.inputs}>
                            <div>
                                <p>Product Id</p>
                                <input
                                    type="text"
                                    name="ProductID"
                                    value={product.ProductID}
                                    onChange={handleInputChange}
                                />
                                {errors.ProductID && <p className={style.error}>{errors.ProductID.join(', ')}</p>}
                            </div>
                            <div>
                                <p>Product Code</p>
                                <input
                                    type="text"
                                    name="ProductCode"
                                    value={product.ProductCode}
                                    onChange={handleInputChange}
                                />
                                {errors.ProductCode && <p className={style.error}>{errors.ProductCode.join(', ')}</p>}
                            </div>
                        </div>
                        <div className={style.inputs}>
                            <div>
                                <p>Product Name</p>
                                <input
                                    type="text"
                                    name="ProductName"
                                    value={product.ProductName}
                                    onChange={handleInputChange}
                                />
                                {errors.ProductName && <p className={style.error}>{errors.ProductName.join(', ')}</p>}
                            </div>
                            <div>
                                <p>Created User</p>
                                <input
                                    type="text"
                                    name="CreatedUser"
                                    value={product.CreatedUser}
                                    onChange={handleInputChange}
                                />
                                {errors.CreatedUser && <p className={style.error}>{errors.CreatedUser.join(', ')}</p>}
                            </div>
                        </div>
                        <div >
                            <div className={style.checkbox}>
                                <input
                                    type="checkbox"
                                    checked={product.IsFavourite}
                                    onChange={() => handleBooleanChange('IsFavourite')}
                                />
                                <p>Is Favorite</p>
                            </div>
                            <div className={style.checkbox}>
                                <input
                                    type="checkbox"
                                    checked={product.Active}
                                    onChange={() => handleBooleanChange('Active')}
                                />
                                <p>Active</p>
                            </div>
                        </div>
                        <div className={style.inputs}>
                            <div>
                                <p>HSN Code</p>
                                <input
                                    type="text"
                                    name="HSNCode"
                                    value={product.HSNCode}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div>
                                <p>Total Stock</p>
                                <input
                                    type="text"
                                    name="TotalStock"
                                    value={product.TotalStock}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        {product.variants.map((variant, variantIndex) => (
                            <div key={variantIndex} className={style.variant}>
                                <p>Variant</p>
                                <input
                                    type="text"
                                    name="name"
                                    value={variant.name}
                                    onChange={(e) => handleVariantChange(variantIndex, e)}
                                />
                                {errors.variants && errors.variants[variantIndex] && (
                                    <>
                                        {errors.variants[variantIndex].name && <p className={style.error}>{errors.variants[variantIndex].name.join(', ')}</p>}
                                        {errors.variants[variantIndex].options && (
                                            Array.isArray(errors.variants[variantIndex].options)
                                                ? <p className={style.error}>{errors.variants[variantIndex].options.join(', ')}</p>
                                                : ''
                                        )}
                                    </>
                                )}
                                {variant.options.map((option, optionIndex) => (
                                    <div key={optionIndex} className={style.options}>
                                        <input
                                            type="text"
                                            value={option}
                                            onChange={(e) => handleOptionChange(variantIndex, optionIndex, e.target.value)}
                                            placeholder={`Option ${optionIndex + 1}`}
                                        />
                                        <p className={style.close} onClick={() => removeOption(variantIndex, optionIndex)}>x</p>
                                    </div>
                                ))}
                                <button type="button" onClick={() => addOption(variantIndex)}>Add Option</button>
                                <button type="button" onClick={() => removeVariant(variantIndex)}>Remove Variant</button>
                            </div>
                        ))}
                        <button type="button" onClick={addVariant}>Add Variant</button>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default ProductCreateScreen;

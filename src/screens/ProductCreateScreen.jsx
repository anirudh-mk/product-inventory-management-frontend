import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductForm = () => {

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

        // Convert product data to JSON
        const jsonProduct = JSON.stringify(product);

        // Get access token from local storage
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
        <form onSubmit={handleSubmit}>
            <div>
                <input
                    type="text"
                    name="ProductID"
                    value={product.ProductID}
                    onChange={handleInputChange}
                    placeholder="Product ID"
                />
                {errors.ProductID && <span className="error">{errors.ProductID.join(', ')}</span>}
            </div>
            <div>
                <input
                    type="text"
                    name="ProductCode"
                    value={product.ProductCode}
                    onChange={handleInputChange}
                    placeholder="Product Code"
                />
                {errors.ProductCode && <span className="error">{errors.ProductCode.join(', ')}</span>}
            </div>
            <div>
                <input
                    type="text"
                    name="ProductName"
                    value={product.ProductName}
                    onChange={handleInputChange}
                    placeholder="Product Name"
                />
                {errors.ProductName && <span className="error">{errors.ProductName.join(', ')}</span>}
            </div>
            <div>
                <input
                    type="text"
                    name="CreatedUser"
                    value={product.CreatedUser}
                    onChange={handleInputChange}
                    placeholder="Created User"
                />
                {errors.CreatedUser && <span className="error">{errors.CreatedUser.join(', ')}</span>}
            </div>
            <div>
                <label>
                    <input
                        type="checkbox"
                        checked={product.IsFavourite}
                        onChange={() => handleBooleanChange('IsFavourite')}
                    />
                    Is Favourite
                </label>
                {errors.IsFavourite && <span className="error">{errors.IsFavourite.join(', ')}</span>}
            </div>
            <div>
                <label>
                    <input
                        type="checkbox"
                        checked={product.Active}
                        onChange={() => handleBooleanChange('Active')}
                    />
                    Active
                </label>
                {errors.Active && <span className="error">{errors.Active.join(', ')}</span>}
            </div>
            <div>
                <input
                    type="text"
                    name="HSNCode"
                    value={product.HSNCode}
                    onChange={handleInputChange}
                    placeholder="HSN Code"
                />
                {errors.HSNCode && <span className="error">{errors.HSNCode.join(', ')}</span>}
            </div>
            <div>
                <input
                    type="text"
                    name="TotalStock"
                    value={product.TotalStock}
                    onChange={handleInputChange}
                    placeholder="Total Stock"
                />
                {errors.TotalStock && <span className="error">{errors.TotalStock.join(', ')}</span>}
            </div>

            {product.variants.map((variant, variantIndex) => (
                <div key={variantIndex} className="variant-group">
                    <input
                        type="text"
                        name="name"
                        value={variant.name}
                        onChange={(e) => handleVariantChange(variantIndex, e)}
                        placeholder="Variant Name"
                    />
                    {errors.variants && errors.variants[variantIndex] && (
                        <>
                            {errors.variants[variantIndex].name && <span className="error">{errors.variants[variantIndex].name.join(', ')}</span>}
                            {errors.variants[variantIndex].options && (
                                Array.isArray(errors.variants[variantIndex].options)
                                    ? <span className="error">{errors.variants[variantIndex].options.join(', ')}</span>
                                    : <span className="error">Invalid error format for options</span>
                            )}
                        </>
                    )}
                    {variant.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="option-group">
                            <input
                                type="text"
                                value={option}
                                onChange={(e) => handleOptionChange(variantIndex, optionIndex, e.target.value)}
                                placeholder={`Option ${optionIndex + 1}`}
                            />
                            <button type="button" onClick={() => removeOption(variantIndex, optionIndex)}>Remove</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => addOption(variantIndex)}>Add Option</button>
                    <button type="button" onClick={() => removeVariant(variantIndex)}>Remove Variant</button>
                </div>
            ))}
            <button type="button" onClick={addVariant}>Add Variant</button>
            <button type="submit">Submit</button>
        </form>
    );
};

export default ProductForm;

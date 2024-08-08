import React, { useState } from 'react';

const ProductForm = () => {
    const [product, setProduct] = useState({
        ProductID: '',
        ProductCode: '',
        ProductName: '',
        CreatedUser: '',
        ProductImage: null,
        IsFavourite: '',
        Active: '',
        HSNCode: '',
        TotalStock: '',
        variants: [
            {
                name: '',
                options: ['']
            }
        ]
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct(prevProduct => ({
            ...prevProduct,
            [name]: value
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

    const addVariant = () => {
        setProduct(prevProduct => ({
            ...prevProduct,
            variants: [...prevProduct.variants, { name: '', options: [''] }]
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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(product);
        // Add form submission logic here
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="ProductID"
                value={product.ProductID}
                onChange={handleInputChange}
                placeholder="Product ID"
            />
            <input
                type="text"
                name="ProductCode"
                value={product.ProductCode}
                onChange={handleInputChange}
                placeholder="Product Code"
            />
            <input
                type="text"
                name="ProductName"
                value={product.ProductName}
                onChange={handleInputChange}
                placeholder="Product Name"
            />
            <input
                type="text"
                name="CreatedUser"
                value={product.CreatedUser}
                onChange={handleInputChange}
                placeholder="Created User"
            />
            <input
                type="file"
                name="ProductImage"
                onChange={(e) => setProduct(prevProduct => ({
                    ...prevProduct,
                    ProductImage: e.target.files[0]
                }))}
            />
            <input
                type="text"
                name="IsFavourite"
                value={product.IsFavourite}
                onChange={handleInputChange}
                placeholder="Is Favourite"
            />
            <input
                type="text"
                name="Active"
                value={product.Active}
                onChange={handleInputChange}
                placeholder="Active"
            />
            <input
                type="text"
                name="HSNCode"
                value={product.HSNCode}
                onChange={handleInputChange}
                placeholder="HSN Code"
            />
            <input
                type="text"
                name="TotalStock"
                value={product.TotalStock}
                onChange={handleInputChange}
                placeholder="Total Stock"
            />

            {product.variants.map((variant, variantIndex) => (
                <div key={variantIndex}>
                    <input
                        type="text"
                        name="name"
                        value={variant.name}
                        onChange={(e) => handleVariantChange(variantIndex, e)}
                        placeholder="Variant Name"
                    />
                    {variant.options.map((option, optionIndex) => (
                        <input
                            key={optionIndex}
                            type="text"
                            value={option}
                            onChange={(e) => handleOptionChange(variantIndex, optionIndex, e.target.value)}
                            placeholder={`Option ${optionIndex + 1}`}
                        />
                    ))}
                    <button type="button" onClick={() => addOption(variantIndex)}>Add Option</button>
                </div>
            ))}
            <button type="button" onClick={addVariant}>Add Variant</button>
            <button type="submit">Submit</button>
        </form>
    );
};

export default ProductForm;

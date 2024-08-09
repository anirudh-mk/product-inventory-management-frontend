import axios from 'axios';
import React, { useState } from 'react'


function StockCreateScreen() {
    const [product, setProduct] = useState('');
    const [name, setName] = useState('');
    const [options, setOptions] = useState([]);

    const handleOptionChange = (index, event) => {
        const newOptions = [...options];
        newOptions[index] = event.target.value;
        setOptions(newOptions);
    };

    const addOptionField = () => {
        setOptions([...options, '']);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = {
            product,
            name,
            options,
        };

        try {
            const response = await axios.post('/your-api-endpoint', formData);
            console.log('Form submitted successfully:', response.data);
        } catch (error) {
            console.error('Error submitting the form:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Product ID:</label>
                <input
                    type="text"
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                />
            </div>
            <div>
                <label>Variant Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <label>Options:</label>
                {options.map((option, index) => (
                    <input
                        key={index}
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(index, e)}
                    />
                ))}
                <button type="button" onClick={addOptionField}>
                    Add Option
                </button>
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default StockCreateScreen
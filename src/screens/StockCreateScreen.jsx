import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import style from '../style/stockCreateScreen.module.css'

function StockCreateScreen() {
    const { productId } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [options, setOptions] = useState(['']);
    const [errors, setErrors] = useState({});  // Add state for errors

    const handleOptionChange = (index, event) => {
        const newOptions = [...options];
        newOptions[index] = event.target.value;
        setOptions(newOptions);
    };

    const addOptionField = () => {
        setOptions([...options, '']);
    };

    const removeOptionField = (index) => {
        const newOptions = options.filter((_, i) => i !== index);
        setOptions(newOptions);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = {
            product: productId,
            name,
            options,
        };

        try {
            const accessToken = localStorage.getItem('accessToken');

            const response = await axios.post('http://127.0.0.1:8000/api/v1/stock/', formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            navigate(-1);

        } catch (error) {
            if (error.response?.data) {
                setErrors(error.response.data);
            }
        }
    };

    return (
        <div className={style.stockScreen}>
            <div className={style.container}>
                <form onSubmit={handleSubmit}>
                    <div>
                        <p>Name</p>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        {errors.name && (
                            <div className={style.error}>
                                {errors.name.map((error, index) => (
                                    <div key={index}><p>{error}</p></div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div>
                        <p>Options</p>
                        {options.map((option, index) => (
                            <div key={index}>
                                <div className={style.options}>
                                    <input
                                        type="text"
                                        value={option}
                                        onChange={(e) => handleOptionChange(index, e)}
                                    />
                                    <p onClick={() => removeOptionField(index)}> x </p>
                                </div>
                                {errors.options && errors.options[index] && (
                                    <div className={style.error}>
                                        {errors.options[index].map((error, errIndex) => (
                                            <div key={errIndex}><p>{error}</p></div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                        <button type="button" onClick={addOptionField}>
                            Add Option
                        </button>
                    </div>
                    <button type="submit" className={style.submit}>Submit</button>
                </form>
            </div>
        </div>

    );
}

export default StockCreateScreen;

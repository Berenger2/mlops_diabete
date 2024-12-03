import React from 'react';

const InputField = ({ name, type, placeholder, value, onChange,disabled }) => (
    <div className="form-group">
        <input
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="form-control"
            disabled={disabled} 

        />
    </div>
);

export default InputField;

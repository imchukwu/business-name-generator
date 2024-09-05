import React, { useState } from 'react';
import './InputForm.css';

const InputForm = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(inputValue);
  };

  return (
    <form className="input-form" onSubmit={handleSubmit}>
      <textarea
        className="input-textarea"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Describe your business idea..."
      />
      <button type="submit" className="submit-button">Generate Names</button>
    </form>
  );
};

export default InputForm;

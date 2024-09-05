import React, { useState } from 'react';
import InputForm from './components/InputForm/InputForm';
import NameList from './components/NameList/NameList';
import LoadingIndicator from './components/LoadingIndicator/LoadingIndicator';
import './App.css';

const App = () => {
  const [names, setNames] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGenerateNames = async (description) => {
    setLoading(true);
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: `Generate 10 creative business names based on the following description: ${description}` }],
          max_tokens: 150,
          temperature: 0.7,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        // Handle specific errors if needed
        throw new Error(`API Error: ${errorData.error.message}`);
      }
  
      const data = await response.json();
      const generatedNames = data.choices[0].message.content.trim().split('\n').slice(0, 10);
      setNames(generatedNames);
    } catch (error) {
      console.error('Error generating names:', error);
      // Show user-friendly error message if needed
    }
    setLoading(false);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Business Name Generator</h1>
      </header>

      <main className="app-main">
        <InputForm onSubmit={handleGenerateNames} />
        {loading ? <LoadingIndicator /> : <NameList names={names} />}
      </main>
    </div>
  );
};

export default App;

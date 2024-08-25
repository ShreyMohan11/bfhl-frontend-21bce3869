import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'numbers', label: 'Numbers' },
    { value: 'highest_lowercase_alphabet', label: 'Highest lowercase alphabet' }
  ];

  useEffect(() => {
    document.title = "YOUR_ROLL_NUMBER"; // Replace with your actual roll number
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResponse(null);

    try {
      const parsedInput = JSON.parse(input);
      const res = await axios.post('http://localhost:5000/bfhl', parsedInput);
      setResponse(res.data);
    } catch (err) {
      setError('Invalid JSON input or API error');
    }
  };

  const renderResponse = () => {
    if (!response) return null;

    return selectedOptions.map(option => (
      <div key={option.value}>
        <h3>{option.label}</h3>
        <p>{JSON.stringify(response[option.value])}</p>
      </div>
    ));
  };

  return (
    <div className="App">
      <h1>BFHL Challenge 21BCE3869</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Enter JSON input (e.g., {"data": ["A","C","z"]})'
        />
        <button type="submit">Submit</button>
      </form>
      {error &&<p className="error">{error}</p>}
      {response && (
        <div>
          <Select
            isMulti
            options={options}
            onChange={setSelectedOptions}
            placeholder="Select options to display"
          />
          {renderResponse()}
        </div>
      )}
    </div>
  );
}

export default App;
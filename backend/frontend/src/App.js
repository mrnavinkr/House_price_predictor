import React, { useState } from 'react';
import Form from './components/Form';
import PredictionChart from './components/PredictionChart';
import background from './assets/background.jpg';

function App() {
  const [prediction, setPrediction] = useState(null);
  const [userInput, setUserInput] = useState(null);
  const [showGraph, setShowGraph] = useState(false);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center">
      {/* Background blur */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-md"
        style={{ backgroundImage: `url(${background})` }}
      ></div>
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-3xl px-4">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          House Price Predictor
        </h1>

        {/* Form container */}
        <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-lg">
          <Form
            onPredict={(predictionValue, inputData) => {
              setPrediction(predictionValue);
              setUserInput(inputData);
              setShowGraph(false);
            }}
          />
        </div>

        {/* Prediction result + Show Graph button */}
        {prediction !== null && (
          <div className="mt-4 text-center">
            <div className="text-xl font-semibold text-white">
              Predicted House Price: ${prediction.toFixed(2)}
            </div>

            <button
              onClick={() => setShowGraph(!showGraph)}
              className="mt-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
            >
              {showGraph ? 'Hide Graph' : 'Show Graph'}
            </button>
          </div>
        )}

        {/* Graph container */}
        {showGraph && prediction !== null && userInput !== null && (
          <div className="mt-6 w-full bg-white bg-opacity-80 p-6 rounded-lg shadow-lg transition-all duration-500 ease-in-out">
            <PredictionChart prediction={prediction} userInput={userInput} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

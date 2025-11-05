import React, { useState } from "react";

const Form = ({ onPredict }) => {
  const [formData, setFormData] = useState({
    MedInc: "",
    HouseAge: "",
    AveRooms: "",
    AveBedrms: "",
    Population: "",
    AveOccup: "",
    Latitude: "",
    Longitude: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      // Prediction + user input dono pass karo
      onPredict(data.prediction, formData);
    } catch (error) {
      alert("⚠️ Backend connection failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      {Object.keys(formData).map((key) => (
        <div key={key}>
          <label className="block text-gray-600 font-medium mb-1">{key}:</label>
          <input
            type="number"
            step="any"
            name={key}
            value={formData[key]}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            required
          />
        </div>
      ))}
      <button
        type="submit"
        disabled={loading}
        className="md:col-span-2 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-300 disabled:bg-gray-400"
      >
        {loading ? "Predicting..." : "Predict"}
      </button>
    </form>
  );
};

export default Form;

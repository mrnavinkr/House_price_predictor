from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import os

app = Flask(__name__)
CORS(app)

# ✅ Load model safely (ensure model.pkl is in same folder)
BASE_DIR = os.path.dirname(__file__)
model_path = os.path.join(BASE_DIR, "model.pkl")

with open(model_path, "rb") as f:
    model = pickle.load(f)

@app.route("/")
def home():
    return "🏠 Flask Backend Running Successfully!"

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    try:
        values = np.array([
            float(data['MedInc']),
            float(data['HouseAge']),
            float(data['AveRooms']),
            float(data['AveBedrms']),
            float(data['Population']),
            float(data['AveOccup']),
            float(data['Latitude']),
            float(data['Longitude'])
        ]).reshape(1, -1)

        prediction = model.predict(values)[0]
        return jsonify({"prediction": round(prediction, 2)})

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    # ✅ Cloud-friendly port handling (fixes “Address already in use” issue)
    port = int(os.environ.get("PORT", 5001))
    app.run(host="0.0.0.0", port=port)

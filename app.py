from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
cors= CORS(app, origins=["*","http://localhost : 3000/"] )
# from config import key
import openai
import os

app = Flask(__name__)

openai.api_key = os.getenv("OPENAI_API_KEY")


@app.route('/generate', methods=['option : cross_origin'])
def generate_image():
    data = request.get_json()
    text = data.get('text')

    if not text:
        return jsonify({"error": "No text provided"}), 400

    try:
        response = openai.Image.create(
            prompt=text,
            n=1,
            size="256x256"
        )
        # print(response)
        image_url = response['data'][0]['url']
        return jsonify({"image_url": image_url})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    
    # app.run(debug=True)
 app.run(host='127.0.0.1', port=5000)
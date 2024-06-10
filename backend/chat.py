from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai

app = Flask(__name__)
CORS(app)


genai.configure(api_key='AIzaSyDPvU7wCXOXkNXKAaKnJpgmohdcEDFjFdA')
model = genai.GenerativeModel('gemini-1.5-flash')

@app.route('/get_recommendation', methods=['POST'])
def recommend_books():
    data = request.get_json()
    
    print(data)
    prompt = data.get('user_input')

    print(prompt)

    try:
        response = model.generate_content(prompt)
        recommendations = response.text.strip()
        print(recommendations)
        return jsonify({'recommendations': recommendations})
    except Exception as e:
        print(f"Error generating recommendations: {e}")
        return jsonify({'error': 'An error occurred during recommendation.'}), 500

if __name__ == '__main__':
    app.run(debug=True)

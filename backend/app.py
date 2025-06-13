from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # enable frontend access

feedback_list = []


@app.route('/feedback', methods=['POST'])
def add_feedback():
    data = request.get_json()
    feedback_list.append({
        'name': data.get('name'),
        'message': data.get('message')
    })
    return jsonify({'message': 'Feedback received'}), 201


@app.route('/feedback', methods=['GET'])
def get_feedback():
    return jsonify(feedback_list)


if __name__ == '__main__':
    app.run(debug=True)
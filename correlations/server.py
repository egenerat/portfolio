from flask import Flask, jsonify
app = Flask(__name__)

@app.route("/")
def api():
    data = {
        'message': 'hello world'
    }
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0')

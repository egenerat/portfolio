from flask import Flask, jsonify, request
from funds_correlations import correlations, parse_performances_from_json_post
app = Flask(__name__)

@app.route("/correlations", methods=['POST'])
def correlation_api():
    req_json = request.get_json()
    print(req_json)
    perf_list = parse_performances_from_json_post(req_json)
    correlations(perf_list)
    data = {
        'correlation': 'OK'
    }
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')

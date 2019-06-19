from flask import Flask, jsonify, request
from funds_correlations import correlations, parse_performances_from_dict
import traceback

app = Flask(__name__)

@app.route("/correlations", methods=['POST'])
def correlation_api():
    req_json = request.get_json()
    perf_list = parse_performances_from_dict(req_json)
    if len(perf_list) < 2:
        return jsonify({
            'error': 'not enough valid data'
        }), 400
    try:
        min_size, limiting = correlations(perf_list)
    except Exception:
        traceback.print_exc()
        return jsonify({
            'error': 'Internal error'
        }), 500

    data = {
        'correlation': 'OK',
        'min_size': min_size,
        'limiting': limiting
    }
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')

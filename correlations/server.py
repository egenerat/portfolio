#!/usr/bin/python3
from flask import Flask, jsonify, request
from funds_correlations import correlations, parse_performances_from_dict
import traceback

app = Flask(__name__)

@app.route("/correlations", methods=['POST'])
def correlation_api():
    try:
        req_json = request.get_json()
        valid_input = True
        perf_list = []
        if req_json:
            perf_list = parse_performances_from_dict(req_json)
            if len(perf_list) < 2:
                valid_input = False
        else:
            valid_input = False
        if not valid_input:
            return jsonify({
                'error': 'not enough valid data'
            }), 400
        corr, min_size, limiting = correlations(perf_list)
        data = {
            'correlations': corr,
            'min_size': min_size,
            'limiting': limiting
        }
        return jsonify(data)
    except Exception:
        traceback.print_exc()
        return jsonify({
            'error': 'Internal error'
        }), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')

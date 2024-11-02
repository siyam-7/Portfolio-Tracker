from flask import Flask, jsonify, request

app = Flask(__name__)

# Sample route
@app.route('/portfolio', methods=['GET'])
def get_portfolio():
    # Mock data; in a real project, you'd get this from an API or database
    portfolio = {
        "stocks": [{"ticker": "AAPL", "shares": 10, "price": 150}],
        "crypto": [{"symbol": "BTC", "amount": 0.5, "price": 30000}],
    }
    return jsonify(portfolio)

if __name__ == '__main__':
    app.run(debug=True)


from flask import Flask, jsonify, request
import yfinance as yf

app = Flask(__name__)

@app.route('/stock/<symbol>', methods=['GET'])
def get_stock_data(symbol):
    try:
        stock = yf.Ticker(symbol)
        data = stock.history(period="1d")
        timestamp = data.index[-1].strftime('%Y-%m-%d %H:%M:%S') 

        response = {
            "symbol": symbol,
            "price": data["Close"].iloc[-1],
            "time-stamp": timestamp
        }
        return jsonify(response)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5001)  # Flask server running on port 5001

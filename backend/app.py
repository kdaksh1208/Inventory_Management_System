from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

# Connect to your existing inventorydb database
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="sneha0306@",  # Your MySQL password
    database="inventorydb"
)

@app.route('/')
def home():
    return "Inventory System Backend Connected Successfully!"

# USERS API
@app.route('/api/users', methods=['GET'])
def get_users():
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM Users")
    users = cursor.fetchall()
    cursor.close()
    return jsonify(users)

# PRODUCTS API
@app.route('/api/products', methods=['GET'])
def get_products():
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM Products")
    products = cursor.fetchall()
    cursor.close()
    return jsonify(products)

@app.route('/api/products', methods=['POST'])
def add_product():
    data = request.json
    query = """INSERT INTO Products (product_name, company_name, device_type, base_price)
               VALUES (%s, %s, %s, %s)"""
    cursor = db.cursor()
    cursor.execute(query, (data['product_name'], data['company_name'], data['device_type'], data['base_price']))
    db.commit()
    cursor.close()
    return jsonify({"message": "Product added successfully!"}), 201

# STOCK API
@app.route('/api/stock', methods=['GET'])
def get_stock():
    cursor = db.cursor(dictionary=True)
    cursor.execute("""
        SELECT s.stock_id, p.product_name, s.quantity, s.price_per_unit,
               s.order_date, s.shipped_date, s.received_date,
               s.warranty_start_date, s.warranty_end_date, s.place_location
        FROM Stock s
        JOIN Products p ON s.product_id = p.product_id;
    """)
    stock = cursor.fetchall()
    cursor.close()
    return jsonify(stock)

# ORDERS API
@app.route('/api/orders', methods=['GET'])
def get_orders():
    cursor = db.cursor(dictionary=True)
    cursor.execute("""
        SELECT o.order_id, u.email AS ordered_by, p.product_name,
               o.order_date, o.delivery_status
        FROM Orders o
        JOIN Stock s ON o.stock_id = s.stock_id
        JOIN Products p ON s.product_id = p.product_id
        JOIN Users u ON o.ordered_by_user_id = u.user_id;
    """)
    orders = cursor.fetchall()
    cursor.close()
    return jsonify(orders)

if __name__ == '__main__':
    app.run(debug=True)

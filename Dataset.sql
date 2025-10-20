CREATE DATABASE IF NOT EXISTS inventorydb;
USE inventorydb;

CREATE TABLE Users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL,
    company_name VARCHAR(100)
);

CREATE TABLE Products (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    company_name VARCHAR(100) NOT NULL,
    device_type VARCHAR(50) NOT NULL,
    base_price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE Stock (
    stock_id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price_per_unit DECIMAL(10, 2) NOT NULL,
    order_date DATE NOT NULL,
    shipped_date DATE NOT NULL,
    received_date DATE NOT NULL,
    warranty_start_date DATE NOT NULL,
    warranty_end_date DATE NOT NULL,
    place_location VARCHAR(100),
    FOREIGN KEY (product_id) REFERENCES Products(product_id) ON DELETE CASCADE
);

CREATE TABLE Orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    stock_id INT NOT NULL,
    ordered_by_user_id INT NOT NULL,
    order_date DATE NOT NULL,
    delivery_status VARCHAR(50),
    FOREIGN KEY (stock_id) REFERENCES Stock(stock_id) ON DELETE CASCADE,
    FOREIGN KEY (ordered_by_user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- TODO: Add your INSERT statements below for Products, Users, Stock, Orders.
-- Example inserts (replace/add your own rows):

INSERT INTO Users (email, password, role, company_name) VALUES
('manu@example.com','password123','manufacturer','ManuCorp'),
('whole@example.com','password123','wholesaler','WholeCorp'),
('retail@example.com','password123','retailer','RetailCorp'),
('cust@example.com','password123','customer','CustomerCorp');

INSERT INTO Products (product_name, company_name, device_type, base_price) VALUES
('Gadget A','ManuCorp','Electronics',599.99),
('Gadget B','ManuCorp','Electronics',399.99);

INSERT INTO Stock (product_id, quantity, price_per_unit, order_date, shipped_date, received_date, warranty_start_date, warranty_end_date, place_location) VALUES
(1, 50, 599.99, '2025-09-10', '2025-09-12', '2025-09-14', '2025-09-14', '2026-09-14', 'Mumbai'),
(2, 30, 399.99, '2025-09-11', '2025-09-13', '2025-09-15', '2025-09-15', '2026-09-15', 'Pune');

INSERT INTO Orders (stock_id, ordered_by_user_id, order_date, delivery_status) VALUES
(1, 3, '2025-09-15', 'delivered'),
(2, 4, '2025-09-16', 'processing');
SHOW DATABASES;


DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL,
  product_name VARCHAR(35) NULL,
  dept_name VARCHAR(25) NULL,
  price DECIMAL(10,2) NULL,
  qoh INT NULL,
  PRIMARY KEY (item_id)
);

SELECT * FROM products;


CREATE TABLE orders (
  order_num INT NOT NULL AUTO_INCREMENT,
  item_id INT NOT NULL,
  product_name VARCHAR(35) NULL,
  dept_name VARCHAR(25) NULL,
  price DECIMAL(10,2) NULL,
  order_qty INT NULL,
  total_sale DECIMAL(10,2) NULL,
  order_timestamp DATE,
  PRIMARY KEY (order_num)
);
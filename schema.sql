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




USE bamazon;
DROP TABLE IF EXISTS orders;
CREATE TABLE orders (
  ord_number INT NOT NULL AUTO_INCREMENT,
  item INT NOT NULL,
  product VARCHAR(35) NULL,
  dept VARCHAR(25) NULL,
  price DECIMAL(10,2) NULL,
  qty INT NULL,
  total_sale DECIMAL(10,2) NULL,
  processed INT,
  PRIMARY KEY (ord_number)
);
USE bamazon;

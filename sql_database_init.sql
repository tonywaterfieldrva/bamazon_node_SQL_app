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


INSERT INTO products (item_id, product_name, dept_name, price, qoh)
VALUES (
    1001,
    "Old Town Canoe",
    "Water Sports",
    599.99,
    140
);
INSERT INTO products (item_id, product_name, dept_name, price, qoh)
VALUES (	
    1002,
    "Vibe Sport 10 Kayak",
    "Water Sports",
    649.99,
    500
);
INSERT INTO products (item_id, product_name, dept_name, price, qoh)
VALUES (
    2001,
    "Penn International 50WT",
    "Fishing Equipment",
    899.99,
    500
);
INSERT INTO products (item_id, product_name, dept_name, price, qoh)
VALUES (
    2002,
    "Shimano LT 50WT",
    "Fishing Equipment",
    599.99,
    1400
);
INSERT INTO products (item_id, product_name, dept_name, price, qoh)
VALUES (
    3001,
    "Scuaba Pro MKII Regulator",
    "Scuba Diving",
    249.99,
    900
);
INSERT INTO products (item_id, product_name, dept_name, price, qoh)
VALUES (
    3002,
    "UWatec TEC2 Dive Computer",
    "Scuba Diving",
    449.99,
    5000
);
INSERT INTO products (item_id, product_name, dept_name, price, qoh)
VALUES (
    4001,
    "Mercury OptiMax II 225HP",
    "Marine Power",
    13599.99,
    30
);
INSERT INTO products (item_id, product_name, dept_name, price, qoh)
VALUES (
    4002,
    "Johnson/Evinrude O/B 225HP",
    "Marine Power",
    15999.99,
    50
);
INSERT INTO products (item_id, product_name, dept_name, price, qoh)
VALUES (
    5001,
    "Sage Elite II Pro",
    "Fly Fishing",
    799.99,
    199
);
INSERT INTO products (item_id, product_name, dept_name, price, qoh)
VALUES (
    5002,
    "Temple Forks Outfitters 8FT 4WT",
    "Fly Fishing",
    299.99,
    89
);

select * from products;


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
select * from orders;
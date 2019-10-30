// npm node packages
var mysql = require("mysql");
var inquirer = require("inquirer");
var moment = require("moment");

// local host/database connection
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon"
});
// startup initial listing of products and run inquirer prompt
connection.connect(function(err) {
  if (err) throw err;
    runList();
});
// list all products and run inquirer prompt
function runList() {
    var query = "SELECT * FROM products";
    connection.query(query, function(err, res) {
      console.table(res);
      orderPrompt();
    });
  

}
// inquirer prompt for item number and quantity
function orderPrompt() {
  inquirer
    .prompt([
      {
        name: "item_id",
        type: "input",
        message: "Please Enter the item_id number to order: ",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "order_qty",
        type: "input",
        message: "Please Enter the order quantity: ",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(answer) {
      connection.query("SELECT * FROM products WHERE ?", { item_id: answer.item_id }, function(err, res) {
      if (err) throw err;
          var ordered = parseInt(answer.order_qty);
          if (res[0].qoh >= ordered) {
              var new_qoh = res[0].qoh - ordered;
              postOrder(answer.item_id, res[0].product_name, res[0].dept_name, res[0].price, ordered, res[0].qoh);

          }
          else {
            console.log("Insufficient Stock....Order Has Been Rejected");
            console.log("Maximum Order quantity: ", res[0].qoh);
            console.log("Please Order Again");
            runList();
          }
      
      });
    });
    
  };

  // inserts order data into orders table.  
function postOrder(item, prodname, deptname, price, ordered, qoh) {

  var saleAmount = (price * ordered);
  var ordTime = moment().format("X");
  

  connection.query(
    "INSERT INTO orders SET ?",
    {
      item: item,
      product: prodname,
      dept: deptname, 
      price: price,
      qty: ordered,
      total_sale: saleAmount,
      processed: ordTime
    },
    function(err) {
      if (err) throw err;
      // console.log("order table updated");
    }
  );
  
  // updates products table qoh after deducting sale qty
  var newboh = (qoh-ordered);  
  var query = "UPDATE products SET qoh = " + newboh + " WHERE item_id = " + item;
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.log(".........Order Details...........");
    runOrder();
  });
}
// selects last record in orders table and provides order data in 2 formats
// console.table dumps the entire table record no formatting to command prompt
// console.log writes selected fields with formatting.  the last field is data and time converted from unix format using moment.js

function runOrder() {
   connection.query("SELECT * FROM orders", function(err, res) {
    if (err) throw err;
      var lastindex = res.length - 1;
      
      var ordertime = moment.unix(res[lastindex].processed).format("YYYY-MM-DD HH:mm");
   console.table(res[lastindex]);
   console.log("Order: " + res[lastindex].ord_number + " | Item#/Desc: " + res[lastindex].item + " " + res[lastindex].product + " | Price: " + res[lastindex].price + " | Qty: " + res[lastindex].qty + " | Sale Amt: " + res[lastindex].total_sale + " | " + ordertime);

   runList();
  });
}
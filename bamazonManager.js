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

listManager();

function listManager() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "Inventory Management Menu for Managers.  Select list item or exit?",
      choices: [
        "View Sale Product Inventory",
        "View Low Inventory Level",
        "Update Inventory Quantity",
        "Add New Sale Product to Inventory",
        "EXIT"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "View Sale Product Inventory": 
      viewProductList();
        break;

      case "View Low Inventory Level":
        viewLowInventory();
        break;

      case "Update Inventory Quantity":
        updateInventoryLevel();
        break;

      case "Add New Sale Product to Inventory":
        addProduct();
        break;

      case "EXIT":
        connection.end();
        break;
      }
    });
}
 
function viewProductList() {
 // console.log("viewProductList function");
    var query = "SELECT * FROM products";
    connection.query(query, function(err, res) {
    if (err) throw err;
    console.table(res);
    listManager();
    });
}

function viewLowInventory() {
 // console.log("viewLowInventory function");
  var query = "SELECT * FROM products WHERE qoh <6";
  connection.query(query, function(err, res) {
  if (err) throw err;
  console.table(res);
  listManager();
  });
};

function updateInventoryLevel() {
//  console.log("updateInventoryLevel function");
  inquirer
    .prompt([
      {
        name: "item_id",
        type: "input",
        message: "Please Enter the item_id number to update: ",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "new_boh",
        type: "input",
        message: "Please Enter the new inventory quantity: ",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(answer) {
    
        var query = "UPDATE products SET qoh = " + answer.new_boh + " WHERE item_id = " + answer.item_id;
        connection.query(query, function(err, res) {
          if (err) throw err;
          console.log("........Inventory Level Updated...........");
          viewProductList();
          listManager();
        });
  });
};

function addProduct() {
inquirer
.prompt([
  {
    name: "item_id",
    type: "input",
    message: "Please Enter the item_id number to add to Inventory: ",
    validate: function(value) {
      if (isNaN(value) === false) {
        return true;
      }
      return false;
    }
  },
  {
    name: "product",
    type: "input",
    message: "Please Enter the Product Name to add: ",
  },
  {
    name: "department",
    type: "input",
    message: "Please Enter the Department: ",

  },
  {
    name: "price",
    type: "input",
    message: "Please Enter the Unit Price of the item: ",
    validate: function(value) {
      if (isNaN(value) === false) {
        return true;
      }
      return false;
    }
  },
  {
    name: "new_boh",
    type: "input",
    message: "Please Enter the inventory quantity: ",
    validate: function(value) {
      if (isNaN(value) === false) {
        return true;
      }
      return false;
    }

  }
])
.then(function(answer) {
  connection.query(
    "INSERT INTO products SET ?",
    {
      item_id: answer.item_id,
      product_name: answer.product,
      dept_name: answer.department, 
      price: answer.price,
      qoh: answer.new_boh
    },
    function(err) {
      if (err) throw err;
      console.log(".......New Product has been added into Inventory");
      viewProductList();
      listManager();
    });
});
};
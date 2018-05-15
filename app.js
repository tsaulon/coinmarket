/***********************************
 * DECLARATIONS
 ***********************************/

var express = require("express");
var request = require("request");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({extended: true}));

//cards to be created in template
var coins = [];

/***********************************
 * ROUTES
 ***********************************/
app.get("/", function(req, res){
    res.render("coin.ejs", {coins: coins});
});

//retrieve form information
app.post("/getCoin", function(req, res){

    var symbol = req.body.formSymbol;

    request("https://api.coinmarketcap.com/v1/ticker/", function(error, response, body){
        //if no error and status is OK
            if(!error && response.statusCode == 200){
                //data returned are not JS objects application must parse JSON data first into JS
                var parsedData = JSON.parse(body);
                //find coin with the same symbol submitted
                for(x in parsedData){
                    if(parsedData[x].symbol == symbol.toUpperCase()){
                        
                        //create object
                        var newCoin = {
                            name: parsedData[x].name,
                            symbol: parsedData[x].symbol,
                            usd: parsedData[x].price_usd,
                            btc: parsedData[x].price_btc
                        };

                        //save coin to list
                            coins.push(newCoin);
                            res.redirect("/");
                    }
                }
            }
        });
});

/***********************************
 * LISTEN
 ***********************************/
 app.listen(3000, function(){
    console.log("Coin server has started!");
 });

 /***********************************
 * CUSTOM FUNCTIONS
 ***********************************/
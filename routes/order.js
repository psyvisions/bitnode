var request = require('request');
var _und = require('underscore');

/* Get orders listing. */
exports.list = function(req, res){
    var results = {
        orders: [],
        bitStampOrders: [],
        btceOrders: []
    };

    request('https://www.bitstamp.net/api/transactions/', function(error, response, body){
        if(!error && response.statusCode == 200) {
            results.bitStampOrders = body;
        }

        request('https://btc-e.com/api/2/btc_usd/trades', function(error, response, body) {
            if(!error && response.statusCode == 200) {
                results.btceOrders = body;
            }

            console.log(results);
            res.send(results);
        });
    });
};

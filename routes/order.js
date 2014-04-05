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
            results.bitStampOrders = JSON.parse(body);
        }

        request('https://btc-e.com/api/2/btc_usd/trades', function(error, response, body) {
            if(!error && response.statusCode == 200) {
                results.btceOrders = JSON.parse(body);
            }
            
            var combinedOrders = _und.map(results.bitStampOrders, function(order){
                return { 
                    time: order.date, 
                    quantity: order.amount, 
                    price: order.price,
                    exchange: 'bitstamp.net'
                };
            }) + _und.map(results.btceOrders, function(order){
                return {
                    time: order.date,
                    quantity: order.amount,
                    price: order.price,
                    exchange: 'btc-e.com'
                };
            });
            console.log(combinedOrders[0].time);
            var sortedCombinedOrders = _und.sortBy(combinedOrders, function(order){ return -1 * order.date; });
            results.orders = _und.first(sortedCombinedOrders, 10);
            //console.log(results);
            res.send(results);
        });
    });
};

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
            
            var mappedBitStampOrders = _und.map(results.bitStampOrders, function(order){
                return { 
                    time: order.date, 
                    quantity: order.amount, 
                    price: order.price,
                    exchange: 'bitstamp.net'
                };
            });
            var mappedBtceOrders =  _und.map(results.btceOrders, function(order){
                return {
                    time: order.date,
                    quantity: order.amount,
                    price: order.price,
                    exchange: 'btc-e.com'
                };
            });

            var combinedOrders = _und.union(mappedBitStampOrders, mappedBtceOrders);
            var sortedCombinedOrders = _und.sortBy(combinedOrders, function(order){ return -1 * order.time; });
            results.orders = _und.first(sortedCombinedOrders, 10);
            res.send(results);
        });
    });
};

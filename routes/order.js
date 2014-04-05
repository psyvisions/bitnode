var request = require('request');

var orders = [];
var bitstampOrders = [];

/* Get orders listing. */
exports.list = function(req, res){
    //res.setHeader('Content-Type', 'application/json'); 
    //https://www.bitstamp.net/api/    
    request('https://www.bitstamp.net/api/transactions/', function(error, response, body){
        if(!error && response.statusCode == 200) {
            //bitstampOrders = body; 
            console.log(body);
        }
    });
    //console.log(bitStampOrders);
    res.send({ orders: orders });
    /* res.send({
        orders: [
          {
            time: '10:57 am',
            quantity: '5',
            price: '900',
            exchange: 'btc-e.com'  
          },
          {
            time: '4:30pm',
            quantity: '70',
            price: ' 4.03',
            exchange: 'bitstamp.net'    
          }
        ]
    }); */
    //TODO: Actually populate orders
    //https://btc-e.com/api/documentation
    //https://www.bitstamp.net/api/
    //return last 10 orders across both apis listed above
};

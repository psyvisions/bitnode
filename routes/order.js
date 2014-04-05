/* Get orders listing. */
exports.list = function(req, res){
    //res.setHeader('Content-Type', 'application/json'); 
    res.send({
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
    }); //TODO: Actually populate orders
    //https://btc-e.com/api/documentation
    //https://www.bitstamp.net/api/
    //return last 10 orders across both apis listed above
};

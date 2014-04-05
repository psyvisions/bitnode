var viewModel = {
    orders : []
};

viewModel.orders = ko.observableArray();

viewModel.orders.push({
    time: '11:02 am',
    quantity: '4',
    price: '1.01',
    exchange: 'btc-e.com'
});

viewModel.apiCall = function(){ 
    var ajaxCallResults = $.ajax({
        url: '/orders',
        success: function(data, status, jqXHR){
            viewModel.orders(data.orders);
        }
    });
};
viewModel.apiCallIntervalDelay = 5000;
viewModel.apiCallIntervalId = window.setInterval(viewModel.apiCall, viewModel.apiCallIntervalDelay); 

ko.applyBindings(viewModel);

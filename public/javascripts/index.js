var viewModel = {
    orders : []
};

viewModel.orders = ko.observableArray();

viewModel.orders.push({
    time: 'Loading...',
    quantity: '',
    price: '',
    exchange: ''
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

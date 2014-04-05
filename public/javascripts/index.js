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

ko.applyBindings(viewModel);

ko.components.register('newsletter-widget', {
    viewModel: function(){
        this.email = ko.observable();
        this.showMessage = ko.observable(false);
        this.submitForm = function(){
            this.showMessage(true);
        }
    },
    template:
    '<h3>Subscribe to Our Newsletter</h3>\
    <form data-bind="submit: submitForm">\
        <input data-bind="value:email">\
        <button type="submit">Submit</button>\
    </form>\
    <p data-bind="visible: showMessage">Thanks for Subscribing:<br><strong><span data-bind="text: email"></span></strong></p>\
    '
}); 
ko.applyBindings();
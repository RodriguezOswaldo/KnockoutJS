function viewModel(){
    var m = this;
    m.goals = ko.observableArray();
}
var viewModel = new viewModel();
ko.applyBinding(viewModel);

function getGoals(){
    $.get('http://localhost:3000/goals', function(data){
        viewModel.goals(data);
    });
}

function iewModel(){
    var m = this;
    m.goalVs = ko.observableArray(['like', 'your', 'face']);
}
var viewModel = new ViewModel();
ko.applyBinding(viewModel);

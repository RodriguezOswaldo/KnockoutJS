function getGoals(){
    $.get('http://localhost:3000/goals', function(data){
        viewModel.goals(data);
    });
}

function ViewModel(){
    var m = this;
    m.goals = ko.observableArray(['like', 'your', 'face']);
    m.goalsInputName = ko.observable();
    m.goalsInputType = ko.observable();
    m.goalsInputDeadline = ko.observable();

    m.addGoal = function(){
        var name = $('#name').val();
        var type = $('#type').val();
        var deadline = $('#deadline').val();
    }
}
var viewModel = new ViewModel();
ko.applyBinding(viewModel);

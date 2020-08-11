function getGoals(){
    $.get('http://localhost:3000/goals', function(data){
        viewModel.goals(data);
    });
}

function ViewModel(){
    var m = this;
    m.goals = ko.observableArray();
    m.goalInputName = ko.observable();
    m.goalInputType = ko.observable();
    m.goalInputDeadline = ko.observable();

    m.addGoal = function(){
        var name = $('#name').val();
        var type = $('#type').val();
        var deadline = $('#deadline').val();

        m.goals.push({
            name: name,
            type: type,
            deadline: deadline
        });

        $.ajax({
            url: "http://localhost:3000/goals",
            data: JSON.stringify({
                "name": name,
                "type": type,
                "deadline": deadline
            }),
            type: "POST",
            contentType: "application/json",
            success: function(data){
                console.log("Goals Added...")
            },
            error: function(xhr, status, err){
                console.log(err);
            }
        });
    }

    m.types = ko.observableArray(['like', 'your', 'face']);
}
var viewModel = new ViewModel();
ko.applyBindings(viewModel)

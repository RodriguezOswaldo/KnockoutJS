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
    // m.selectedGoals = ko.observable();

    // m.canEdit = ko.computed(function(){
    //     return m.selectedGoals().length > 0;
    // });
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
                console.log("Goal Added...")
            },
            error: function(xhr, status, err){
                console.log(err);
            }
        });
    }
    m.types = ko.observableArray(['Health & Fitness', 'Professional', 'Relationships', 'Self Help']);
}
var viewModel = new ViewModel();
ko.applyBindings(viewModel)

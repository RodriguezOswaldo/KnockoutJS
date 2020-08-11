function getGoals() {
    $.get('http://localhost:3000/goals', function (data) {
        viewModel.goals(data);
    });
}

function ViewModel() {
    var m = this;
    m.goals = ko.observableArray();
    m.goalInputName = ko.observable();
    m.goalInputType = ko.observable();
    m.goalInputDeadline = ko.observable();
    m.isUpdate = ko.observable(false);
    m.updateId = ko.observable();
    m.selectedGoals = ko.observableArray();
    m.canEdit = ko.computed(function(){
        return m.selectedGoals.length > 0;
    });
 /////////////Add Goal
    m.addGoal = function () {
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
            success: function (data) {
                console.log("Goal Added...")
            },
            error: function (xhr, status, err) {
                console.log(err);
            }
        });
    }
 ///////////Delete Goal
    m.deleteSelected = function (){
        //delete on the client
        $.each(m.selectedGoals(), function (index, value) {
            var id = m.selectedGoals()[index]._id;
            //delete on the db
            $.ajax({
                url: "http://localhost:3000/goals" + id,
                type: "DELETE",
                async: true,
                timeout: 300000,
                success: function (data) {
                    console.log("Goal Removed...")
                },
                error: function (xhr, status, err) {
                    console.log(err);
                }
            });
        });
        m.goals.removeAll(m.selectedGoals());
        m.selectedGoals.removeAll();
    }
 ///////////Update Goal
    m.updateGoal = function(){
        var id = m.updateId;
        var name = $('#name').val();
        var type = $('#type').val();
        var deadline = $('#deadline').val();

        m.goals.remove(function(item){
            return item._id == id;
        });

        m.goals.push({
            name: name,
            type: type,
            deadline: deadline
        });

        $.ajax({
            url: "http://localhost:3000/goals"+id,
            data: JSON.stringify({
                "name": name,
                "type": type,
                "deadline": deadline
            }),
            type: "PUT",
            contentType: "application/json",
            success: function (data) {
                console.log("Goal Updated...")
            },
            error: function (xhr, status, err) {
                console.log(err);
            }
        });
    }
 ////////////Edit Goal
    m.editSelected = function () {
        m.updateId = m, selectedGoals()[0]._id;
        var name = m.selectedGoals()[0].name;
        var type = m.selectedGoals()[0].type;
        var deadline = m.selectedGoals()[0].deadline;

        m.isUpdate(true);
        m.goalInputName(name);
        m.goalInputType(type);
        m.goalInputDeadline(deadline);
    };

    m.types = ko.observableArray(['Health & Fitness', 'Professional', 'Relationships', 'Self Help']);
}

var viewModel = new ViewModel();
ko.applyBindings(viewModel)

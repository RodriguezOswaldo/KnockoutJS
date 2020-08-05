var viewModel = {
    categories: ko.observableArray([
        {name: 'Technology'},
        {name: 'Business'}
    ]),
    newCategory: ko.observable()
}
viewModel.categoriesAlt = ko.computed(function(){
    return this.categories.union([
        {name:'Food'},
        {name:'Construction'}
    ])
}, viewModel);

$(function(){
    ko.applyBindings(viewModel)
    $('#addBtn').click(function(){
        viewModel.categories.push({name:viewModel.newCategory()});
    });
})
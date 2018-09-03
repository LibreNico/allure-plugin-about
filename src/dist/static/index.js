'use strict';



class MyLayout extends allure.components.AppLayout {

    initialize() {
    //    this.model = new MyTabModel();

    this.model = {
          "title" : "BDD Documentation",
          "subtitle" : "MIA Synchronyzation cosmos",
          "description" : "Map and send data between Cosmos and MIA"
        }
    }

    loadData() {
       // return this.model.fetch();
    }

    getContentView() {
        return new MyView({items: this.model});
    }
}

const template = function (data) {
    var html = '<h3 class="pane__title">About</h3>';
        html += '<div class="about" >';
        html += '<h1 >' + data.items.title  + '</h1>';
        html += '<h2 >' + data.items.subtitle + '</h2>';
        html += '<p >' + data.items.description + '</p>';
        html += '</div>';
    return html;
}

var MyView = Backbone.Marionette.View.extend({
    template: template,

    render: function () {
        this.$el.html(this.template(this.options));
        return this;
    }
})

allure.api.addTab('mytab', {
    title: 'About', icon: 'fa fa-info-circle',
    route: 'mytab',
    onEnter: (function () {
        return new MyLayout()
    })
});
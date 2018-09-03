'use strict';


var MyTabModel = Backbone.Collection.extend({
    url: 'data/about.json'
})

class MyLayout extends allure.components.AppLayout {

    initialize() {
        this.model = new MyTabModel();
    }

    loadData() {
        return this.model.fetch();
    }

    getContentView() {
        return new MyView({items: this.model.models});
    }
}


const template = function (data) {

    var html = '<h3 class="pane__title">About</h3>';

    for (var item of data.items) {

        html += '<div class="about" >';
        html += '<h1 >' + item.attributes.title  + '</h1>';
        html += '<h2 >' + item.attributes.subtitle + '</h2>';
        html += '<p >' + item.attributes.description + '</p>';
        html += '</div>';

    }
    
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
Ember.Handlebars.helper('percents', function (value) {
    typeof value === "function" && (value = value.apply(this));

    return ((value || 0) * 100).toFixed(2) + '%';
});

Ember.Handlebars.helper('float', function (value) {
    typeof value === "function" && (value = value.apply(this));

    return (value || 0).toFixed(2);
});

Ember.Handlebars.helper('date', function (value) {
    typeof value === "function" && (value = value.apply(this));

    return (new Date(value * 1000)).toLocaleString();
});

Ember.Handlebars.registerHelper('icon', function (name, title) {
    title = typeof title == "string" && ' title="' + title + '"' || '';
    
    return new Handlebars.SafeString(
        '<span class="glyphicon glyphicon-' + name + '"' + title + '></span>'
    );
});

Ember.Handlebars.helper('trans', function (line, def) {
    def = typeof def === "object" ? undefined : def;

    return window.trans && window.trans(line, def) || line;
});

Ember.Handlebars.registerHelper('color-scale', function (key) {

    return new Handlebars.SafeString(
        '<span class="color-scale ' + key + '"></span>'
    );
});

Ember.Handlebars.registerHelper('lookup', function(component, options) {

  component = Ember.Handlebars.get(this, component, options);
  Ember.Handlebars.helpers[component].call(this, options);
});
App.IndexController = Ember.ObjectController.extend({

    actions: {
        upload: function (file) {
            var me = this
                , formData = new FormData();

            formData.append('file', file);

            App.set('error', false);
            $.ajax({
                url: '/-/upload'
                , type: 'POST'
                , data: formData
                , cache: false
                , contentType: false
                , processData: false
            }).then(function (resp) {
                resp && me.transitionToRoute('dossier', App.Dossier.fromJSON(resp)) 
                || App.set('error', trans('app.dossier.error.upload'));
            });
        }
    }
});

App.UploadView = Ember.View.extend({
    templateName: 'upload',

    change: function (e) {
        var files = e.target.files;

        if (!files.length) return;

        this.get('controller').send('upload', files[0]);
    }
});
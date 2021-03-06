App.UploadButtonComponent = Ember.Component.extend({
    classNames: 'upload-btn'
    , classNameBindings: ['isSending', 'isSending:disabled']

    , isSending: false

    , actions: {

        upload: function (file) {
            
            if (this.isSending) return;

            var me = this
                , formData = new FormData();

            formData.append('file', file);

            me.set('isSending', true);

            $.ajax({
                url: '/-/upload'
                , type: 'POST'
                , data: formData
                , cache: false
                , contentType: false
                , processData: false
            })
            .then(function (resp) {
                me.sendAction('action', resp);
            })
            .always(function () { 
                me.set('isSending', false); 
            });
        }
    }

    , change: function (e) {
        var files = e.target.files;

        if (!files.length) return;

        this.get('controller').send('upload', files[0]);
    }
});
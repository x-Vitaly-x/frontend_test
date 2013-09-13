Backbone.$ = $;
// I have no idea why backbone complains about that stuff, but this thing solves the problem.
_.templateSettings = {
    interpolate:/\$\{\{(.+?)\}\}/g,
    evaluate:/\{\{(.+?)\}\}/g
};
// set template interpolation settings

//*******************************************************************************
//core models
var book = Backbone.Model.extend({
    idAttribute:"ppn",
    defaults:{
        rendered:false
    },
    initialize:function (data) {
        this.model_type = "book";
    },
    toJSON:function () {
        return { user:_.clone(this.attributes) }
    },
    urlRoot:'/books',
    url:function () {
        // send the url along with the serialized query params
        return this.urlRoot + "/" + this.attributes.ppn;
    }
});

//*******************************************************************************
//core collections
var BookList = Backbone.Collection.extend({
    model:book,
    urlRoot:'/books',

    url:function () {
        // send the url along with the serialized query params
        return this.urlRoot;
    },
    comparator:function (event) {
        return event.get("position");
    }
});
//*******************************************************************************
//main object
main = Backbone.Model.extend({

    defaults:{
        id:'0'
    },
    initialize:function (data) {
        data = data || {};
        this.current_view = new Backbone.View();
        //this.current_user = new user();
        this.page = 0;
        this.search = "";
        this.book_list = new BookList(data.book_list); // all books
    },
    backup:function () {
        /* how to backup and restore objects locally

         data_x = this.toJSON();
         data_x.image_tmp = this.image_tmp.toJSON();
         data_x.user_tmp = this.user_tmp.toJSON();
         data_x.tech_album = this.tech_album.toJSON();

         Main.test = data_x;
         localStorage.main = $.base64.encode(unescape(encodeURIComponent(JSON.stringify(data_x))));
         // JSON.parse(decodeURIComponent( escape($.base64.decode(localStorage.main))))
         // decode        */

        // first we have to figure out a way to find out if cached data has changed or not
    },
    restore:function () {
        // Main = new main(JSON.parse(decodeURIComponent( escape($.base64.decode(localStorage.main)))));
    }
})
;

var Main = new main();
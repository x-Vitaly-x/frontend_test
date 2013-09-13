var BookView = Backbone.View.extend({
        events:{
        },
        initialize:function () {
            this.render();
            //console.log(this.model);
            Main.current_view = this;
            this.model.fetch({
                success:function (model, msg) {
                    Main.current_view.render_book()
                }
            });
        },
        render:function () {
            $("#container").empty();
            $(_.template(
                $("#book_wrapper_template").html()
            )()).appendTo("#container");
        },
        render_book:function () {
            $("#book").empty();
            $(_.template($("#book_template").html(), {book:Main.current_view.model})).appendTo("#book");
            //init_bootstrap();
        }
    })
    ;
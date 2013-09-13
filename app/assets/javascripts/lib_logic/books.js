var BooksView = Backbone.View.extend({
        events:{
            "submit .form-search":"search",
            "click #next_page":"next_page"
        },
        initialize:function () {
            this.render();
            this.collection = Main.book_list;
            //console.log(this.model);
            Main.current_view = this;
            if (this.collection.count == 0) {
                this.collection.fetch({
                    success:function (model, msg) {
                        Main.current_view.render_books();
                    }
                });
            } else {
                Main.current_view.render_books();
            }
        },
        search:function (event) {
            Main.page = 1;
            Main.search = $(".form-search input").val();
            this.collection.fetch({
                data:{search:Main.search},
                success:function (model, msg) {
                    Main.current_view.render_books()
                }
            });
        },
        next_page:function (event) {
            event.preventDefault();
            var $this = this;
            Main.page = Main.page + 1;
            var tmp_col = new BookList();
            tmp_col.fetch({
                data:{search:Main.search, page:Main.page},
                success:function (model, msg) {
                    $this.collection.add(tmp_col.models);
                    Main.current_view.render_books()
                }
            });
        },
        render:function () {
            $("#container").empty();
            $(_.template(
                $("#books_template").html()
            )()).appendTo("#container");
        },
        render_books:function () {
            var scroll = $(window).scrollTop();
            console.log(scroll);
            $("#books").empty();
            console.log(Main.current_view.collection);
            $(_.template($("#book_list_template").html(), {books:Main.current_view.collection})).appendTo("#books");
            //init_bootstrap();
            $(window).scrollTop(scroll);
        }
    })
    ;
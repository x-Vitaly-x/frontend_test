// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require lib_pre/jquery
//= require lib_pre/jquery-migrate-1.1.1.js
//= require jquery_ujs
//= require lib_pre/underscore-min
//= require_directory ./lib_pre
//= require twitter/bootstrap
// require lib_logic/uploader
//= require tinymce/jscripts/tiny_mce/tiny_mce
//= require_directory ./lib_logic
//= require_directory ./lib_post
//= require lib_post/markerclusterer

$('.dropdown-toggle').dropdown();
$('.dropdown-menu').find('form').click(function (e) {
    e.stopPropagation();
});

$(document).on("click", ".state_trigger", function (event) {
    //console.log(event);
    event.preventDefault();
    event.stopPropagation();
    $(".selected-trigger").removeClass("selected-trigger");
    $(event.currentTarget).addClass("selected-trigger");
    data = $(event.currentTarget).attr("href").split("/").filter(Boolean);
    //console.log(data);
    State.push({type:data[0], method:data[1]}, $(event.currentTarget).attr("title"), $(event.currentTarget).attr("href"));
});

// handle state change and state transition
function handle_state(state) {

    // so that zombie events do not occur
    Main.current_view.stopListening();
    Main.current_view.undelegateEvents();

    console.log(state);
    switch (state.type) {
        case "books":
            switch (state.method) {
                case undefined:
                    // book search
                    new BooksView({
                        model:main,
                        el:$("#container")
                    });
                    break;
                default:
                    // a certain book
                    new BookView({
                        model:new book({ppn:state.method}),
                        el:$("#container")
                    });
                    break;
            }
            break;
        default:
            break;
    }
}
;
State = {
    push:function (arg1, arg2, arg3) {
        window.history.pushState(arg1, arg2, arg3);
        //console.log(window.history.state);
        handle_state(window.history.state);
    },
    replace:function (arg1, arg2, arg3) {
        window.history.replaceState(arg1, arg2, arg3);
        handle_state(window.history.state);
    }
};

function editor_tweak(inst) {
    inst.onChange.add(function () {
        inst.save();
        $("#" + inst.id).change();
    });
}

;

function editor_init(element, options) {
    initial_editor_options = {
        mode:"exact",
        elements:element,
        theme:"simple",
        height:"100px",
        width:"100%",
        skin:"o2k7",
        invalid_elements:"div,style,span,b,i,table,tr,td,th,tbody,form,font,input,select,textarea,pre,img,xmp,meta,script,object,applet,a,iframe,option,embed",
        init_instance_callback:"editor_tweak"
    };
    options = $.extend(initial_editor_options, options);
    $(document).ready(function () {
        tinyMCE.init(options);
    });
}

;

function alert_x(element, message) {
    $(_.template($("#alert_template").html(), {value:message})).appendTo(element);
}
;

$(document).ready(function () {
    //initializeGeocoder();
    window.onpopstate = function (event) {
        //console.log("popstate");
        if (event.state != null) {
            handle_state(event.state);
        }
    }
});
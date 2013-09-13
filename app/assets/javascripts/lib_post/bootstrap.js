function init_bootstrap() {
    $("[rel=popover]").popover();
    $(".tooltip").tooltip();
    $("a[rel=tooltip]").tooltip();
    $('.nav.nav-tabs a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
    })
}
$(document).ready(function () {
    init_bootstrap();
});
$(document).ready(function () {
    setInterval(function () {
        TDRoller("next", $("#lastfive"));
    }, 3000);

    $(".shadowback a").click(function () {
        TDRoller($(this).attr("data-dir"), $("#lastfive"));
    });

    setInterval(function () {
        TDRoller("up", $("#urgjobs"));
    }, 3000);
});
$(document).ready(function () {
    /* Login Sayfası*/
    if ($(".loginframe").length > 0) {
        $("#txtUserName").focus();

        $("#btnGiris").click(function () {
            GirisYap();
        });

        $("#txtUserName, #txtPassword").keyup(function (event) {
            if (event.keyCode == 13) {
                GirisYap();
            }
        });
    }
    /* Login Sayfası*/

    /* Logout Olayı*/
    if ($(".right_header a.logout").length > 0) {
        $(".right_header a.logout").click(function () {
            $.ajax({
                type: 'GET',
                url: ProjectPath + "/Ajax/Emlak/Logout",
                success: function (answer) {
                    if (answer == true) {
                        window.location = ProjectPath;
                    }
                }
            });
        });
    }
    /* Logout Olayı*/

    /* Main Menu */
    if ($(".menu").length > 0) {
        link = Url.split('?')[0].toLowerCase() == MainPath + "/default.aspx" ? "" : MainPath + "/" + Url.split('?')[0].toLowerCase();
        $(".menu ul li a").removeClass("current");
        $(".menu ul li a").each(function () {
            if ($(this).attr("href") == link) {
                $(this).addClass("current");
            }
        });

        $(".menu ul li ul li a").each(function () {
            if ($(this).attr("href") == link) {
                $(this).parent("li").parent("ul").prev("a").addClass("current");
            }
        });
    }
    /* Main Menu */

    /* Sol Menü */
    if ($(".left_content").length > 0) {
        $('#leftsearch').watermark('Ara...');
        //$('#leftsearch').mask('0-(000) 000 00 00');
    }
    /* Sol Menü */
});

/* Mask Kullanımı */
//    $('.date').mask('11/11/1111');
//    $('.time').mask('00:00:00');
//    $('.date_time').mask('00/00/0000 00:00:00');
//    $('.cep').mask('00000-000');
//    $('.phone').mask('0000-0000');
//    $('.phone_with_ddd').mask('(00) 0000-0000');
//    $('.phone_us').mask('(000) 000-0000');
//    $('.mixed').mask('AAA 000-S0S');
//    $('.cpf').mask('000.000.000-00', { reverse: true });
//    $('.money').mask('000.000.000.000.000,00', { reverse: true });

function GirisYap() {
    var username = $("#txtUserName").val();
    var password = $("#txtPassword").val();

    if (!isValid(username, "username")) {
        alert("Lütfen geçerli bir kullanıcı adı giriniz.");
        return false;
    }

    if (!isValid(password, "password")) {
        alert("Lütfen geçerli bir şifre giriniz.");
        return false;
    }

    var loginInfo = new Object();
    loginInfo.Username = username;
    loginInfo.Password = password;

    $.ajax({
        type: "POST",
        url: ProjectPath + "/Ajax/Emlak/Log",
        data: "{ login: '" + JSON.stringify(loginInfo) + "' }",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (answer) {
            if (answer == true) {
                window.location = MainPath + "/Panel/Index";
            }
            else {
                alert("Lütfen kullanıcı adı ve şifrenizi kontrol ediniz.");
            }
        }
    });
}

/* Validation Control */
function isValid(text, type) {
    var pattern;

    switch (type) {
        case "username": pattern = new RegExp(/^[a-z0-9_-]{3,16}$/); break;
        case "password": pattern = new RegExp(/^[a-z0-9_-]{3,18}$/); break;
        case "hex": pattern = new RegExp(/^#?([a-f0-9]{6}|[a-f0-9]{3})$/); break;
        case "rewrite": pattern = new RegExp(/^[a-z0-9-]+$/); break;
        case "email": pattern = new RegExp(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/); break;
        case "url": pattern = new RegExp(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/); break;
        case "ipaddress": pattern = new RegExp(/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/); break;
        case "htmltag": pattern = new RegExp(/^<([a-z]+)([^<]+)*(?:>(.*)<\/\1>|\s+\/>)$/); break;
        default: pattern = new RegExp(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/); break;
    }

    return pattern.test(text);
};
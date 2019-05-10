$(document).ready(function () {
    $("#login").click(function () {
        Login();
    });

    $("#username, #password").keyup(function (event) {
        if (event.keyCode == 13) {
            Login();
        }
    });

    function Login() {
        var loginObject = new Object();
        loginObject.Username = $("#username").val();
        loginObject.Password = $("#password").val();
        loginObject.Type = $("#login").attr("data-type");

        $.ajax({
            type: "POST",
            url: MainPath + '/Ajax/Giris/GirisYap',
            data: "{ loginObject: '" + JSON.stringify(loginObject) + "' }",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (answer) {
                if (answer == true) {
                    window.location.href = MainPath + "/" + loginObject.Type;
                }
                else {
                    alert("Kullanıcı Adı veya Şifre Yanlış.");
                }
            }
        });
    }
});
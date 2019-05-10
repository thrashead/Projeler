ikApp.controller("kontrolKullanici", function ($scope, $http) {
    $http({
        method: "GET",
        url: MainPath + "/Aday/Ozgecmis/KullaniciJson"
    }).then(function (response) {
        $scope.modelKullanici = response.data;
    }, function (reason) {
        $scope.error = reason.data;
    });
});
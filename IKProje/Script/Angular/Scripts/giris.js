ikApp.controller("kontrolSirketLogolar", function ($scope, $http) {
    $http({
        method: "GET",
        url: MainPath + "/Giris/SirketLogolarJson"
    }).then(function (response) {
        $scope.modelSirketLogolar = response.data;
    }, function (reason) {
        $scope.error = reason.data;
    });
});
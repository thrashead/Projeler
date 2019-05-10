ikApp.controller("kontrolSehirler", function ($scope, $http) {
    $http({
        method: "GET",
        url: MainPath + "/Sirket/Islem/SehirlerJson"
    }).then(function (response) {
        $scope.modelSehirler = response.data;

        $scope.sleep = (time) => {
            return new Promise((resolve) => setTimeout(resolve, time));
        };
        angular.element(document).ready(function () {
            $scope.sleep(500).then(() => {
                TDDropDown($("#cityselect"));
            });
        });

    }, function (reason) {
        $scope.error = reason.data;
    });
}).controller("kontrolSektorler", function ($scope, $http) {
    $http({
        method: "GET",
        url: MainPath + "/Sirket/Islem/SektorlerJson"
    }).then(function (response) {
        $scope.modelSektorler = response.data;

        $scope.sleep = (time) => {
            return new Promise((resolve) => setTimeout(resolve, time));
        };
        angular.element(document).ready(function () {
            $scope.sleep(500).then(() => {
                TDDropDown($("#sectorselect"));
            });
        });

    }, function (reason) {
        $scope.error = reason.data;
    });
});
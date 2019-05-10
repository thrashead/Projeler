ikApp.controller("kontrolSehirler", function ($scope, $http) {
    $http({
        method: "GET",
        url: MainPath + "/Aday/Islem/SehirlerJson"
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
}).controller("kontrolCinsiyet", function ($scope, $http) {
    $http({
        method: "GET",
        url: MainPath + "/Aday/Islem/CinsiyetJson"
    }).then(function (response) {
        $scope.modelCinsiyet = response.data;

        $scope.sleep = (time) => {
            return new Promise((resolve) => setTimeout(resolve, time));
        };
        angular.element(document).ready(function () {
            $scope.sleep(500).then(() => {
                TDDropDown($("#genderselect"));
            });
        });

    }, function (reason) {
        $scope.error = reason.data;
    });
});
ikApp.controller("kontrolAra", function ($scope, $http) {
    $http({
        method: "GET",
        url: MainPath + "/Kontroller/AraJson"
    }).then(function (response) {
        $scope.araModel = response.data;

        $scope.sleep = (time) => {
            return new Promise((resolve) => setTimeout(resolve, time));
        };
        angular.element(document).ready(function () {
            $scope.sleep(500).then(() => {
                TDDropDown($("#msrcselect"));
            });
        });

    }, function (reason) {
        $scope.error = reason.data;
    });
});
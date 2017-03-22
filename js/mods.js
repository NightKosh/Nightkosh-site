app.controller("ModsCtrl", ['$scope', '$http', 'PageService', function ($scope, $http, PageService) {
    $scope.mods = {};

    if (PageService.getPageParams().page == "mods") {
        $http.get(PageService.getDataPath()).success(function (data, status, headers, config) {
            $scope.mods = data;
        });
    }
}]);
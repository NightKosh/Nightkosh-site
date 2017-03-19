app.controller("AboutCtrl", ['$scope', '$http', 'PageService', function ($scope, $http, PageService) {
    $scope.about = {};

    if (PageService.getPageParams().page == "about") {
        $http.get(PageService.getDataPath()).success(function (data, status, headers, config) {
            $scope.about = data;
        });
    }
}]);

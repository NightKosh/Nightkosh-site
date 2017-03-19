app.controller("CertificatesCtrl", ['$scope', '$http', 'PageService', function ($scope, $http, PageService) {
    $scope.certificates = {};

    if (PageService.getPageParams().page == "certificates") {
        $http.get(PageService.getDataPath()).success(function (data, status, headers, config) {
            $scope.certificates = data;
        });
    }
}]);
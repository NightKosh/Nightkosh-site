
app.controller("GlobalPageCtrl", ['$scope', '$http', 'PageService', function($scope, $http, PageService) {
    $scope.globalData = {};

    $http.get('data/global/' + PageService.getPageParams().lang + '.json').success(function (data, status, headers, config) {
        $scope.globalData = data;

        $scope.globalData.enLink = PageService.getNewLocalizedLinkByParams("en");
        $scope.globalData.ruLink = PageService.getNewLocalizedLinkByParams("ru");

//        $scope.globalData.menuAboutLink = PageService.getLinkWithLangParams("/");
//        $scope.globalData.menuModsLink = PageService.getLinkWithLangParams("?page=mods");
        $scope.globalData.menuModsLink = PageService.getLinkWithLangParams("/");
//        $scope.globalData.menuCertificatesLink = PageService.getLinkWithLangParams("?page=certificates");
    });

    $scope.contentTemplatePath = PageService.getTemplatePath();
}]);
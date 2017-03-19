
var app = angular.module("app", []);

app.service('PageService', function() {
    var getJsonFromUrl = function (result) {
        var query = location.search.substr(1);
        query.split("&").forEach(function (part) {
            var item = part.split("=");
            if (item[0] && item[1]) {
                result[item[0]] = decodeURIComponent(item[1]);
            }
        });
        return result;
    };

    var DEFAULT_PARAMS = {
        page: "about",
        lang: "en"
    };
    var pageParams = getJsonFromUrl(DEFAULT_PARAMS);

    this.getLinkWithLangParams = function (link) {
        if (pageParams.lang != "en") {
            if (link.indexOf("?") == -1) {
                link += "?";
            } else {
                link += "&";
            }
            link += "lang=" + pageParams.lang;
        }
        return link;
    };

    this.getPageParams = function () {
        return pageParams;
    };

    this.getNewLocalizedLinkByParams = function (lang) {
        var str = "";
        var paramNum = 0;
        for (var key in pageParams) {
            if (pageParams.hasOwnProperty(key)) {
                if (key != "lang" && !(key == "page" && pageParams[key] == DEFAULT_PARAMS.page)) {
                    if (paramNum != 0) {
                        str += "&";
                    }
                    str += key + "=" + pageParams[key];
                    paramNum++;
                }
            }
        }
        if (lang != "en") {
            if (str.length != 0) {
                str += "&";
            }
            str += "lang=" + lang;
        }
        if (str.length != 0) {
            str = "/?" + str;
        } else {
            str = "/";
        }

        return str;
    };

    this.getTemplatePath = function() {
        var template = "template/" + pageParams.page + "/";
        if (pageParams.sub_page) {
            template += pageParams.sub_page;
        } else {
            template += "index";
        }
        return template + ".html";
    };

    this.getSubMenuTemplatePath = function() {
        return "template/" + pageParams.page + "/submenu.html";
    };

    this.getDataPath = function() {
        var data = "data/" + pageParams.page + "/";
        if (pageParams.sub_page) {
            data += pageParams.sub_page + "_";
        }
        return data + pageParams.lang + ".json";
    };

    this.getSubMenuDataPath = function() {
        return "data/" + pageParams.page + "/submenu_" + pageParams.lang + ".json";
    };
});

var app = angular.module("app", []);

app.service('PageService', function () {
    var DEFAULT_PARAMS = {
        page: "mods",
        lang: "en"
    };

    var getJsonFromUrl = function (result) {
        var result = {};
        Object.assign(result, DEFAULT_PARAMS);
        var query = location.search.substr(1);
        query.split("&").forEach(function (part) {
            var item = part.split("=");
            if (item[0] && item[1]) {
                result[item[0]] = decodeURIComponent(item[1]);
            }
        });

        return result;
    };
    var pageParams = getJsonFromUrl(pageParams);

    this.getLinkWithLangParams = function (link) {
        if (pageParams.lang != DEFAULT_PARAMS.lang) {
            link += (link.indexOf("?") == -1) ? "?" : "&";
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
        if (lang != DEFAULT_PARAMS.lang) {
            if (str.length != 0) {
                str += "&";
            }
            str += "lang=" + lang;
        }
        return (str.length != 0) ? "/?" + str : "/";
    };

    this.getTemplatePath = function () {
        return "template/" +
            ((pageParams.page) ? pageParams.page : DEFAULT_PARAMS.page) +
            "/" +
            ((pageParams.sub_page) ? pageParams.sub_page : "index") +
            ".html" + VERSION_POSTFIX;
    };

    this.getSubMenuTemplatePath = function () {
        return "template/" +
            ((pageParams.page) ? pageParams.page : DEFAULT_PARAMS.page) +
            "/submenu.html" + VERSION_POSTFIX;
    };

    this.getDataPath = function () {
        return "data/" +
            ((pageParams.page) ? pageParams.page : DEFAULT_PARAMS.page) +
            "/" +
            ((pageParams.sub_page) ? pageParams.sub_page + "_" : "") +
            pageParams.lang + ".json" + VERSION_POSTFIX;
    };

    this.getSubMenuDataPath = function () {
        return "data/" +
            ((pageParams.page) ? pageParams.page : DEFAULT_PARAMS.page) +
            "/submenu_" + pageParams.lang + ".json" + VERSION_POSTFIX;
    };
});

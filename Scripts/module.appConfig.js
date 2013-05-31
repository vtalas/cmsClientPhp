angular.module('appConfigModule', [])
	.value("appConfig", {

	})
	.factory("chujFactory", function () {
		return "laskndalksd" + $(window).width();
	})
;

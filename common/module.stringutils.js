/*global Showdown, angular*/
var stringUtils = angular.module("stringutils", []);

stringUtils.factory("$markdown", function () {
	var converter = new Showdown.converter();

	return {
		toHtml: function (markdownText) {
			if (markdownText) {
				return converter.makeHtml(markdownText);
			}
			return "";
		}
	};
});


stringUtils.directive("ngBindHtmlUnsafe", ['$sce', '$parse', function($sce, $parse) {
	return function(scope, element, attr) {
		element.addClass('ng-binding').data('$binding', attr.ngBindHtml);

		var parsed = $parse(attr.ngBindHtml);
		function getStringValue() { return (parsed(scope) || '').toString(); }


		scope.$watch(getStringValue, function ngBindHtmlWatchAction(value) {
			console.log(value);
			element.html(value);
			//element.html($sce.getTrustedHtml(parsed(scope)) || '');
		});
	};
}]);

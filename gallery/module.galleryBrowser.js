/*global Gallery, angular */
var galleryModule = angular.module("galleryBrowser", ["notifications"]);

galleryModule.factory("$gallery", ["$notify", function ($notify) {
	var settings = {
		onChange: function () {
			$notify.trigger("gallery-changed");
		},
		onLoad: function () {
			$notify.trigger("gallery-loaded");
		}
	};
	return new Gallery(settings);
}]);



galleryModule.directive("ngcFitToBoxImage", [function () {
	return {
		template: '<div ><img class="fit-image" src="{{imageSrc}}" /></div>',
		replace: true,
		scope: {ngcFitToBoxImage: "="},
		link: function (scope, element, attrs) {

			scope.$watch("ngcFitToBoxImage", function (image, xxx) {
				var width,
					imageElement,
					height;

				if (image) {
					imageElement = element.find("img");
					width = element.width();
					height = element.height();

					if (image.Width) {
						console.log("not implemented");
					} else {
						var img = new Image();
						img.onload = function () {
							var fit = new FitImage(this.width, this.height, width, height);
							imageElement.css("height", fit.imageHeightCss());
							imageElement.css("width", fit.imageWidthCss());
						};
						img.src = image;
						scope.imageSrc = image;
					}
				}
			});
		}
	};
}])
;

galleryModule.controller("galleryBrowser", [
	"$scope", "$api", "$location", "$rootScope", "$timeout", "$routeParams", "$gallery", "$notify",
	function ($scope, $api, $location, $rootScope, $timeout, $routeParams, $gallery, $notify) {

//todo takhle by to mohlo byt
//		$gallery.addEventListener($gallery.events.loaded, function () {	} )

		$notify.addEventListener("gallery-loaded", function () {
			var index = $location.search().galleryIndex
			if (index) {
				$gallery.showByIndex(index);
				$scope.overlayGalleryShow = $gallery.currentIndex > -1;
			}
			$scope.currentItem = $gallery.getCurrent();
			$scope.prevItem = $gallery.getPrevious();
			$scope.nextItem = $gallery.getNext();
		});

		$notify.addEventListener("gallery-changed", function () {

			$scope.overlayGalleryShow = true;
			$scope.currentItem = $gallery.getCurrent();
			$scope.nextItem = $gallery.getNext();
			$scope.prevItem = $gallery.getPrevious();

			$location.search("galleryIndex", $gallery.currentIndex);
		});

		var visible = function () {
			return $scope.overlayGalleryShow;
		};

		$scope.close = function () {
			angular.element("body").css("overflow", "auto");
			$scope.overlayGalleryShow = false;
			$location.search("galleryIndex", null);
		};

		$scope.prev = function () {
			$scope.currentItem = $gallery.prev();
			$scope.nextItem = $gallery.getNext();
			$scope.prevItem = $gallery.getPrevious();
			$location.search("galleryIndex", $gallery.currentIndex);
		};

		$scope.next = function () {
			$scope.currentItem = $gallery.next();
			$scope.nextItem = $gallery.getNext();
			$scope.prevItem = $gallery.getPrevious();
			$location.search("galleryIndex", $gallery.currentIndex);
		};


		$scope.$on("global-keydown", function (e, $event) {
			if (!visible()) {
				return;
			}
			var key = $event.keyCode;
			switch (key) {
				case 27:
					$scope.close();
					break;
				case 33:
					$scope.prev();
					break;
				case 34:
					$scope.next();
					break;
			}
		});
	}]);



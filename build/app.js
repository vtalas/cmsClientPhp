/**
 * Event dispatcher class,
 * add ability to dispatch event
 * on native classes.
 *
 * Use of Class.js
 *
 * @author universalmind.com
 */

var EventDispatcher = (function () {
	'use strict';

	function EventDispatcher() {
		this._listeners = {};
	}

	/**
	 * Add a listener on the object
	 * @param type : Event type
	 * @param listener : Listener callback
	 */
	EventDispatcher.prototype.addEventListener = function (type, listener) {
		if (!this._listeners[type]) {
			this._listeners[type] = [];
		}
		this._listeners[type].push(listener);
	};


	/**
	 * Remove a listener on the object
	 * @param type : Event type
	 * @param listener : Listener callback
	 */
	EventDispatcher.prototype.removeEventListener = function (type, listener) {
		if (this._listeners[type]) {
			var index = this._listeners[type].indexOf(listener);

			if (index !== -1) {
				this._listeners[type].splice(index, 1);
			}
		}
	};


	/**
	 * Dispatch an event to all registered listener
	 * @param Mutiple params available, first must be string
	 */
	EventDispatcher.prototype.dispatchEvent = function () {
		var listeners;

		if (typeof arguments[0] !== 'string') {
			console.warn('EventDispatcher', 'First params must be an event type (String)')
		} else {
			listeners = this._listeners[arguments[0]];

			for (var key in listeners) {
				//This could use .apply(arguments) instead, but there is currently a bug with it.
				listeners[key](arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6]);
			}
		}
	};

	return EventDispatcher;
}());






﻿angular.module('appConfigModule', [])
	.value("appConfig", {

	})
;
angular.module('notifications', [])
	.provider('$notify', function () {
		var instance = new EventDispatcher();
		return {
			$get: function () {
				instance.trigger = instance.dispatchEvent;
				return instance;
			}
		};
	});
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
		element.addClass('ng-binding').data('$binding', attr.ngBindHtmlUnsafe);

		var parsed = $parse(attr.ngBindHtmlUnsafe);
		function getStringValue() { return (parsed(scope) || '').toString(); }


		scope.$watch(getStringValue, function(value) {
			element.html(value);
		});
	};
}]);
var FitImage = (function () {
	"use strict";

	var fitImage = function (imageWidth, imageHeight, cWidth, cHeight) {
		this.iWidth = imageWidth || 0;
		this.iHeight = imageHeight || 0;
		this.cWidth = cWidth || 0;
		this.cHeight= cHeight || 0;
	};

	fitImage.prototype.imageWidthCss = function () {
		return this.boxScale() >= this.imageScale() ? "100%" : "auto";
	};

	fitImage.prototype.imageHeightCss = function () {
		return this.boxScale() < this.imageScale() ? "100%" : "auto";
	};

	fitImage.prototype.imageScale = function () {
		return this.iWidth / this.iHeight;
	};

	fitImage.prototype.boxScale = function () {
		return this.cWidth / this.cHeight;
	};

	return fitImage;
}());
var Gallery = (function () {
	"use strict";

	var defaults = function () {
		return {
			onLoad: function () {
			},
			onChange: function () {
			}
		};
	};

	function Gallery(settings) {
		var x = defaults();
		this.settings = angular.extend(x, settings);
		this.data = [];
		this.currentIndex = -1;
	}

	Gallery.prototype.loadData = function (data) {
		if (data === undefined) {
			data = [];
		}

		if (this.isArray(data)) {
			this.data = data;
		} else {
			this.data.push(data);
		}
		this.settings.onLoad();
	};

	Gallery.prototype.showByIndex = function (index) {
		this.currentIndex = this.data[index] ? Number(index) : -1;
		if (this.currentIndex !== -1) {
			this.settings.onChange();
		}
	};

	Gallery.prototype.showBy = function (comparator) {
		for (var i = 0; i < this.data.length; i++) {
			var obj = this.data[i];
			if (comparator(obj)) {
				this.currentIndex = i;
				this.settings.onChange();
				return;
			}
		}
	};


	Gallery.prototype.close = function () {

	};

	Gallery.prototype.next = function () {
		if (this.currentIndex < this.data.length - 1) {
			this.currentIndex++;
			this.settings.onChange();
		}
		return this.getCurrent();
	};

	Gallery.prototype.prev = function () {
		if (this.currentIndex > 0) {
			this.currentIndex--;
			this.settings.onChange();
		}
		return this.getCurrent();
	};

	Gallery.prototype.getPrevious = function () {
		return this.data[this.currentIndex - 1] || null;
	};

	Gallery.prototype.getNext = function () {
		if (this.currentIndex === -1) {
			return null;
		}
		return this.data[this.currentIndex + 1] || null;
	};

	Gallery.prototype.getCurrent = function () {
		return this.data[this.currentIndex] || null;
	};

	/**
	 *
	 * @returns {*}
	 * @private
	 */
	Gallery.prototype.isArray = function (variable) {
		return Object.prototype.toString.call(variable) === '[object Array]';
	};


	return Gallery;
}());/*global Gallery, angular */
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
		template: '<div class="xxx" ><img src="{{imageSrc}}" /></div>',
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


/*global MenuItemList, RawDataConverter, GalleryList*/

var ApiWrapper = (function () {

	function ApiWrapper(cmsApiImpl, cache, $q) {
		this.cmsApi = cmsApiImpl;
		this.cache = cache;
		this.q = $q;
	}

	ApiWrapper.prototype.loadFromCache = function (key, deferred, callback) {
		var response = this.cache.get(key);

		if (response) {
			deferred.resolve(response);
			return deferred;
		}
		callback();
		return deferred;
	};

	ApiWrapper.prototype.getPage = function (link) {
		var deferred = this.q.defer(),
			key = "getPage_" + link,
			self = this;

		this.loadFromCache(key, deferred, function () {
			self.cmsApi.getJsonData({}, function (data) {
					var x = new GridList(data.data)
						.getGridByLink(link);
					self.cache.put(key, x);
					deferred.resolve(x);
				},
				function (err) {
					var returnUrl = (window.location);
					var hash = (window.location.hash);
					if (err.status === 403) {
						window.location.hash = "!login";//?returnuccrl=" + hash;
					}
					deferred.reject(err);
				});
		});

		return deferred.promise;
	};

	
	ApiWrapper.prototype.getPages = function () {
		var deferred = this.q.defer();
		this.cmsApi.getPages(function (data) {
			deferred.resolve(data);
		});

		return deferred.promise;
	};
	ApiWrapper.prototype.getJsonData = function () {
		var deferred = this.q.defer();

		this.cmsApi.getJsonData(function (data) {
			deferred.resolve(new GridList(data.data));
		});

		return deferred.promise;
	};

	ApiWrapper.prototype.getAlbum = function (albumId, imageParams) {
		var deferred = this.q.defer(),
			albumParams = imageParams || {};


		if (albumId === null) {
			deferred.resolve(null);
			return deferred.promise;
		}

		albumParams.id = albumId;

		this.cmsApi.getAlbum(albumParams, function (data) {

			deferred.resolve(data);
		});
		return deferred.promise;
	};

	ApiWrapper.prototype.getAlbumPhotos = function (albumId) {
		var deferred = this.q.defer(),
			key = albumId + "getAlbumPhotos",
			self = this;

		if (!albumId) {
			deferred.resolve([]);
			return deferred.promise;
		}

		this.loadFromCache(key, deferred, function () {

			self.cmsApi.getAlbumPhotos({id: albumId }, function (data, xhr) {
				self.cache.put(key, data);
				deferred.resolve(data);
			});
		});

		return deferred.promise;
	};

	ApiWrapper.prototype.getPhotos = function () {
		var deferred = this.q.defer(),
			key = "getAlbumPhotosStream",
			self = this;

		this.loadFromCache(key, deferred, function () {
			self.cmsApi.getPhotos(function (data) {
				self.cache.put(key, data);
				deferred.resolve(data);
			});
		});
		return deferred.promise;
	};

	ApiWrapper.prototype.getAlbums = function () {
		var deferred = this.q.defer();

		this.cmsApi.getAlbums(function (data) {
			deferred.resolve(data);
		});
		return deferred.promise;
	};

	ApiWrapper.prototype.snapshot = function (pageContent, path) {
		var deferred = this.q.defer();

		this.cmsApi.putSnapshot({data: pageContent, path: path}, function (data) {
			deferred.resolve(data);
		});

		return deferred.promise;
	};

	ApiWrapper.prototype.checkForSnapshot = function (scope, data) {
		if (data && data.snapshot) {
			scope.$emit("page-loaded");
		}
	};

	return ApiWrapper;
}());﻿angular.module('apiModule', ['ngResource', 'appConfigModule'])
	.factory('cmsApi', ['$resource', function ($resource) {
		var api = $resource('Service/cmsClientPHPService/:service',
			{ service: "serverProxy.php" },
			{
				getJsonData: { method: 'GET', isArray: false, params: {action: "getJson"} },
				getPage: { method: 'GET', isArray: false, params: {action: "getPage"} },
				getRequestToken: { method: 'GET', isArray: false, params: {action: "getLogin"} },
				login: { method: 'POST', isArray: false, params: {action: "PostLogin", service: "login.php"} },
				post: { method: 'POST', isArray: false, params: {action: "getLogin"} },
				getPages: { method: 'GET', isArray: false, params: {action: "getPages"} },
				getAlbums: { method: 'GET', isArray: false, params: {action: "getAlbums"} },
				getAlbum: { method: 'GET', isArray: false, params: {action: "getAlbum"} },
				getAlbumPhotos: { method: 'GET', isArray: false, params: {action: "getAlbumPhotos"} },
				getPhotos: { method: 'GET', isArray: false, params: {action: "getPhotos"} },
				putUserData: { method: 'PUT', isArray: false, params: {service: "postData.php"} },
				putSnapshot: { method: 'PUT', isArray: false, params: {service: "snapshot.php"} }
			});

		return api;
	}]);

/*global ApiWrapper*/
var repository = angular.module("repo", ["apiModule"]);

repository.factory("$api", ['cmsApi', '$cacheFactory', "$q", function (cmsApi, $cacheFactory, $q) {
	return new ApiWrapper(cmsApi, $cacheFactory("cmsCache"), $q);
}]);

repository.factory("loadFromCache", ['cmsApi', '$cacheFactory', "$q", function (cmsApi, $cacheFactory, $q) {
	return ":ashdvjad";
}]);


repository.factory("db", ['$api', '$cacheFactory', "$q", function ($api, $cacheFactory, $q) {

	var data = [
		[0, 1, 2],
		["a", "b", "c"]
	];

	return function (id) {
		return data[id];
	};

}]);

var Grid  = (function () {

	function Grid (data) {
		data = data || {};
		this.GridElements = data.GridElements || [];
		this.Link = data.Link || null;
		this.id = data.id || null;
		this.resources = data.resources || [];
		this.groups = data.groups || null;
		this.Name = data.Name = "";
	}
	return Grid;
}());
var GridElementsList = (function () {

	function GridElementsList(gridElements){
		this.data = gridElements || [];
	}

	GridElementsList.prototype.getGroups = function () {
		for (var i = 0; i < this.data.length; i++) {
			console.log(this.data[i])
		}
		return "";
	};

	GridElementsList.prototype.findById = function (id) {
		for (var i = 0; i < this.data.length; i++) {
			if (id === this.data[i].Id){
				return this.data[i];
			}
		}
		return null;
	};

	GridElementsList.prototype.filter = function (key, value) {
		var i,
			resources,
			result = [];

		for (i = 0; i < this.data.length; i++) {
			resources = this.data[i].resources;

			if (resources && resources[key] === value ) {
				result.push(this.data[i]);
			}
		}
		return result;
	};

	return GridElementsList;
}());
var GridList = (function(){

	function GridList(jsonData, repository) {
		this.data = jsonData || [];
		this.repo = repository;
	}

	GridList.prototype.addGrid  = function (newitem) {
		newitem.id = "grid_" + (this.data.length + 1);
		this.data.push(newitem);
		this.repo.set(this.data);
	};



	GridList.prototype.save  = function () {
		this.repo.set(this.data);
	};

	GridList.prototype.update  = function (item) {
		var index = this.data.indexOf(item);
		this.data[index] = item;
		this.repo.set(this.data);
	};

	GridList.prototype.remove  = function (item) {
		this.data.splice(this.data.indexOf(item), 1);
		this.repo.set(this.data);
	};

	GridList.prototype.getGrid  = function (gridId) {
		for (var i = 0; i < this.data.length; i++) {
			var obj = this.data[i];
			if (obj.id === gridId ) {
				return new Grid (obj);
			}
		}
		return new Grid();
	};

	GridList.prototype.getGridByLink  = function (link) {
		for (var i = 0; i < this.data.length; i++) {
			var obj = this.data[i];
			if (obj.Link === link ) {
				return new Grid (obj)
			}
		}
		return new Grid();
	};

	return GridList;
}());


/*global MaspartiData, ApiWrapper*/
var  galleryImageViewerController = ["$scope", "$routeParams", "$api", "$location", function($scope, $routeParams, $api, $location) {

	$scope.$on("galleryImageViewer-display-image", function (e, galleryId, imageIndex) {
		$scope.imageIndex = imageIndex;
		$scope.galleryId = galleryId;
		getImage(galleryId, imageIndex);
	});


	$scope.$on("global-keydown", function (e, $event) {
		if (!visible()) {
			return;
		}
		var key = $event.keyCode;
		switch (key) {
			case 27 :
				$scope.close();
				break;
			case 37 :
				$scope.prev();
				break;
			case 32 :
			case 39 :
				$scope.next();
				break;
		}
	});

	$scope.$on("ngc-responsive-image-loading", function (e, data) {
		$scope.loading = data;
		if ($scope.$$phase !== "$digest"){
			$scope.$digest();
		}
	});

	$scope.$on("ngc-responsive-image-skipping", function (e, data) {
		$scope.skipping = data;
		if ($scope.$$phase !== "$digest") {
			$scope.$digest();
		}
	});

	function visible() {
		return $scope.gallery !== null && $scope.gallery !== undefined;
	}

	function getImage(galleryId, index) {
		if (!$scope.gallery) {
			$scope.newindex = index;
			$api.getAlbumPhotos(galleryId).then(function (data) {
				$scope.gallery = data.data;
				$scope.image = $scope.gallery[index];
			});
			return;
		}
		$scope.image = $scope.gallery[index];
	}

	$scope.close = function () {
		$location.search("gid", null);
		$location.search("i", null);
		$scope.gallery = null;
	};

	$scope.next = function () {
		var length = $scope.gallery.length,
			imageIndex = $scope.imageIndex;

		imageIndex++;
		if (imageIndex >= length) {
			imageIndex = 0;
		}

		$location.search("i", imageIndex);
	};

	$scope.prev = function () {
		var length = $scope.gallery.length,
			imageIndex = $scope.imageIndex;

		imageIndex--;
		if (imageIndex <= 0) {
			imageIndex = length - 1;
		}
		$location.search("i", imageIndex);
	};

}];





var gridelementAlbumCtrl = ["$scope", "$api", "$routeParams", "$location", "$notify", "$gallery", function ($scope, $api, $routeParams, $location, $notify, $gallery) {
	var resources = $scope.gridelement.resources || {},
		content = $scope.gridelement.Content || {};

	function getResource(key, defaultValue) {
		return resources[key] || defaultValue || "";
	}

	function getContentProperty(key, defaultValue) {
		return content[key] || defaultValue || "";
	}

	$scope.gdataAlbumId = getContentProperty("gdataAlbumId", null);
	$scope.route = {
		link: $routeParams.link
	};

	$scope.name = getResource("name", " ");
	$scope.type = getResource("type");
	$scope.services = getResource("services");
	$scope.year = getResource("year");
	$scope.text = getResource("text");

	$scope.cssRatio = getContentProperty("ratio", "ratio16_9");

	$api.getAlbum($scope.gdataAlbumId, {size: 417, isSquare: false, type: 0})
		.then(function (data) {
			if (data) {
				$scope.album = data.data;
			}
		});

	$scope.imageClick = function () {
		$gallery.showBy(function (obj) {
			var value = obj.resources.name || null;
			return value === $scope.name;
		});
	};
}];

var gridelementAlbumOverlayCtrl = ["$scope", "$api", "$routeParams", "$location", "$notify", "$gallery", "$markdown", function ($scope, $api, $routeParams, $location, $notify, $gallery, $markdown) {
	$scope.gdataAlbumId = getAlbumId();
	$scope.route = {
		link: $routeParams.link
	};

	function getAlbumId() {
		var x = $scope.gridelement.Content;
		return x !== null ? x.gdataAlbumId : null;
	}

	var resources = $scope.gridelement.resources || {};

	function getResource(key) {
		return resources[key] || "";
	}

	$scope.name = getResource("name");
	$scope.type = getResource("type");
	$scope.services = getResource("services");
	$scope.year = getResource("year");
	$scope.text = $markdown.toHtml(getResource("text"));

	$scope.toHtml = function (value) {
		return $markdown.toHtml(value);
	};

	$api.getAlbumPhotos($scope.gdataAlbumId)
		.then(function (data) {
			if (data) {
				$scope.albumPhotos = data.data;
				$scope.currentImage = $scope.albumPhotos[0];
				$scope.currentImageIndex = 0;
			}
		});

	$scope.showImagePreview = function (index) {
		$scope.currentImage = $scope.albumPhotos[index];
		$scope.currentImageIndex = index;
	};

	$scope.prevImage = function () {
		if ($scope.currentImageIndex >= 1) {
			$scope.currentImageIndex--;
			$scope.currentImage = $scope.albumPhotos[$scope.currentImageIndex];
		}
	};

	$scope.nextImage = function () {
		if ($scope.currentImageIndex < $scope.albumPhotos.length - 1 ) {
			$scope.currentImageIndex++;
			$scope.currentImage = $scope.albumPhotos[$scope.currentImageIndex];
		}
	};

	$scope.$on("global-keydown", function (e, $event) {
		var key = $event.keyCode;

		switch (key) {
			case 37:
				$scope.prevImage();
				break;
			case 39:
				$scope.nextImage();
				break;
		}
	});


}];var gridelementGdataAlbumCtrl =  ["$scope", "$api", "$routeParams", "$location", "$rootScope", function ($scope, $api, $routeParams, $location) {
	$scope.gdataAlbumId = getAlbumId();
	$scope.route = {
		link: $routeParams.link
	};

	function getAlbumId() {
		var x = $scope.gridelement.Content;
		return x !== null ? x.gdataAlbumId : null;
	}

	$scope.header = $scope.gridelement.Resources.header.Value;
	$scope.text = $scope.gridelement.Resources.text.Value;

	$api.getAlbum($scope.gdataAlbumId, {size:100, isSquare: true, type: 2})
	//$api.getAlbum($scope.gdataAlbumId)
		.then(function (data) {
			$scope.album = data.data;
		});

	$scope.showImage = function (galleryId, imageIndex) {
		$location.search("i", imageIndex);
		$location.search("gid", galleryId);
	};

}];var homeController = ["$scope", "$api", function ($scope, $api) {

	$scope.homeData = [];
	$scope.nextWorkData = [];
	$scope.pageLink = "projekty";
	$scope.loadedData = false;
	$scope.loadedImages = false;
	$scope.showLoader = true;

	$scope.tempLength = 0;
	function getPhotos(index, gdataAlbumId) {
		return $api.getAlbumPhotos(gdataAlbumId)
			.then(function (photos) {
				$scope.homeData[index].images = photos.data[0];
				$scope.tempLength ++ ;
				if ($scope.tempLength > $scope.homeData.length) {
					$scope.loadedImages = true;
				}
			})
	}
	var container = $(".page-home");
	container.hide();

	function updateContainerDimensions(container, windowWidth, windowHeight) {
		var width = container.width(),
			height = container.height(),
			ratio,
			newWidth;
		if ($scope.disableAutoFormat) {
			return;
		}
		if (windowWidth > width  ){
			ratio = width / height;
			newWidth = Math.floor(ratio * windowHeight - 50);
			container.css("max-width", newWidth );
		}
	}
	$scope.$on("windowChanged", function (e, data) {
		updateContainerDimensions(container, data.width, data.height);
	});


	$api.getPage($scope.pageLink)
		.then(function (data) {
			$scope.homeData = data.data.GridElements;
			setTimeout(function () {
				$scope.loadedData = true;
				$scope.$digest();
			},1000);

			updateContainerDimensions(container, $(window).width(), $(window).height());

			$scope.$emit("data-loaded");

			return data.data;
		})
		.then(function (data) {
			var x = [];
			for (var i = 0; i < data.GridElements.length; i++) {
				var content = data.GridElements[i].Content;
				x.push(getPhotos(i, content.gdataAlbumId));
			}
		});

	$scope.showNextWork = function () {
		$scope.nextWork = true;
		$scope.disableAutoFormat = true;
		$("html, body").animate({ scrollTop: $(document).height() }, 1000);
	}
}];var loginController = ["$scope", "cmsApi",  function($scope, cmsApi) {
	var api = new ApiWrapper(cmsApi);

	var loading = function (type) {
		if (type) {
			$scope.message = null;
		}
		$scope.loading = type === null || typeof type === "undefined" ? true : type;
	};
	loading();

	cmsApi.getRequestToken(function (data) {
		$scope.RequestToken = data.RequestToken;
		loading(false);
	}, function () {
		$scope.message = "Přihlašovací službe je nedostupná.";
	});

//	function getQueryStrings() {
//		var assoc  = {};
//		var decode = function (s) { return decodeURIComponent(s.replace(/\+/g, " ")); };
//		var queryString = location.search.substring(1);
//		var keyValues = queryString.split('&');
//
//		for(var i in keyValues) {
//			var key = keyValues[i].split('=');
//			if (key.length > 1) {
//				assoc[decode(key[0])] = decode(key[1]);
//			}
//		}
//		return assoc;
//	}

	var parserStatus = function (status) {
		var message;

		switch (status) {
			case 401:
				message = "Špatné heslo nebo login";
				break;
			case 400:
			case 500:
				message = ".";
				break;
			default :
				message = "Vyskytla se neznámá chyba ".status;
		}
		return message;
	};

	$scope.submit = function () {
		loading();
		var x = {};
		x.UserName = $scope.UserName;
		x.Password = $scope.Password;
		x.RequestToken = $scope.RequestToken;

		cmsApi.login(x, function (data) {
				window.location.hash = "home";
				loading(false);
			},
			function (err) {
				$scope.message = parserStatus(err.status);
				loading(false);
			});
	}
}];var pController =  [ "$scope", "$api", "$routeParams", "$location", "$notify",
	function($scope, $api, $routeParams, $location, $notify) {
	$scope.link = $routeParams.link;
	var getIndex = function () {
		var search = $location.search().elindex,
			elemIndex = $routeParams.elementIndex,
			index;
		index = !isNaN(elemIndex) ? elemIndex : 0;
		if (!isNaN(search)) {
			index = search;
		}
		return Number(index, 10) || 0 ;
	};

	var setBoundaries = function (index) {
		var length = $scope.page.GridElements.length;
		$scope.isFirst = index === 0;
		$scope.isLast = index === length - 1;
	};


	$scope.loading = true;
	var getPagePromise = $api.getPage($scope.link)
		.then(function (response) {
			var index = getIndex();
			$scope.page = response;
			setBoundaries(index);
			$scope.currentGridElement = $scope.page.GridElements[index];
			$notify.trigger("content-loaded");
			return response;
		});

	var setNewLocation = function (index) {
		$location.search("elindex", index);
		getPagePromise.then(function () {
			$scope.currentGridElement = $scope.page.GridElements[index];
			setBoundaries(index);
		});
	};

	$scope.next = function () {
		var galleryIndex = getIndex(),
			length = $scope.page.GridElements.length;

		galleryIndex++;
		if (galleryIndex > length - 1) {
			return;
		}
		setNewLocation(galleryIndex);
	};

	$scope.prev = function () {
		var galleryIndex = getIndex();

		if (galleryIndex <= 0) {
			return;
		}
		galleryIndex--;
		setNewLocation(galleryIndex);
	};

	var el = angular.element(".navigation");
	angular.element(window).scroll(function () {
		var fromTop = $(this).scrollTop(),
			threshold = 50;

		if (fromTop > threshold && !$scope.isScrolled) {
			$scope.isScrolled = true;
			el.addClass("scrolled");
		}
		if (fromTop < threshold && $scope.isScrolled) {
			$scope.isScrolled = false;
			el.removeClass("scrolled");
		}
	});
}];var pageController = ["$scope", "$api", "$routeParams", "$gallery", "$notify", "$timeout", function ($scope, $api, $routeParams, $gallery, $notify, $timeout) {
	var source = null;

	$scope.link = $routeParams.link;

	$notify.trigger("content-loading");
	$api.getPage($scope.link)
		.then(function (data) {
//$timeout(function () {
			$scope.page = data;
			$scope.gridElements = $scope.page.GridElements || [];
			$scope.groups = $scope.page.groups;
			$notify.trigger("content-loaded");
			source = new GridElementsList($scope.page.GridElements);
			$gallery.loadData(data.GridElements || []);
			return data;
//},2000)
		}, function (err) {
			console.log("ERROR!!", err.status);
		})

		.then(function (data) {
			setTimeout(function () {
				$api.checkForSnapshot($scope, data);
			}, 3000);
		});

	$scope.filter = function (value) {
		if (value === undefined) {
			$scope.filterValue = null;
			$scope.gridElements = source.data;
			return;
		}
		$scope.filterValue = value;
		$scope.gridElements = source.filter("group", value);
	};

	$scope.isSelectedFilter = function (value) {
		return $scope.filterValue === value ? "selected" : null;
	};

}];

var simplehtml = ["$scope", "$markdown", function ($scope, $markdown) {
	var gridElement = $scope.getGridElement(),
		resources = gridElement.resources || {};

	function getResource(key) {
		return resources[key] || "";
	}
	//console.log("xx",getResource("text"), $markdown.toHtml(getResource("text")));

	$scope.ContentToHtml = function () {
		return $markdown.toHtml(getResource("text"));
	};
}];var userDataForm = ["$scope", "cmsApi", "$routeParams", function($scope, cmsApi, $routeParams) {
	$scope.link = $routeParams.link;

	var parserStatus = function (status) {
		var message;

		switch (status) {
			case 401:
				message = "Pro odeslání formuláře je potřeba se přihásit. ";
				break;
			case 400:
			case 500:
				message = ".";
				break;
			default :
				message = "Vyskytla se neznámá chyba ".status;
		}
		return message;
	};

	$scope.post = function () {
		cmsApi.putUserData({data: $scope.data, key: $scope.key}, function (data) {
		}, function (err) {
			$scope.$emit("set-message", parserStatus(err.status));

		});
	};

	$scope.serialized = function () {
		JSON.stringify($scope.data);
	}
}];var ngcGdataAlbumDirective = ["cmsApi", function(cmsApi) {
	var api = new ApiWrapper(cmsApi);

	return {
		scope: { ngcGdataAlbum: "=" },
		compile: function (iElement, iAttrs, transclude) {
			return function (scope, element, attrs) {

				api.getAlbum(scope.ngcGdataAlbum).then(function (data) {
				});
			};
		}
	};
}];function ngcLazyImage() {
	var loader = "resources/loaders/loader16.gif";

	return {
		scope: {
			ngcLazyImage: "="
		},
		link: function (scope, element, attrs) {
			if (attrs.loader !== undefined ){
				loader = attrs.loader;
			}
			//element.attr("src", loader);

			scope.$watch("ngcLazyImage", function (url, oldValue) {
				if (url !== undefined){
					element.attr("src", url);
				}
			});
		}
	}
}function ngcOverlay() {
	return {
		restrict: "E",
		transclude: true,
		templateUrl: "Templates/template.ngcOverlay.html",
		compile: function (x) {
			return function (scope, element, attrs) {
			}
		}

	}
}var ngcResponsiveImage = function () {
	var getWidth = function (scope) {
		return scope.windowWidth;
	};
	var getWindowHeight = function (scope) {
		return scope.windowHeight;
	};

	var imageByWindowSize = function (windowWidth, galleryImage) {
		var imageUrl = galleryImage.FullSize.PhotoUri;

		if (windowWidth >= 768 && windowWidth < 1200) {
			imageUrl = galleryImage.Large.PhotoUri;
		}
		if (windowWidth >= 480 && windowWidth < 768) {
			imageUrl = galleryImage.Medium.PhotoUri;
		}

		if (windowWidth < 480) {
			imageUrl = galleryImage.Small.PhotoUri;
		}

		return imageUrl;
	};

	var getImage = function (url) {
		var image = new Image(),
			promise;

		image.src = url;
		promise = $.Deferred();


		$(image).load(function () {
			var loadimage = this;
			setTimeout(function () {
				promise.resolve(loadimage);
			}, 10)
		});

		return promise;
	};

	var renderImage = function (scope) {
		var overflowWidth = getWidth(scope) < scope.imageWidth;
		var overflowHeight = getWindowHeight(scope) < scope.imageWidth;

		if (overflowWidth) {
			scope.containerWidth = null;
		} else {
			scope.containerWidth = scope.imageWidth;
		}

		if (overflowHeight) {
			var windowHeight = getWindowHeight(scope);
			scope.containerWidth = Math.round(scope.imageWidth / scope.imageHeight * (windowHeight));
		}
	};

	var renderImageFullSize = function (scope) {
		scope.containerWidth = scope.imageWidth;
	};

	var refreshImage = function (scope, galleryImage, element) {
		var windowWidth = getWidth(scope),
			timeout,
			url = imageByWindowSize(windowWidth, galleryImage);

		scope.loading = true;
		timeout = setTimeout(function () {
			scope.showLoader = scope.loading;
			scope.$emit("ngc-responsive-image-loading", scope.loading);
			scope.$digest();
		}, 200);

		scope.imagePromise = getImage(url).done(function (image) {
			scope.imageWidth = image.width;
			scope.imageHeight = image.height;
			renderImage(scope);
			scope.source = url;
			scope.loading = false;
			scope.showLoader = false;
			clearTimeout(timeout);
			scope.$emit("ngc-responsive-image-loading", false);
			scope.$emit("ngc-responsive-image-skipping", false);
			scope.skipping = false;
			resetPosition(element);
			scope.$apply();

		});
	};

	var resetPosition = function (element) {
		element.css("position", "relative");
		element.css("margin", "0 auto");
		element.css("left", "auto");
		element.css("top", "auto");
	};

	return {
		scope: {
			galleryImage: "="
		},
		controller: [ "$scope", function ($scope) {

			$scope.containerWidth = "16";
			$scope.windowWidth = $(window).width();
			$scope.windowHeight = $(window).height();

			$scope.isFullSize = function () {
				return $scope.imageWidth <= $scope.containerWidth;
			};

			$scope.isFullSizeCssClass = function () {
				if (!$scope.isFullSize()) {
					return "icon-resize-full";
				}
				return "icon-resize-small";
			};

			$scope.showFullSize = function () {
				if (!$scope.isFullSize()) {
					renderImageFullSize($scope);
				}
				else {
					renderImage($scope);
				}
			};

			$scope.isMovable = function () {
				return $scope.isOverFlowable() && $scope.isFullSize() ? "movable" : "";
			};

			$scope.fullSizeTooltip = function () {
				return $scope.isFullSize() ? "Přizpůsobit na stránku" : "Zobrazit původní velikost";
			};

			$scope.isOverFlowable = function () {
				return $scope.windowHeight < $scope.imageHeight || $scope.windowWidth < $scope.imageWidth;
			};

			$scope.getCssWidth = function (width, a) {
				return width === null ? "auto" : width + "px";
			};
			$scope.getCssHeight = function (height) {
				return height === null ? "auto" : height + "px";
			};
		}],
		restrict: "E",
		replace: true,
		templateUrl: "Templates/template.ngcResponsiveImage.html",
		compile: function () {
			return function (scope, el) {
				var element = el.find(".draggable");

				scope.source = null;
				scope.$watch("galleryImage", function (galleryImage, oldValue) {
					if (galleryImage === undefined) {
						return;
					}
					if (scope.imagePromise) {
						if (scope.imagePromise.state() === "pending") {
							scope.imagePromise.reject();
							scope.skipping = true;
							scope.$emit("ngc-responsive-image-skipping", true);
						}
					}
					refreshImage(scope, galleryImage, element);
				});

				scope.$watch("containerWidth", function (value, oldValue) {
					var isShrinking = oldValue > value;
					element.css("width", value);

					if (isShrinking) {
						resetPosition(element);
					}
				});

				scope.$on("windowChanged", function (x, data) {
					scope.windowWidth = data.width;
					scope.windowHeight = data.height;
					if (scope.galleryImage){
						refreshImage(scope, scope.galleryImage, element)
					}
				});
			}
		}

	};
};function simpleDragDirective() {
	
	var setPosition = function (event, element, offsetX, offsetY) {
		var newLeft,
			newTop;

		if (event.pageX && event.pageY) {
			newLeft = event.pageX - offsetX;
			newTop = event.pageY - offsetY;
			
			element.css("left", newLeft);
			element.css("top", newTop);
		}
	};
	
	return  {
		link: function (scope, element, attr) {
			var offsetX = 0;
			var offsetY = 0;
			element.bind({
				dragstart: function (e) {
					var event = e.originalEvent;
					offsetX = event.offsetX;
					offsetY = event.offsetY;

					setPosition(event, element, offsetX, offsetY);

					element.css("position", "absolute");
				},
				dragover: function (e) {
					var event = e.originalEvent;
					e.stopPropagation();
					e.preventDefault();
					var dt = e.originalEvent.dataTransfer;
					dt.effectAllowed = dt.dropEffect = 'none';

					setPosition(event, element, offsetX, offsetY);
				},
				dragenter: function (e) {
					e.stopPropagation();
					e.preventDefault();
					var dt = e.originalEvent.dataTransfer;
					dt.effectAllowed = dt.dropEffect = 'none';
				}
			});
		}
	}
}angular.module('HashBangURLs', []).config(['$locationProvider', function ($location) {
	$location.hashPrefix('!');
}]);

var module = angular.module("defaultClient", ["ngRoute", "galleryBrowser", "repo", "ui.keypress", "ui.event", "ui.bootstrap", "HashBangURLs", "stringutils"]);

module.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
		.when('/page/:link', {reloadOnSearch: false, controller: pageController, templateUrl: 'Templates/template.page.html', resolve: {api: "$api"}})
		.when('/p/:link', {reloadOnSearch: false, controller: pController, templateUrl: 'Templates/template.p.html'})
		.otherwise({redirectTo: '/page/projekty'});
}]);

module.directive('shortcut', function () {
	return {
		restrict: 'E',
		replace: true,
		scope: true,
		link: function (scope) {
			jQuery(document).on('keydown', function (e) {
				scope.$apply(scope.keyPressed(e));
			});
		}
	};
});

module.directive("gridelement", ["$compile", "$templateCache", "$timeout", function ($compile, $templateCache, $timeout) {
	var timeout;
	return {
		scope: { grid: "=", gridelement: "="},
		link: function (scope, iElement, tAttrs, controller) {
			scope.$watch("gridelement", function (val) {
				if (!val) {
					return;
				}
				var skin = scope.gridelement.Skin || tAttrs.skin || null,
					skinStr = skin ? "_" + skin : "";
				var template = $templateCache.get(scope.gridelement.Type + skinStr + ".thtml");
				var compiled = $compile(template)(scope);

				if (timeout) {
					$timeout.cancel(timeout);
				}
				timeout = $timeout(function () {
					scope.$emit("page-loaded");
				}, 500);

				iElement.html(compiled);
			});
			scope.getGridElement = function () {
				return scope.gridelement;
			};
		}
	};
}]);

module.directive("ngcOverlay", ngcOverlay);
module.directive("ngcGdataAlbum", ngcGdataAlbumDirective);
module.directive("ngcLazyImage", ngcLazyImage);
module.directive("ngcSimpleDrag", simpleDragDirective);
module.directive("ngcResponsiveImage", ngcResponsiveImage);


module.controller("appController", ["$scope", "$api", "$location", "$rootScope", "$timeout", "$routeParams", "$notify",
	function ($scope, $api, $location, $rootScope, $timeout, $routeParams, $notify) {
		$scope.showContent = false;
		$(".centered-container")
			.css("height", $(window).height())
			.css("width", $(window).width());

		var timeout;
		$(window).resize(function () {
			if (timeout) {
				$timeout.cancel(timeout);
			}
			timeout = $timeout(function () {
				$scope.$broadcast("windowChanged", {
					width: $(window).width(),
					height: $(window).height()
				})
			}, 200);
		});

		var loaderTimeout;
		$notify.addEventListener("content-loading", function () {
			loaderTimeout = setTimeout(function () {
				$scope.$apply(function () {
					$scope.showLoader = true;
				});
			}, 500);
		});


		$notify.addEventListener("content-loaded", function () {
			clearTimeout(loaderTimeout);
			$scope.showLoader = false;
			$scope.showContent = true;
		});

		$scope.globalKeydown = function (event) {
			$scope.$broadcast("global-keydown", event);
		};

		$scope.$on("set-message", function (e, message) {
			$scope.message = message;
		});

		$scope.$on("page-loaded", function () {
			var pageContent = $("html").html();
			$api.snapshot(pageContent, $location.path());
		});

		var processShowImageEvent = function () {
			var search = $location.search();
			if (search.gid && search.i !== undefined) {
				$rootScope.$broadcast("galleryImageViewer-display-image", search.gid, search.i);
			}
		};

		$scope.$watch("resourcesLoaded", function (value) {
			if (value) {
				processShowImageEvent();
			}
		});

		$scope.isSelectedLink = function (value) {
			return $routeParams.link === value ? "selected" : null;
		};
	}]);



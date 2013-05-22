/*global MenuItemList, RawDataConverter, GalleryList*/
var ApiWrapper = (function () {

	function ApiWrapper(cmsApiImpl, cache) {
		this.cmsApi = cmsApiImpl;
		this.cache = cache;
		//this.converter = new RawDataConverter();
	}

	ApiWrapper.prototype.getPage = function (link) {
		var deferred = $.Deferred();

		this.cmsApi.getPage({id:link}, function (data) {
			deferred.resolve(data);
		},
		function (err){
			var returnUrl = (window.location);
			var hash = (window.location.hash);
			window.location.hash = "login";//?returnuccrl=" + hash;
		});
		return deferred;
	};

	ApiWrapper.prototype.getPages = function () {
		var deferred = $.Deferred();

		this.cmsApi.getPages(function (data) {
			deferred.resolve(data);
		});
		return deferred;
	};

	ApiWrapper.prototype.getAlbum = function (albumId) {
		var deferred = $.Deferred();

		if (albumId === null) {
			deferred.resolve(null);
			return deferred;
		}
		this.cmsApi.getAlbum({id: albumId }, function (data) {
			deferred.resolve(data);
		});
		return deferred;
	};
	ApiWrapper.prototype.getAlbumPhotos = function (albumId) {
		var deferred = $.Deferred();

		this.cmsApi.getAlbumPhotos({id: albumId }, function (data) {
			deferred.resolve(data);
		});
		return deferred;
	};
	ApiWrapper.prototype.getAlbums = function () {
		var deferred = $.Deferred();

		this.cmsApi.getAlbums(function (data) {
			deferred.resolve(data);
		});
		return deferred;
	};

	return ApiWrapper;
}());
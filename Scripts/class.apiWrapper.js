/*global MenuItemList, RawDataConverter, GalleryList*/
var ApiWrapper = (function () {

	function ApiWrapper(cmsApiImpl, cache) {
		this.cmsApi = cmsApiImpl;
		this.cache = cache;
	}

	ApiWrapper.prototype.chuj = function (key, deferred, callback) {
		var response = this.cache.get(key);

		if (response) {
			deferred.resolve(response);
			return deferred;
		}
		callback();
		return deferred;
	};

	ApiWrapper.prototype.getPage = function (link) {
		var deferred = $.Deferred(),
			key = "getPage_" + link,
			self = this;

		this.chuj(key, deferred, function () {
			self.cmsApi.getPage({id: link}, function (data) {
					self.cache.put(key, data);
					deferred.resolve(data);
				},
				function (err) {
					var returnUrl = (window.location);
					var hash = (window.location.hash);
					if (err.status === 403){
						window.location.hash = "!login";//?returnuccrl=" + hash;
					}
				});
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
		var deferred = $.Deferred(),
			key = albumId + "getAlbumPhotos",
			self = this;

		if (!albumId) {
			deferred.resolve([]);
			return deferred;
		}

		this.chuj(key, deferred, function () {
			self.cmsApi.getAlbumPhotos({id: albumId }, function (data) {
				self.cache.put(key, data);
				deferred.resolve(data);
			});
		});

		return deferred;
	};

	ApiWrapper.prototype.getPhotos = function () {
		var deferred = $.Deferred(),
			key = "getAlbumPhotosStream",
			self = this;

		this.chuj(key, deferred, function () {
			self.cmsApi.getPhotos(function (data) {
				self.cache.put(key, data);
				deferred.resolve(data);
			});
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

	ApiWrapper.prototype.snapshot = function (pageContent, path) {
		var deferred = $.Deferred();

		this.cmsApi.putSnapshot({data: pageContent, path: path}, function (data) {
			deferred.resolve(data);
		});

		return deferred.promise();
	};

	ApiWrapper.prototype.checkForSnapshot = function (scope, data) {
		if (data.snapshot){
			scope.$emit("page-loaded");
		}
	};

	return ApiWrapper;
}());
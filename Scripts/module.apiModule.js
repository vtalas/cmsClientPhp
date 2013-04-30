angular.module('apiModule', ['ngResource', 'appConfigModule'])
	.factory('cmsApi', ['$resource', 'appConfig', function ($resource, appConfig) {
		var api = $resource(appConfig.baseUrl  +'Service/serverProxy.php?action=:action',
			{   },
			{
				getPage: { method: 'GET', isArray: false, params: {action: "getPage"} },
				getPages: { method: 'GET', isArray: true, params: {action: "getPages"} },
				getAlbums: { method: 'GET', isArray: true, params: {action: "getAlbums"} },
				getAlbum: { method: 'GET', isArray: false, params: {action: "getAlbum"} },
				getAlbumPhotos: { method: 'GET', isArray: true, params: {action: "getAlbumPhotos"} }
			});

		return api;
	}]);


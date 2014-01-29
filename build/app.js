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

/*global Showdown, angular*/
"use strict";
var moduleMaps = angular.module("maps", []);

moduleMaps.directive("ngcGoogleMap", ['$sce', '$parse', function ($sce, $parse) {

	var defaults = {
		zoom: 18,
		lat: 49.214807,
		lng: 16.570445
	};

	return {
		scope: {
			ngcGoogleMap: "="
		},
		link: function (scope, element, attr) {
			var init = function () {
				var options = angular.extend(defaults, scope.ngcGoogleMap),
					mapOptions = {
						center: new google.maps.LatLng(options.lat, options.lng),
						zoom: options.zoom
					};
				var map = new google.maps.Map(element[0], mapOptions);
				scope.map = map;
			};

			init();
//			google.maps.event.addDomListener(window, 'load', init);
		}
	};


}]);

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

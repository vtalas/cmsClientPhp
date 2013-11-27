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
}());
var Gallery = (function () {
	"use strict";

	function Gallery() {
		this.data = [];
		this.currentIndex = -1;
		this.galleryId = null;
	}

	Gallery.prototype.loadData = function (data) {
		this.data = data || [];
	};

	Gallery.prototype.show = function (index) {
		this.currentIndex = this.data[index] ? index : 0;
		return this.data[this.currentIndex];
	};

	Gallery.prototype.current = function () {
			return this.data[this.currentIndex];
	};

	Gallery.prototype.next = function () {
		this.currentIndex++;
		return this.data[this.currentIndex];
	};

	Gallery.prototype.prev = function () {
		this.currentIndex--;
		return this.data[this.currentIndex];
	};

	return Gallery;
}());
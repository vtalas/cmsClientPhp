var ItemBrowser = (function () {
	"use strict";

	var defaults = function () {
		return {

		};
	};

	function ItemBrowser(items, settings) {
		this.settings = angular.extend(defaults(), settings);
		this.items = items || [];
		this.currentIndex = 0;
	}

	ItemBrowser.prototype.next = function () {
		if (this.currentIndex < this.items.length - 1) {
			this.currentIndex++;
		}
		return this.getCurrent();
	};

	ItemBrowser.prototype.previous = function () {
		if (this.currentIndex > 0) {
			this.currentIndex--;
		}
		return this.getCurrent();
	};

	ItemBrowser.prototype.selectByIndex = function (index) {
		if (index > 0 && index < this.items.length)  {
			this.currentIndex = index;
		}
		return this.getCurrent();
	};

	ItemBrowser.prototype.getNext = function () {
		if (this.currentIndex === -1) {
			return null;
		}
		return this.items[this.currentIndex + 1] || null;
	};

	ItemBrowser.prototype.getPrevious = function () {
		return this.items[this.currentIndex - 1] || null;
	};

	ItemBrowser.prototype.getCurrent = function () {
		return this.items[this.currentIndex] || null;
	};

	return ItemBrowser;

}());

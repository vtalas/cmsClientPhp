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

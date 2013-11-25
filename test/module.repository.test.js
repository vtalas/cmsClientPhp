/*global describe,it,module, beforeEach */
describe('myApp', function () {
	beforeEach(module('repo', function ($provide) {

	}));

	it('should alert on $window', inject(function (db) {

	}));
});

describe("Gallery browser module test", function () {
	beforeEach(function () {
		module('galleryBrowser', function () {

		});
	});

	it("initialization", inject(function ($gallery) {
		spyOn($gallery.settings, "onLoad");
		$gallery.loadData(["a", "b", "c"]);
		expect($gallery.data.length).toBe(3);
		expect($gallery.settings.onLoad).toHaveBeenCalled();
	}));

	it("initialization", inject(function ($gallery) {
		spyOn($gallery.settings, "onLoad");
		$gallery.loadData();
		expect($gallery.data.length).toBe(0);
		expect($gallery.settings.onLoad).toHaveBeenCalled();

	}));

	it("initialization", inject(function ($gallery) {
		spyOn($gallery.settings, "onLoad");
		$gallery.loadData("aaa");
		expect($gallery.data.length).toBe(1);
		expect($gallery.data[0]).toBe("aaa");
		expect($gallery.settings.onLoad).toHaveBeenCalled();
	}));

	it("Test 1", function () {



	});
});

describe("Gallery tests", function () {
	var gallery,
		galleryData = ["a", "b", "c"];

	beforeEach(function () {
		var settings = {
		};
		gallery = new Gallery(settings);
		spyOn(gallery.settings, "onChange");
		spyOn(gallery.settings, "onLoad");
		gallery.loadData(galleryData);

	});

	it("initialization", function () {
		expect(gallery.settings.onLoad).toHaveBeenCalled();
		expect(gallery.getCurrent()).toBeNull();
		expect(gallery.getPrevious()).toBeNull();
		expect(gallery.getNext()).toBeNull();
	});

	it("show gallery item", function () {
		gallery.showByIndex(1);
		expect(gallery.getCurrent()).not.toBeNull();
		expect(gallery.getCurrent()).toBe(galleryData[1]);
		expect(gallery.getPrevious()).toBe(galleryData[0]);
		expect(gallery.getNext()).toBe(galleryData[2]);
	});

	it("show gallery item at the begining", function () {
		gallery.showByIndex(0);
		expect(gallery.getCurrent()).not.toBeNull();
		expect(gallery.getCurrent()).toBe(galleryData[0]);
		expect(gallery.getPrevious()).toBeNull();
		expect(gallery.getNext()).toBe(galleryData[1]);
	});

	it("show gallery item at the end", function () {
		gallery.showByIndex(2);

		expect(gallery.settings.onChange).toHaveBeenCalled();
		expect(gallery.getCurrent()).not.toBeNull();
		expect(gallery.getCurrent()).toBe(galleryData[2]);
		expect(gallery.getPrevious()).toBe(galleryData[1]);
		expect(gallery.getNext()).toBeNull();
	});
});


describe("notification service", function () {
	beforeEach(function () {
		module('notifications', function () {
		});
	});

	it("listenr shoud be called on trigger", inject(function ($notify) {
		var spy = jasmine.createSpy("listener");
		$notify.addEventListener("xx", spy);
		$notify.trigger("xx");
		expect(spy).toHaveBeenCalled();
	}));

	it("listener should get data", inject(function ($notify) {
	}));
});

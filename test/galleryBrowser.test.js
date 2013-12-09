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


	it("fit landscape image (bigger) to 1:1 box", function () {
		var fitimage = new FitImage(569, 320, 417, 417);
		expect(fitimage.imageWidthCss()).toBe("auto");
		expect(fitimage.imageHeightCss()).toBe("100%");
	});

	it("fit 1:1 image (smaller) to 1:1 box", function () {
		var fitimage = new FitImage(10, 10, 20, 20);
		expect(fitimage.imageWidthCss()).toBe("100%");
		expect(fitimage.imageHeightCss()).toBe("auto");
	});
});

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
		module('galleryBrowser', function () {

		});
	});

	it("initialization", inject(function ($gallery) {
		var g = $gallery(["a", "b", "c"]);
		expect(g.data[0]).toBe("a");
		expect(g.data[0]).toBe("a");
	}));
});
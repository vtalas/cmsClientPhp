describe("String Utils test suite", function () {
	beforeEach(module('stringutils', function () {

	}));

	it('shoudl convert to html', inject(function ($markdown) {
		expect($markdown.toHtml("aaaa\n===")).toBe('<h1 id="aaaa">aaaa</h1>');
		expect($markdown.toHtml()).toBe('');
	}));
});
/*global describe, it,*/
describe("askjbdasjkd", function () {
	it("akdsbfasd", function () {
		var x = new GridElementsList([
			{resources:{name:"a"}},
			{resources:{name:"b"}},
			{resources:{name:"b"}},
			{resources:{name:"d"}},
		]);

		var f = x.filter("name","b");
		console.log(f.length);

		f = x.filter("name","a");
		console.log(f.length);
	});
});
var GridElementsList = (function () {

	function GridElementsList(gridElements){
		this.data = gridElements || [];
	}

	GridElementsList.prototype.getGroups = function () {
		for (var i = 0; i < this.data.length; i++) {
			console.log(this.data[i])
		}
		return "skdbaj";
	};

	GridElementsList.prototype.filter = function (key, value) {
		var i,
			resources,
			result = [];

		for (i = 0; i < this.data.length; i++) {
			resources = this.data[i].resources;

			if (resources[key] === value ) {
				result.push(this.data[i]);
			}
		}
		return result;
	};

	return GridElementsList;
}());
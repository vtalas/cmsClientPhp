
var GridList = (function(){

	function GridList(jsonData, repository) {
		console.log("1111111111");
		this.data = jsonData || [];
		this.repo = repository;
	}

	GridList.prototype.addGrid  = function (newitem) {
		newitem.id = "grid_" + (this.data.length + 1);
		this.data.push(newitem);
		this.repo.set(this.data);
	};



	GridList.prototype.save  = function () {
		this.repo.set(this.data);
	};

	GridList.prototype.update  = function (item) {
		var index = this.data.indexOf(item);
		this.data[index] = item;
		this.repo.set(this.data);
	};

	GridList.prototype.remove  = function (item) {
		this.data.splice(this.data.indexOf(item), 1);
		this.repo.set(this.data);
	};

	GridList.prototype.getGrid  = function (gridId) {
		for (var i = 0; i < this.data.length; i++) {
			var obj = this.data[i];
			if (obj.id === gridId ) {
				return new Grid (obj);
			}
		}
		return new Grid();
	};

	GridList.prototype.getGridByLink  = function (link) {
		for (var i = 0; i < this.data.length; i++) {
			var obj = this.data[i];
			if (obj.Link === link ) {
				return new Grid (obj);
			}
		}
		return new Grid();
	};

	/*
		@returns Array<Grid>
	 */
	GridList.prototype.getGridsByCategory  = function (category) {
		var result = [];
		for (var i = 0; i < this.data.length; i++) {
			var obj = this.data[i];
			if (obj.Category === category ) {
				result.push(new Grid (obj));
			}
		}
		return result;
	};

	return GridList;
}());



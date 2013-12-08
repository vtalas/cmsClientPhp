var Grid  = (function () {

	function Grid (data) {
		data = data || {};
		this.GridElements = data.GridElements || [];
		this.Link = data.Link || null;
		this.id = data.id || null;
		this.resources = data.resources || [];
		this.groups = data.groups || null;
		this.Name = data.Name = "";
	}
	return Grid;
}());

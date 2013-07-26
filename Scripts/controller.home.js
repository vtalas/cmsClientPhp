var homeController = ["$scope", "test", function ($scope, test) {

	$scope.homeImages = [];
	$scope.pageLink = "galerie";
	$scope.loading = true;


	test.getPage($scope.pageLink)
		.then(function (data) {
			console.log(data.data);
			$scope.homeData = data.data;
			return data.data;
		})
		.then(function (data) {
			var x = [];
			for (var i = 0; i < data.GridElements.length; i++) {
				var content = data.GridElements[i].Content;
				x.push(test.getAlbumPhotos(content.gdataAlbumId)
						.then(function (xx) {
							console.log(xx);
							$scope.homeImages.push(xx.data[0]);
						}))
				;
			}
			$.when.apply($, x).done(function () {
				console.log("sjkbdsjd", arguments);
			})


		});
}];
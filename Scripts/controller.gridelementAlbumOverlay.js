/*global ItemBrowser*/
var gridelementAlbumOverlayCtrl = ["$scope", "$api", "$routeParams", "$location", "$notify", "$gallery", "$markdown",
	function ($scope, $api, $routeParams, $location, $notify, $gallery, $markdown) {
		$scope.gdataAlbumId = getAlbumId();
		$scope.route = {
			link: $routeParams.link
		};

		function getAlbumId() {
			var x = $scope.gridelement.Content;
			return x !== null ? x.gdataAlbumId : null;
		}

		var resources = $scope.gridelement.resources || {};

		function getResource(key) {
			return resources[key] || "";
		}

		$scope.name = getResource("name");
		$scope.type = getResource("type");
		$scope.services = getResource("services");
		$scope.year = getResource("year");
		$scope.text = $markdown.toHtml(getResource("text"));

		$scope.toHtml = function (value) {
			return $markdown.toHtml(value);
		};

		var itemBrowser;
		$api.getAlbumPhotos($scope.gdataAlbumId)
			.then(function (data) {
				if (data) {
					$scope.albumPhotos = data.data;

					itemBrowser = new ItemBrowser(data.data);
					$scope.currentImage = itemBrowser.getCurrent();
					$scope.currentImageIndex = itemBrowser.currentIndex;

					$scope.previousImage = itemBrowser.getPrevious();
					$scope.nextImg = itemBrowser.getNext();
					console.log($scope.nextImage);
				}
			});

		$scope.showImagePreview = function (index) {
			$scope.currentImage = itemBrowser.selectByIndex(index);
			$scope.currentImageIndex = itemBrowser.currentIndex;

			$scope.previousImage = itemBrowser.getPrevious();
			$scope.nextImg = itemBrowser.getNext();
		};

		$scope.prevImage = function () {
			$scope.currentImage = itemBrowser.previous();
			$scope.currentImageIndex = itemBrowser.currentIndex;

			$scope.previousImage = itemBrowser.getPrevious();
			$scope.nextImg = itemBrowser.getNext();
		};

		$scope.nextImage = function () {
			$scope.currentImage = itemBrowser.next();
			$scope.currentImageIndex = itemBrowser.currentIndex;

			$scope.previousImage = itemBrowser.getPrevious();
			$scope.nextImg = itemBrowser.getNext();
		};

		$scope.$on("global-keydown", function (e, $event) {
			var key = $event.keyCode;

			switch (key) {
				case 37:
					$scope.prevImage();
					break;
				case 39:
					$scope.nextImage();
					break;
			}
		});


	}];
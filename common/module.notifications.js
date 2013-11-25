angular.module('notifications', [])
	.provider('$notify', function () {
		var instance = new EventDispatcher();
		return {
			$get: function () {
				instance.trigger = instance.dispatchEvent;
				return instance;
			}
		};
	});

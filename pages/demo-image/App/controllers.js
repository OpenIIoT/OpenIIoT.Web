'use strict';

app.controller('testController', ['$scope', 'HubProxyFactory', function ($scope, HubProxyFactory) {
        console.log('trying to connect to service');
        var chat = HubProxyFactory('../signalr', 'ItemHub');
        console.log('connected to service');
		
		$scope.subscribeFQN = 'OpenIIoT.Simulation.DateTime.Time';
		
        $scope.subscribe = function (fqn) { 
			chat.invoke('subscribe', $scope.subscribeFQN); 
		}
		
        $scope.unsubscribe = function (fqn) { 
			chat.invoke('unsubscribe', $scope.subscribeFQN); 
		}
		
		$scope.write = function (fqn, value) { 
			chat.invoke('write', [ $scope.subscribeFQN, value ])
		}

        chat.on('read', function (fqn, item) {
			$scope.fqn = fqn;
			$scope.rawItem = item;
			$scope.item = JSON.parse(item);
			$scope.itemAsImg = '<img src="data:image/gif;base64,' + $scope.item + '">';
			console.info($scope.itemAsImg);
        })
		
		chat.on('subscribeSuccess', function(fqn) {
		})
    }
]);
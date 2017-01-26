'use strict';

app.controller('testController', ['$scope', 'HubProxyFactory', function ($scope, HubProxyFactory) {
        console.log('trying to connect to service');
        var chat = HubProxyFactory('../signalr', 'LogHub');
        console.log('connected to service');
		
        $scope.subscribe = function (fqn) { 
			chat.invoke('subscribe'); 
		}
		
        $scope.unsubscribe = function (fqn) { 
			chat.invoke('unsubscribe', $scope.subscribeFQN); 
		}

        chat.on('read', function (fqn, item) {
			$('#myTable > tbody:last-child').append('<tr><td>' + JSON.parse(fqn) + '</td><td>' + JSON.parse(item) + '</td></tr>');
			window.scrollTo(0,document.body.scrollHeight);
        })
    }
]);
'use strict';

app.factory('HubProxyFactory', ['$rootScope', function ($rootScope) {
    function HubProxyFactory(serverUrl, hubName) {
        var connection = $.hubConnection(serverUrl);
        var proxy = connection.createHubProxy(hubName);

        connection.start().done(function () { });

        return {
            on: function (eventName, callback) {
                proxy.on(eventName, function (one,two) {
                    $rootScope.$apply(function () {
                        if (callback) { callback(one,two); }
                    });
                });
            },
            invoke: function (methodName, params, callback) {
                proxy.invoke(methodName, params).done(function (result) {
                    $rootScope.$apply(function () {
                        if (callback) { callback(result); }
                    });
                });
            }
        };
    };

    return HubProxyFactory;
}]);
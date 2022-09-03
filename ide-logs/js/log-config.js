const logconfigurationsView = angular.module('logconfigurations', ['ideUI', 'ideView', 'ngRoute']);

logconfigurationsView.config(["messageHubProvider", function (messageHubProvider) {
    messageHubProvider.eventIdPrefix = 'logconfigurations-view';
}]);

logconfigurationsView.controller('LogConfigurationsController', ['$scope', '$http', '$route', 'messageHub', function ($scope, $http, $route, messageHub) {

    $scope.search = {
        name: ''
    }

    let logConfigurationsApi = '/services/v4/ops/logconfig';

    function loadLogConfigurations() {
        $http.get(logConfigurationsApi)
            .then(function (data) {
                $scope.logConfigurations = data.data;
            });
    }

    $scope.setSeverity = function (loggerName, loggerLevel) {
        $http.post(logConfigurationsApi + "/severity/" + loggerName, loggerLevel)
            .then(function (data) {
                let logger = (element) => element.name === loggerName;
                let i = $scope.logConfigurations.findIndex(logger);
                $scope.logConfigurations[i].severity = data.data;
                $route.reload();
            }), function (data) {
                let logger = (element) => element.name === loggerName;
                let i = $scope.logConfigurations.findIndex(logger);
                $scope.logConfigurations[i].severity = data.data;
                $route.reload()
            }
    }
    loadLogConfigurations();
}]);
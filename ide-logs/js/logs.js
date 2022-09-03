/*
 * Copyright (c) 2010-2022 SAP and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v2.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v20.html
 *
 * Contributors:
 *   SAP - initial API and implementation
 */

const logsView = angular.module('logs', ['ideUI', 'ideView']);

logsView.config(["messageHubProvider", function (messageHubProvider) {
	messageHubProvider.eventIdPrefix = 'logs-view';
}]);

logsView.controller('LogsController', ['$scope', '$http', 'messageHub', function ($scope, $http, messageHub) {

	$scope.log = {
		selectedLog: null,
		logsList: []
	};

	$http.get('/services/v4/ops/logs').then(function (response) {
		$scope.log.logsList = response.data.map(x => ({ text: x, value: x }));
	});

	$scope.logChanged = function () {
		if ($scope.log.selectedLog) {
			$http.get('/services/v4/ops/logs/' + $scope.log.selectedLog).then(function (response) {
				$scope.logContent = response.data;
			});
		} else {
			$scope.logContent = "";
		}
	}

}]);
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

	const SELECT_LOG_TEXT = "Select log file...";

	$scope.selectedLog = null;
	$http.get('/services/v4/ops/logs').then(function (response) {
		$scope.logsList = [SELECT_LOG_TEXT];
		$scope.logsList.push(...response.data);
		$scope.selectedLog = SELECT_LOG_TEXT;
	});

	$scope.logChanged = function () {
		if ($scope.selectedLog && $scope.selectedLog !== SELECT_LOG_TEXT) {
			$http.get('/services/v4/ops/logs/' + $scope.selectedLog).then(function (response) {
				$scope.logContent = response.data;
			});
		} else {
			$scope.logContent = "";
		}
	}

}]);
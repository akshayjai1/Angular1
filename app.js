var app = angular.module("githubViewer",[]);

var mainController = function mainController($scope, $http, $interval) {
	var onUserComplete = function(response) {
		console.log(response);
		$scope.user = response.data;
		$http.get(response.data.repos_url).then(onRepos,onRepoError)
	}
	var onError = function(error){
		console.log(error);
		$scope.error = 'Could not fetch the user';
	}

	$scope.init = function(){
		$scope.boom = false;
		$scope.countdown = 5;
	}
	var onRepos = function(response){
		$scope.repos = response.data;
	}

	var onRepoError = function(err){
		$scope.error2 = 'GoT Error while fetching RepoS';
	}

	$scope.getUser = function getRepo(){
		$scope.countdown = 5;
		$http.get("https://api.github.com/users/"+$scope.userName).then(onUserComplete, onError);
		$interval(decrement,1000,$scope.countdown);
	}
	
	function decrement(){
		if($scope.countdown < 2){
			$scope.boom = true;
		} else {
			$scope.countdown-=1;
		}
	}
}

app.controller("mainController", mainController);
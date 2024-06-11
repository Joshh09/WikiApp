wikiApp.controller("homeController", function($scope, $http) {
  // Controller for home view

  $scope.search = function() {
    $http.get("/api/wiki/search/" + $scope.searchTerm)
      .then(result => {
        $scope.wikiResults = result.data;
      })
      .catch(err => {
        alert(err.data.message);
      })
  }
  // event handler for the search button
  // $http.get() to your search endpoint
  // the result will be an array of objects, assign this to a scope var
  // $scope.searchResults = ...
});
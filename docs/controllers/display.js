wikiApp.controller("displayController", function($scope, $http, $routeParams, $sce) {
  // Controller for display view
  $routeParams.urlName // this will be the urlName for your page

  // Notes:
  // Make an GET ajax call to endpoint and pass in the urlName
  // The result will contain the html that should get assigned to $scope.html
  // $scope.title = response.data.title
  // $scope.html = response.data.html
  // ..
  $scope.loadTasks = function() {
    $http.get("/api/wiki/" + $routeParams.urlName)
      .then(function(response) {
        $scope.title = response.data.title;
        $scope.html = response.data.html;
        $scope.category = response.data.category;
        $scope.author = response.data.author;
        $scope.updatedDate = response.data.updatedDate;
        $scope.createdDate = response.data.createdDate;
        $scope.pageViews = response.data.pageViews;
        $scope.urlName = response.data.urlName;
      })
      .catch(function(err) {
        alert(err.data.message);
      })
  }

  

});
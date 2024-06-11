wikiApp.controller("postController", function($scope, $http, $routeParams) {
  // Controller for post view

  // CKEditor
  ClassicEditor.create(document.querySelector('#editor'), {
    toolbar: {
      items: ['heading', 'fontSize', 'fontColor', 'fontBackgroundColor', 'highlight', 'removeFormat', '|', 'bold', 'italic', 'underline', 'link', 'bulletedList', 'numberedList', 'todoList', '|', 'outdent', 'indent', 'alignment', '|', 'blockQuote', 'insertTable', 'imageInsert', 'mediaEmbed', 'undo', 'redo', '|', 'code', 'codeBlock', 'htmlEmbed', 'MathType', 'ChemType', 'strikethrough', 'subscript', 'superscript', 'horizontalLine'],
      shouldNotGroupWhenFull: true
    },
    mediaEmbed: {
      previewsInData: true
    },
    language: 'en',
    image: {
      toolbar: ['imageTextAlternative', 'imageStyle:full', 'imageStyle:side']
    },
    table: {
      contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableCellProperties', 'tableProperties']
    },
    licenseKey: '',
  })
  .then(editor => {
    window.editor = editor;
    editorReady();
  })
  .catch( error => {
    console.error('Oops, something went wrong!');
    console.error('Please, report the following error on https://github.com/ckeditor/ckeditor5/issues with the build id and the error stack trace:');
    console.warn('Build id: bojh7pnw6nnm-dfpekd22znn5');
    console.error(error);
  });

  // This function is called when the editor is ready (Your GET logic should go here)
  function editorReady() {
    window.editor.setData("NA");

    // If $routeParams.urlName is defined then the client is requesting to edit an existing wiki
    if ($routeParams.urlName) {
      
      $http.get("/api/wiki/" + $routeParams.urlName)
      .then(function(response) {
        $scope.title = response.data.title;
        window.editor.setData(response.data.html);
        $scope.category = response.data.category;
        $scope.author = response.data.author;
        $scope.urlName = response.data.urlName;
        $scope.updatedDate = Date.now();
        $scope.createdDate = response.data.createdDate;
        $scope.pageViews = response.data.pageViews;
        $scope.disableUrl = !$scope.disableUrl;
      })
      .catch(function(err) {
        alert(err.data.message);
      })
      // Make Ajax request
      // load the data in the $scope ex. $scope.title = response.data.title...
      // load the HTML for CKEditor using window.editor.setData(response.data.html)
      
    }
  }

  // This function returns the HTML contents of the editor (Call this during your POST/PATCH operations)
  function getHtml() {
    return window.editor.getData();
  }

  // For your save logic, you will have two concerns
  // 1. Saving an existing wiki (use $routeParams.urlName to check) and do a PATCH
  //    request passing in the data items. call getHtml() to get the HTML of CKEditor
  
  if ($routeParams.urlName) {
    $scope.save = function() {
      let data = {
        title: $scope.title,
        html: getHtml(),
        category: $scope.category,
        author: $scope.author
      }
      $http.patch("/api/wiki/" + $routeParams.urlName + "/" + $scope.password, data)
        .then(function(response) {
          $scope.title = response.data.title;
          window.editor.setData(response.data.html);
          $scope.category = response.data.category;
          $scope.author = response.data.author;
          $scope.urlName = response.data.urlName;
          $scope.showUrl = !$scope.showUrl;
        })
        .catch(function(err) {
          alert(err.data.message);
        })
    }
  }
  // 2. Saving a new wiki, do a POST request
  else {
    $scope.save = function() {
      let data = {
        title: $scope.title,
        html: getHtml(),
        category: $scope.category,
        author: $scope.author,
        urlName: $scope.urlName,
        password: $scope.password
      }
      $http.post("/api/wiki", data)
        .then(function(response) {
          $scope.title = response.data.title;
          window.editor.setData(response.data.html);
          $scope.category = response.data.category;
          $scope.author = response.data.author;
          $scope.urlName = response.data.urlName;
          $scope.showUrl = !$scope.showUrl;
        })
        .catch(function(err) {
          alert(err.data.message);
        })
    }
  }

  $scope.delete = function() {
    $http.delete("/api/wiki/" + $routeParams.urlName + "/" + $scope.password)
      .then(function(response) {
        window.location = "#!/";
      })
      .catch(function(err) {
        alert(err.data.message);
      })
  }
});
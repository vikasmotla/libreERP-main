app.controller("home.blog", function($scope , $state , userProfileService ,  $stateParams , $http , Flash) {
  $scope.me = userProfileService.get('mySelf');
  $scope.editor = {source : '' , tags : [] , title : '' , header : '' , mode : 'header'};
  $scope.filter = {text : '' , tags :[] , month : new Date() , state : 'published' , user : 'all'};

  $scope.search = function(){
    tags = '';
    if ($scope.filter.tags.length !=0) {
      for (var i = 0; i < $scope.filter.tags.length; i++) {
        tags += $scope.filter.tags[i].pk;
        if (i != $scope.filter.tags.length-1) {
          tags += ',';
        }
      }
    }
    url = '/api/PIM/blog/?title__contains='+$scope.filter.text + '&state=' + $scope.filter.state;
    if (tags !=''){
      url += '&tags=' + tags;
    }
    if ($scope.filter.user != 'all') {
      url += '&user=' + $scope.filter.user;
    }
    $http({method : 'GET' , url : url , data : {month : $scope.filter.month}}).
    then(function(response){
      $scope.blogs = response.data;
    })
  }


  if (typeof $stateParams.id != 'undefined' && $stateParams.action == 'edit') {
    $scope.mode = 'edit';
    $http({method : 'GET' , url : '/api/PIM/blog/' + $stateParams.id + '/?state=all'}).
    then(function(response){
      $scope.editor.url = response.data.url;
      $scope.editor.source = response.data.source;
      $scope.editor.title = response.data.title;
      $scope.editor.header = response.data.header;
      $scope.editor.tags = response.data.tags;
      $scope.editor.mode = 'header';
    })
  } else if ($stateParams.action == 'new') {
    $scope.mode = 'new';
  } else if ($stateParams.id != 'undefined' && $stateParams.id != ''  && $stateParams.action != 'edit') {
    $scope.mode = 'read';
    $http({method : 'GET' , url : '/api/PIM/blog/' + $stateParams.id + '/' +'?state=all'}).
    then(function(response){
      $scope.articleInView = response.data;
    })
  } else {
    $scope.mode = 'list';
    $scope.filter.state = 'published';
  }

  $scope.$watch(function(){
    return $scope.filter.tags.length;
  }, function(newValue, oldValue){
    $scope.search()
  })

  $scope.toggleState = function(){
    if ($scope.filter.state == 'published') {
      $scope.filter.state = 'saved';
      $scope.filter.user = $scope.me.username;
    } else if ($scope.filter.state == 'saved') {
      $scope.filter.state = 'published';
    }
    $scope.search();
  }

  $scope.toggleUser = function(){
    if ($scope.filter.user == 'all') {
      $scope.filter.user = $scope.me.username;
    } else if ($scope.filter.user == $scope.me.username) {
      $scope.filter.user = 'all';
      $scope.filter.state = 'published';
    }
    $scope.search();

  }



  $scope.edit = function(){
    $state.go('home.blog' , { id : getPK($scope.articleInView.url) , action : 'edit'});
  }

  $scope.comment = {text :''};
  $scope.comment = function(){
    dataToSend = {
      user : $scope.me.url,
      text : $scope.comment.text,
      parent : $scope.articleInView.url,
    }
    $http({method : 'POST' , url : '/api/PIM/blogComment/' , data : dataToSend}).
    then(function(response){
      $scope.articleInView.comments.push(response.data);
      $scope.comment.text = '';
    });
  }

  $scope.onCommentDelete = function(index){
    $scope.articleInView.comments.splice(index , 1);
  }

  $scope.goBack = function(){
    $scope.mode = 'list';
    $state.go('home.blog' , { id : '', action : 'list'});
  }

  $scope.viewArticle = function(index){
    $scope.mode = 'read'
    $scope.articleInView = $scope.blogs[index];
  }

  $scope.modeToggle = false;

  $scope.loadTags = function(query) {
    return $http.get('/api/PIM/blogTags/?title__contains=' + query)
  };

  $scope.tinymceOptions = {
    selector: 'textarea',
    content_css : '/static/css/bootstrap.min.css',
    inline: false,
    plugins : 'advlist autolink link image lists charmap print preview imagetools paste table insertdatetime code searchreplace ',
    skin: 'lightgray',
    theme : 'modern',
    height : 640,
    toolbar : 'saveBtn publishBtn cancelBtn headerMode bodyMode | undo redo | bullist numlist | alignleft aligncenter alignright alignjustify | outdent  indent blockquote | bold italic underline | image link',
    setup: function (editor ) {
      editor.addButton( 'publishBtn', {
        text: 'Publish',
        icon: false,
        onclick: function() {
          tags = '';
          for (var i = 0; i < $scope.editor.tags.length; i++) {
            tags += $scope.editor.tags[i].title;
            if (i != $scope.editor.tags.length-1) {
              tags += ',';
            }
          }
          dataToSend = {
            source : $scope.editor.source,
            header : $scope.editor.header,
            title : $scope.editor.title,
            users : [$scope.me.url],
            sourceFormat : 'html',
            state : 'published',
            tags : tags,
          };

          if ($scope.mode == 'edit') {
            method = 'PATCH';
            url = $scope.editor.url;
          } else if ($scope.mode == 'new') {
            method = 'POST';
            url = '/api/PIM/blog/';
          }

          $http({method : method , url : url, data : dataToSend}).
          then(function(response){
            Flash.create('success' , response.status + ' : ' + response.statusText);
            $scope.editor.source = '';
            $scope.editor.header = '';
            $scope.editor.title = '';
            $scope.editor.tags = [];
            $scope.editor.mode = 'hedaer';
          }, function(response){
            Flash.create('danger' , response.status + ' : ' + response.statusText);
          });
        }
      });
      editor.addButton( 'saveBtn', {
        text: 'Save',
        icon: false,
        onclick: function() {
          tags = '';
          for (var i = 0; i < $scope.editor.tags.length; i++) {
            tags += $scope.editor.tags[i].title;
            if (i != $scope.editor.tags.length-1) {
              tags += ',';
            }
          }
          dataToSend = {
            source : $scope.editor.source,
            header : $scope.editor.header,
            title : $scope.editor.title,
            users : [$scope.me.url],
            sourceFormat : 'html',
            state : 'saved',
            tags : tags,
          };

          if ($scope.mode == 'edit') {
            method = 'PATCH';
            url = $scope.editor.url;
          } else if ($scope.mode == 'new') {
            method = 'POST';
            url = '/api/PIM/blog/';
          }

          $http({method : method , url : url, data : dataToSend}).
          then(function(response){
            Flash.create('success' , response.status + ' : ' + response.statusText);
            $scope.editor.source = '';
            $scope.editor.header = '';
            $scope.editor.title = '';
            $scope.editor.tags = [];
            $scope.editor.mode = 'hedaer';
          }, function(response){
            Flash.create('danger' , response.status + ' : ' + response.statusText);
          });
        }
      });
      editor.addButton( 'cancelBtn', {
        text: 'Cancel',
        icon: false,
        onclick: function() {
          if ($scope.mode == 'edit') {
            $state.go('home.blog' , { action:'list'} )
          } else {
            $state.go('home.blog' , {id : '' , action:'list'} )
          }

        }
      });
    },
  };



});

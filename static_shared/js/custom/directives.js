app.directive("mathjaxBind", function() {
  return {
    restrict: "A",
    controller: ["$scope", "$element", "$attrs",
      function($scope, $element, $attrs) {
        $scope.$watch($attrs.mathjaxBind, function(texExpression) {
          $element.html(texExpression);
          MathJax.Hub.Queue(["Typeset", MathJax.Hub, $element[0]]);
        });
      }
    ]
  };
});

app.directive('tabsStrip', function() {
  return {
    templateUrl: '/static/ngTemplates/tabsStrip.html',
    restrict: 'E',
    replace: true,
    scope: {
      tabs: '=',
      active: '='
    },
    controller: function($scope, $state, $stateParams) {
      $scope.changeTab = function(index) {
        for (var i = 0; i < $scope.tabs.length; i++) {
          $scope.tabs[i].active = false;
        }
        $scope.tabs[index].active = true;
        $scope.active = index;
      }

      $scope.$watch('active', function(newValue, oldValue) {
        $scope.changeTab(newValue);
      })
    },
  };
});

app.directive('commentInput', function() {
  return {
    templateUrl: '/static/ngTemplates/inputWithFile.html',
    restrict: 'E',
    replace: true,
    scope: {
      text: '=',
      doc: '=',
      saveNote: '='
    },
    controller: function($scope, $state, $stateParams) {

      $scope.randomKey = '' + new Date().getTime();

      if ($scope.doc == null || $scope.doc == undefined) {
        $scope.doc = emptyFile;
      }
      if ($scope.text == null || $scope.doc == undefined) {
        $scope.text = '';
      }
      $scope.browseForFile = function() {
        if ($scope.doc.size != 0) {
          $scope.doc = emptyFile;
          return;
        }
        $('#noteEditorFile' + $scope.randomKey).click();
      }

      $scope.$watch('doc', function(newValue, oldValue) {
        // console.log(newValue);
      })
    },
  };
});

app.directive('wizard', function() {
  return {
    templateUrl: '/static/ngTemplates/wizard.html',
    restrict: 'E',
    replace: true,
    scope: {
      active: '=',
      editable: '=',
      steps: '=',
      error: '='
    },
    controller: function($scope, $state, $stateParams) {

      $scope.activeBackup = -2;
      $scope.wizardClicked = function(indx) {
        if ($scope.editable) {
          $scope.active = indx;
          $scope.activeBackup = -2;
        }
      }

      $scope.resetHover = function(indx) {
        if ($scope.editable && $scope.activeBackup != -2) {
          $scope.active = $scope.activeBackup;
          $scope.activeBackup = -2;
        }
      }

      $scope.activateTemp = function(indx) {
        if ($scope.editable) {
          $scope.activeBackup = $scope.active;
          $scope.active = indx;
        }
      }

    },
  };
});

app.directive('breadcrumb', function() {
  return {
    templateUrl: '/static/ngTemplates/breadcrumb.html',
    restrict: 'E',
    replace: true,
    scope: false,
    controller: function($scope, $state, $stateParams) {
      var stateName = $state.current.name;
      $scope.stateParts = stateName.split('.');
      for (key in $stateParams) {
        if (typeof $stateParams[key] != 'undefined' && $stateParams[key] != '' && typeof parseInt($stateParams[key]) != 'number') {
          $scope.stateParts.push($stateParams[key]);
        };
      };
    },
  };
});

app.directive('userField', function() {
  return {
    templateUrl: '/static/ngTemplates/userInputField.html',
    restrict: 'E',
    replace: true,
    scope: {
      user: '=',
      url: '@',
      label: '@',
    },
    controller: function($scope, $state, $http, Flash) {
      $scope.userSearch = function(query) {
        return $http.get($scope.url + '?username__contains=' + query).
        then(function(response) {
          return response.data;
        })
      };
      $scope.getName = function(u) {
        if (typeof u == 'undefined' || u == null) {
          return '';
        }
        return u.first_name + '  ' + u.last_name;
      }
    },
  };
});

app.directive('usersField', function() {
  return {
    templateUrl: '/static/ngTemplates/usersInputField.html',
    restrict: 'E',
    replace: true,
    scope: {
      data: '=',
      url: '@',
      col: '@',
      label: '@',
      viewOnly: '@'
    },
    controller: function($scope, $state, $http, Flash) {
      $scope.d = {
        user: undefined
      };
      if (typeof $scope.col != 'undefined') {
        $scope.showResults = true;
      } else {
        $scope.showResults = false;
      }

      if (typeof $scope.viewOnly != 'undefined') {
        $scope.viewOnly = false;
      }
      // $scope.user = undefined;
      $scope.userSearch = function(query) {
        return $http.get($scope.url + '?username__contains=' + query).
        then(function(response) {
          for (var i = 0; i < response.data.length; i++) {
            if ($scope.data.indexOf(response.data[i]) != -1) {
              response.data.splice(i, 1);
            }
          }
          return response.data;
        })
      };
      $scope.getName = function(u) {
        if (typeof u == 'undefined') {
          return '';
        }
        return u.first_name + '  ' + u.last_name;
      }

      $scope.removeUser = function(index) {
        $scope.data.splice(index, 1);
      }

      $scope.addUser = function() {
        for (var i = 0; i < $scope.data.length; i++) {
          if ($scope.data[i] == $scope.d.user.pk) {
            Flash.create('danger', 'User already a member of this group')
            return;
          }
        }
        $scope.data.push($scope.d.user.pk);
        $scope.d.user = undefined;
      }
    },
  };
});

app.directive('mediaField', function() {
  return {
    templateUrl: '/static/ngTemplates/mediaInputField.html',
    restrict: 'E',
    replace: true,
    scope: {
      data: '=',
      url: '@',
    },
    controller: function($scope, $state, $http, Flash) {
      $scope.form = {
        mediaType: '',
        url: ''
      }
      $scope.switchMediaMode = function(mode) {
        $scope.form.mediaType = mode;
      }

      $scope.getFileName = function(f) {
        var parts = f.split('/');
        return parts[parts.length - 1];
      }

      $scope.removeMedia = function(index) {
        $http({
          method: 'DELETE',
          url: $scope.url + $scope.data[index].pk + '/'
        }).
        then(function(response) {
          $scope.data.splice(index, 1);
        })
      }
      $scope.postMedia = function() {
        var fd = new FormData();
        fd.append('mediaType', $scope.form.mediaType);
        fd.append('link', $scope.form.url);
        if (['doc', 'image', 'video'].indexOf($scope.form.mediaType) != -1 && $scope.form.file != emptyFile) {
          fd.append('attachment', $scope.form.file);
        } else if ($scope.form.url == '') {
          Flash.create('danger', 'No file to attach');
          return;
        }
        url = $scope.url;
        $http({
          method: 'POST',
          url: url,
          data: fd,
          transformRequest: angular.identity,
          headers: {
            'Content-Type': undefined
          }
        }).
        then(function(response) {
          $scope.data.push(response.data);
          $scope.form.file = emptyFile;
          Flash.create('success', response.status + ' : ' + response.statusText);
        }, function(response) {
          Flash.create('danger', response.status + ' : ' + response.statusText);
        });
      }
    },
  };
});

app.directive('genericForm', function() {
  return {
    templateUrl: '/static/ngTemplates/genericForm.html',
    restrict: 'E',
    replace: true,
    scope: {
      template: '=',
      submitFn: '&',
      data: '=',
      formTitle: '=',
      wizard: '=',
      maxPage: '=',
    },
    controller: function($scope, $state) {
      $scope.page = 1;

      $scope.next = function() {
        $scope.page += 1;
        if ($scope.page > $scope.maxPage) {
          $scope.page = $scope.maxPage;
        }
      }
      $scope.prev = function() {
        $scope.page -= 1;
        if ($scope.page < 1) {
          $scope.page = 1;
        }
      }
    },
  };
});

app.directive('chatBox', function() {
  return {
    templateUrl: '/static/ngTemplates/chatBox.html',
    restrict: 'E',
    transclude: true,
    replace: true,
    scope: {
      data: '=',
      index:'=',
      closeChat: '=',
    },
    controller: function($scope, $users , $uibModal , $http , ngAudio) {
      $scope.me = $users.get('mySelf');
      // console.log($scope.data,'will fetch here');
      $scope.visitorForm = ''
      $scope.isTyping = false;
      $scope.sound = ngAudio.load("static/audio/notification.mp3");

      $http({
          method: 'GET',
          url: '/api/support/visitor/?uid='+$scope.data.uid,
        }).
        then(function(response) {
          console.log(response.data,typeof response.data,response.data.length);
          if (response.data.length>0) {
            $scope.visitorForm = response.data[0]
          }
          // if (response.data.length ==1 && response.data[0].email == $scope.form.email) {
          //   $scope.form = response.data[0]
          //
          // }

        });

      $http({
        method: 'GET',
        url: '/api/support/supportChat/?user='+$scope.me.pk+'&uid='+$scope.data.uid,
      }).then(function(response) {
        $scope.data.messages = [];
        console.log(response.data);
        for (var i = 0; i < response.data.length; i++) {
          $scope.data.messages.push(response.data[i]);
        }
        $scope.data.unreadMsg = 0
        $scope.data.boxOpen = true

        //
        // for (var i = 0; i < response.data.length; i++) {
        //
        //   if (response.data[i].sentByAgent) {
        //     var sentByMe = true;
        //   }else {
        //     var sentByMe = false;
        //   }
        //
        //
        //
        //   if (response.data[i].message) {
        //
        //     if (response.data[i].attachmentType) {
        //       $scope.data.messages.push( { msg: "" , link:response.data[i].message ,  sentByMe: sentByMe , created: response.data[i].created } )
        //     }else {
        //       $scope.data.messages.push( { msg: response.data[i].message , sentByMe: sentByMe , created: response.data[i].created } )
        //     }
        //   }else if (response.data[i].attachment) {
        //     console.log(response.data[i].attachment);
        //     if (response.data[i].attachmentType == 'image') {
        //         $scope.data.messages.push( { msg: '' , img : response.data[i].attachment  , sentByMe: sentByMe , created: response.data[i].created } )
        //     }else if (data[i].attachmentType == 'audio') {
        //         $scope.data.messages.push( { msg: '' , audio : response.data[i].attachment  , sentByMe: sentByMe , created: response.data[i].created } )
        //     }else if (data[i].attachmentType == 'video') {
        //         $scope.data.messages.push( { msg: '' , video : response.data[i].attachment  , sentByMe: sentByMe , created: response.data[i].created } )
        //     }else if (data[i].attachmentType == 'application') {
        //         $scope.data.messages.push( { msg: '' , doc : response.data[i].attachment  , sentByMe: sentByMe , created: response.data[i].created } )
        //     }
        //   }
        //
        // }
        //
        //
        $scope.scroll()
      });


      console.log('userrrrrrr' , $scope.me.pk);

      $scope.chatBox = {
        messageToSend: '',
        fileToSend: emptyFile
      }

      $scope.removeFile = function() {
        $scope.chatBox.fileToSend = emptyFile;
      }


      $scope.send = function() {
        if ($scope.chatBox.fileToSend.size>0) {

          $scope.attachment;
          var typ = $scope.chatBox.fileToSend.type.split('/')[0]

          var fd = new FormData();
          fd.append('attachment', $scope.chatBox.fileToSend);
          fd.append('user' , $scope.me.pk);
          fd.append('uid' , $scope.data.uid)
          fd.append('sentByAgent' , true)
          fd.append('attachmentType' , $scope.chatBox.fileToSend.type.split('/')[0] )
          $http({
            method: 'POST',
            data: fd,
            url: '/api/support/supportChat/',
            transformRequest: angular.identity,
            headers: {
              'Content-Type': undefined
            }
          }).
          then(function(response) {
            // console.log($scope.response.data , 'data');
            $scope.data.messages.push(response.data)
            // $scope.attachment = response.data.attachment
            // console.log($scope.attachment);

            $scope.fileData = {
              filePk : response.data.pk
            }

            $scope.status = 'MF';
            connection.session.publish('service.support.chat.' + $scope.data.uid, [$scope.status  , $scope.fileData , $scope.me.username , new Date() ], {}, {
              acknowledge: true
            }).
            then(function(publication) {
              console.log("Published");
            });

            $scope.chatBox.fileToSend = emptyFile;
            $scope.scroll()

          })



        }

        if ($scope.chatBox.messageToSend.length>0) {


          var youtubeLink = $scope.chatBox.messageToSend.includes("www.youtube.com/");

          if (youtubeLink) {
            $scope.status = 'ML';
            link = "https://www.youtube.com/embed/" + $scope.chatBox.messageToSend.split("v=")[1];
            // var message = {msg:"" , link:link ,  sentByMe:true , created: new Date() }
            var dataToSend = {
              uid : $scope.data.uid ,
              message : link ,
              user : $scope.me.pk,
              attachmentType:'youtubeLink',
              sentByAgent: true
            }
          }else {
            $scope.status = 'M';
            // var message = {msg:$scope.chatBox.messageToSend , sentByMe: true, created: new Date() }
            var dataToSend = {
              uid : $scope.data.uid ,
              message : $scope.chatBox.messageToSend ,
              user : $scope.me.pk,
              sentByAgent: true
            }
          }

          $http({
            method: 'POST',
            data: dataToSend,
            url: '/api/support/supportChat/'
          }).
          then(function(response) {
            console.log(response.data , 'dataaa');
            $scope.data.messages.push(response.data)

            connection.session.publish('service.support.chat.' + $scope.data.uid, [$scope.status  , response.data , $scope.me.username , new Date() ], {}, {
              acknowledge: true
            }).
            then(function(publication) {
              console.log("Published");
            });

            $scope.chatBox.messageToSend = ''
            $scope.scroll()


          });





        }
      };

      $scope.$watch('chatBox.messageToSend', function(newValue, oldValue) {
        $scope.status = "T";
        if (newValue != "") {
          connection.session.publish('service.support.chat.' + $scope.data.uid, [$scope.status], {}, {
            acknowledge: true
          }).
          then(function(publication) {
            console.log("Published");
          });
        }
      });


      $scope.chatClose = function(uid) {
        $scope.status = "F";
        connection.session.publish('service.support.chat.' + $scope.data.uid, [$scope.status , uid ], {}, {
          acknowledge: true
        }).
        then(function(publication) {
          console.log("Published");
        });
      }

      $scope.closeChatBox = function(indx) {
        $scope.closeChat(indx)
        $scope.data.boxOpen = false
      }

      $scope.attachFile = function() {
        $('#filePickerChat' + $scope.index).click();
      }

      $scope.scroll = function () {
        console.log('calling');
        setTimeout(function () {
          var id = document.getElementById("scrollArea"+ $scope.data.uid );
          id.scrollTop = id.scrollHeight;
        }, 200);
      }

      $scope.knowledgeBase = function(data) {
        $uibModal.open({
          templateUrl: '/static/ngTemplates/app.support.knowledgeBase.modal.html',
          size: 'md',
          backdrop: true,
          controller: function($scope, $users , $uibModalInstance) {

            $scope.closeModal = function () {
              $uibModalInstance.close()
            }

          },
        })
      }


      $scope.editUserDetails = function(uid) {
        $uibModal.open({
          templateUrl: '/static/ngTemplates/app.support.editUserDetails.modal.html',
          size: 'md',
          backdrop: true,
          resolve: {
            visitorData: function() {
              return $scope.visitorForm;
            }
          },
          controller: function($scope, visitorData , $users , $uibModalInstance, Flash) {
            $scope.uid = uid
            console.log(uid);

            if (typeof visitorData =='string') {
              $scope.form = {
                email:'',
                name:'',
                phoneNumber:'',
                notes:''
              }
            }else {
              $scope.form = visitorData
            }




            // $scope.$watch('form.email', function(newValue, oldValue) {
            //   console.log('inside weathcccc');
            //   // console.log($scope.form);
            //   // console.log(newValue);
            //   if (newValue.length>0) {
            //     $http({
            //       method: 'GET',
            //       url: '/api/support/visitor/?email='+newValue,
            //     }).
            //     then(function(response) {
            //
            //       console.log(response.data);
            //     });
            //   }
            //
            // });
            checkEmail = function(){
              console.log($scope.form.email);
              $http({
                  method: 'GET',
                  url: '/api/support/visitor/?email='+$scope.form.email,
                }).
                then(function(response) {
                  console.log(response.data,typeof response.data,response.data.length);
                  if (response.data.length >0 && response.data[0].email == $scope.form.email) {
                    $scope.form.name = response.data[0].name
                    $scope.form.email = response.data[0].email
                    $scope.form.phoneNumber = response.data[0].phoneNumber
                    $scope.form.notes = response.data[0].notes
                  }
                });
            }

            $scope.submit = function () {


              if ($scope.form.email=='') {
                Flash.create('danger', 'Email is required')
                return
              }


              $scope.toSend = $scope.form
              $scope.toSend.uid = $scope.uid;

              var method = 'POST'
              var url = '/api/support/visitor/'
              if ($scope.form.pk != undefined) {
                method = 'PATCH'
                url += $scope.form.pk + '/'
              }

              $http({
                method: method,
                url: url,
                data: $scope.toSend
              }).
              then(function(response) {
                // dataName = response.data.name
                // $scope.form = response.data;
                Flash.create('success', 'User details saved')
                $uibModalInstance.dismiss(response.data)
              });
            }

          },
        }).result.then(function () {

        }, function (data) {
          if (data != 'backdrop click') {
            $scope.data.name = data.name
            $scope.visitorForm = data
          }
        });
      }


      $scope.arremoji = ['👋' , '💁' ,'🙃' , '🙏', '😬', '👇' ,'👈', '👉', '👋', '👏' ,'👐' ,'👆' ,'☝', '👊' ,'✋', '✌', '✊' ,'👌' ,'👍' ,'👎' ];

      $scope.emojiOpen = false

      $scope.insertEmoji = function (indx) {
        $scope.chatBox.messageToSend += $scope.arremoji[indx]
      }


      $scope.openEmoji = function () {
        $scope.emojiOpen = !$scope.emojiOpen

      }

    }
  };
});


app.directive('messageStrip', function() {
  return {
    templateUrl: '/static/ngTemplates/messageStrip.html',
    restrict: 'E',
    transclude: true,
    replace: true,
    scope: {
      data: '=',
      openChat: '=',
    },
    controller: function($scope, $users) {
      $scope.me = $users.get('mySelf');
      if ($scope.me.pk == $scope.data.originator) {
        $scope.friend = $scope.data.user;
      } else {
        $scope.friend = $scope.data.originator;
      }
      $scope.clicked = function() {
        $scope.data.count = 0;
        $scope.openChat($scope.friend)
      }
    }
  };
});

app.directive('notificationStrip', function() {
  return {
    templateUrl: '/static/ngTemplates/notificationStrip.html',
    restrict: 'E',
    transclude: true,
    replace: true,
    scope: {
      data: '=',
    },
    controller: function($scope, $http, $users, $aside) {
      var parts = $scope.data.shortInfo.split(':');
      // console.log(parts);
      if (typeof parts[1] == 'undefined') {
        $scope.notificationType = 'default';
      } else {
        $scope.notificationType = parts[0];
      }
      // console.log($scope.data);
      // console.log($scope.notificationType);
      var nodeUrl = '/api/social/' + $scope.notificationType + '/'
      if (typeof parts[1] != 'undefined' && $scope.data.originator == 'social') {
        // console.log(nodeUrl + parts[1]);
        $http({
          method: 'GET',
          url: nodeUrl + parts[1] + '/'
        }).
        then(function(response) {
          $scope.friend = response.data.user;
          if ($scope.notificationType == 'postComment') {
            var url = '/api/social/post/' + response.data.parent + '/';
          } else if ($scope.notificationType == 'pictureComment') {
            var url = '/api/social/picture/' + response.data.parent + '/';
          }
          $http({
            method: 'GET',
            url: url
          }).then(function(response) {
            $scope.notificationData = response.data;
            if ($scope.notificationType == 'pictureComment') {
              $http({
                method: 'GET',
                url: '/api/social/album/' + $scope.data.shortInfo.split(':')[3] + '/?user=' + $users.get($scope.notificationData.user).username
              }).
              then(function(response) {
                $scope.objParent = response.data;
              });
            };
          });
        });
      } else if (typeof parts[1] != 'undefined' && $scope.data.originator == 'git') {
        if (parts[0] == 'codeComment') {
          var url = '/api/git/commitNotification/?sha=' + parts[2];
          $http({
            method: 'GET',
            url: url
          }).
          then(function(response) {
            $scope.commit = response.data[0];
          });
          var url = '/api/git/codeComment/' + parts[1] + '/';
          $http({
            method: 'GET',
            url: url
          }).
          then(function(response) {
            $scope.codeComment = response.data;
          });
        }
      };

      $scope.openAlbum = function(position, backdrop, input) {
        $scope.asideState = {
          open: true,
          position: position
        };

        function postClose() {
          $scope.asideState.open = false;
        }

        $aside.open({
          templateUrl: '/static/ngTemplates/app.social.aside.album.html',
          placement: position,
          size: 'lg',
          backdrop: backdrop,
          controller: 'controller.social.aside.picture',
          resolve: {
            input: function() {
              return input;
            }
          }
        }).result.then(postClose, postClose);
      }

      $scope.openPost = function(position, backdrop, input) {
        $scope.asideState = {
          open: true,
          position: position
        };

        function postClose() {
          $scope.asideState.open = false;
        }

        $aside.open({
          templateUrl: '/static/ngTemplates/app.social.aside.post.html',
          placement: position,
          size: 'md',
          backdrop: backdrop,
          controller: 'controller.social.aside.post',
          resolve: {
            input: function() {
              return input;
            }
          }
        }).result.then(postClose, postClose);
      }

      $scope.openCommit = function() {
        $aside.open({
          templateUrl: '/static/ngTemplates/app.GIT.aside.exploreNotification.html',
          position: 'left',
          size: 'xxl',
          backdrop: true,
          resolve: {
            input: function() {
              return $scope.commit;
            }
          },
          controller: 'projectManagement.GIT.exploreNotification',
        })
      }

      $scope.openNotification = function() {
        $http({
          method: 'PATCH',
          url: '/api/PIM/notification/' + $scope.data.pk + '/',
          data: {
            read: true
          }
        }).
        then(function(response) {
          $scope.$parent.notificationClicked($scope.data.pk);
          $scope.data.read = true;
        });
        if ($scope.notificationType == 'postLike' || $scope.notificationType == 'postComment') {
          $scope.openPost('right', true, {
            data: $scope.notificationData,
            onDelete: function() {
              return;
            }
          })
        } else if ($scope.notificationType == 'pictureLike' || $scope.notificationType == 'pictureComment') {
          $scope.openAlbum('right', true, {
            data: $scope.notificationData,
            parent: $scope.objParent,
            onDelete: ""
          })
        } else if ($scope.notificationType == 'codeComment') {
          $scope.openCommit()
        }
      }
    },
  };
});


app.directive('chatWindow', function($users) {
  return {
    templateUrl: '/static/ngTemplates/chatWindow.html',
    restrict: 'E',
    transclude: true,
    replace: true,
    scope: {
      friendUrl: '=',
      pos: '=',
      cancel: '&',
    },
    controller: function($scope, $location, $anchorScroll, $http, $templateCache, $timeout, ngAudio) {
      // console.log($scope.pos);
      $scope.me = $users.get("mySelf");
      $scope.friend = $users.get($scope.friendUrl);
      // console.log($scope.friend);
      $scope.sound = ngAudio.load("static/audio/notification.mp3");

      $scope.isTyping = false;
      $scope.toggle = true;
      $scope.messageToSend = "";
      $scope.fileToSend = emptyFile;
      $scope.chatForm = {
        messageToSend: '',
        fileToSend: emptyFile
      }
      $scope.status = "N"; // neutral / No action being performed
      $scope.send = function() {
        var msg = angular.copy($scope.chatForm.messageToSend)
        if (msg != "") {
          $scope.status = "M"; // contains message
          var dataToSend = {
            message: msg,
            user: $scope.friend.pk,
            read: false
          };
          $http({
            method: 'POST',
            data: dataToSend,
            url: '/api/PIM/chatMessage/'
          }).
          then(function(response) {
            $scope.ims.push(response.data)
            $scope.senderIsMe.push(true);
            connection.session.publish('service.chat.' + $scope.friend.username, [$scope.status, response.data.message, $scope.me.username, response.data.pk], {}, {
              acknowledge: true
            }).
            then(function(publication) {});
            $scope.chatForm.messageToSend = "";
          })
        }
      }; // send function for text

      $scope.sendFile = function() {
        console.log('send message ');
        var fd = new FormData();
        var file = $scope.chatForm.fileToSend
        console.log($scope.chatForm.fileToSend);
        console.log(file);
        if (file != emptyFile) {
          $scope.status = "MF"; // contains message
          // var dataToSend = {attachment:file , user: $scope.friend.pk , read:false};
          fd.append('attachment', file);
          fd.append('user', $scope.friend.pk);
          fd.append('read', false);
          $http({
            method: 'POST',
            data: fd,
            url: '/api/PIM/chatMessage/',
            transformRequest: angular.identity,
            headers: {
              'Content-Type': undefined
            }
          }).
          then(function(response) {
            console.log('resssssss', response.data);
            // $scope.ims.push(response.data)
            var fileTypeArr = response.data.attachment.split('.')
            var fileType =  fileTypeArr[fileTypeArr.length-1]
            if (fileType == 'jpg'|| fileType == 'jpeg'|| fileType == 'png'|| fileType == 'svg'|| fileType == 'gif') {
              response.data.fileType = 'image'
            }else {
              response.data.fileType = 'document'
            }
            $scope.ims.push(response.data)
            $scope.senderIsMe.push(true);
            console.log(response.data.attachment);
            connection.session.publish('service.chat.' + $scope.friend.username, [$scope.status, response.data.attachment, $scope.me.username, response.data.pk], {}, {
              acknowledge: true
            }).
            then(function(publication) {});
            $scope.chatForm.fileToSend = emptyFile;
          })
        }
      }; // send function for file

      $scope.attachFile = function() {
        console.log($scope.friend.pk);
        $('#filePickerChat' + $scope.friend.pk).click();
      }

      $scope.$watch('chatForm.fileToSend', function(newValue, oldValue) {
        if (newValue == emptyFile) {
          return;
        }
        console.log('herreee', $scope.chatForm.fileToSend);
      });

      $scope.removeFile = function() {
        $scope.chatForm.fileToSend = emptyFile;
      }

      $scope.expandImage = function (imgUrl) {
        console.log('expaaannddddd');
        console.log(imgUrl);
      }

      $scope.addMessage = function(msg, url) {
        console.log('in add messagge');
        $scope.sound.play();
        $http({
          method: 'PATCH',
          url: '/api/PIM/chatMessage/' + url + '/?mode=',
          data: {
            read: true
          }
        }).
        then(function(response) {
          console.log('resssssssss');
          if (response.data.attachment) {
            var fileTypeArr = response.data.attachment.split('.')
            var fileType =  fileTypeArr[fileTypeArr.length-1]
            if (fileType == 'jpg'|| fileType == 'jpeg'|| fileType == 'png'|| fileType == 'svg'|| fileType == 'gif') {
              response.data.fileType = 'image'
            }else {
              response.data.fileType = 'document'
            }
          }
          $scope.ims.push(response.data);
          $scope.senderIsMe.push(false);
        });
      };

      $scope.fetchMessages = function() {
        $scope.method = 'GET';
        $scope.url = '/api/PIM/chatMessageBetween/?other=' + $scope.friend.username;
        $scope.ims = [];
        $scope.imsCount = 0;
        $scope.senderIsMe = [];
        $http({
          method: $scope.method,
          url: $scope.url
        }).
        then(function(response) {
          $scope.imsCount = response.data.length;
          for (var i = 0; i < response.data.length; i++) {
            var im = response.data[i];
            var sender = $users.get(im.originator)
            if (sender.username == $scope.me.username) {
              $scope.senderIsMe.push(true);
            } else {
              $scope.senderIsMe.push(false);
            }
            if (im.attachment) {
              var fileTypeArr = im.attachment.split('.')
              var fileType =  fileTypeArr[fileTypeArr.length-1]
              if (fileType == 'jpg'|| fileType == 'jpeg'|| fileType == 'png'|| fileType == 'svg'|| fileType == 'gif') {
                im.fileType = 'image'
              }else {
                im.fileType = 'document'
              }
            }
            $scope.ims.push(im);
            // console.log($scope.ims.length);
          }
        });
      };
      $scope.fetchMessages();
      $scope.scroll = function() {
        var $id = $("#scrollArea" + $scope.pos);
        $id.scrollTop($id[0].scrollHeight);
      }
    },
    // attrs is the attrs passed from the main scope
    link: function postLink(scope, element, attrs) {
      scope.$watch('chatForm.messageToSend', function(newValue, oldValue) {
        // console.log("changing");
        scope.status = "T"; // the sender is typing a message
        if (newValue != "") {
          connection.session.publish('service.chat.' + scope.friend.username, [scope.status, scope.chatForm.messageToSend, scope.me.username]);
        }
        scope.status = "N";
      }); // watch for the messageTosend
      scope.$watch('ims.length', function() {
        setTimeout(function() {
          scope.scroll();
        }, 500);
      });
      scope.$watch('pos', function(newValue, oldValue) {
        // console.log(newValue);
        scope.location = 30 + newValue * 320;
        // console.log("setting the new position value");
        // console.log();
      });
    } // link
  };
});

angular.module('starter.controllers', [])
  .controller('AglioMainCtrl', function($scope, $firebaseObject, $firebaseArray) {
    var ref = firebase.database().ref().child("food");
    var obj = $firebaseObject(ref);
    console.log(obj);
    var x;
    firebase.database().ref().child("food").on('value', function(snap) {
      var y = snap.val()
      $scope.data = y;
      console.log(y);
    });

    obj.$bindTo($scope, "data")
  })

  .controller('ShareFoodCtrl', function($scope, $firebaseObject, $firebaseArray, $ionicModal, Camera) {
    $scope.url = 'hi';
    $scope.showinput = false;
    //var options1 = {
    //  quality: 50,
    //  destinationType: Camera.DestinationType.DATA_URL,
    //  sourceType: Camera.PictureSourceType.CAMERA,
    //  allowEdit: true,
    //  encodingType: Camera.EncodingType.JPEG,
    //  targetWidth: 100,
    //  targetHeight: 100,
    //  popoverOptions: CameraPopoverOptions,
    //  saveToPhotoAlbum: false
    //};
    $scope.photo = function() {
      //camera.getPicture(onSuccess, onFail, { quality: 50,
      //  destinationType: Camera.DestinationType.DATA_URL });
      //
      //function onSuccess(imageData) {
      //  var image = document.getElementById('myImage');
      //  image.src = "data:image/jpeg;base64," + imageData;
      //}
      //function onFail(message) {
      //  alert('Failed because: ' + message);
      //}
      $scope.url = "SDF";
        Camera.getPicture({
        quality: 75,
        targetWidth: 720,
        correctOrientation: true,
        saveToPhotoAlbum: false
      }).then(function (imageURI) {
        $scope.url = imageURI;
        $scope.showinput = true;
        console.log(imageURI);
      }, function (err) {
        $scope.url = err
        console.err(err);
      });
    }

    $ionicModal.fromTemplateUrl('modal-share-food.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.openModal = function() {
      $scope.modal.show();
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
    };
    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });
  })

  .controller('RequestFoodCtrl', function($scope, $firebaseObject, $firebaseArray, $ionicModal) {

    var ref = firebase.database().ref().child("food");
    var obj = $firebaseObject(ref);
    console.log(obj);
    var x;
    firebase.database().ref().child("food").on('value', function(snap) {
      var y = snap.val()
      $scope.data = y;
      console.log(y);
    });

    obj.$bindTo($scope, "data")

    $ionicModal.fromTemplateUrl('modal-request-food.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.openModal = function() {
      $scope.modal.show();
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
    };
    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });
  })

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('MainCtrl', function ($scope, $state) {
    $scope.snap = function() {
      $state.go('snap');
    }

    $scope.analyze = function() {
      $state.go('analyze');
    }
    $scope.expenses = function() {
      $state.go('expenses');
    }
})
.controller('SnapCtrl', function($scope, $state, Camera, $window) {
    $scope.wd = {};
    $scope.url = 'img/snap.png';
    $scope.showinput = false;
    $scope.img = 'http://placekitten.com/g/250/300';
    $scope.getPhoto = function() {
      Camera.getPicture({
        quality: 75,
        targetWidth: 720,
        correctOrientation: true,
        saveToPhotoAlbum: false
      }).then(function (imageURI) {
        $scope.url = imageURI;
        $scope.showinput = true;
        console.log(imageURI);
      }, function (err) {
        console.err(err);
      });
    };

    $scope.budget = function() {
      $state.go('budget')
    }

    $scope.expenses = function() {
      $state.go('expenses')
    };

    $scope.analyze = function() {
      $state.go('analyze');
    };

    $scope.cb = function(){
      $state.go('categories')
    }
    //Camera.getPicture({
    //  quality: 75,
    //  targetWidth: 720,
    //  //targetHeight: 1024,
    //  correctOrientation: true,
    //  saveToPhotoAlbum: false
    //}).then(function (imageURI) {
    //  $scope.url = imageURI;
    //  $scope.showinput = true;
    //  console.log(imageURI);
    //}, function (err) {
    //  console.err(err);
    //});
  })

.controller('CategoriesCtrl', function($scope, $state, Camera, $window) {
  $scope.reminder = function() {
    console.log("ASDF")
    $state.transitionTo('reminder', null, {'reload':true})
    //$state.go('reminder')
  }
})
.controller('ReminderCtrl', function($scope, $state, Camera, $window) {
  $scope.snap = function() {
    $state.go('snap');
  }
})
.controller('BudgetCtrl', function($scope, $state, Camera, $window) {
    $scope.snap = function() {
      $state.go('snap');
    }
})
.controller('AnalyzeCtrl', function($scope, $state, $ionicPopover) {
    $scope.snap = function () {
      $state.go('snap');
    };

    $scope.settings = function() {
      $state.go('settings');
    }
    $scope.wishlist = function() {
      $state.go('wishlist');
    }
})
.controller('SettingsCtrl', function ($scope, $state) {
  $scope.onSwipeRightSettings = function(){

  }
})

.controller('WishlistCtrl', function ($scope, $state) {
  $scope.show1 = false;
  $scope.expand = function(field) {
    if ($('#'+field).css('display') == 'none') {
      //$('#'+field).hide();
      $('#'+field).show();
    } else {
      $('#'+field).hide();
    }
  }
  $scope.insert = function(id) {
    if ($('#'+id).next().is('img')) {
      $('#'+id).next().remove()
    } else {
      $('<img src="img/detailwishlist.png" class="wishlistdetail">').insertAfter($('#'+id));
    }
  }

  $scope.expenses = function(){
    $state.go('expenses');
  }

  $scope.analyze = function() {
    $state.go('analyze');
  }

  $scope.addwishlist = function() {
    $state.go('addwishlist')
  }
})
.controller('AddWishlistCtrl', function ($scope, $state,$ionicPopover) {
  $scope.cancel = function() {
    $state.go('wishlist');
  }
  $scope.ok = function() {
    $state.go('wishlist')
  }
})
.controller('YourWishlistCtrl', function($scope, $state) {

})
.controller('ExpensesCtrl', function($scope, $state) {
    $scope.snap = function() {
      $state.go('snap');
    }

    $scope.wishlist = function() {
      $state.go('wishlist');
    }

    $scope.expand = function(id) {
      //console.log("sdf")
      if ($('#'+id).css('display') == 'none') {
        //$('#'+field).hide();
        $('#'+id).show();
      } else {
        $('#'+id).hide();
      }
    }
})
.controller('AppCtrl', function ($scope, $state, $ionicModal, $timeout, $q) {
  $scope.jsBuffer = {
    Image: undefined
  };
  $scope.tt = 'b';
  $scope.formControls =
  {
    captureEnabled : true,
    liveRefreshEnabled : true
  };
  $scope.cameraPlus = null;
  $scope.cameraPlus = ( cordova && cordova.plugins && cordova.plugins.CameraPlus ) ? cordova.plugins.CameraPlus : null;


  window.ionic.Platform.ready(function() {
    console.log('Ionic ready... Loading plugins.');
    $scope.tt = 'a';
    $scope.cameraPlus = ( cordova && cordova.plugins && cordova.plugins.CameraPlus ) ? cordova.plugins.CameraPlus : null;
    $scope.switchCapture(true);
  });


  $scope.switchCapture = function (enabled)
  {
    if (enabled)
    {
      $scope.startCapture();
    }
    else
    {
      $scope.stopCapture();
    }
  };

  $scope.startCapture = function() {
    if ( $scope.cameraPlus ) {
      // call this API to stop web server
      $scope.cameraPlus.startCamera(function(){
        console.log('Capture Started');
        $scope.tt = 'ok';
        // already call once to fill the buffer since it's always delayed of 1 frame...
        $scope.refreshPreview();
      },function( error ){
        console.log('CameraServer StartCapture failed: ' + error);
        $scope.tt = 'CameraServer StartCapture failed: ' + error;
      });
    } else {
      $scope.tt = 'err1';
      console.log('CameraServer StartCapture: CameraPlus plugin not available/ready.');
    }
  };

  $scope.stopCapture = function() {

    if ( $scope.cameraPlus ) {
      // call this API to stop web server
      $scope.cameraPlus.stopCamera(function(){
        console.log('Capture Stopped');
      },function( error ){
        console.log('CameraServer StopCapture failed: ' + error);
      });
    } else {
      console.log('CameraServer StopCapture: CameraPlus plugin not available/ready.');
    }
  };

  $scope.switchLiveRefresh = function (enabled)
  {
    //if (enabled)
    //{
    $scope.asyncGetImage().then();
    //}
    //else
    //{
    //  // stops automatically when !$scope.formControls.liveRefreshEnabled
    //}
  };
  $scope.asyncGetImage = function() {
    return $q(function(resolve, reject) {

      $scope.cameraPlus.getJpegImage(function(jpgData)
      {
        $scope.jsBuffer.Image = jpgData;
        //if ($scope.jsBuffer.Image != jpgData)
        //{
        //  $scope.jsBuffer.Image = jpgData;
        //}
        //else
        //{
        //  // it's the same image, we trig the refresh manually.
        //  $scope.refreshPreview();
        //}

        resolve(true);

      }, function()
      {
        console.log('getImage failed');
        reject('getImage failed');
      });
    });
  };

  $scope.getImage = function() {
    $scope.tt = 'called';
    $scope.asyncGetImage().then(function()
    {
      if (!$scope.$$phase) {
        $scope.$apply();
      }
    });
  };

  $scope.refreshPreview = function () {
    //console.log("refreshPreview");
    if ($scope.formControls.liveRefreshEnabled) {
      setTimeout(function () {
        $scope.$apply(function () {
          $scope.asyncGetImage().then();
        });
      }, 40);
    }
  };
  $scope.switchCapture(true);

})

;

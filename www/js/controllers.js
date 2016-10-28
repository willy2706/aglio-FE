angular.module('starter.controllers', ['ionic.cloud'])
  .controller('AglioMainCtrl', function($scope, $firebaseObject, $firebaseArray, $state,  $ionicPush) {
    $scope.searchText = null;
    $ionicPush.register().then(function(t) {
      return $ionicPush.saveToken(t);
    }).then(function(t) {
      console.log('Token saved:', t.token);
      firebase.database().ref().child('token').set({
        token : t.token
      })
//      alert(t.token)
    });
        console.log(angular.element('.tab-nav.tabs').css('position'))
        console.log(angular.element('.tab-nav.tabs').css('top'))
    $scope.$on('cloud:push:notification', function(event, data) {
      var msg = data.message;
      alert(msg.title + ': ' + msg.text);
    });
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

    $scope.sharefood = function() {
      $state.go('share-food');
    }
  })

  .controller('ShareFoodCtrl', function($state, $scope, $firebaseObject, $firebaseArray, $ionicModal, Camera, ionicDatePicker) {
    $scope.gomain = function() {
      $state.go('main')
    }

    $scope.url = "img/upload-image.png";
    var ipObj1 = {
      callback: function (val) {  //Mandatory
        var dateval = new Date(val);
        var theyear=dateval.getFullYear()
        var themonth=dateval.getMonth()+1
        var thetoday=dateval.getDate()
        $scope.exp_datedisplay = theyear+"/"+themonth+"/"+thetoday
        $scope.sharefood.exp_date = val
        console.log('Return value from the datepicker popup is : ' + val, new Date(val));
      },
      disabledDates: [            //Optional
        new Date(2016, 2, 16),
        new Date(2015, 3, 16),
        new Date(2015, 4, 16),
        new Date(2015, 5, 16),
        new Date('Wednesday, August 12, 2015'),
        new Date("08-16-2016"),
        new Date(1439676000000)
      ],
      from: new Date(2012, 1, 1), //Optional
      to: new Date(2016, 10, 30), //Optional
      inputDate: new Date(),      //Optional
      mondayFirst: true,          //Optional
      disableWeekdays: [0],       //Optional
      closeOnSelect: false,       //Optional
      templateType: 'popup'       //Optional
    };

    $scope.openDatePicker = function(){
      ionicDatePicker.openDatePicker(ipObj1);
    };
    $scope.showinput = false;
    $scope.photo = function() {
        Camera.getPicture({
        quality: 75,
        targetWidth: 750,
        targetHeight: 260,
        correctOrientation: true,
        saveToPhotoAlbum: false,
        destinationType: navigator.camera.DestinationType.DATA_URL
      }).then(function (imageURI) {
        $scope.url = "data:image/png;base64, " + imageURI;
        $scope.showinput = true;
        console.log(imageURI);
      }, function (err) {
        $scope.url = err;
        console.err(err);
      });
    };

    $scope.sharefood = {};
    $scope.share = function() {
      var d = new Date();
      var n = d.getTime();
      var id = Math.floor(n / -1000);
      $scope.sharefood.created = n;
      $scope.sharefood.img_url = $scope.url == null ? "" : $scope.url;
      $scope.sharefood.status = "NONE";
      firebase.database().ref().child('food').child(id).set($scope.sharefood);
      $scope.modal.show();
    };

    $ionicModal.fromTemplateUrl('modal-share-food.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.cool = function() {
      $scope.modal.hide();
    }
    $scope.openModal = function() {
      $scope.modal.show();
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
    };
    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
//      console.log("destroy");
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
      // Execute action
      $state.go('main')
      console.log("hidden")
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
      console.log("remove")
    });
  })

  .controller('ShareRecipeCtrl', function($scope, $firebaseObject, $firebaseArray, $ionicModal) {

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

    $ionicModal.fromTemplateUrl('modal-share-recipe.html', {
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

  .controller('ShareTipsCtrl', function($scope, $firebaseObject, $firebaseArray, $ionicModal) {

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

    $ionicModal.fromTemplateUrl('modal-share-tips.html', {
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

  .controller('RequestFoodCtrl', function($scope, $firebaseObject, $firebaseArray, $ionicModal, $stateParams, $state) {
    $scope.gomain = function () {
      angular.element('.tab-nav.tabs').css('position','absolute')
      angular.element('.tab-nav.tabs').css('top','44px')
      $state.go('main')
    }
//
//    angular.element('.tab-nav.tabs').css('padding-top','20px')
//    angular.element('.tab-nav.tabs').css('padding-bottom','-20px')
//    angular.element('.tab-nav.tabs').css('margin-top','20px')
//    angular.element('.tab-nav.tabs').css('margin-bottom','-20px')
    console.log(angular.element('.tab-nav.tabs').css('position'))
    console.log(angular.element('.tab-nav.tabs').css('top'))
    angular.element('.tab-nav.tabs').css('position','relative')
    angular.element('.tab-nav.tabs').css('top','0px')

//    var fbse = firebase
    var id = $stateParams.id;
    firebase.database().ref().child("food").child(id).on('value', function(snap) {
      var y = snap.val()
      $scope.data = y;
      console.log(y.user);
      firebase.database().ref().child("users").child(y.user).on('value', function(snap1) {
        var z = snap1.val();
        console.log(z.img)
        $scope.usrimg = z.img
      })
    });
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

.controller('MyFoodCtrl', function($scope, $firebaseObject, $firebaseArray, $state,  $ionicPush) {
    $ionicPush.register().then(function(t) {
      return $ionicPush.saveToken(t);
    }).then(function(t) {
      console.log('Token saved:', t.token);
      firebase.database().ref().child('token').set({
        token : t.token
      })
//      alert(t.token)
    });
        console.log(angular.element('.tab-nav.tabs').css('position'))
        console.log(angular.element('.tab-nav.tabs').css('top'))
    $scope.$on('cloud:push:notification', function(event, data) {
      var msg = data.message;
      alert(msg.title + ': ' + msg.text);
    });
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
        targetWidth: 360,
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

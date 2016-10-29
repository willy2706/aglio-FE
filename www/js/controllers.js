angular.module('starter.controllers', ['ionic.cloud', 'textAngular'])
.controller('AglioMainCtrl', function($scope, $firebaseObject, $firebaseArray, $state,  $ionicPush, $sce, $http) {
  $scope.myfood = function() {
    $state.go('my-food')
  }
  $scope.sharetips = function() {
    $state.go('share-tips')
  }
  $scope.sharerecipe = function() {
    $state.go('share-recipe')
  }
  $scope.searchText = null;
  $ionicPush.register().then(function(t) {
    return $ionicPush.saveToken(t);
  }).then(function(t) {
    console.log('Token saved:', t.token);
    firebase.database().ref().child('token').set({
      token : t.token
    })
  });
  $scope.$on('cloud:push:notification', function(event, data) {
    var msg = data.message;
    alert(msg.title + ': ' + msg.text);
  });
  var ref = firebase.database().ref().child("food");
  var obj = $firebaseObject(ref);
  console.log(obj);
  firebase.database().ref().child("food").on('value', function(snap) {
    var y = snap.val()
    $scope.data = y;
  });
  obj.$bindTo($scope, "data")

  firebase.database().ref().child("tips").on('value', function(snap) {
    var y = snap.val()
    $scope.tips = y;
    angular.forEach($scope.tips, function(value, key) {
      $scope.compiledtext = $sce.trustAsHtml(value.desc);
      value.compiledtext = $scope.compiledtext
    })
  });


  firebase.database().ref().child("recipe").on('value', function(snap) {
    var y = snap.val()
    $scope.recipe = y;
  });

  $scope.sharefood = function() {
    $state.go('share-food');
  }

  $scope.getNumber = function(num) {
      return new Array(num);
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

.controller('ShareRecipeCtrl', function(taOptions, $scope, $firebaseObject, $firebaseArray, $ionicModal, Camera, $state) {
  taOptions.toolbar = [];
  $scope.gomain = function() {
    $state.go('main')
  }
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

  $scope.sharerecipe = {};
  $scope.share = function() {
    var d = new Date();
    var n = d.getTime();
    var id = Math.floor(n / -1000);
    $scope.sharerecipe.created = n;
    $scope.sharerecipe.img_url = $scope.url == null ? "" : $scope.url;
    firebase.database().ref().child('recipe').child(id).set($scope.sharerecipe);
    $scope.modal.show();
  };
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
    $state.go('main')
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });
})

.controller('TipsDetailCtrl', function($scope, $stateParams, $compile, $sce, $state, $ionicModal) {
  var id = $stateParams.id
  firebase.database().ref().child("tips").child(id).on('value', function(snap) {
    var y = snap.val()
    $scope.data = y;
    console.log(y);
    $scope.compiledtext = $sce.trustAsHtml($scope.data.desc);
    console.log($scope.compiledtext)
  });

  $scope.gomain = function() {
    $state.go('main')
  }

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


.controller('RecipeDetailCtrl', function($scope, $stateParams, $compile, $sce, $state, $ionicModal) {
  $scope.gomain = function() {
    $state.go('main')
  }
  var id = $stateParams.id
  firebase.database().ref().child("recipe").child(id).on('value', function(snap) {
    var y = snap.val()
    $scope.data = y;
    console.log(y);
    $scope.compiledIngredient = $sce.trustAsHtml($scope.data.ingredient);
    $scope.compiledDirection = $sce.trustAsHtml($scope.data.direction);

    firebase.database().ref().child("users").child(y.user).on('value', function(snap1) {
      var z = snap1.val();
      console.log(z.img)
      $scope.usrimg = z.img
    })
  })
  $ionicModal.fromTemplateUrl('modal-recipe-detail.html', {
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
//    console.log($scope.compiledtext)
  })

.controller('ShareTipsCtrl', function(UserID, $state, taOptions, $scope, $firebaseObject, $firebaseArray, $ionicModal) {
  $scope.gomain = function () {
    $state.go('main')
  }
  taOptions.toolbar = [];
  $scope.sharetips = {}
  var ref = firebase.database().ref().child("food");
  var obj = $firebaseObject(ref);
  console.log(obj);
  firebase.database().ref().child("food").on('value', function(snap) {
    var y = snap.val()
    $scope.data = y;
    console.log(y);
  });

  $scope.share = function() {
    var d = new Date();
    var n = d.getTime();
    var id = Math.floor(n / -1000);
    $scope.sharetips.created = n;
    $scope.sharetips.created_by = UserID;
    firebase.database().ref().child('tips').child(id).set($scope.sharetips);
    $scope.modal.show();
  };

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
    $state.go('main')
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });
})

  .controller('TipsCtrl', function($scope, $firebaseObject, $firebaseArray, $ionicModal, $ionicPopover) {

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

    $ionicModal.fromTemplateUrl('modal-share-facebook.html', {
      id: '1',
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.oModal1 = modal;
    });

    $ionicModal.fromTemplateUrl('modal-share-twitter.html', {
      id: '2',
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.oModal2 = modal;
    });

    $scope.openModal = function(index) {
      if (index == 1) $scope.oModal1.show();
      else $scope.oModal2.show();
    };

    $scope.closeModal = function(index) {
      if (index == 1) $scope.oModal1.hide();
      else $scope.oModal2.hide();
    };
    // Cleanup the modal when we're done with it!
    $scope.$on('modal.shown', function(event, modal) {
      console.log('Modal ' + modal.id + ' is shown!');
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function(event, modal) {
      console.log('Modal ' + modal.id + ' is hidden!');
    });
    // Execute action on remove modal
    $scope.$on('$destroy', function() {
      console.log('Destroying modals...');
      $scope.oModal1.remove();
      $scope.oModal2.remove();
    });

    // .fromTemplate() method
    var template = '<ion-popover-view><ion-header-bar> <h1 class="title">My Popover Title</h1> </ion-header-bar> <ion-content> Hello! </ion-content></ion-popover-view>';

    $scope.popover = $ionicPopover.fromTemplate(template, {
      scope: $scope
    });

    // .fromTemplateUrl() method
    $ionicPopover.fromTemplateUrl('my-popover.html', {
      scope: $scope
    }).then(function(popover) {
      $scope.popover = popover;
    });


    $scope.openPopover = function($event) {
      $scope.popover.show($event);
    };
    $scope.closePopover = function() {
      $scope.popover.hide();
    };
    //Cleanup the popover when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.popover.remove();
    });
    // Execute action on hidden popover
    $scope.$on('popover.hidden', function() {
      // Execute action
    });
    // Execute action on remove popover
    $scope.$on('popover.removed', function() {
      // Execute action
    });
  })

  .controller('RequestFoodCtrl', function($http, UserID, $scope, $firebaseObject, $firebaseArray, $ionicModal, $stateParams, $state) {
    $scope.gomain = function () {
      angular.element('.tab-nav.tabs').css('position','absolute')
      angular.element('.tab-nav.tabs').css('top','44px')
      $state.go('main')
    }

    $scope.pesan = function() {
      var d = new Date();
      var n = d.getTime();
      var id = Math.floor(n / -1000);
      $scope.pesanan = {
        buyer: UserID,
        seller: $scope.data.user,
        food: $stateParams.id
      }
      var token = []
      firebase.database().ref().child('food').child($stateParams.id).update({
        status : "DONE"
      })
      firebase.database().ref().child('transaction').child(id).set($scope.pesanan);
      firebase.database().ref().child('users').child($scope.data.user).on('value', function(snap) {
        var tmp = snap.val()
        token.push(tmp.token)
      })
      console.log(token)
//      token.push("fjEu2fyMmTY:APA91bG4Yyg4MZy4FFzCLa5pnZF8OMhR8gi5bQr7gIDg9oSdNS05SU4DG-8JIFt4K4QVyDBNqfFa1av2mBrwL83uu3ORIyIuEGYVjcJj8kAChqai2YjHEBFMU-Y2Uc07rdrWErG4dal3")
      $http({
        method: 'POST',
        url: 'https://api.ionic.io/push/notifications',
         headers: {
           'Content-Type': 'application/json',
           'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJhZDY3YzM1Yi01Mzg2LTQ4MmUtODJmNy04MjhhNzY3M2M2YjYifQ.oxUOZTyZjb-CgoXPjef3674Nq1A_gxanP1wOt_mm3UQ',
         },
         data: {
          tokens: token,
          profile: 'firebase',
          notification: {
            title: "Aglio",
            message: "Ada pesanan masuk!",
            android: {
              title: "Aglio",
              message: "Ada pesanan masuk!"
            }
          }
         }
      }).then(function successCallback(response) {
        console.log(response)
          // this callback will be called asynchronously
          // when the response is available
        }, function errorCallback(response) {
        console.log(response)
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });
      alert('barang berhasil dipesan')
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
  $scope.sameperson = true;
  var id = $stateParams.id;
  firebase.database().ref().child("food").child(id).on('value', function(snap) {
    var y = snap.val()
    $scope.data = y;
      console.log(y.user)
      console.log(UserID)
    if (y.user===UserID) {
      $scope.sameperson = true;
    } else {
      $scope.sameperson = false;
    }
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

.controller('MyFoodCtrl', function(UserID, $scope, $firebaseObject, $firebaseArray, $state,  $ionicPush) {
    var ref = firebase.database().ref().child("transaction");
    var obj = $firebaseObject(ref);
    $scope.ygdipesan = {}
    $scope.ygdibagikan = {}
    var ygdibagikan = {};
    var ygdipesan = {};
    firebase.database().ref().child("transaction").on('value', function(snap) {
      var y = snap.val()
      $scope.data = y;
      angular.forEach(y, function(value, key) {
        if (value.seller === UserID) {
          firebase.database().ref().child("food").child(value.food).on('value', function(snap1) {
//          console.log("Sekali")
            ygdibagikan[value.food.toString()] = snap1.val();
            $scope.ygdibagikan = ygdibagikan;
            console.log($scope.ygdibagikan);
          })
        }

        if (value.buyer === UserID) {
          console.log(value.food)
          firebase.database().ref().child("food").child(value.food).on('value', function(snap1) {
            ygdipesan[value.food.toString()] = snap1.val();
            $scope.ygdipesan = ygdipesan;
            console.log($scope.ygdipesan);
          })
//          $scope.ygdipesan[key] = value;
        }
      })
      console.log(ygdipesan);
    });

    $scope.ygdibagikan = ygdibagikan;
    $scope.ygdipesan = ygdipesan;
    obj.$bindTo($scope, "data")

    $scope.gomain = function() {
      $state.go('main')
    }
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

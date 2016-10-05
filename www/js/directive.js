angular.module('starter.directives', [])
.directive('resize', function ($window) {
  return function (scope, element) {
    var w = angular.element($window);
    scope.getWindowDimensions = function () {
      return { 'h': w.height(), 'w': w.width() };
    };
    scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
      scope.windowHeight = newValue.h;
      scope.windowWidth = newValue.w;

      /*snap icon*/
      scope.top = newValue.h *0.85;
      scope.right = newValue.w*0.42;
      scope.style = function () {

      };

    }, true);

    w.bind('resize', function () {
      scope.$apply();
    });
  }
})
.directive('resizeGo', function ($window) {
  return function (scope, element) {
    var w = angular.element($window);
    scope.getWindowDimensions = function () {
      return { 'h': w.height(), 'w': w.width() };
    };
    scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {

      scope.windowHeight = newValue.h;
      scope.windowWidth = newValue.w;
      scope.top2 = newValue.h * 0.875;
      scope.right2 = newValue.w * 0.82;
      scope.top3 = newValue.h * 0.875;
      scope.right3 = newValue.w * 0.08;

      scope.top1 = newValue.h *0.875;
      scope.right1 = newValue.w*0.05;

      scope.gotop = newValue.h *0.825;
      scope.goright = newValue.w*0.05;

      scope.settingtop = newValue.h * 0.04;
      scope.settingright = newValue.w * 0.06;

      scope.style = function () {

      };

    }, true);

    w.bind('resizeGo', function () {
      scope.$apply();
    });
  }
}).directive('backImg', function(){
    return function(scope, element, attrs){
      var url = attrs.backImg;
      element.css({
        'background-image': 'url(' + url +')',
        'background-size' : 'cover'
      });
    };
  }).directive('pukimak', function ($window) {
    return function (scope, element) {
      var w = angular.element(scope);
      scope.getWindowDimensions = function () {
        return { 'h': scope.url };
      };
      scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
        scope.style = function () {

        };
        element.css({
          'background-image': 'url(' + scope.url +')',
          'background-size' : 'cover'
        });

      }, true);

      w.bind('pukimak', function () {
        scope.$apply();
      });
    }
  }).directive('imageonload', function () {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        element.bind('load', function () {
          //call the function that was passed
          scope.$apply(attrs.imageonload);
        });
      }
    };
  })

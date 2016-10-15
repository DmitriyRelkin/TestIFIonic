angular
.module('Test', [
  'ionic'
]);
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

angular
.module('Test')
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

// ----------------------------------------------------------------------------------

angular
.module('Test')
.factory('sendData', sendData);
sendData.$inject = ['$http'];
function sendData($http) {
  var data;
  return {
      send: send
  };
  function send(data) {
    return $http.post("/login", data);
  }
};

// ----------------------------------------------------------------------------------
angular
.module('Test')
.directive('validateEmail', validateEmail);

function validateEmail() {

  var EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return {
    restrict: 'A',
    require: 'ngModel',
    link: link
  };

  function link (scope, elm, attrs, ctrl) {
    /* only apply the validator if ngModel is present and Angular has added the email validator */
    if (ctrl && ctrl.$validators.email) {
      /* this will overwrite the default Angular email validator */
      ctrl.$validators.email = function(modelValue) {
        return ctrl.$isEmpty(modelValue) || EMAIL_REGEXP.test(modelValue);
      };
    }
  }
};

// ----------------------------------------------------------------------------------

angular
.module('Test')
.directive('passwordVerify', passwordVerify);
  passwordVerify.$inject = ['$parse'];
  function passwordVerify($parse) {
  return {
      require: "ngModel",
      link: link
   };

  function link (scope, elem, attrs, ngModel) {
    var originalModel = $parse(attrs.passwordVerify),
        secondModel = $parse(attrs.ngModel);
    // Watch for changes to this input
    scope.$watch(attrs.ngModel, function (newValue) {
      ngModel.$setValidity(attrs.name, newValue === originalModel(scope));
    });
    // Watch for changes to the value-matches model's value
    scope.$watch(attrs.passwordVerify, function (newValue) {
      ngModel.$setValidity(attrs.name, newValue === secondModel(scope));
    });
  }

};

// ----------------------------------------------------------------------------------
angular
.module('Test')
.controller('TestCtrl', ToDoCtrl);
ToDoCtrl.$inject = ['$scope', '$ionicModal', 'sendData']
function ToDoCtrl($scope, $ionicModal, sendData) {

  var vm = this;

  vm.sendDataReg = sendDataReg;

  vm.regData = {};

  function sendDataReg(data) {

    vm.spinnerClass = "sucsesfull";

    sendData.send(data).then(function () {
      console.log('200 ok!');
    },function () {
      console.log('501 bad!');
    });
  };

};

var json = {
    "Array": [1, 2, 3], "Boolean": true, "Null": null, "Number": 123,
    "Object": {"a": "b", "c": "d"}, "String": "Hello World"
};
angular.module('ngApp', ['angular-jsoneditor']).controller('ngCtrl', function ($scope) {
   $scope.obj = {
     data: json,
     optionsOne: {
       mode: 'code'
     },
     optionsTwo: {
       mode: 'tree'
     }
   };

   $("#darkCSS").attr("disabled", "disabled");

   $scope.onLoad = function(instance) {
     instance.expandAll();
   };
   $scope.pretty = function(obj) {
     return obj;
   };

   $scope.switchMode = function(){
      $scope.darkMode = !$scope.darkMode;
      var attr = $("#darkCSS").attr('disabled');
      if (typeof attr !== typeof undefined && attr !== false) {
        $("#darkCSS").removeAttr("disabled");
      }else{
         $("#darkCSS").attr("disabled", "disabled");
      }
   }
});
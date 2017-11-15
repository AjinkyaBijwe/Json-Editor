var json = {
    "Array": [1, 2, 3], "Boolean": true, "Null": null, "Number": 123,
    "Object": {"a": "b", "c": "d"}, "String": "Hello World",
    "auto": "$Hello World"
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
   $scope.onLoad = function(instance) {
     instance.expandAll();
   };
   $scope.pretty = function(obj) {
     return obj;
   };
});

(function(){

  var app = angular.module('starter', ['ionic','angularMoment'])

  app.controller('RedditCtrl',function($scope,$http){

     $scope.posts = [];
     $http.get('https://www.reddit.com/r/gaming/new/.json').success(function(posts){
       //console.log(posts)
        angular.forEach(posts.data.children,function(post){
            $scope.posts.push(post.data);

        });
     });
     $scope.cargarNuevosPosts = function(){
      var params2 = {};
      if($scope.posts.lenght > 0){
          params2['after']= $scope.posts[$scope.posts.lenght - 1].name;

      }
       $http.get('https://www.reddit.com/r/gaming/new/.json',{params:params2})
          .success(function(posts){
         //console.log(posts)
            angular.forEach(posts.data.children,function(post){
              $scope.posts.push(post.data);
          });
          $scope.$broadcast('scroll.infiniteScrollComplete');
       });
     };
  });

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {

      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
}());

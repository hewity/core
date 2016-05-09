"use strict";

(function(){
  angular.module('app', [
    "ui.router",
    "ngResource"
  ])
  .config([
    "$stateProvider",
    RouterFunction
  ])
  .controller("PostsIndexController", PostsIndexControllerFunc)
  .factory("PostFactory", PostFactoryFunc);

  PostFactoryFunc.$inject=["$resource"];
  function PostFactoryFunc($resource){
    return $resource("http://localhost:3000/posts/:id.json", {})
  }

  function RouterFunction($stateProvider){
    $stateProvider.state("postsIndex", {
      url: "/posts",
      templateUrl: "core_app/posts/index.html",
      controller: "PostsIndexController",
      controllerAs: "postsIndexVm"
    })
  }

PostsIndexControllerFunc.$inject=["$state", "PostFactory"]
function PostsIndexControllerFunc($state, PostFactory){
  var postsIndexVm = this;
  postsIndexVm.posts = PostFactory.query()
  postsIndexVm.newPost= new PostFactory();

  postsIndexVm.create = function() {
    postsIndexVm.newPost.$save().then(function(){
      $state.go("postsIndex", {}, {reload: true});
    })
  }
}

})();

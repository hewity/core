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
  .controller("PostsShowController", PostsShowControllerFunc)
  .factory("PostFactory", PostFactoryFunc);

  PostFactoryFunc.$inject=["$resource"];
  function PostFactoryFunc($resource){
    return $resource("http://localhost:3000/posts/:id.json", {}, {
      update: { method: "PUT" }
    });
  }

  function RouterFunction($stateProvider){
    $stateProvider.state("postsIndex", {
      url: "/posts",
      templateUrl: "core_app/posts/index.html",
      controller: "PostsIndexController",
      controllerAs: "postsIndexVm"
    })
    .state("postsShow", {
      url: "/posts/:id",
      templateUrl: "core_app/posts/show.html",
      controller: "PostsShowController",
      controllerAs: "postsShowVm"
    });
  }

PostsIndexControllerFunc.$inject=["$state", "PostFactory"];
function PostsIndexControllerFunc($state, PostFactory) {
  var postsIndexVm = this;
  postsIndexVm.posts = PostFactory.query();
  postsIndexVm.newPost= new PostFactory();

  postsIndexVm.create = function() {
    postsIndexVm.newPost.$save().then(function(){
      $state.go("postsIndex", {}, {reload: true});
    });
  };
}

PostsShowControllerFunc.$inject =["PostFactory", "$stateParams", "$state"];
function PostsShowControllerFunc(PostFactory, $stateParams, $state) {
  var postsShowVm = this;
  postsShowVm.post = PostFactory.get({id: $stateParams.id});

  postsShowVm.update = function() {
    postsShowVm.post.$update({id: $stateParams.id}).then(function() {
      $state.go("postsIndex", {}, {reload: true});
    });
  };

  postsShowVm.delete = function() {
    postsShowVm.post.$delete({id: $stateParams.id}).then(function() {
      $state.go("postsIndex", {}, {reload: true});
    });
  };
}

})();

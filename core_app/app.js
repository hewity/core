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
  .controller("LocationController" LocationControllerFunc)
  .factory("PostFactory", PostFactoryFunc)
  .factory("CommentFactory", CommentFactoryFunc);


  PostFactoryFunc.$inject=["$resource"];
  function PostFactoryFunc($resource){
    return $resource("http://localhost:3000/posts/:id.json", {}, {
      update: { method: "PUT" }
    });
  }

  CommentFactoryFunc.$inject=["$resource"];
  function CommentFactoryFunc($resource){
    return $resource("http://localhost:3000/posts/:id.json", {} );
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
function LocationControllerFunc(LinkFactory, PostFactory){

}
PostsIndexControllerFunc.$inject=["$state", "PostFactory"];
function PostsIndexControllerFunc($state, PostFactory) {
  var postsIndexVm = this;
  postsIndexVm.posts = PostFactory.query();
  postsIndexVm.newPost= new PostFactory();

  postsIndexVm.create = function() {
    postsIndexVm.newPost.$save().then(function(){
      $state.go("postsIndex", {}, {reload: true});

  postsIndexVm.sort_data_by = function(location){
    postsIndexVm.sort_on = location;
    postsIndexVm.is_descending = !(postsIndexVm.is_descending);
  };
    });
  };
}

PostsShowControllerFunc.$inject =["PostFactory", "CommentFactory", "$stateParams", "$state"];
function PostsShowControllerFunc(PostFactory, CommentFactory, $stateParams, $state) {
  var postsShowVm = this;
  postsShowVm.post = PostFactory.get({id: $stateParams.id});
  postsShowVm.newComment = new CommentFactory();

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

  postsShowVm.createComment = function() {
    postsShowVm.newComment.$save();
  };
}

})();

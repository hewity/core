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
  .controller("LinksIndexController", LinksIndexControllerFunc)
  .factory("PostFactory", PostFactoryFunc)
  .factory("LinkFactory", LinkFactoryFunc)
  .factory("CommentFactory", CommentFactoryFunc)
  .factory("TagFactory", TagFactoryFunc);


  PostFactoryFunc.$inject=["$resource"];
  function PostFactoryFunc($resource){
    return $resource("https://community-resource.herokuapp.com/posts/:id.json", {}, {
      update: { method: "PUT" }
    });
  }

  LinkFactoryFunc.$inject=["$resource"];
  function LinkFactoryFunc($resource){
    return $resource("http://localhost:3000/links/:id.json", {}, {
      update: { method: "PUT" }
    });
  }

  TagFactoryFunc.$inject=["$resource"];
  function TagFactoryFunc($resource){
    return $resource("http://localhost:3000/tags/:id.json", {}, {
      update: { method: "PUT" }
    });
  }

  CommentFactoryFunc.$inject=["$resource"];
  function CommentFactoryFunc($resource){
    return $resource("https://community-resource.herokuapp.com/posts/:id.json", {} );
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
    })
    .state("linksIndex", {
      url: "/links",
      templateUrl: "core_app/links/index.html",
      controller: "LinksIndexController",
      controllerAs: "linksIndexVm"
    });
  }

PostsIndexControllerFunc.$inject=["$state", "PostFactory"];
function PostsIndexControllerFunc($state, PostFactory) {
  var postsIndexVm = this;
  postsIndexVm.posts = PostFactory.query(function(){ });
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

LinksIndexControllerFunc.$inject=["$state", "LinkFactory"];
function LinksIndexControllerFunc($state, LinkFactory) {
  var linksIndexVm = this;
  linksIndexVm.linksList = LinkFactory.query();
  linksIndexVm.newLink= new LinkFactory();
  linksIndexVm.create = function() {
    linksIndexVm.newLink.$save().then(function(){
      $state.go("linksIndex", {}, {reload: true});
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
      $state.go("postsShow({id: $stateParams.id})", {}, {reload: true});
    });
  };

  postsShowVm.delete = function() {
    postsShowVm.post.$delete({id: $stateParams.id}).then(function() {
      $state.go("postsIndex", {}, {reload: true});
    });
  };

  postsShowVm.createComment = function() {
    var newCommentPost = postsShowVm.newComment;
    newCommentPost.post_id = postsShowVm.post.id;
    newCommentPost.$save();
  };
}

})();

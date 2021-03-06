describe("app router", function(){

  describe("when a route fires", function(){
    var Router = Backbone.Marionette.AppRouter.extend({
      appRoutes: {
        "m1": "method1"
      }
    });

    var controller = {
      method1: function(){},
    }

    beforeEach(function(){
      spyOn(controller, "method1");

      var router = new Router({
        controller: controller
      });
      startRouters();

      router.navigate("m1", true);
    });

    it("should call the configured method on the specified controller", function(){
      expect(controller.method1).toHaveBeenCalled();
    });
  });

  describe("when a route fires", function(){
    var Router = Backbone.Marionette.AppRouter.extend({
      appRoutes: {
        "m2/:id": "withParam"
      }
    });

    var controller = {
      withParam: function(id){}
    }

    beforeEach(function(){
      spyOn(controller, "withParam");

      var router = new Router({
        controller: controller
      });
      startRouters();

      router.navigate("m2/1", true);
    });

    it("should call the configured method with parameters", function(){
      expect(controller.withParam).toHaveBeenCalledWith("1");
    });
  });

  describe("when a standard route is defined and fired", function(){
    var Router = Backbone.Marionette.AppRouter.extend({
      routes: {
        "m3": "standardRoute"
      },

      standardRoute: function(){}
    });

    var router;

    beforeEach(function(){
      spyOn(Router.prototype, "standardRoute").andCallThrough();

      router = new Router();
      startRouters();

      router.navigate("m3", true);
    });

    it("should fire the route callback", function(){
      expect(Router.prototype.standardRoute).toHaveBeenCalled();
    });
  });

});

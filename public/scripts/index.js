var HappenStanceView = Backbone.View.extend({
        el: '.jumbotron',
        render: function(){
          this.$el.html("<h2>"+'Connect with people'+"</h2><p>moments of Serendipity.</p>");
        }
      });

      var Router =  Backbone.Router.extend({
        routes: {
          '':'home'
        }
      });

      var happenStanceView = new HappenStanceView();

      var router = new Router();
      router.on('route:home', function(){
        happenStanceView.render();
        console.log("hello");
      });
      
      Backbone.history.start();
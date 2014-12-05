;(function(){
  console.time("time")
  function getMargin($target,prop){
    return parseInt($target.css(prop));
  }

  var Cell =  Backbone.Model.extend({

    defaults: function() {
      return {
        current: false,
        order: Cells.nextOrder(),
        width:0,
        position: 0
      };
    },

  });

  var CellList = Backbone.Collection.extend({
    model: Cell,
    localStorage: new Backbone.LocalStorage("slider-lists"),
    nextOrder: function() {
      if (!this.length) return 1;
      return this.last().get('order') + 1;
    },
    updatePosition:function(index){
      this.each(function(item){
        item.set({"current":false},{silent:true})
      })
      this.at(index).set("current",true)
    },
    getCurrentIndex:function(){
      var cell = this.where({current:true})[0]
      return this.indexOf(cell);
    },
    comparator: 'order'
  });

  var Cells = new CellList;


  var CellView = Backbone.View.extend({
    initialize: function() {
      this.setSlidePostion();
    },
    setSlidePostion:function(){
      var width = this.$el.width()
      var margin = getMargin(this.$el,"margin-right");

      this.model.set("width",width + margin);

      var width_all = Cells.reduce(function(prev,model){
        return prev + model.get("width");
      },0);
      this.model.set("position",width_all - margin - (width / 2));
    }
  })

  var Slider = Backbone.Model.extend({
    defaults: function() {
      return {
        width:0,
        duration:200,
      };
    }
  })

  var slider = new Slider;
  var SliderView = Backbone.View.extend({
    model: slider,
    el:$("#slide"),
    initialize: function() {
      this.model.set("width",this.$el.parent("#slide-wrap").width())
      this.listenTo(Cells, 'add', this.addOne);
      this.listenTo(Cells, 'change:current', this.moveSlider);

      this.$("li").each(function(){
        Cells.create(new Cell);
      })

      Cells.updatePosition(50);
    },
    addOne:function(cell){
      var index = Cells.indexOf(cell);
      new CellView({model:cell,el:this.$("li").eq(index)})
    },
    moveSlider:function(){

      var df = new $.Deferred();
      var self = this;
      var duration = this.model.get("duration");
      var position = this.getSlidePosition();

      this.$el.stop(true,false).animate(
        {"margin-left":position},
        duration,
        function(){
          df.resolve();
      });

      return df.promise();

    },
    getSlidePosition:function(){
      var current = Cells.where({current:true})[0];
      return current.get("position") * -1 + (this.model.get("width") / 2) ;
    }
  });

  var ControllerView = Backbone.View.extend({
    el:$("#control"),
    // The DOM events specific to an item.
    events: {
      "click #prev"   : "prev",
      "click #next"   : "next",
    },
    next:function(){
      var index = Cells.getCurrentIndex() + 1;

      if (index >= Cells.length)
        index = 0

      Cells.updatePosition(index);

    },
    prev:function(){
      var index = Cells.getCurrentIndex() - 1;

      if (index < 0)
        index = Cells.length - 1

      Cells.updatePosition(index);
    }
  });

  var Slider = new SliderView;
  var Controller = new ControllerView;

  console.timeEnd("time")

})()


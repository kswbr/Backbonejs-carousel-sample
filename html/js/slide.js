$(function(){

  var Cell =  Backbone.Model.extend({

    // Default attributes for the todo item.
    defaults: function() {
      return {
        current: false
        order: Cells.nextOrder(),
      };
    }

  });
  var List = Backbone.Collection.extend({

    model: Cell,
    localStorage: new Backbone.LocalStorage("slider-lists"),
    current: function() {
      return this.where({current: true});
    },
    notCurrent: function() {
      console.log(this.without.apply(this))
      console.log(this.without.apply(this,this.current()))
      return this.without.apply(this, this.current());
    },
    nextOrder: function() {
      if (!this.length) return 1;
      return this.last().get('order') + 1;
    },
    comparator: 'order'

  });

  var Cells = new List


  var _config = {
    slide:{
      duration:200
    }
  }

  var Slider = function(){
    console.time('init');
    this.init();
    console.timeEnd('init');

  }
  Slider.prototype = {

    init:function(){
      var self = this;

      this.$slide = $("#slide")
      this.$slide_lists = this.$slide.find("li");

      this.setSlideWidth();

      this.current_index = this.getSlideIndex();

      this.slideLists();

      $("#prev").on("click",function(){
        self.current_index--;

        //とぅーどうー
        if (self.current_index < 0)
          self.current_index = 99;

        self.slideLists();
      })
      $("#next").on("click",function(){
        self.current_index++;

        //とぅーどうー
        if (self.current_index >= 100)
          self.current_index = 0;

        self.slideLists();
      })
    },
    setSlideWidth:function(){

      var width_all = 0;
      var self = this;
      var margin = this.getSlideListMargin();
      this.slide_wrapper_width = $("#slide-wrap").width();

      this.slide_lists = {
        position:[],
        width:[]
      };

      this.$slide_lists.each(function(i){

        var $me = $(this)
        var width = $me.width();
        self.slide_lists.width[i] = width + margin;

        width_all += self.slide_lists.width[i]
        self.slide_lists.position[i] = width_all - margin - (width / 2);
      })

      this.slide_width = width_all;
      this.$slide.width(width_all);
    },

    getSlideListMargin:function(){
      return getMargin(this.$slide_lists,"margin-right");
    },

    slideLists:function(){
      var index = this.current_index;
      var position = this.slide_lists.position[index] * -1 + (this.slide_wrapper_width / 2);

      this.animateSlideLists(position);
    },
    animateSlideLists:function(position){

      var df = new $.Deferred();
      var self = this;
      var duration = _config.slide.duration;

      this.is_animating = true;

      this.$slide.stop(true,false).animate(
        {"margin-left":position},
        duration,
        function(){
          self.is_animating = false;
          df.resolve();
      });

      return df.promise();

    },

    getSlideIndex:function(){
      //TODOTODO
      return 50;
    }

  }

  function getMargin($target,prop){
    return parseInt($target.css(prop));
  }

  var slider = new Slider();



});

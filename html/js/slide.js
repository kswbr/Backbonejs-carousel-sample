(function() {

  console.time('init');
  var _config = {
    slide:{
      duration:200
    }
  }

  var Slider = function(){
    this.init();

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

  console.timeEnd('init');


})()

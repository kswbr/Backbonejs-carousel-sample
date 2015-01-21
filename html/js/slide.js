(function() {

  var _config = {
    slide:{
      duration:1000
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

      this.$slide = document.getElementById("slide");
      this.$slide_lists = this.$slide.getElementsByTagName("li");

      this.setSlideWidth();

      this.current_index = this.getSlideIndex();

      this.slideLists();

      document.getElementById("prev").addEventListener("click", function(){
        self.current_index--;

        //とぅーどうー
        if (self.current_index < 0)
          self.current_index = 99;

        self.slideLists();
      }, false);

      document.getElementById("next").addEventListener("click", function(){
        self.current_index++;

        //とぅーどうー
        if (self.current_index >= 100)
          self.current_index = 0;

        self.slideLists();
      }, false);
    },
    setSlideWidth:function(){

      var width_all = 0;
      var self = this;
      var margin = this.getSlideListMargin();

      var slide_wrap =  document.getElementById("slide-wrap");
      this.slide_wrapper_width = parseInt(document.defaultView.getComputedStyle(slide_wrap, null).width);

      this.slide_lists = {
        position:[],
        width:[]
      };

      Array.prototype.forEach.call(this.$slide_lists, function(node,i) {
        var $me = node;
        var width = parseInt($me.style.width);
        self.slide_lists.width[i] = width + margin;
        width_all += self.slide_lists.width[i]
        self.slide_lists.position[i] = width_all - margin - (width / 2);
      });

      this.slide_width = width_all;
      this.$slide.style.width = width_all + "px";
    },

    getSlideListMargin:function(){
      return parseInt(document.defaultView.getComputedStyle(this.$slide_lists[0], null).marginRight);
    },

    slideLists:function(){
      var index = this.current_index;
      var position = this.slide_lists.position[index] * -1 + (this.slide_wrapper_width / 2);

      this.animateSlideLists(position);
    },
    animateSlideLists:function(position){

      var self = this;
      var duration = _config.slide.duration;
      var first_animated = false;

      var marginLeft = parseInt(document.defaultView.getComputedStyle(this.$slide, null).marginLeft);

      function animate(opts) {

        var start = new Date

        var id = setInterval(function() {
          var timePassed = new Date - start
          var progress = timePassed / opts.duration

          if (progress > 1) progress = 1

          var delta = opts.delta(progress)
          opts.step(delta)

          if (progress == 1) {
            clearInterval(id)
            var event = document.createEvent("HTMLEvents");
            event.initEvent("slideEnd");
            document.dispatchEvent(event);

          }
        }, opts.delay || 10)

      }

      var delta = function quad(progress) {
        return Math.pow(progress, 2)
      }

      var to = position;
      animate({
        delay: 10,
        duration:  duration, // 1 sec by default
        delta: delta,
        step: function(delta) {
          var position = (to - marginLeft) * delta;
          self.$slide.style.marginLeft = marginLeft + position + "px"
        }
      })

      document.addEventListener("slideEnd",function(){
        if (!first_animated){
          _config.slide.duration = 200;
          first_animated = true;
        }
      });

      return ;

    },

    getSlideIndex:function(){
      //TODOTODO
      return 50;
    }

  }

  var slider = new Slider();



})()

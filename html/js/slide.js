// Production steps of ECMA-262, Edition 5, 15.4.4.19
// Reference: http://es5.github.com/#x15.4.4.19
if (!Array.prototype.map) {
  Array.prototype.map = function(callback, thisArg) {

    var T, A, k;

    if (this == null) {
      throw new TypeError(" this is null or not defined");
    }

    // 1. Let O be the result of calling ToObject passing the |this| value as the argument.
    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
    // 3. Let len be ToUint32(lenValue).
    var len = O.length >>> 0;

    // 4. If IsCallable(callback) is false, throw a TypeError exception.
    // See: http://es5.github.com/#x9.11
    if ({}.toString.call(callback) != "[object Function]") {
      throw new TypeError(callback + " is not a function");
    }

    // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
    if (thisArg) {
      T = thisArg;
    }

    // 6. Let A be a new array created as if by the expression new Array(len) where Array is
    // the standard built-in constructor with that name and len is the value of len.
    A = new Array(len);

    // 7. Let k be 0
    k = 0;

    // 8. Repeat, while k < len
    while(k < len) {

      var kValue, mappedValue;

      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then
      if (k in O) {

        // i. Let kValue be the result of calling the Get internal method of O with argument Pk.
        kValue = O[ k ];

        // ii. Let mappedValue be the result of calling the Call internal method of callback
        // with T as the this value and argument list containing kValue, k, and O.
        mappedValue = callback.call(T, kValue, k, O);

        // iii. Call the DefineOwnProperty internal method of A with arguments
        // Pk, Property Descriptor {Value: mappedValue, Writable: true, Enumerable: true, Configurable: true},
        // and false.

        // In browsers that support Object.defineProperty, use the following:
        // Object.defineProperty(A, Pk, { value: mappedValue, writable: true, enumerable: true, configurable: true });

        // For best browser support, use the following:
        A[ k ] = mappedValue;
      }
      // d. Increase k by 1.
      k++;
    }

    // 9. return A
    return A;
  };
}
(function() {

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

      var marginLeft = parseInt(document.defaultView.getComputedStyle(this.$slide, null).marginLeft);

      function frame(elem,position) {
        marginLeft -= 50

        if (marginLeft <= position){
          elem.style.marginLeft = position + 'px' // show frame
          clearInterval(id)
        } else {
          elem.style.marginLeft = marginLeft + 'px' // show frame
        }
      }

      var id = setInterval(function(){
        frame(self.$slide,position)
      }, 1) // draw every 10ms

      return ;

    },

    getSlideIndex:function(){
      //TODOTODO
      return 50;
    }

  }

  var slider = new Slider();



})()

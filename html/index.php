<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title></title>



  <style type="text/css">
    #contents{
      width:880px;
      margin:0 auto;
    }

    #slide-wrap{
      overflow:hidden;
      height:60px;
    }

    #slide{
      width:10000px;
      padding: 0;
    }

    #slide > li {
      height:60px;
      float:left;
      list-style:none;
      background-color: #ccc;
      margin-right:10px;
    }
    #prev{
      float:left;
    }
    #next{
      float:right;
    }
    #guide{
      position:absolute;
      width:90px;
      height:60px;
      background-color:red;
      opacity:0.4;
      left: 50%;
      margin-left: -45px;
    }
  </style>
<!-- めんどうくさかったのでCDNまんまで -->
  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
  <script src="./js/underscore.js"></script>

</head>
<body>
<div id="contents">

  <div id="slide-wrap">
    <ul id="slide">
    <?php

    $width_list = array(90,100,110,120,130);

    for ($i = 0; $i < 100; $i++){

      $width = $width_list[array_rand($width_list)];
      echo "<li style='width:{$width}px'>$i:{$width}px</li>\n";
    }

    ?>
    </ul>
    <div id="guide">&nbsp;</div>

  </div>

  <div id="control">
    <a id="prev" href="#TODO"><<</a><a id="next" href="#TODO">>></a>
  </div>

</div>

<script src="./js/slide.js"></script>

</body>
</html>

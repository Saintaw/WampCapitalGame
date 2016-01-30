<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>WampCapitalGame</title>

    <!-- Bootstrap -->
    <link href="./css/bootstrap.css" rel="stylesheet">
    <link href="./css/main.css" rel="stylesheet">

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
  <!-- Fixed navbar -->
<?php
include_once './nav/topnav.php';
?>
  <div class="container">
      <div class="row">
          /*blah is not shown with fixed nav*/
          <br /><br /><hr />
      </div>
<?php
/*Main index switch*/
if (isset($_GET['appaction']))
    {
    $appaction = $_GET['appaction']; 
    }
else
    {
    $appaction = "continent"; 
    }
echo "Current Action: " .$appaction;    
    
switch ($appaction) {
    case "continent":
        include_once './inc/continent_game.php';
    case "map":
        include_once './inc/map_game.php';
}
?>
    </div> <!-- /container -->




    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap.min.js"></script>
<?php
switch ($appaction) {
    case "continent":
        echo '<script src="js/continent_game.js"></script>';
    case "map":
        echo '<script src="js/three.min.js"></script>';
        echo '<script src="js/Detector.js"></script>';
        echo '<script src="js/Tween.js"></script>';
        echo '<script src="js/globe.js"></script>';
        echo '<script src="js/map_game.js"></script>';
        
        
}
?>
    
    
  </body>
</html>
<?
if (!defined('ENGINE')) {
    die("Hack no attempt!");
}

?>

<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <link rel="stylesheet" href="./styles/bootstrap.min.css">
        <link rel="stylesheet" href="./styles/settings.css">
        
    </head>

    <body>
        <div id="wrap">
            <div class="wrapH1"><span>Welcome to settings!</span></div>
            <!-- <div class="wrapH2"><span>Exit</span></div> -->

            <div id="Exit">
                <form  method="post">
                    <button type="submit" name="logout" class="btn btn-danger ">Exit</button>
                </form>
                
            </div>
        </div>
    </body>

</html>
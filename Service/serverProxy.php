<?php 
require  'libs.php';
require  'config.php';
require  'CmsOAuthToken.php';
session_start();

$oauth = isset($_SESSION["oauth"]) ? $_SESSION["oauth"] : null;
$cookie = null;


if ($oauth){
  $x = new CmsOAuthToken($oauth);

  if ($x->isAccessExpired()){
    //todo refresh token 
    //return;
  }
  $cookie = "Cookie: oauth_token=".$x->accessToken."\r\n ";
}

try {
	$action = isset($_GET["action"]) ? $_GET["action"] : null ;
	$id = isset($_GET["id"]) ? $_GET["id"] : null ;
	$u = resolve(BASE_URL, $action, $id);
	echo getContent($u, "GET", null, $cookie);
}
catch(Exception $ex) {
	echo ExceptionToJson($ex, error_get_last());
}

?>

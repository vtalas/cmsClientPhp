<?php 
require  'libs.php';
require  'config.php';


function get_data($url)
{
  $ch = curl_init();
  $timeout = 5;
  curl_setopt($ch,CURLOPT_URL,$url);
  curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
  curl_setopt($ch,CURLOPT_CONNECTTIMEOUT,$timeout);
  $data = curl_exec($ch);
  if(!curl_errno($ch)){ 
     return $data;
  }else{
    echo 'Curl error: ' . curl_error($ch); 
  }
curl_close($ch);
}

try {
	$action = isset($_GET["action"]) ? $_GET["action"] : null ;
	$id = isset($_GET["id"]) ? $_GET["id"] : null ;
	$u = resolve(BASE_URL, $action, $id);
	echo getContent($u, "GET");
}
catch(Exception $ex) {
	echo ExceptionToJson($ex, error_get_last());
}

?>
<?php 
require  'libs.php';
require  'config.php';

function resolve($baseurl, $action, $id=null)
{
	$baseurl = $baseurl."/".$action;
	if ($id != null) {
		$baseurl = $baseurl."/".$id;
	}
	return $baseurl;
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
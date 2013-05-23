<?php
require  'CmsOAuthToken.php';

if (!function_exists("preprint")) { 
	function preprint($s, $return=false) { 
		$x = "<pre>"; 
		$x .= print_r($s, 1); 
		$x .= "</pre>"; 
		if ($return) return $x; 
		else print $x; 
	} 
} 
function fatal($message){
	$list['error'] = $message; 
	echo json_encode($list);
	exit;

}

function isimage($file){
	$p = pathinfo($file);
	if (isset($p['extension']))
	{
		$e = strtolower($p['extension']);
		return 	($e == 'jpg'||$e == 'jpeg' || $e == 'gif' ||	$e == 'png');
	}
	return false;
}

function ExceptionToJson($ex, $inner="") {
	$rs["message"] = $ex->getMessage(); 
	$rs["innerException"] = $inner;
	$rs["status"] = 0; 
	header(':', true, 404);
	return json_encode($rs);
}

function curPageURL() {
	$pageURL = 'http';
	$pageURL .= "://";
	if ($_SERVER["SERVER_PORT"] != "80") {
		$pageURL .= $_SERVER["SERVER_NAME"].":".$_SERVER["SERVER_PORT"];
	} else {
		$pageURL .= $_SERVER["SERVER_NAME"];
	}
	return $pageURL;
}

function getContent($url, $method, $formcontent=null)
{
	$cookies = getCookieFromSession();

	$opts = array(

		'http'=>array(
			'method'=>
			$method,
			'header'=>
			"Accept:application/json, text/plain, */*\r\n"
			."Content-Type:application/json;charset=UTF-8\r\n"
			)
		);

	if ($formcontent != null && ($method == "POST" || $method == "PUT")){
		$opts['http']['content'] = $formcontent;
	}
	if ($cookies != null){
		$opts['http']['header'] .= $cookies;
	}

	$context = stream_context_create($opts);

	if (!$file = file_get_contents($url, false, $context)) {
		header($http_response_header[0]);
	}
	return $file;
}


function resolve($baseurl, $action, $id=null)
{
	$baseurl = $baseurl."/".$action;
	if ($id != null) {
		$baseurl = $baseurl."/".$id;
	}
	return $baseurl;
}


function getCookieFromSession()
{

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

	return $cookie;
}
?>
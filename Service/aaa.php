<?php 
require  'libs.php';
require  'config.php';

function get_data($url) {
	$oauthCookie = getCookieFromSession();

	$ch = curl_init();
	$timeout = 5;



	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
	curl_setopt($ch, CURLINFO_HEADER_OUT, 1);
	if ($oauthCookie !=  null) {
		curl_setopt($ch, CURLOPT_COOKIE, $oauthCookie);
	}

	$data = curl_exec($ch);
	$http_status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
	$header = curl_getinfo($ch, CURLINFO_HEADER_OUT);

	//preprint($oauthCookie);

	header($_SERVER["SERVER_PROTOCOL"]." ".$http_status);
	curl_close($ch);
	return $data;
}


$action = "getPage";
$id = $_REQUEST["id"];
$url = resolve(BASE_URL, $action, $id);
//echo $url;

json_encode(get_data($url);




?>

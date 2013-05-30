<?php 
require  'libs.php';
require  'config.php';
session_start();

try {
	$data = json_decode(file_get_contents('php://input'));

	$request["UserName"] = isset($data->{"UserName"}) ? $data->{"UserName"} : null;
	$request["Password"] = isset($data->{"Password"}) ? $data->{"Password"} : null;
	$request["RequestToken"] = isset($data->{"RequestToken"}) ? $data->{"RequestToken"} : null;

	if ($request["UserName"] == null || $request["Password"] == null){
		header($_SERVER["SERVER_PROTOCOL"]." 401 Unauthorized");
		return;
	}
	$u = resolve(BASE_URL, 'postLogin');
	$rs = getContent($u, CURLOPT_POST, json_encode($request));
	$_SESSION["oauth"] = json_decode($rs);
}

catch(Exception $ex) {
	header($_SERVER["SERVER_PROTOCOL"]." 401 Unauthorized");
}

?>
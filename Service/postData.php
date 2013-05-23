<?php 
require  'libs.php';
require  'config.php';
session_start();

try {
	$data = json_decode(file_get_contents('php://input'));

	$userdata = isset($data->{"data"}) ? $data->{"data"} : null;
	
	//$userdata["hsvajh"] = "lkansdlknalkd";

	if ($userdata == null){
		header($_SERVER["SERVER_PROTOCOL"]." 400 Bad Request pico");
		return;
	}
	$u = resolve(BASE_URL, 'PutUserData');
	
	$xx = json_encode(json_encode($userdata));
	echo $rs = json_decode(getContent($u, 'PUT', $xx));
}

catch(Exception $ex) {
	header($_SERVER["SERVER_PROTOCOL"]." 400 Bad Request chuj");
}

?>
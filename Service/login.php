<?php 
require  'libs.php';
require  'config.php';
try {
	$data = json_decode(file_get_contents('php://input'));

	$username = isset($data->{"UserName"}) ? $data->{"UserName"} : null;
	$password = isset($data->{"Password"}) ? $data->{"Password"} : null;
	
	if ($username == null || $password == null){
		header($_SERVER["SERVER_PROTOCOL"]." 401 Unauthorized");
		return;
	}
	$u = resolve(BASE_URL, 'postLogin');
	echo getContent($u, 'POST', 'UserName='.$username.'&Password='.$password);
}

catch(Exception $ex) {
	header($_SERVER["SERVER_PROTOCOL"]." 401 Unauthorized");
}

?>
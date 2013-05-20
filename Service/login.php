<?php 
require  'libs.php';
require  'config.php';

try {
	$username = isset($_POST["username"]) ? $_POST["username"] : null ;
	$password = isset($_POST["password"]) ? $_POST["password"] : null ;
				'UserName=admin&Password=a'
	
	if ($username == null || $password == null){
		$rs['success'] = false;
		echo json_encode($rs);
		return;
	}
	$u = resolve(BASE_URL, 'postLogin');
	
	echo getContent($u, 'POST', 'UserName='.$username.'&Password='.$password);
}
catch(Exception $ex) {
	echo ExceptionToJson($ex, error_get_last());
}

?>
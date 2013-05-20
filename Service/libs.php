<?php
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
	$opts = array(

		'http'=>array(
			'method'=>
				$method,
			'header'=>
				'Accept:application/json, text/plain, */*\r\n'
			)
		);

	if ($formcontent != null && $method == "POST"){
		$opts['http']['content'] = $formcontent;
	}

	///print_r($opts);	print_r($url);
	$context = stream_context_create($opts);

	if (!$file = @file_get_contents($url, false, $context)) {
		throw new Exception("Error Processing Request", 1);
	}
	return $file;
}

?>
<?php 
require  'libs.php';
require  'config.php';

function get_data($url) {
	$ch = curl_init();
	$timeout = 5;
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
	$data = curl_exec($ch);


if($data === false)
{
    print_r($ch);
    echo 'Curl error: ' . curl_error($ch);
}
else
{
    echo 'Operation completed without any errors';
}
	curl_close($ch);
	return $data;
}
$action = "getPage";
$url = resolve(BASE_URL, $action, $id);


print_r(get_data($url));



?>

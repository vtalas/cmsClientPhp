<?php 

include "../cmsClientPHPService/libs/libs.php";

function init($url, $method = CURLOPT_HTTPGET)
{
	$ch = curl_init();
	$timeout = 5;

	curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));

	curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
	curl_setopt($ch, CURLINFO_HEADER_OUT, 1);

	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_VERBOSE, 1);
	curl_setopt($ch, CURLOPT_HEADER, 1);

	curl_setopt($ch, $method, 1);

	return $ch;
}

$ticker = "https://btc-e.com/api/2/ltc_btc/ticker";

$ch = init($ticker);

$data = curl_exec($ch);

preprint("kjabds");
preprint($data);
//https://btc-e.com/api/2/ltc_btc/trades
//https://btc-e.com/api/2/ltc_btc/depth

function btce_query_private($method, array $req = array()) {
	// API settings
	$key = 'I9UHYIN3-F938Y8HG-VNJPPDBD-9WSYKBL0-AEGAMQO4'; // your API-key
	$secret = 'f2b7ee85449dc4aa8f63bf3e33b0ad4eac401a93cc6ca9e5fe06471eb6fe7c40'; // your Secret-key

	$req['method'] = $method;
	$mt = explode(' ', microtime());
	$req['nonce'] = $mt[1];
	
	// generate the POST data string
	$post_data = http_build_query($req, '', '&');
	$sign = hash_hmac("sha512", $post_data, $secret);

	// generate the extra headers
	$headers = array(
		'Sign: '.$sign,
		'Key: '.$key,
	);

	// our curl handle (initialize if required)
	static $ch = null;
	if (is_null($ch)) {
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/4.0 (compatible; BTCE PHP client; '.php_uname('s').'; PHP/'.phpversion().')');
	}
	curl_setopt($ch, CURLOPT_URL, 'https://btc-e.com/tapi');
	curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);
	curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);

	// run the query
	$res = curl_exec($ch);
	if ($res === false) throw new Exception('Could not get reply: '.curl_error($ch));
	$dec = json_decode($res, true);
	if (!$dec) throw new Exception('Invalid data received, please make sure connection is working and requested API exists');
	return $dec;
}

//$result = btce_query("getInfo");
//$result = btce_query("Trade", array("pair" => "btc_usd", "type" => "buy", "amount" => 1, "rate" => 10)); //buy 1 BTC @ 10 USD

//echo "<pre>".print_r($result, true)."</pre>";




function writeFile($filename, $data)
{
	$x = file_put_contents($filename, $data."\n", FILE_APPEND);
}


writeFile("ndfk",  $_SERVER['REQUEST_TIME']."  ".time(). " ".date('l jS \of F Y h:i:s A'));

?>
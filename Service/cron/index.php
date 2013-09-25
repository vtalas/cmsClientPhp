<?php 

include "../cmsClientPHPService/libs/libs.php";


/**
* 
*/
class MarketInfo 
{
	public $symbol;
	public $bid;
	public $ask;
	public $volume;
	public $high;
	public $low;
	public $average;
	public $server_time;
	public $updated;

	function __construct()
	{
	
	}

	public function toString()
	{
		return $this->symbol."\t".$this->updated."\t".$this->bid."\t".$this->ask."\t".$this->high."\t".$this->low."\t".$this->average."\t".$this->volume."\t".$this->server_time;
	}
	
	public function header()
	{
		return "symbol\tupdated\tbid\task\thigh\tlow\taverage\tvolume\tservertime";
	}
}

function init($url, $method = CURLOPT_HTTPGET)
{
	$ch = curl_init();
	$timeout = 5;

	curl_setopt($ch, CURLOPT_URL, $url);
    //curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));

	//curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
//	curl_setopt($ch, CURLINFO_HEADER_OUT, 1);

	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
//	curl_setopt($ch, CURLOPT_VERBOSE, 1);
//	curl_setopt($ch, CURLOPT_HEADER, 1);

	curl_setopt($ch, $method, 1);

	return $ch;
}


function btce($symbol)
{
	$url = "https://btc-e.com/api/2/".$symbol."/ticker";
	$ch = init($url);

	$data = curl_exec($ch);

	if($data === false)
	{
		$rs = ".";
	    echo 'Curl error: ' . curl_error($ch);
	} else {
		$rs = json_decode($data);
	}

	$x = new MarketInfo();

// [ticker] => stdClass Object
//         (
//             [high] => 0.01958
//             [low] => 0.01922
//             [avg] => 0.0194
//             [vol] => 1510.00792
//             [vol_cur] => 77922.9378
//             [last] => 0.01927
//             [buy] => 0.01928
//             [sell] => 0.01927
//             [updated] => 1380084925
//             [server_time] => 1380084927
//         )
	
	$x->high = $rs->ticker->high;
	$x->low = $rs->ticker->low;
	$x->average = $rs->ticker->avg;
	$x->volume = $rs->ticker->vol;
	$x->ask = $rs->ticker->buy;
	$x->bid = $rs->ticker->sell;
	$x->server_time = $rs->ticker->server_time;
	$x->updated = time();
	$x->symbol = str_replace("_", "", strtoupper($symbol));

	return $x;
}

function vircurex($symbolBase, $symbolAlt) {
	$url = "https://vircurex.com/api/get_info_for_1_currency.json?base=".$symbolBase."&alt=".$symbolAlt;
	echo "string";
	$rs = http_get(init($url), $url);
	$x = new MarketInfo();
// {
//   "base": "LTC",
//   "alt": "BTC",
//   "lowest_ask": "0.0192599",
//   "highest_bid": "0.01901",
//   "last_trade": "0.01906553",
//   "volume": "2905.60941191"
// }

//	$x->high = $rs->data->high;
//  $x->low = $rs->data->low;
//	$x->average = $rs->ticker->avg;
	$x->volume = $rs->volume;
	$x->ask = $rs->lowest_ask;
	$x->bid = $rs->highest_bid;
//	$x->server_time = $rs->ticker->server_time;
	$x->updated = time();
	$x->symbol = $symbolBase.$symbolAlt;;
	return $x;
}


function http_get($ch, $url)
{
	$data = curl_exec($ch);

	if($data === false)	{
		$rs = ".";
	    echo 'Curl error: ' . curl_error($ch);
	} else {
		$rs = json_decode($data);
	}
	return $rs;
}

function cryptoTrade($symbol)
{
	$url = "https://crypto-trade.com/api/1/ticker/".$symbol;
	$rs = http_get(init($url), $url);
	
	$x = new MarketInfo();

 // 	[status] => success
 //    [data] => stdClass Object
 //        (
 //            [last] => 0.0194
 //            [low] => 0.0194
 //            [high] => 0.0194
 //            [vol_ltc] => 17.0181079
 //            [vol_btc] => 0.33015129326
 //            [min_ask] => 0.0196
 //            [max_bid] => 0.0194
 //        )

	$x->high = $rs->data->high;
	$x->low = $rs->data->low;
//	$x->average = $rs->ticker->avg;
	$x->volume = $rs->data->vol_ltc;
	$x->ask = $rs->data->min_ask;
	$x->bid = $rs->data->max_bid;
//	$x->server_time = $rs->ticker->server_time;
	$x->updated = time();
	$x->symbol = str_replace("_", "", strtoupper($symbol));

	return $x;
}


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
	$filePrefix = date("ymd");
	$filename = $filePrefix."_".$filename;

	if (!file_exists($filename)) {
		$header = new MarketInfo();
		$x = file_put_contents($filename, "market\t".$header->header()."\tlocaltime\n", FILE_APPEND);
	}
	$x = file_put_contents($filename, $data."\n", FILE_APPEND);
}
writeFile("LTCBTC-btce",  "BTCE\t".btce("ltc_btc")->toString()."\t".$_SERVER['REQUEST_TIME']);
writeFile("LTCBTC-crypto",  "CRPT\t".cryptoTrade("ltc_btc")->toString()."\t".$_SERVER['REQUEST_TIME']);
writeFile("LTCBTC-Vircurex",  "VIRC\t".vircurex("LTC","BTC")->toString()."\t".$_SERVER['REQUEST_TIME']);

?>
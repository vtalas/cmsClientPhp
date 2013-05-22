<?php 

/**
* 
*/
class CmsOAuthToken
{
	public $accessToken;
	//timestamp in miliseconds
	public $expires;
	private $refreshToken;
	
	function __construct($oauthResponse)
	{
		$this->accessToken = $oauthResponse->access_token;
		$this->expires = $oauthResponse->expires;
		$this->refreshToken = $oauthResponse->refresh_token;
		//preprint($this);
	}

	public function isAccessExpired()
	{
		return $this->expireInSeconds() < 10;
	}

	public function expireInSeconds()
	{
		return ceil($this->expires / 1000 - time());
	}

}
?>
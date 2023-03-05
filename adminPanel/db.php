<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

session_start();

error_reporting(E_ALL ^ E_NOTICE || E_ALL ^ E_WARNING);


define('root', __DIR__.'/');

	
define('DBSERVER', 'mysql');
define('DBHOST', 'localhost');	
define('DBNAME', 'proddb');
define('USERNAME', 'root');
define('PASSWORD', '');

$dboptions = array(

	PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
	PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
	PDO::MYSQL_ATTR_INIT_COMMAND => ('SET NAMES utf8')

);



try{

	$DB = new PDO(DBSERVER.':host='.DBHOST.';dbname='.DBNAME, USERNAME, PASSWORD, $dboptions); 
	//echo "connected";
}
catch(Exception $e){

	echo 'Connection Error: '.$e->getMessage();
	die;

}





?>
<?php
	
    if(!defined('ENGINE')){
		die("Hack no attempt!");
	}
	
	
    function dump($var){
        echo "<pre style='position:absolute; top:300px; left:500px; color:white; z-index: 999999;' >";
			var_dump($var);
		echo "</pre>";
	}
	function isPOST(){
		if ($_SERVER['REQUEST_METHOD'] == 'POST') return true;
	}
	function getTemplate($filename){
		ob_start();
		include 'temp/' . $filename . '.php';
		$r = ob_get_contents();
		ob_end_clean();
	
		return $r;
	}
	function getVar($name){
		return $GLOBALS[$name];
	}

	function varFilter($v){
		global $db;
		return mysqli_real_escape_string($db, $v);
	}

	
	
	
	function isLog(){

		if(count($_SESSION)==0 ) return false;
		
		else return true;
	}
	function deReg(){
		$_SESSION['id']=null;
		$_SESSION['name']=null;
	}
	
	class SessionFunc{
		public static function getUserId(){
			return (int) $_SESSION['id'];
		}
		public static function getUserName(){
			return $_SESSION['name'];
		}
	}
	class Relocations{
		public static function toMain(){
			header('Location: /?site=main');
		}
		public static function toReg(){
			header('Location: /?site=reg');
		}
		public static function toProfile(){
			header('Location: /?site=profile');
		}
		public static function toError($error){
			header("Location: /?site=error&error={$error}");
		}
	}

?>
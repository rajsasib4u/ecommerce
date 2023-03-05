<?php

require '../db.php';
date_default_timezone_set('Asia/Kolkata');

if($_SERVER['REQUEST_METHOD'] == 'POST' && $_POST['action'] == 'login_action'){

	$data = array();

	$username = $_POST['username'];
	$password = $_POST['password'];


	
		$sql = "SELECT * from login where username=:username and password=:password";
		$stmt = $DB->prepare($sql);

		$stmt->bindValue(':username', $username);
		$stmt->bindValue(':password', $password);
		$stmt->execute();

		$nrows = $stmt->rowCount();

		if($row = $stmt->fetch()){

			$name = $row['username'];
			$logid = $row['id'];

		}

		if($nrows == 1){

			$data['status'] = 'success';
			$data['message'] = 'Successfully Logged';

			$_SESSION['logged'] = $name;
			$_SESSION['log_id'] = $logid;

		}else{
			$data['status'] = 'error';
			$data['message'] = 'Invalid username or password';
		}


		echo json_encode($data);
	
}


if($_SERVER['REQUEST_METHOD'] == 'POST' && $_POST['action'] == 'add_Product'){

	$data = array();

	$prodName = $_POST['prodName'];
	$prodPrice = $_POST['prodPrice'];
	$prodDesc = $_POST['prodDesc'];
	$prodQuantity = $_POST['prodQuantity'];


	
		$sql = "SELECT * from products where prodName=:prodName";
		$result = $DB->prepare($sql);

		$result->bindValue(':prodName', $prodName);
		$result->execute();

		if($result->rowCount() == 1){

			$data['status'] = 'exist';
			$data['message'] = 'Product Exist.';



		}
		else
		{
			$sqlinsert = "INSERT into products(prodName,prodPrice,prodDesc,prodQuantity)". "values(:prodName,:prodPrice,:prodDesc,:prodQuantity)";
			$stmt = $DB->prepare($sqlinsert);

			$stmt->bindValue(':prodName',$prodName);
			$stmt->bindValue(':prodPrice',$prodPrice);
			$stmt->bindValue('prodDesc',$prodDesc);
			$stmt->bindValue('prodQuantity',$prodQuantity);			

			$stmt->execute();

			$data['status'] = 'success';
			$data['message'] = 'Successfully Added';
		}


		echo json_encode($data);
	
}

if($_SERVER['REQUEST_METHOD'] == 'POST' && $_POST['action'] == 'update_Product'){

	$data = array();

	$prodName = $_POST['prodName'];
	$prodPrice = $_POST['prodPrice'];
	$prodDesc = $_POST['prodDesc'];
	$prodQuantity = $_POST['prodQuantity'];
	$editID = $_POST['editID'];


	
		$sql = "SELECT * from products where prodID=:editID";
		$result = $DB->prepare($sql);

		$result->bindValue(':editID', $editID);
		$result->execute();

		if($result->rowCount() == 1){


			$sqlUpdate = "UPDATE products set prodName=:prodName,prodPrice=:prodPrice,prodDesc=:prodDesc,prodQuantity=:prodQuantity where prodID=:editID";
			$stmt = $DB->prepare($sqlUpdate);

			$stmt->bindValue(':prodName',$prodName);
			$stmt->bindValue(':prodPrice',$prodPrice);
			$stmt->bindValue('prodDesc',$prodDesc);
			$stmt->bindValue('prodQuantity',$prodQuantity);			
			$stmt->bindValue('editID',$editID);			

			$stmt->execute();

			$data['status'] = 'success';
			$data['message'] = 'Successfully updated';

			



		}
		else
		{
			$data['status'] = 'error';
			$data['message'] = 'Network Error!';
		}


		echo json_encode($data);
	
}

if($_SERVER['REQUEST_METHOD'] == 'POST' && $_POST['action'] == 'delete_products'){

	$data = array();

	$prodID = stripcslashes($_POST['row_id']);
	


	$sqlDelete = "Delete from products where prodID='$prodID'";

	$stmt = $DB->prepare($sqlDelete);


	if($stmt->execute()){

		$data['status'] = 'success';
		$data['message'] = 'Successfully deleted';

	}
	else {
		$data['status'] = 'error';
		$data['message'] = 'Please try after sometime';
	}

	echo json_encode($data);
}


?>
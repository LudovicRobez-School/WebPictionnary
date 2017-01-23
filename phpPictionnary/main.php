<!DOCTYPE html>  
<html>  
<head>  
    <meta charset=utf-8 />  
    <title>Pictionnary - Acceuil</title>
	<link rel="stylesheet" media="screen" href="css/styles.css" >
	<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
	<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
</head>  
<body>  
<header>
	<?php
		include "header.php";
	?>
</header>
<div>
	<a href="-paint.php">Dessiner</a>
</div>
<div>
<?php
	if(isset($_SESSION['email']))
	{
	try 
	{
		$dbh = new PDO('mysql:host=localhost;dbname=pictionnary', 'test', 'test');

		$sql = $dbh->prepare("SELECT id FROM drawings WHERE u_id= :uid");
		$sql->bindValue(":uid", $_SESSION['sid']);
		$sql->execute();
		$i = 0;
		foreach ($sql->fetchAll(PDO::FETCH_ASSOC) as $ligne) 
		{
			echo "<a href=guess.php?id=" . $ligne['id'] . ">Pictionnary " . ++$i . "</a><br/>";
		}
	} 
	catch (PDOException $e) 
	{
		print "Erreur !: " . $e->getMessage() . "<br/>";
		$dbh = null;
		die();
	}
	}
?>
</div>
</body>
<html>
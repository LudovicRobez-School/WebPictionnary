<?php

$email=stripslashes($_POST['email']);
$password=stripslashes($_POST['password']);

try 
{
    $dbh = new PDO('mysql:host=localhost;dbname=pictionnary', 'test', 'test');

    $sql = $dbh->prepare("SELECT * FROM users WHERE email= :email AND password= :password");
	$sql->bindValue(":email", $email);
	$sql->bindValue(":password", $password);
	$sql->execute();
    if ($sql->rowCount() < 1) 
	{
		header('Location: main.php?error='.urlencode("connexion"));
    } 
	else 
	{
		session_start();
		$ligne = $sql->fetch();
		$_SESSION['email'] = $ligne['email'];
		$_SESSION['sid'] = $ligne['id'];
		$_SESSION['prenom'] = $ligne['prenom'];
		$_SESSION['couleur'] = $ligne['couleur'];
		$_SESSION['profilepic'] = $ligne['profilepic'];			
		header('Location: main.php');
	}
	$dbh = null;
} 
catch (PDOException $e) 
{
    print "Erreur !: " . $e->getMessage() . "<br/>";
    $dbh = null;
    die();
}
?>
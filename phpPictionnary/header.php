<?php
	session_start();
	if(isset($_SESSION['email']))
	{
		echo 'Bonjours ' . $_SESSION['prenom'];
		echo ' <a href="logout.php">Deconnexion</a><br/>';
		if(isset($_SESSION['profilepic']))
		{
			echo '<img src=' . $_SESSION['profilepic'] . '/>';
		}
	}  
	else {
?>
	<form action="php/req_login.php" method="post">
		<label for="username">Email:</label>
		<input type="text" id="email" name="email" />

		<label for="password">Password:</label>
		<input type="password" id="password" name="password" />

		<button type="submit">Connexion</button>
		<a href="inscription.php">Inscription</a>
	</form>
<?php
}
?>
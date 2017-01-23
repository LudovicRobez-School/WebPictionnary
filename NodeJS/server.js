var express = require('express');
var morgan = require('morgan'); // Charge le middleware de logging
var logger = require('log4js').getLogger('Server');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var app = express();

// config
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('combined')); // Active le middleware de logging

app.use(express.static(__dirname + '/public')); // Indique que le dossier /public contient des fichiers statiques (middleware chargé de base)

logger.info('server start');


var options = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pictionnary'
};

var sessionStore = new MySQLStore(options);

app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: true,
    saveUninitialized: true
}));

var connection = mysql.createConnection(options);
/* On affiche le formulaire d'enregistrement */

connection.connect();

app.get('/', function (req, res) {
    res.redirect('/login');
});

app.get('/login', function (req, res) {
    res.render('login');
});

app.get('/register', function (req, res) {
    res.render('register');
});

app.get('/profile', function (req, res) {
    res.render('profile');
});

app.post('/login', function (req, res) {
    // TODO vérifier si l'utilisateur existe
    connection.query('SELECT * from users', function (err, rows, fields) {
        if (!err)
            if (rows.length >= 1) {
                logger.info('Le résultat de la requête: ', rows);
                for (var i = 0, len = rows.length; i < len; i++) {
                    var row = rows[i];
                    if (row.email == req.body.username) {
                        if (row.password == req.body.password) {
                            res.render('profile', { "email": row.email, "prenom": row.prenom });
                        } else {
                            res.render('login', { "status": 404, "msg": "mot de passe incorrect" });
                        }
                    }
                }
            } else {
                res.redirect('/login');
            }
        else
            logger.error(err);
    });
});

app.post('/register', function (err, rows, fields) {
        // TODO ajouter un nouveau utilisateur
    if (!err)
    connection.query("SELECT id FROM USERS WHERE email='" + req.body.email + "'", function (err, rows, fields) {
        if (rows.length == 1) {
            res.status(404).json({ "message": "Votre compte existe déjà" })
        } else {
            var color = req.body.couleur.substring(1);
            connection.query('INSERT INTO users (email, password, nom, prenom, tel, website, sexe, birthdate, ville, taille, couleur, profilepic) VALUES (' + req.body.email + ',' + req.body.password + ',' + req.body.nom + ',' + req.body.premon + ',' + req.body.tel + ',' + req.body.website + ',' + req.body.sexe + ',' + req.body.birthdate + ',' + req.body.ville + ',' + req.body.taille + ',' + color + ',' + req.body.profilepic + ')', function (err, rows, fields) {
                res.render('profile', { "email": req.body.email, "prenom": req.body.prenom });
            });
        }
        });
    else
        logger.error(err);
});
/* On affiche le profile  */
app.get('/profile', function (req, res) {
    // TODO  
    // On redirige vers la login si l'utilisateur n'a pas été authentifier 
    // Afficher le button logout 
});     
app.listen(1313);





var FacebookStrategy = require('passport-facebook').Strategy;

var mysql = require('mysql');

var connection = mysql.createConnection({
		host : 'localhost',
        user : 'test',
        password: 'test',
        database: 'pictionnary'
});


module.exports = function(passport) 
{
	passport.use(new FacebookStrategy(
	{
        clientID: '463573240515273',
        clientSecret: '0ce42a1f02ddeb96d1e1ef274affff2d',
        callbackURL: "http://localhost:1313/facebook/callback",
    	profileFields   : ['id, last_name, first_name, gender, email, birthday, location, website, picture']
  	}, function(token, refreshToken, profile, done) 
    {
        console.log(profile);
        process.nextTick(function()
        {
            connection.query('Select * From users Where id=' + profile.id, function(err,rows)
            {
                if (err)
                    return done(err);
                if (rows.length) 
                {
                    return done(null, rows[0]);
                } 
                else
                {
                    var newUser = new Object();
                    newUser.profilepic = profile._json.picture;
                    newUser.prenom = profile._json.first_name;
                    newUser.email = profile._json.email;
                    newUser.birthdate = '00-00-00';
                    insertQuery = { id:newUser.id, prenom : newUser.prenom, profilepic : newUser.profilepic, email : newUser.email, birthdate : newUser.birthdate};
                    connection.query('INSERT INTO users SET ?', insertQuery,function(err,rowsInsert)
                    {
                        if(err)
                        {
                            return done(err);
                        }
                        else
                        {
                            return done(null, newUser);
                        }               
                    });
                }
            });
        });
    }));
};
fs = require('fs');
var filename = 'user_data.json';

if (fs.existsSync(filename)) // see if the file exists first, then load it 
{
    stats = fs.statSync(filename);

    console.log(filename + ' has ' +stats.size + ' characters! ')
    data = fs.readFileSync(filename, 'utf-8')

    users_reg_data = JSON.parse(data);

    console.log(users_reg_data['itm352'].password + ', user registration loaded!');
} else {
        console.log(filename + ' does not exists!');
}

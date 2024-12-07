const express = require('express');
const app = express();
const userModel = require('./models/user');
const postModel = require('./models/post');


app.get('/', function(req, res){
    res.send('hey!');

});

app.get('/create', async function(req, res){
    let createdUser = await userModel.create({
        username: 'Harsh',
        email: 'harsh@harsh.com',
        age: 25
    });
    res.send(createdUser);
});

app.get('/post/create', async function(req, res){
    let post = await postModel.create({
        postdata: "Hello Kaise ho saare log ?",
        user: '67542e5dd721b0e6f53898f6'
    });
    let user = await userModel.findOne({_id: '67542e5dd721b0e6f53898f6'});
    user.posts.push(post._id);
    await user.save();
    res.send({post, user});
});

app.listen(3000);
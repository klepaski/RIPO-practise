'use strict';
const nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
const fs=require('fs');
var express = require('express');
var app = express();

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/contact', function(req, res) {
    try {
    //====== В А Л И Д А Ц И Я ========
    if (req.body.author=="" || req.body.phone=="" || req.body.email=="" || req.body.text=="") {res.end('Все поля должны быть заполнены.'); return; }
    if (!validateEmail(req.body.email)) {res.end('Неверный email.'); return; }
    //=================================

    console.log('contact request');

    const emailSender = 'food-delivery10@yandex.com';
    const passwordSender = 'food-delivery123';

    const transporter = nodemailer.createTransport({
        service: 'yandex',
        auth: {
            user: emailSender,
            pass: passwordSender
        }
    });
    const message = "Здравствуйте! Вам пришло сообщение с сайта РИПО.\n \
                Отправитель: "+ req.body.author+"\n \
                Email: "+req.body.email+"\n \
                Телефон: "+req.body.phone+"\n \
                Сообщение: "+req.body.text;

    let mailOptions = {
        from: '"ОБРАТНАЯ СВЯЗЬ РИПО" <' + emailSender + '>',
        to: 'julia.klepaski@gmail.com',
        subject: 'Обратная связь '+ req.body.email,
        text: message
    };

    if (transporter.sendMail(mailOptions)) res.end('Сообщение отправлено!')
    else res.end('Проверьте введенные данные!');
    }
    catch(ex) {res.end('Ошибка ' + ex)}
});

app.post('/order', function(req, res) {
    try {
    //====== В А Л И Д А Ц И Я ========
    if (req.body.author=="" || req.body.email=="" || req.body.phone=="" ||req.body.order=="") {res.end('Все поля должны быть заполнены.'); return; }
    if (!validateEmail(req.body.email)) {res.end('Неверный email.'); return; }
    //=================================

    console.log('order request');

    const emailSender = 'food-delivery10@yandex.com';
    const passwordSender = 'food-delivery123';

    const transporter = nodemailer.createTransport({
        service: 'yandex',
        auth: {
            user: emailSender,
            pass: passwordSender
        }
    });
    
    const message = "Здравствуйте! Кто-то оформил заказ на сайте.\n \
                "+ req.body.item + "\n \
                Отправитель: "+ req.body.author+"\n \
                Email: "+req.body.email+"\n \
                Телефон: "+req.body.phone+"\n \
                Сообщение: "+req.body.order;

    let mailOptions = {
        from: '"ОФОРМЛЕНИЕ ЗАКАЗА НА САЙТЕ РИПО" <' + emailSender + '>',
        to: 'julia.klepaski@gmail.com',
        subject: 'Заказ. '+ req.body.item,
        text: message
    };
    

    if (transporter.sendMail(mailOptions)) res.end('Заказ оформлен успешно!')
    else res.end('Проверьте введенные данные!');
    }
    catch(ex) {res.end('Ошибка '+ex);}
});

app.listen(3000, function() {
    console.log('Server running at port 3000/');
});


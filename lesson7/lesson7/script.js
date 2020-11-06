// const moment = require('moment');
// const os = require('os');
// const a = require('./func/index');
const fs = require('fs');
const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write('hello world');
        res.end();
    }
    if (req.url === '/api/users') {
        fs.readFile('db.json', 'utf-8', (error, data) => {
            if (error) {
                console.log(error);
            } else {
                res.write(data);
                res.end();
            }
        })
    }
})
server.listen(5555);
server.on('connection', (socket) => {
    console.log('socket');
});

// const users = [{
//     name: 'Nik',
//     age: 23,
// }];
// fs.writeFile('db.json', JSON.stringify(users), (error) => {
//     if (error) {
//         console.log(error);
//     }
// })
// fs.readFile('db.json', 'utf-8', (error, data) => {
//     if (error) {
//         console.log(error);
//     } else {
//         const users = JSON.parse(data);
//         users.push({
//             name: 'Anna',
//             age: 34,
//         });
//         fs.writeFile('db.json', JSON.stringify(users), (error) => {
//             if (error) {
//                 console.log(error);
//             }
//         })
//     }
// })
// console.log(a(10));
// console.log(os.platform());
// console.log(os.cpus());
// console.log(os.tmpdir());
// console.log(moment());
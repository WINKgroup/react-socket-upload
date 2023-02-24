import Webserver from '@winkgroup/webserver'

const webserver = new Webserver({ name: 'Demo Server', hasSocket: true })
const ioApp = webserver.ioApp!

ioApp.of('upload').on('connection', (socket) => {
    console.log('client connected');
    socket.on("upload", (file, callback) => {
        const text = Buffer.from(file).toString()
        console.log(text);
    });
});

console.log('VISIT http://127.0.0.1:8080/ and open your browser console log to test it!')
webserver.listen()
const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Cliente iniciado...');
});

client.initialize();


client.on('message', async msg => {
    //console.log('MESSAGE RECEIVED', msg); //Obtenemos datos del msj enviado

    //Test ping pong
    if (msg.body === '!ping') {
        msg.reply('pong');
    } else if (msg.body.startsWith('!check ')) {
        let number = msg.body.split(' ')[1];
        client.isRegisteredUser(number+"@c.us").then(function(isRegistered) {
            if(isRegistered) {
                msg.reply(`El número ${number} tiene whatsapp ✅`);
            }else{
                msg.reply(`El número ${number} no tiene whatsapp ❌`);
            }
        });
    }
});

client.on('message_create', (msg) => {
    if (msg.fromMe) {
        // Crear mensaje
    }
});

client.on('message_revoke_everyone', async (after, before) => {
    console.log(after);
    if (before) {
        console.log(before);
    }
});

client.on('message_revoke_me', async (msg) => {
    console.log(msg.body);
});

client.on('message_ack', (msg, ack) => {
    if(ack == 3) {
        // El mensaje ha sido leido
    }
});

client.on('disconnected', (reason) => {
    console.log('Client was logged out', reason);
});
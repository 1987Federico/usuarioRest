


// Configuracion de Puerto
process.env.PORT = process.env.PORT || 3000;

//Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//Base de datos
let urlDB = 'mongodb+srv://fede_celeste:Lanegracuca1905@cluster0-mwujc.mongodb.net/cafe';
process.env.URLDB = urlDB;

//vencimiento del token
process.env.CADUCIDAD_TOKEN = 
//Firma del token
process.env.SEED = process.env.SEED || 'este-es-el-seed';
// Google client ID
process.env.CLIENT_ID = process.env.CLIENT_ID || '1036456029168-3tj1mu01hahepfpf4ud91jb56jo7e8v1.apps.googleusercontent.com';
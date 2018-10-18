const env = process.env.NODE_ENV || 'dev';
const port = process.env.PORT || 3001;
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/project3';
const secret = process.env.SECRET || 'dswaamynn_10141111';

module.exports = { env, port, dbURI, secret };
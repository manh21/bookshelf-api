const Hapi = require('@hapi/hapi');
const routes = require('./config/routes');

const init = async () => {
    const server = Hapi.server({
        port: 5000,
        host: 'localhost'
    });    

    server.route(routes);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

module.exports = init;
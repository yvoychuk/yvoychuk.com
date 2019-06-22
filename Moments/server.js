const path = require('path');
const Hapi = require('@hapi/hapi');
const Hoek = require('@hapi/hoek');

const init = async () => {
  const server = Hapi.server({
    port: 3001,
    host: "localhost",
    routes: {
      files: {
        relativeTo: path.join(__dirname, 'static'),
      },
    },
  });

  await server.register(require('@hapi/vision'));
  await server.register(require('@hapi/inert'));

  server.route({
    method: "GET",
    path: "/moments",
    handler: (request, h) => {
      return h.view('index');
    },
  });

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: path.join(__dirname, 'app/static'),
        listing: true,
      },
    },
  })

  server.views({
    engines: {
      html: require('handlebars'),
    },
    relativeTo: __dirname,
    path: 'app',
  })

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", err => {
  console.log(err);
  process.exit(1);
});

init();

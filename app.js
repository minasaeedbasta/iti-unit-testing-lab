// Require the framework and instantiate it
const fastify = require("fastify")({ logger: true });

// Register the mongo DB
fastify.register(require('./helpers/DB'))

// Register user Routes
fastify.register(require('./routes/users').userRoutes)


// Run the server!
fastify.listen({ port: 3000 }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});

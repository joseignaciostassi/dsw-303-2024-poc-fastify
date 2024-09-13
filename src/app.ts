import Fastify from "fastify";

const fastify = Fastify({
  logger: true
});

fastify.get('/', (req, reply) =>{
  return {
    message: 'Hello World 2'}
})

fastify.listen({ port:3000 })
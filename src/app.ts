import Fastify from "fastify";
import { customerController } from "./customer.controller.js";

const fastify = Fastify({
  logger: true
});

fastify.get('/', (req, reply) =>{
  return {
    message: 'Hello World 2'}
})

fastify.register(customerController, { prefix: '/customers'})

try {
  await fastify.listen({ port:3000 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}
import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import { customerSchemas, Customer } from "./customer.schemas.js";

const myCustomers: Customer[] = [
  {
    id:1,
    name:'John Doe',
    email:'jdoe@me.com',
    phone:'555-555-5555',
    address:'123 Main St'
  },

  {
    id: 2,
    name: "Juan Perez",
    email: "juanperez@gmail.com",
    phone: "34154983789",
    address:"Salta 200"
  }
]


export const customerController = (fastify: FastifyInstance, options: any, done: Function) => {

  fastify.get('/', { schema: customerSchemas.getAllCustomerSchema }, async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
      return reply.status(200).send(myCustomers) 
    } catch (error) {
      return reply.status(500).send(error)
    }
  })

  fastify.post<{ Body: Customer }>('/', { schema: customerSchemas.postCustomerSchema }, async (request: FastifyRequest<{ Body: Customer }>, reply: FastifyReply): Promise<void> => {
  try {
    const newCustomer = request.body;
    myCustomers.push(newCustomer);
    return reply.status(200).send(newCustomer);
  } catch (error) {
    return reply.status(500).send(error);
  }
  });
 
  fastify.get('/:id', { schema: customerSchemas.getOneCustomerSchema }, (request: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply) => {
    try {
      console.log(request.params)
      const id = request.params.id;
      const myCustomer = myCustomers.find(customer => customer.id === id);
      return reply.status(200).send(myCustomer) 
    } catch (error) {
      return reply.status(500).send(error)
    }
  })

  fastify.put('/:id', { schema: customerSchemas.putCustomerSchema }, (request: FastifyRequest<{ Params: { id: number }, Body: Partial<Customer> }>, reply: FastifyReply) => {
    try {
      const id = request.params.id;
      const updateData = request.body;
      const myCustomerIdx = myCustomers.findIndex((customer) => customer.id === id);
      if (myCustomerIdx === -1) {
        return reply.status(404).send('Customer not found');
      }
      myCustomers[myCustomerIdx] = { ...myCustomers[myCustomerIdx], ...updateData };
      return reply.status(200).send(myCustomers[myCustomerIdx]);
    } catch (error) {
      return reply.status(500).send(error)
    }
  })

  fastify.delete('/:id', { schema: customerSchemas.deleteCustomerSchema },(request: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply) => {
    try {
      const id = request.params.id;
      const myCustomerIdx = myCustomers.findIndex((customer) => customer.id === id);
      const myCustomer = myCustomers[myCustomerIdx];
      if (myCustomerIdx === -1) {
        return reply.status(404).send('Customer not found');
      }
      myCustomers.splice(myCustomerIdx, 1);
      return reply.status(200).send(myCustomer)
    } catch (error) {
      return reply.status(500).send(error)
    }
  })

  done()
}
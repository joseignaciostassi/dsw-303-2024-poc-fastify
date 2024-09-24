import { FromSchema } from 'json-schema-to-ts';

export const customerSchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    name: { type: 'string' },
    email: { type: 'string', format: 'email' },
    phone: { type: 'string' },
    address: { type: 'string' }
  },
  required: ['id', 'name', 'email', 'phone', 'address']
} as const;

export type Customer = FromSchema<typeof customerSchema>;

const getAllCustomerSchema = {
  response: {
    200: {
      type: 'array',
      items: customerSchema.properties
        }
    }
}

const getOneCustomerSchema = {
  params: {
    type: 'object',
    properties: {
      id: { type: 'number' }
    },
    required: ['id']
  },
  response: {
    200: customerSchema
    }
};

const postCustomerSchema = {
  body:  {
    type: 'object',
    properties: customerSchema.properties
  },
  response: {
    200: {
      type: 'array',
      items: customerSchema
  },
  }
};

const putCustomerSchema = {
  params: {
    type: 'object',
    properties: {
      id: { type: 'number' }
    },
    required: ['id']
  },
  body: {
    type: 'object',
    properties: {
      id: { type: 'number' },
      name: { type: 'string' },
      email: { type: 'string', format: 'email' },
      phone: { type: 'string' },
      address: { type: 'string' }
    },
  },
  response: {
    200: customerSchema
  }
};

const deleteCustomerSchema = {
  params: {
    type: 'object',
    properties: {
      id: { type: 'number' }
    },
    required: ['id']
  },
  response: {
    200: customerSchema
  }
};

export const customerSchemas = {
  getAllCustomerSchema,
  getOneCustomerSchema,
  postCustomerSchema,
  putCustomerSchema,
  deleteCustomerSchema
};
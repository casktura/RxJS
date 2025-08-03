import { Request, Response } from 'express';
import { sleep } from './sleep';

var express = require('express');
var router = express.Router();

const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    port: 3306,
    user: 'user',
    password: 'P@ssw0rd',
    database: 'RxJS',
  },
});

router.get('/customers/:length', async function (req: Request, res: Response) {
  // await sleep(5000);

  let length = Number(req.params['length']);

  if (isNaN(length) || length <= 0) {
    length = 10000;
  }

  const customers = await knex.select().from('Customers').limit(length);
  res.json({ result: customers });
});

router.get('/random', async function (req: Request, res: Response) {
  res.json({ result: Math.floor(Math.random() * 1000) });
});

router.get('/wait/:time', async function (req: Request, res: Response) {
  const time = Number(req.params['time'] ?? 0);
  await sleep(time * 1000);
  res.json({ result: time });
});

async function getNullCustomers() {
  const customers = await knex
    .select()
    .from('Customers')
    .where('FullName', 'My Customer');
  const nullCustomers = [];

  for (let i = 0; i < 10000; i++) {
    nullCustomers.push(customers[0]);
  }

  return nullCustomers;
}

router.get('/nulls', async function (req: Request, res: Response) {
  res.json({ result: await getNullCustomers() });
});

router.get('/reduced-nulls', async function (req: Request, res: Response) {
  let customers = await getNullCustomers();

  // Filter out null values.
  customers = customers.map((customer) =>
    Object.fromEntries(
      Object.entries(customer).filter(
        ([key, value]) => value !== null && value !== undefined,
      ),
    ),
  );

  res.json({ result: customers });
});

module.exports = router;

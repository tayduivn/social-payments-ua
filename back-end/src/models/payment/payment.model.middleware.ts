import { NextFunction } from 'express';
import { Schema } from "mongoose";
import { PersonModel } from '../person/person.model';

export function addPaymentMiddleware(schema: Schema) {
  schema.post('save', (payment: any, next: NextFunction) => {
    PersonModel.create(payment.person);
    next();
  });

  return schema;
}

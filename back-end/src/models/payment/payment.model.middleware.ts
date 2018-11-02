import { Schema } from "mongoose";
import { PaymentModel } from './payment.model';

export function addPaymentMiddleware(schema: Schema): void {
  schema.pre('validate', function (next: any) {
    (this as PaymentModel).created = new Date(Date.now());
    next();
  })
}

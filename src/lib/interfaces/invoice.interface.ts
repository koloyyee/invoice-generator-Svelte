import type { ICustomer } from './customer.interface';
import type { IIssuer } from './issuer.interface';
import type { IItem } from './item.interface';

export interface IInvoice {
  _id?: string;
  createdDate: string;
  dueDate: string;
  issuer: IIssuer;
  customer: ICustomer;
  items: IItem[];
  note?: string;
  totalAmount: number;
  status: string; // <-- about to add to the interface and the invoice.
}

export type InvoiceTableType = {
  invoiceId: string;
  clientName: ICustomer['name'];
  invoiceDueDate: string;
  totalAmount: number;
};

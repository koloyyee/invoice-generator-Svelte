import type { IInvoice } from '../interfaces/invoice.interface';
import { invoiceStatus } from './status';

export const invoice: IInvoice = {
  invoiceId: new Date().valueOf().toString(),
  createdDate: new Date().toLocaleDateString(),
  dueDate: new Date().toLocaleDateString(),
  issuer: {
    username: '',
    address: '',
    email: '',
    phone: '',
    website: '',
    bankName: '',
    bankAccount: '',
    bankHolder: '',
  },
  customer: {
    name: '',
    address: '',
    email: '',
    phone: '',
  },
  items: [],
  note: '',
  totalAmount: 0,
  status: invoiceStatus.NOT_PAID,
};

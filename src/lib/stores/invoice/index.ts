import { writable } from 'svelte/store';
import { getAllInvoices } from '../../apis/invoices';
import type { IInvoice } from '../../interfaces';
import { nameTotalReducer } from '../../util/helpers';
import { invoiceStatus } from '../../util/status';

export const invoices = writable<IInvoice[]>([]);
export const invoice = writable<IInvoice>({
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
  },
  items: [],
  note: '',
  totalAmount: 0,
  status: invoiceStatus.NOT_PAID,
});

export const currentInvoice = writable<IInvoice>(null);
export const additionalNote = writable('');

export async function updateInvoicesStore() {
  const [result, error] = await getAllInvoices();
  if (error) throw error;

  localStorage.setItem('invoices', JSON.stringify(result));
  invoices.set(result);

  const { names, totalAmounts } = nameTotalReducer(result);
  return { names, totalAmounts };
}

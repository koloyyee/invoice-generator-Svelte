import { writable } from 'svelte/store';
import { getAllInvoices } from '../../apis/invoices';
import type { IInvoice } from '../../interfaces';

export const invoices = writable<IInvoice[]>([]);
export const currentInvoice = writable<IInvoice>(null);
export const additionalNote = writable('');

export async function fetchInvoices() {
  const [error, result]= await getAllInvoices();
  if (error) throw error;

  localStorage.setItem('invoices', JSON.stringify(result ));
  return invoices.update((values) => values = result);
}


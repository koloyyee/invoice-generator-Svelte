import type { IInvoice } from '../../interfaces';

export async function getAllInvoices():
Promise<[Error| undefined, undefined| IInvoice[]] > {
  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/invoices`);
    const data: IInvoice[] = await res.json();

    return [undefined, data];
  } catch (error) {
    return [error, undefined];
  }
}

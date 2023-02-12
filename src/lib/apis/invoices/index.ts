import type { IInvoice } from '../../interfaces';

export async function getAllInvoices():
Promise<[ Error | undefined, undefined | IInvoice[] ]> {
  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/invoices`);
    const invoices : IInvoice[] = await res.json();

    return [undefined, invoices];
  } catch (error) {
    return [error, undefined];
  }
}


export async function createInvoice( body : IInvoice )
:Promise<number | Error> {
  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/invoices`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(body),
    });
    return res.status;
  } catch (error) {
    return error;
  }
}

export async function getInvoiceById( invoiceId: string):
Promise<[ Error | undefined, undefined | IInvoice ]>
{
  try {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_API}/invoices/${invoiceId}`);
    const invoice : IInvoice = await res.json();

    return [undefined, invoice];
  } catch (error) {
    return [error, undefined];
  }
}

// export async function updateInvoice( invoiceId : string) {

// }

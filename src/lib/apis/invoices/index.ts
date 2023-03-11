import type { IInvoice } from '../../interfaces';

export async function getAllInvoices(): Promise<
  [null | IInvoice[], Error | null]
  > {
  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/invoices`);
    const invoices: IInvoice[] = await res.json();

    return [invoices, null];
  } catch (error) {
    return [null, error];
  }
}

export async function createInvoice(body: IInvoice) {
  // :Promise<number | Error>
  const {
    invoiceId,
    createdDate,
    dueDate,
    issuer,
    customer,
    items,
    note,
    status,
    totalAmount,
  } = body;
  const doc = {
    invoiceId,
    createdDate,
    dueDate,
    issuer: issuer._id,
    customer,
    items,
    note,
    status,
    totalAmount,
  };

  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/invoices`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(doc),
    });
    return res.status;
  } catch (error) {
    return error;
  }
}

export async function getInvoiceById(
    invoiceId: string,
): Promise<[null | IInvoice, Error | null]> {
  try {
    const res = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/invoices/${invoiceId}`,
    );
    const invoice: IInvoice = await res.json();

    return [invoice, null];
  } catch (error) {
    return [null, error];
  }
}

export async function updateInvoice(invoice: IInvoice) {}

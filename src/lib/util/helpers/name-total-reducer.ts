import type { IInvoice } from '../../interfaces';

export function nameTotalReducer(invoices: IInvoice[]) {
  const names = [];
  const totalAmounts = [];

  invoices.forEach((invoice) => {
    names.push(invoice.customer.name);
    totalAmounts.push(invoice.totalAmount);
  });

  return { names, totalAmounts };
}

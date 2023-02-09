import type { IInvoice } from '../interfaces/invoice.interface';


export function calculateStatus( invoices: IInvoice[]) {
  // for chart
  // status count: Not Paid, Paid, Void
  const status = {
    notPaid: 0,
    paid: 0,
    void: 0,
  };

  invoices.map( (invoice) => {
    if ( invoice.status === 'Not Paid') {
      status.notPaid += 1;
    } else if ( invoice.status === 'Paid' ) {
      status.paid += 1;
    } else {
      status.void += 1;
    }
  });

  return status;
}

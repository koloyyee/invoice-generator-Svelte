import type { IClient } from "./customer.interface";
import type { IIssuer } from "./issuer.interface";
import type { IItem } from "./item.interface";

export interface IInvoice {
    invoiceId?: string;
    invoiceDate: string;
    invoiceDueDate: string;
    issuer: IIssuer;
    client: IClient;
    items: IItem[];
    note?: string;
    totalAmount: number;
    status: string;  // <-- about to add to the interface and the invoice.
}

export type InvoiceTableType = {
    invoiceId: string;
    clientName: IClient['clientName'];
    invoiceDueDate: string;
    totalAmount: number;

}

export const InvoiceStatus = Object.freeze({
    NOT_PAID: 'Not Paid',
    PAID: 'Paid',
    // ACTIVE: 'Active',
    VOID:'Void'
})
import { InvoiceStatus, type IInvoice } from "../interfaces/invoice.interface";

export let invoice: IInvoice = {
    invoiceId: new Date().valueOf().toString(),
    invoiceDate: new Date().toLocaleDateString(),
    invoiceDueDate: new Date().toLocaleDateString(), 
    issuer: {
        username :'',
        address :'',
        email :'',
        website :'',
        bankName : '',  
        bankAccount :'',
        bankHolder :'',
    },
    client: {
        clientName: '',
        clientAddress: '', 
    },
    items: [],
    note: '',
    totalAmount: 0,
    status: InvoiceStatus.NOT_PAID
}

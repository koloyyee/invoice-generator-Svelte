import { writable } from "svelte/store";
import type { IInvoice } from "../../interfaces/invoice.interface";

export const invoices = writable<IInvoice[]>([]);

export async function fetchInvoices() {
    try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/invoices`);
        const data: IInvoice[] = await res.json();

        return invoices.update((values) => values = data);
    } catch (e) {
        console.error(e.message);
    }
}

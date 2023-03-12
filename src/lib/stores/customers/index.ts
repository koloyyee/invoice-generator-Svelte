import { writable } from "svelte/store";
import { getCustomers } from "../../apis/customers";
import type { IInvoice } from "../../interfaces/invoice.interface";

export const invoices = writable([]);
export const clientLabels = writable([]);
export const totalAmount = writable([]);
export const customers = writable([]);

export async function fetchClients() {
  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/invoices`);
    const data: IInvoice[] = await res.json();

    invoices.subscribe((value) => (value = data));

    const clientsNameArr = data.reduce((prev: [], curr: IInvoice) => {
      return prev.concat(curr.client.name);
    }, []);

    const amountArr = data.reduce((prev: [], curr: IInvoice) => {
      return prev.concat(curr.totalAmount);
    }, []);

    clientLabels.update((value) => (value = clientsNameArr));
    totalAmount.update((value) => (value = amountArr));
  } catch (e) {
    return e.message;
  }
}

export async function updateCustomersStore() {
  try {
    const result = await getCustomers();

    console.log(result);
    localStorage.setItem("customers", result);
    customers.set(result);
  } catch (error) {
    console.error(error);
  }
}

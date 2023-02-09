import { writable } from 'svelte/store';
import { getAllPaymentStatus } from '../../apis/status';

export const statusStore = writable([]);


export async function fetchStatus() {
  const [error, result] = await getAllPaymentStatus();
  if (error) return error;

  localStorage.setItem('status', JSON.stringify(result));

  return statusStore.update((value) => value = result );
}



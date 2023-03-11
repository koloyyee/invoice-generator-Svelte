import { writable } from 'svelte/store';
import { getAllPaymentStatus } from '../../apis/status';
import { statusAggregationReducer } from '../../util/helpers';

export const statusStore = writable([]);

export async function updateStatusStore() {
  const [result, error] = await getAllPaymentStatus();
  if (error) return error;

  localStorage.setItem('status', JSON.stringify(result));
  statusStore.set(result);

  const { labels, counts } = statusAggregationReducer(result);
  return { labels, counts };
}

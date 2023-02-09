import type { statusAggregation } from '../../interfaces/status.interface';


export async function getAllPaymentStatus():
Promise<[undefined| statusAggregation[], statusAggregation[] | undefined]> {
  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/status`);
    const result :statusAggregation[] = await res.json();
    return [undefined, result];
  } catch (error) {
    return [error, undefined];
  }
}

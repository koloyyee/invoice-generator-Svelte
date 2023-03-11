import type { IStatusAggregation } from '../../interfaces/status.interface';

export async function getAllPaymentStatus(): Promise<
  [null | IStatusAggregation[], Error | null]
  > {
  try {
    const res = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/invoices/status`,
    );
    const result: IStatusAggregation[] = await res.json();
    return [result, null];
  } catch (error) {
    return [null, error];
  }
}

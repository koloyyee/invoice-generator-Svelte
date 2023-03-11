import type { IStatusAggregation } from '../../interfaces/status.interface';

type StatusPie = {
  labels: string[];
  counts: number[];
};

export function statusAggregationReducer(
    statusStore: IStatusAggregation[],
): StatusPie {
  const statusMap: Map<string, number> = new Map();

  statusStore.forEach(
      (record: { _id: string; count: number }): Map<string, number> => {
        statusMap.set(record._id, record.count);
        return statusMap;
      },
  );

  const labels = [...statusMap.keys()];
  const counts = [...statusMap.values()];

  return { labels, counts };
}

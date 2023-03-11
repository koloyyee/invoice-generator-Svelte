<script lang="ts">
  import Counts from '../../lib/components/common/cards/counts.svelte';
  import Bar from '../../lib/components/common/charts/chartjs-bar.svelte';
  import Pie from '../../lib/components/common/charts/chartjs-pie.svelte';
  import Summary from '../../lib/components/records/summary-table.svelte';
  import { customers, updateCustomersStore } from '../../lib/stores/customers';
  import { updateInvoicesStore } from '../../lib/stores/invoice';
  import { updateStatusStore } from '../../lib/stores/status';

  let invoicesPromise = updateInvoicesStore();
  let statusPromise = updateStatusStore();
  let customersPromise = updateCustomersStore();
</script>

<section class="w-full font-extrabold text-3xl  flex flex-col  p-8 ">
  <h1 class="text-4xl text-extrabold mb-4 border-b-gray-50 border-b-5">
    Dashboard
  </h1>
  {#await customersPromise then}
    <Counts title={'Customer'} counts={$customers.length} />
  {/await}
  <article
    class="card w-full bg-base-100 shadow-xl rounded-xl grid md:grid-cols-2 gap-2 items-center mb-5"
  >
    {#await statusPromise}
      <button class="btn btn-circle btn-outline loading place-content-center" />
    {:then { labels, counts }}
      <div class="card-body w-1/2 md:w-2/3">
        <Pie {labels} {counts} />
      </div>
    {/await}
    {#await invoicesPromise}
      <button class="btn btn-circle btn-outline loading place-content-center" />
    {:then { names, totalAmounts }}
      <div class="card-body md:w-full">
        <Bar labels={names} totalAmount={totalAmounts} />
      </div>
    {/await}
  </article>

  <Summary />
</section>

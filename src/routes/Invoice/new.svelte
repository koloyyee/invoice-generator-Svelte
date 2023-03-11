<script lang="ts">
  import { createForm } from 'felte';
  import toast from 'svelte-french-toast';
  import { push } from 'svelte-spa-router';
  import { createInvoice } from '../../lib/apis/invoices';
  import Button from '../../lib/components/common/buttons/button.svelte';
  import Note from '../../lib/components/invoices/forms/additional-note.svelte';
  import CustomerInfo from '../../lib/components/invoices/forms/customer-info.svelte';
  import InvoiceDate from '../../lib/components/invoices/forms/date.svelte';
  import IssuerInfo from '../../lib/components/invoices/forms/issuer-info.svelte';
  import ItemInput from '../../lib/components/invoices/forms/item-input.svelte';
  import ItemTable from '../../lib/components/invoices/forms/item-table.svelte';
  import NotePreview from '../../lib/components/invoices/previews/additional-note.svelte';
  import CustomerInfoPreview from '../../lib/components/invoices/previews/customer-info.svelte';
  import IssuerPreview from '../../lib/components/invoices/previews/issuer.svelte';
  import TotalAmount from '../../lib/components/invoices/previews/total-amount.svelte';
  import type { IItem } from '../../lib/interfaces';
  import { currentUser } from '../../lib/stores/auth';
  import { additionalNote, invoice } from '../../lib/stores/invoice';
  import { invoiceStatus } from '../../lib/util/status';

  let isSubmitted = false;

  const user = $currentUser ?? JSON.parse(localStorage.getItem('appUser'));
  const { form, errors, data, isValid } = createForm({
    initialValues: {
      issuer: {
        _id: user._id,
        username: user.username ?? '',
        email: user.email ?? '',
        phone: user.phone ?? '',
        website: user.website ?? '',
        address: user.address ?? '',
        bankName: user.bankName ?? '',
        bankAccount: user.bankAccount ?? '',
        bankHolder: user.bankHolder ?? '',
      },
      customer: {
        name: '',
        email: '',
        address: '',
        phone: '',
      },
      invoiceId: new Date().valueOf().toString(),
      createdDate: new Date().toLocaleDateString(),
      dueDate: new Date().toLocaleDateString(),
      note: $additionalNote,
      status: invoiceStatus.NOT_PAID,
      items: [] as IItem[],
      totalAmount: 0,
    },
    onSubmit: async (values) => {
      const result = await createInvoice(values);
      console.log(result);
      return result;
    },
    onSuccess: (response, context) => {
      toast('Invoice saved!', {
        icon: '🧾',
        position: 'bottom-center',
        style: 'border-radius: 200px;',
      });
    },
    onError(error, context) {
      console.error(error);
    },
  });

  function setTotalAmount(event) {
    $data.totalAmount = event.detail.totalAmount;
    $invoice.totalAmount = Number($data.totalAmount.toFixed(2));
  }

  const printInvoice = () => {
    window.print();
  };
</script>

<div class="sm:grid lg:grid grid-cols-2 ">
  <section
    class="not-printable md:grid grdi-cols-3 p-5 m-5 border-2 rounded shadow-md w-50"
  >
    <form use:form>
      <h1 class="text-center text-4xl font-extrabold mb-2">
        Create your next invoice
      </h1>
      <div class="divider">
        <h3 class="font-extrabold">Issue Company Info.</h3>
      </div>
      <div class="invoice-create-form lg:grid grid-col-3">
        <section class=" issuer-section pb-5">
          <IssuerInfo bind:issuer={$data.issuer} />
        </section>
        <div class="divider">
          <h3 class="font-extrabold">Customer Company & Invoice Info.</h3>
        </div>
        <section class="grid issuer-section pb-5">
          <div class="lg:grid grid-cols-2 gap-2  ">
            <CustomerInfo bind:customer={$data.customer} />
            <InvoiceDate
              invoiceId={$data.invoiceId}
              createdDate={$data.createdDate}
              dueDate={$data.dueDate}
              status={$data.status}
            />
          </div>
          <div class="divider"><h3 class="font-extrabold">Items</h3></div>
          <ItemInput
            bind:items={$data.items}
            on:setTotalAmount={setTotalAmount}
          />

          <Note bind:note={$data.note} />
          <div class='flex justify-self-end'>
            <Button
              type="submit"
              text={'Save'}
              class="secondary "
            />
            <Button
              type="submit"
              text={'Leave'}
              func={() => push('/')}
              class="error"
            />
          </div>
        </section>
      </div>
    </form>
  </section>
  <!-- Invoice Preview -->
  <section
    class="invoice-preview rounded border-2 shadow-md p-5 m-5 
  flex flex-col
  gap-5
  "
  >
    <div class="not-printable self-center">
      <Button func={printInvoice} text={'Print'} class="success" />
    </div>
    <section class="flex justify-between">
      <IssuerPreview bind:issuer={$data.issuer} />

      <h1 class="text-right text-4xl font-extrabold ">Invoice</h1>
    </section>

    <CustomerInfoPreview
      bind:invoiceId={$data.invoiceId}
      bind:createdDate={$data.createdDate}
      bind:dueDate={$data.dueDate}
      bind:client={$data.customer}
      bind:status={$data.status}
    />
    <ItemTable bind:items={$data.items} />

    <div class="mt-auto">
      <TotalAmount bind:totalAmount={$data.totalAmount} />

      <NotePreview bind:note={$data.note} />
    </div>
  </section>
</div>

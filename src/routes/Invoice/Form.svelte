<script lang="ts">
    import CustomerInfo from "../../lib/components/Invoice/CustomerInfo.svelte";
    import Date from "../../lib/components/Invoice/Dates.svelte";
    import IssuerInfo from "../../lib/components/Invoice/IssuerInfo.svelte";
    import Note from "../../lib/components/Invoice/Note.svelte";
    import ItemInputs from "../../lib/components/Table/ItemInputs.svelte";
    import type { IInvoice } from "../../lib/interfaces/invoice.interface";

    export let invoice: IInvoice;

    function setTotalAmount(event) {
        invoice.totalAmount = event.detail.totalAmount;
        invoice.items = invoice.items;
        // invoice.note = note;
        invoice.totalAmount = Number(invoice.totalAmount.toFixed(2));
    }
</script>

<section
    class="not-printable md:grid grdi-cols-3 p-5 m-5 border-2 rounded shadow-md w-50"
>
    <h1 class="text-center text-4xl font-extrabold mb-2">
        Create your next invoice
    </h1>

    <div class="invoice-create-form lg:grid grid-col-3">
        <section class="issuer-section border-b-2 border-b-gray-600 pb-5">
            <h3 class="font-extrabold">Issue Company Info.</h3>

            <IssuerInfo bind:issuer={invoice.issuer} />
        </section>
        <section class="issuer-section border-b-2 border-b-gray-600  pb-5">
            <h3 class="font-extrabold">Client Company & Invoice Info.</h3>
            <div class="lg:grid grid-cols-2 gap-2  ">
                <CustomerInfo bind:client={invoice.client} />
                <Date
                    bind:invoiceId={invoice.invoiceId}
                    bind:invoiceDate={invoice.invoiceDate}
                    bind:invoiceDueDate={invoice.invoiceDueDate}
                    bind:status={invoice.status}
                />
            </div>
        </section>
        <ItemInputs
            bind:items={invoice.items}
            on:setTotalAmount={setTotalAmount}
        />

        <Note bind:note={invoice.note} />
    </div>
</section>


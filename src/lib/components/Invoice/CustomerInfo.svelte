<script lang='ts'>
import type { ICustomer } from '../../interfaces/customer.interface';

export let client: ICustomer ={
    name: '',
    address: '',
}
</script>

<div class='flex flex-col mt-3'>

    <label for="clientName">Name</label>
    <input class="rounded-xl outline-0 focus:border-purple-800 focus:border-3 px-1 h-10" type="text" name="clientName" id="clientName" bind:value={client.name} required>
    <label for="clientAddress">Address</label>
    <input class="rounded-xl outline-0 focus:border-purple-800 focus:border-3 px-1 h-10" type="text" name="clientAddress" id="clientAddress" bind:value={client.address} required>
</div>

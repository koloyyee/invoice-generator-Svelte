<script lang="ts">
	import type { ICustomer } from '../../interfaces/customer.interface';

	export let customer: ICustomer = {
		name: '',
		address: '',
	};
</script>

<div class="flex flex-col mt-3">
	<label for="customerName">Name</label>
	<input
		class="rounded-xl outline-0 focus:border-purple-800 focus:border-3 px-1 h-10"
		type="text"
		name="customer.name"
		id="name"
		bind:value="{customer.name}"
		required
	/>
	<label for="customerAddress">Address</label>
	<input
		class="rounded-xl outline-0 focus:border-purple-800 focus:border-3 px-1 h-10"
		type="text"
		name="customer.address"
		id="address"
		bind:value="{customer.address}"
		required
	/>
</div>

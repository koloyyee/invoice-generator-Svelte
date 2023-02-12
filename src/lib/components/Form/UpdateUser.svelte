<script>
	import { createForm } from 'felte';
	import { currentUser } from '../../stores/auth';
	import Button from '../Buttons/Button.svelte';

	console.log($currentUser);

	const user = $currentUser ?? JSON.parse(localStorage.getItem('appUser'));
	const { form, errors, data } = createForm({
		initialValues: {
			user: {
				username: user?.username ?? '',
				email: user?.email ?? '',
				website: user?.website ?? '',
				address: user?.website ?? '',
				bankName: user?.bankName ?? '',
				bankAccount: user?.bankAccount ?? '',
				bankHolder: user?.bankHolder ?? '',
			},
		},

		onSubmit: async (values, context) => {
			const {
				username,
				email,
				website,
				address,
				bankName,
				bankAccount,
				bankHolder,
			} = values.user;

			const doc = {
				username,
				email,
				website,
				address,
				bank_name: bankName,
				bank_account: bankAccount,
				holder_name: bankHolder,
			};

			const res = await fetch(
				`${import.meta.env.VITE_BACKEND_API}/users/${user.id}`,
				{
					method: 'PATCH',
					headers: {
						'Content-type': 'application/json',
					},
					body: JSON.stringify(doc),
				}
			);
		},
	});
</script>

<h1 class="text-4xl font-extrabold py-5 mx-5">Update your account details</h1>
<section class="grid place-content-center">
	<form
		use:form
		class="flex flex-col border-2 border-gray-50 shadow-xl
justify-center items-center
w-max  p-10 rounded sm:mx-5"
	>
		<label for="username" class="w-full">
			Username:
			<input
				class="error rounded input input-bordered w-full max-w-xs"
				type="text"
				name="user.username"
				id="username"
				required
			/>
		</label>
		<label for="email" class="w-full">
			Email:
			<input
				class="error rounded input input-bordered w-full max-w-xs"
				type="email"
				name="user.email"
				id="email"
				required
			/>
		</label>

		<label for="website" class="w-full">
			Website:
			<input
				class="error rounded input input-bordered w-full max-w-xs"
				type="text"
				name="user.website"
				id="website"
			/>
		</label>
		<label for="address" class="w-full">
			Address:
			<input
				class="error rounded input input-bordered w-full max-w-xs"
				type="text"
				name="user.address"
				id="address"
			/>
		</label>
		<label for="holderName" class="w-full">
			Holder's Name:
			<input
				class="error rounded input input-bordered w-full max-w-xs"
				type="text"
				name="user.bankHolder"
				id="holderName"
			/>
		</label>
		<label for="bankName" class="w-full">
			Bank Name:
			<input
				class="error rounded input input-bordered w-full max-w-xs"
				type="text"
				name="user.bankName"
				id="bankName"
			/>
		</label>
		<label for="bankAccount" class="w-full">
			Bank Account:
			<input
				class="error rounded input input-bordered w-full max-w-xs"
				type="text"
				name="user.bankAccount"
				id="bankAccount"
			/>
		</label>

		<Button class="secondary my-5" text="{'Update'}" />
	</form>
</section>

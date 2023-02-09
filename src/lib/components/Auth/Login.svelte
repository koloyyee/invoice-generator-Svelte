<script lang="ts">
	import { createForm } from 'felte';
	import { push } from 'svelte-spa-router';
	import { getUserByUsername, getUserProfile, login } from '../../apis/users';
	import {
		currentUser,
		isAuthenticated,
		localStorageUsername
	} from '../../stores/auth';
	import AuthBtn from '../Buttons/AuthBtn.svelte';
	import HasAccount from './HasAccount.svelte';

	const { form, errors, data } = createForm({
		initialValues: {
			user: {
				// @ts-ignore
				username: '',
				password: '',
			},
		},
		onSubmit: async (values) => {
			const [error, token] = await login(values);
			if (error) throw error;

			const [error2, { id, username }] = await getUserProfile(token);
			if (error2) throw error2;

			return username;
		},
		onSuccess: async (username: string, context) => {
			const [, user] = await getUserByUsername(username);

			isAuthenticated.set(true);
			localStorageUsername.set(username);
			localStorage.setItem("appUser", JSON.stringify(user))
			currentUser.update((value) => (value = user));

			push('/');
		},
		onError(error, context) {
			console.error(error);
		},
	});
</script>

<form
	use:form
	class="shadow-md border-2 
flex flex-col 
justify-center items-center
w-72 p-10 rounded"
>
	<label for="username">
		Username:
		<input
			class="error rounded"
			type="text"
			name="user.username"
			id="username"
			required
		/>
	</label>
	<label for="password">
		Password:
		<input
			class="error rounded"
			type="password"
			name="user.password"
			id="password"
			required
		/>
	</label>
	<AuthBtn action="{'Login'}" />
</form>
<HasAccount />

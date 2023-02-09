<script>
	import { createForm } from "felte";
	import { z } from "zod";
	import AuthBtn from "../Buttons/AuthBtn.svelte";
	import HasAccount from "./HasAccount.svelte";

	const schema = z.object({
		username: z.string(),
		email: z.string().email({ message: "Invalid email address." }),
		password: z
			.string()
			.min(8, { message: "Must be 8 or more characters long." }),
		confirmPassword: z.string().min(8),
	});

	const warningSchema = z
		.object({
			password: z
				.string()
				.refine((value) => (value ? value.length > 8 : true), {
					message: "Password not secure",
				}),

			confirmPassword: z
				.string()
				.refine((value) => (value ? value.length > 8 : true), {
					message: "Password not secure",
				}),
		})
		.superRefine(({ confirmPassword, password }, ctx) => {
			if (confirmPassword !== password) {
				ctx.addIssue({
					code: "custom",
					message: "The passwords did not match.",
				});
			}
		});

	const { form, errors, data } = createForm({
		initialValues: {
            user : {
                id: self.crypto.randomUUID(),
                username: "",
                password: "",
                confirmPassword: "",
                email: "",
                }
		},

		onSubmit: async (values, {resetField}) => {
			console.log(values)
			
			if (values.user.password !== values.user.confirmPassword) return;
			try { 
				const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/users`, {
					method: "POST",
					headers: {
						"Content-type": "application/json",
					},
					body: JSON.stringify(values.user),
				});

                return res
			} catch (e ) {

               throw e
               console.error(e.message)
            }

		},
		// warn: (values) => {
		// 	const warnings = {};
		// 	if (values.password !== values.confirmPassword) {
		// 		warnings.password = "The password needs to be the same.";
		// 	}
		// 	return warnings;
		// },

		// extend: [
		// 	validator({ schema: schema }),
		// 	validator({ schema: warningSchema, level: "warning" }),
		// ],
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
            bind:value={$data.user.username}
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
            bind:value={$data.user.password}
			minlength="8"
			required
		/>
	</label>
	<label for="comfirmPassword">
		Confirm Password:
		<input
			class={`error rounded`}
			type="password"
			name="user.confirmPassword"
			id="confirmPassword"
            bind:value={$data.user.confirmPassword}
			minlength="8"
			required
		/>
	</label>
	<label for="email">
		Email:
		<input
			class="error rounded"
			type="email"
			name="user.email"
            bind:value={$data.user.email}
			id="email"
			required
		/>
	</label>

	<AuthBtn action={"Register"} />
</form>
<HasAccount />

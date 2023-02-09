<script>
    import { createForm } from "felte";
    import { user } from "../../stores/auth";
    import Button from "../Buttons/Button.svelte";

    const { form, errors, data } = createForm({
        initialValues: {
            user: {
                username: $user ? $user.username : "",
                email: $user ? $user.email : "",
                website: $user ? $user.website : "",
                address: $user ? $user.address : "",
                bankName: $user ? $user.bank_name : "",
                bankAccount: $user ? $user.bank_account : "",
                holderName: $user ? $user.holder_name : "",
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
                holderName,
            } = values.user;

            const doc = {
                username: username,
                email: email,
                website: website,
                address: address,
                bank_name: bankName,
                bank_account: bankAccount,
                holder_name: holderName,
            };

            const res = await fetch(
                `${import.meta.env.VITE_BACKEND_API}/users/${$user.id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-type": "application/json",
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
            name="user.holderName"
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

    <Button class="secondary my-5" text={"Update"} />
</form>

</section>
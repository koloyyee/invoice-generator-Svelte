<script>
    export let issuer = {
        username: "",
        address: "",
        email: "",
        website: "",
        bankName: "",
        bankAccount: "",
        holderName: "",
    };

    let logo, fileInput;
    const onFileSelected = (e) => {
        let image = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = (e) => {
            logo = e.target.result;
        };
    };
</script>

<div class="lg:grid grid-cols-2 gap-2">
    <div class="md:grid grid-cols-2 gap-2">
        <div class="flex flex-col">
            <label for="username">Name:</label>
            <input
                class="rounded-xl outline-0 focus:border-purple-800 focus:border-3 px-1 h-10"
                type="text"
                name="username"
                id="username"
                bind:value={issuer.username}
                required
            />
        </div>
        <div class="flex flex-col">
            <label for="address"> Address:</label>
            <input
                class="rounded-xl outline-0 focus:border-purple-800 focus:border-3 px-1 h-10"
                type="text"
                name="address"
                id="address"
                bind:value={issuer.address}
                required
            />
        </div>
        <div class="flex flex-col">
            <label for="email "> Email:</label>
            <input
                class="rounded-xl outline-0 focus:border-purple-800 focus:border-3 px-1 h-10"
                type="email "
                name="email "
                id="email "
                bind:value={issuer.email}
                required
            />
        </div>
        <div class="flex flex-col">
            <label for="website"> Website:</label>
            <input
                class="rounded-xl outline-0 focus:border-purple-800 focus:border-3 px-1 h-10"
                type="text"
                name="website"
                id="website"
                bind:value={issuer.website}
                required
            />
        </div>
    </div>
    <div class="md:grid grid-cols-2 gap-2">
        <div class="flex flex-col">
            <label for="bankName"> Bank name:</label>
            <input
                class="rounded-xl outline-0 focus:border-purple-800 focus:border-3 px-1 h-10"
                type="text"
                name="bankName"
                id="bankName"
                bind:value={issuer.bankName}
                required
            />
        </div>

        <div class="flex flex-col">
            <label for="bankAccount"> Bank account:</label>
            <input
                class="rounded-xl outline-0 focus:border-purple-800 focus:border-3 px-1 h-10"
                type="text"
                name="bankAccount"
                id="bankAccount"
                bind:value={issuer.bankAccount}
                required
            />
        </div>

        <div class="flex flex-col">
            <label for="bankHolder"> Holder's name:</label>
            <input
                class="rounded-xl outline-0 focus:border-purple-800 focus:border-3 px-1 h-10"
                type="text"
                name="bankHolder"
                id="bankHolder"
                bind:value={issuer.bankHolder}
                required
            />
        </div>
        <div class="">
            <div
                class="upload cursor-pointer"
                on:click={() => fileInput.click()}
            >
                Upload Logo
            </div>
            <input
                class="hidden fileInput px-1 h-10"
                type="file"
                accept=".jpg, .jpeg, .png"
                name="bankHolder"
                id="bankHolder"
                on:change={(e) => onFileSelected(e)}
                bind:this={fileInput}
            />
        </div>
    </div>
</div>

<style>
    .fileInput {
        border: none;
    }
</style>

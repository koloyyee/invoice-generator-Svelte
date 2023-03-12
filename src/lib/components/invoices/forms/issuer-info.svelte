<script lang="ts">
  import FaRegImage from 'svelte-icons/fa/FaRegImage.svelte';
  import { logo } from '../../../stores/invoice';

  export let issuer = {
    username: '',
    address: '',
    email: '',
    website: '',
    bankName: '',
    bankAccount: '',
    bankHolder: '',
  };

  let fileInput;

  const onFileSelected = (e) => {
    let image = e.target.files[0];
    let reader = new FileReader();

    reader.readAsDataURL(image);
    reader.onload = (e) => {
      logo.set(e.target.result);
      console.log($logo);
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
        name="issuer.username"
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
        name="issuer.address"
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
        name="issuer.email "
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
        name="issuer.website"
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
        name="issuer.bankName"
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
        name="issuer.bankAccount"
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
        name="issuer.bankHolder"
        id="bankHolder"
        bind:value={issuer.bankHolder}
        required
      />
    </div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="upload cursor-pointer grid" on:click={() => fileInput.click()}>
      Upload Logo
      <div class="w-1/3 max-h-8 mx-auto">
        <FaRegImage />
      </div>
      <input
        class="hidden  px-1 h-10 input input-bordered w-full max-w-xs"
        type="file"
        accept=".jpg, .jpeg, .png"
        id="bankHolder"
        on:change={(e) => onFileSelected(e)}
        bind:this={fileInput}
      />
    </div>
  </div>
</div>

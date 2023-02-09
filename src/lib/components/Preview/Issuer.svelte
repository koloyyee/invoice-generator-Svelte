<script>
    export let issuer = {
		username: "",
		address: "",
		email: "",
		website: "",
		bankName: "",
		bankAccount: "",
		bankHolder: "",
	};

</script>

<div class='issuer '>
    <h2 class='font-bold mt-2 text-sm'> From: </h2>
    <h2 class="text-lg font-bold mb-1">{issuer.username}</h2>
    <ul>
        <li>{issuer.address}</li>
        <li>{issuer.email}</li>
        <li class='mb-1'>{issuer.website}</li>
        <li>{issuer.bankHolder}</li>
        <li>{issuer.bankName}</li>
        <li>{issuer.bankAccount}</li>
    </ul>

</div>
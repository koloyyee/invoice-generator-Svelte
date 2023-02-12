<script>
	import { hasAccount, setHasAccount } from '../../stores/auth';
</script>

<p class="mt-5">
	{$hasAccount ? 'No account?' : 'Got account?'}
	<button
		class="group transition-all duration-300 ease-in-out"
		on:click="{setHasAccount}"
	>
		<span
			class="bg-left-bottom bg-gradient-to-r from-blue-400 to-purple-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-300 ease-out"
		>
			{$hasAccount ? 'Register' : 'Login'}
		</span>
	</button>
</p>

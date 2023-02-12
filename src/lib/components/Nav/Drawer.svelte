<script>
	import { logout } from '../../stores/auth';

	import FaAlignJustify from 'svelte-icons/fa/FaAlignJustify.svelte';
	import MdAddToPhotos from 'svelte-icons/md/MdAddToPhotos.svelte';
	import MdDashboard from 'svelte-icons/md/MdDashboard.svelte';
	import MdExitToApp from 'svelte-icons/md/MdExitToApp.svelte';
	import MdLibraryBooks from 'svelte-icons/md/MdLibraryBooks.svelte';
	import MdSettings from 'svelte-icons/md/MdSettings.svelte';
	import { link } from 'svelte-spa-router';
	import { ThemeToggle } from '../Buttons';
</script>

<div class="drawer drawer-mobile">
	<input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content flex flex-col ">
		<slot />
		<label
			for="my-drawer-2"
			class="btn btn-primary drawer-button fixed 
                    bottom-8 right-8 z-30
                    opacity-75  lg:hidden
                    menu-icons
                    btn-circle
                    not-printable"
		>
			<FaAlignJustify />
		</label>
	</div>
	<div class="drawer-side shadow-xl border-right-2 ">
		<label for="my-drawer-2" class="drawer-overlay"></label>
		<ul class="menu p-4 pl-10 w-40 text-base-content ">
			<!-- Sidebar content here -->
			<a href="/" use:link>
				<li>
					<span class="menu-icons"> <MdDashboard /> </span>
					Overview
				</li>
			</a>
			<a href="/invoice/new" use:link>
				<li>
					<span class="menu-icons"><MdAddToPhotos /></span>
					New Invoice
				</li>
			</a>
			<a href="/invoice" use:link>
				<li>
					<span class="menu-icons"><MdLibraryBooks /></span>
					Records
				</li>
			</a>
			<a href="/user/settings" use:link>
				<li>
					<span class="menu-icons"><MdSettings /></span>
					User Settings
				</li>
			</a>
			<a href="/auth" use:link class="justify-self-end" on:click="{logout}">
				<li>
					<span class="menu-icons exit "><MdExitToApp /></span>
					Logout
				</li>
			</a>
		</ul>
		<div class="divider w-2/3 m-auto"></div>
		<ThemeToggle />
	</div>
</div>

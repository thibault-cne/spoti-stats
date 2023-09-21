<script lang="ts">
	import '../app.css';
	import '../app.postcss';

	import { AppShell, AppBar } from '@skeletonlabs/skeleton';

	import { user } from '$lib/store';

	const scope = 'user-top-read user-read-private';
	const url =
		'https://accounts.spotify.com/authorize' +
		'?response_type=token' +
		'&client_id=' +
		encodeURIComponent(import.meta.env.VITE_CLIENT_ID) +
		'&scope=' +
		encodeURIComponent(scope) +
		'&redirect_uri=' +
		encodeURIComponent('http://localhost:5173');

	var user_data: any = {};
	user.subscribe((value) => {
		user_data = value;
	});

	$: logged = user_data.display_name !== undefined;
</script>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">Spoti-Stats</svelte:fragment>
			<svelte:fragment slot="trail">
				{#if logged}
					<button
						on:click={() => {
							user.set({});
						}}
						aria-label="logout">logout</button
					>
				{:else}
					<a href={url} aria-label="logout">login</a>
				{/if}
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<slot />
</AppShell>

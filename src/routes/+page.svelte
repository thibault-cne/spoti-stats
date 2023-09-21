<script lang="ts">
	import { onMount } from 'svelte';

	const scope = 'user-top-read user-read-private';
	const url =
		'https://accounts.spotify.com/authorize' +
		'?response_type=token' +
		'&client_id=' +
		encodeURIComponent(import.meta.env.VITE_CLIENT_ID) +
		+'&scope=' +
		encodeURIComponent(scope);
	'&redirect_uri=' + encodeURIComponent('http://localhost:5173');

	var user: any = {};

	onMount(() => {
		const params = getHashParams();

		token = params.access_token;

		if (token !== '') {
			logged = true;

			fetch('https://api.spotify.com/v1/me', {
				headers: {
					Authorization: 'Bearer ' + token
				}
			}).then((res) => {
				res.json().then((data) => {
					user = data;
				});
			});
		}
	});

	/**
	 * Obtains parameters from the hash of the URL
	 * @return Object
	 */
	function getHashParams() {
		var hashParams: any = {};
		var e,
			r = /([^&;=]+)=?([^&;]*)/g,
			q = window.location.hash.substring(1);
		while ((e = r.exec(q))) {
			hashParams[e[1]] = decodeURIComponent(e[2]);
		}
		return hashParams;
	}

	$: token = '';
	$: logged = false;
</script>

{#if logged}
	<h2>{user.display_name}</h2>
{:else}
	<button on:click={() => (window.location.href = url)}> Login </button>
{/if}

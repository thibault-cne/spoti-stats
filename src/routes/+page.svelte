<script lang="ts">
	import { onMount } from 'svelte';

	const scope = 'user-top-read';
	const url =
		'https://accounts.spotify.com/authorize' +
		'?response_type=token' +
		'&client_id=' +
		encodeURIComponent(import.meta.env.VITE_CLIENT_ID) +
		+'&scope=' +
		encodeURIComponent(scope);
	'&redirect_uri=' + encodeURIComponent('http://localhost:5173');

	onMount(() => {
		const params = getHashParams();

		token = params.access_token;
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
</script>

<button on:click={() => (window.location.href = url)}> Login </button>

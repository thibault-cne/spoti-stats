<script lang="ts">
	import { Motion } from 'svelte-motion';

	import { onMount } from 'svelte';
	import { user } from '$lib/store';

	var user_data: any = {};

	user.subscribe((value) => {
		user_data = value;
	});

	onMount(() => {
		const params = getHashParams();

		token = params.access_token;

		if (token !== undefined) {
			fetch('https://api.spotify.com/v1/me', {
				headers: {
					Authorization: 'Bearer ' + token
				}
			}).then((res) => {
				res.json().then((data) => {
					user.set(data);
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
	const variants = {
		visible: { opacity: 1, x: 0 },
		hidden: { opacity: 0, x: -500 }
	};

	let i = 1;

	$: v = ['hidden', 'visible'][i];
	$: token = '';
	// Check is user has a token
	$: logged = user_data.display_name !== undefined;
</script>

{#if logged}
	<section
		id="home"
		class="w-full bg-brand bg-center bg-no-repeat bg-[length:105%_105%] flex py-20 justify-center items-center transition-all duration-75 sticky top-0"
	>
		<div class="space-y-10 text-center">
			<h2 class="font-bold">Hi, {user_data.display_name} !</h2>
			<!-- Animated Logo -->
			{#if user_data.images[1]}
				<figure class="flex items-center justify-center">
					<section class="img-bg" />
					<Motion initial="hidden" animate={v} {variants} let:motion>
						<img
							use:motion
							src={user_data.images[1].url}
							height={user_data.images[1].height}
							width={user_data.images[1].width}
							alt={user_data.display_name}
							class="rounded-full"
						/>
					</Motion>
				</figure>
			{/if}
			<div>Are you ready to discover insights of your spotify account ?</div>
		</div>
	</section>
{/if}

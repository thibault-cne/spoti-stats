<script lang="ts">
	import { Motion } from 'svelte-motion';

	import { onMount } from 'svelte';
	import { user, top_artists, top_tracks } from '$lib/store';
	import type { SpotifyResponse, TrackObject, ArtistObject } from '$lib/types';

	var user_data: any = {};
	var top_data: {
		artists: null | SpotifyResponse<ArtistObject>;
		tracks: null | SpotifyResponse<TrackObject>;
	} = {
		artists: null,
		tracks: null
	};
	var time_range = {
		tracks: 'medium_term',
		artists: 'medium_term'
	};
	var limits = {
		tracks: 10,
		artists: 10
	};

	user.subscribe((value) => {
		user_data = value;
	});

	top_artists.subscribe((value) => {
		top_data.artists = value;
	});

	top_tracks.subscribe((value) => {
		top_data.tracks = value;
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

					fetchTopArtist();
					fetchTopTracks();
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

	/**
	 * Fetch top artists
	 */
	function fetchTopArtist() {
		fetch(
			`https://api.spotify.com/v1/me/top/artists?limit=${limits.artists}&time_range=${time_range.artists}`,
			{
				headers: {
					Authorization: 'Bearer ' + token
				}
			}
		).then((res) => {
			res.json().then((data) => {
				top_artists.set(data);
			});
		});
	}

	/**
	 * Fetch top tracks
	 */
	function fetchTopTracks() {
		fetch(
			`https://api.spotify.com/v1/me/top/tracks?time_range=${time_range.tracks}&limit=${limits.tracks}`,
			{
				headers: {
					Authorization: 'Bearer ' + token
				}
			}
		).then((res) => {
			res.json().then((data) => {
				top_tracks.set(data);
			});
		});
	}

	const variants = {
		visible: { opacity: 1, x: 0 },
		hidden: { opacity: 0, x: -500 }
	};

	let i = 1;

	$: v = ['hidden', 'visible'][i];
	$: token = '';
	$: init = user_data.display_name !== undefined;
</script>

{#if init}
	<section
		id="home"
		class="h-screen w-full bg-brand bg-center bg-no-repeat bg-[length:105%_105%] flex py-28 justify-center items-center transition-all duration-75 sticky top-0"
	>
		<div class="space-y-10 text-center">
			<h2 class="font-bold text-2xl md:text-4xl">Hi, {user_data.display_name} !</h2>
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
			<div class="text-lg md:text-2xl">
				Are you ready to discover insights of your spotify account ?
			</div>
		</div>
	</section>

	{#if top_data.artists}
		<section
			id="top-artists"
			class="w-full flex items-center bg-neutrals-900 py-28 relative z-10 xl:min-h-screen flex-col bg-slate-900"
			aria-label="top-artists"
		>
			<h2 class="text-2xl font-bold mb-16">Top {limits.artists} Artists</h2>
			<div class="w-full flex justify-end">
				<div class="flex flex-col mb-10 mr-5 gap-4 max-w-xs">
					<select
						bind:value={time_range.artists}
						on:change={fetchTopArtist}
						name="time_range_tracks"
						id="time_range_tracks"
						class="select"
					>
						<option>medium_term</option>
						<option>short_term</option>
						<option>long_term</option>
					</select>
					<input
						type="range"
						min="0"
						max="50"
						bind:value={limits.artists}
						on:mouseup={fetchTopArtist}
						class="range"
					/>
				</div>
			</div>
			<div class="flex flex-wrap justify-center gap-20">
				{#each top_data.artists.items as artist}
					<div class="flex flex-col items-center space-y-2">
						<img src={artist.images[0].url} alt={artist.name} class="rounded-full w-36 h-36" />
						<div class="text-center">
							<h3 class="font-bold text-lg">{artist.name}</h3>
						</div>
					</div>
				{/each}
			</div>
		</section>
	{/if}

	{#if top_data.tracks}
		<section
			id="top-tracks"
			class="w-full flex items-center bg-neutrals-900 py-28 relative z-10 xl:min-h-screen flex-col bg-slate-900"
			aria-label="top-tracks"
		>
			<h2 class="text-2xl font-bold mb-16">Top {limits.tracks} Tracks</h2>
			<div class="w-full flex justify-end">
				<div class="flex flex-col mb-10 mr-5 gap-4 max-w-xs">
					<select
						bind:value={time_range.tracks}
						on:change={fetchTopTracks}
						name="time_range_tracks"
						id="time_range_tracks"
						class="select"
					>
						<option>medium_term</option>
						<option>short_term</option>
						<option>long_term</option>
					</select>
					<input
						type="range"
						min="0"
						max="50"
						bind:value={limits.tracks}
						on:mouseup={fetchTopTracks}
						class="range"
					/>
				</div>
			</div>
			<div class="flex w-full justify-center">
				<ul class="group/list w-4/5 flex flex-wrap justify-center gap-10">
					{#each top_data.tracks.items as track}
						<li class="mb-12 w-44">
							<div
								class="group relative pb-1 transition-all flex lg:hover:!opacity-100 lg:group-hover/list:opacity-50"
							>
								<div
									class="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"
								/>
								<div
									class="w-full z-10 sm:order-2 sm:col-span-6 flex flex-col items-center justify-center"
								>
									<img
										src={track.album.images[0].url}
										alt={track.name}
										class="rounded-full w-36 h-36 mb-6"
									/>
									<div class="text-center">
										<h3 class="font-bold text-lg">{track.name}</h3>
									</div>
								</div>
							</div>
						</li>
					{/each}
				</ul>
			</div>
		</section>
	{/if}
{/if}

<script lang="ts">
	import { Motion } from 'svelte-motion';

	import { onMount } from 'svelte';
	import { user, top_artists, top_tracks } from '$lib/store';
	import type { SpotifyResponse, TrackObject, ArtistObject } from '$lib/types';
	import Track from '$lib/track.svelte';

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
		class="h-screen flex-col w-full bg-brand bg-center bg-no-repeat bg-[length:105%_105%] flex py-28 justify-center items-center transition-all duration-75 sticky top-0"
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
		<div class="hidden md:flex justify-center space-x-2 mt-10 heartbeat">
			<!-- Scroll buttons with arrows -->
			<a href="#top-artists" class="btn btn-sm variant-ghost-surface bg-primary-500 h-12 w-12">
				<div class="flex flex-col items-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-8 w-8"
						fill="none"
						viewBox="0 0 24 24"
						stroke="white"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M19 14l-7 7m0 0l-7-7m7 7V3"
						/>
					</svg>
				</div>
			</a>
		</div>
	</section>

	{#if top_data.artists}
		<section
			id="top-artists"
			class="w-full flex items-center bg-neutrals-900 py-28 relative z-10 xl:min-h-screen flex-col bg-slate-900"
			aria-label="top-artists"
		>
			<h2 class="text-2xl font-bold mb-16">Your top {limits.artists} Artists</h2>
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
			<div class="flex w-full justify-center">
				<ul class="group/list w-4/5 flex flex-wrap justify-center gap-10">
					{#each top_data.artists.items as artist}
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
									<img src={artist.images[0].url} alt={artist.name} class="w-36 h-36 mb-6" />
									<div class="text-center">
										<h3>
											<a
												class="inline-flex items-baseline font-medium leading-tight text-[#1DB954] group/link text-base"
												href={artist.external_urls.spotify}
												target="_blank"
												rel="noreferrer"
												aria-label="Build a Spotify Connected App"
											>
												<span class="inline-block">
													{artist.name}<svg
														xmlns="http://www.w3.org/2000/svg"
														viewBox="0 0 20 20"
														fill="currentColor"
														class="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px"
														aria-hidden="true"
														><path
															fill-rule="evenodd"
															d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
															clip-rule="evenodd"
														/></svg
													>
												</span>
											</a>
										</h3>
									</div>
								</div>
							</div>
						</li>
					{/each}
				</ul>
			</div>
		</section>
	{/if}

	{#if top_data.tracks}
		<section
			id="top-tracks"
			class="w-full flex items-center bg-neutrals-900 py-28 relative z-10 xl:min-h-screen flex-col bg-slate-900"
			aria-label="top-tracks"
		>
			<h2 class="text-2xl font-bold mb-16">Your top {limits.tracks} Tracks</h2>
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
				<ul class="group/list w-4/5 grid grid-cols-1 lg:grid-cols-2 justify-start gap-10">
					{#each top_data.tracks.items as track}
						<li>
							<div
								class="group relative transition-all flex lg:hover:!opacity-100 lg:group-hover/list:opacity-50 w-full"
							>
								<Track {track} {token} />
							</div>
						</li>
					{/each}
				</ul>
			</div>
		</section>
	{/if}
{/if}

<style lang="postcss">
	.heartbeat {
		-webkit-animation: heartbeat 1.5s ease-in-out infinite both;
		animation: heartbeat 1.5s ease-in-out infinite both;
	}
	@-webkit-keyframes heartbeat {
		from {
			-webkit-transform: scale(1);
			transform: scale(1);
			-webkit-transform-origin: center center;
			transform-origin: center center;
			-webkit-animation-timing-function: ease-out;
			animation-timing-function: ease-out;
		}
		10% {
			-webkit-transform: scale(0.91);
			transform: scale(0.91);
			-webkit-animation-timing-function: ease-in;
			animation-timing-function: ease-in;
		}
		17% {
			-webkit-transform: scale(0.98);
			transform: scale(0.98);
			-webkit-animation-timing-function: ease-out;
			animation-timing-function: ease-out;
		}
		33% {
			-webkit-transform: scale(0.87);
			transform: scale(0.87);
			-webkit-animation-timing-function: ease-in;
			animation-timing-function: ease-in;
		}
		45% {
			-webkit-transform: scale(1);
			transform: scale(1);
			-webkit-animation-timing-function: ease-out;
			animation-timing-function: ease-out;
		}
	}
	@keyframes heartbeat {
		from {
			-webkit-transform: scale(1);
			transform: scale(1);
			-webkit-transform-origin: center center;
			transform-origin: center center;
			-webkit-animation-timing-function: ease-out;
			animation-timing-function: ease-out;
		}
		10% {
			-webkit-transform: scale(0.91);
			transform: scale(0.91);
			-webkit-animation-timing-function: ease-in;
			animation-timing-function: ease-in;
		}
		17% {
			-webkit-transform: scale(0.98);
			transform: scale(0.98);
			-webkit-animation-timing-function: ease-out;
			animation-timing-function: ease-out;
		}
		33% {
			-webkit-transform: scale(0.87);
			transform: scale(0.87);
			-webkit-animation-timing-function: ease-in;
			animation-timing-function: ease-in;
		}
		45% {
			-webkit-transform: scale(1);
			transform: scale(1);
			-webkit-animation-timing-function: ease-out;
			animation-timing-function: ease-out;
		}
	}
</style>

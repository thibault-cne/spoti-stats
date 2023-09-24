<script lang="ts">
	import { onMount } from 'svelte';

	import { current_track } from './store';
	import type { TrackObject } from './types';

	onMount(async () => {
		const res = await fetch(`https://api.spotify.com/v1/me/tracks/contains?ids=${track.id}`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		const data = await res.json();
		liked = data[0];

		current_track.subscribe((track_id) => {
			if (track_id != track.id) {
				paused = true;
			}
		});
	});

	export let track: TrackObject;
	export let token: string;

	let paused = true;

	$: liked = false;
</script>

<div
	class="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"
/>
<div class="z-10 sm:order-2 sm:col-span-6 h-full flex items-center justify-between w-full">
	<div class="flex flex-row items-center justify-center">
		<img src={track.album.images[0].url} alt={track.name} class="w-20 h-20 mr-4" />
		<div class="flex flex-col h-full">
			<img src="/spotify_logo.png" alt="spotify" class="h-8 w-[108px]" />
			<div class="mt-2">
				<a
					class="font-medium text-primary-500 group/link text-base"
					href={track.external_urls.spotify}
					target="_blank"
					rel="noreferrer"
					aria-label="Build a Spotify Connected App"
				>
					<span class="flex items-center">
						<span class="inline-block truncate max-w-[20ch]">{track.name}</span><svg
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
				<p class="-mt-1">
					{track.artists.map((artist) => artist.name).join(', ')}
				</p>
			</div>
		</div>
	</div>
	<div class="flex flex-row h-full justify-end gap-10">
		{#if track.preview_url}
			<audio src={track.preview_url} preload="metadata" bind:paused />
			<button
				class="text-[#535353] hover:text-white"
				on:click={() => {
					paused = !paused;
					if (paused) {
						current_track.set(null);
					} else {
						current_track.set(track.id);
					}
				}}
			>
				{#if !paused}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="40"
						width="40"
						fill="currentColor"
						viewBox="0 0 512 512"
						><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
							d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM224 192V320c0 17.7-14.3 32-32 32s-32-14.3-32-32V192c0-17.7 14.3-32 32-32s32 14.3 32 32zm128 0V320c0 17.7-14.3 32-32 32s-32-14.3-32-32V192c0-17.7 14.3-32 32-32s32 14.3 32 32z"
						/></svg
					>
				{:else}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="40"
						width="40"
						fill="currentColor"
						viewBox="0 0 512 512"
						><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
							d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9V344c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z"
						/></svg
					>
				{/if}
			</button>
		{/if}
		{#if liked}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="40"
				height="40"
				viewBox="0 0 150 150"
				fill="none"
			>
				<path
					d="M125.784 35.0369C113.039 22.2916 92.9859 21.3682 79.1227 32.8994C79.1062 32.9135 77.318 34.3807 75 34.3807C72.6234 34.3807 70.9266 32.9416 70.8609 32.8853C57.0141 21.3682 36.9609 22.2916 24.2156 35.0369C17.6695 41.583 14.0625 50.2877 14.0625 59.5478C14.0625 68.808 17.6695 77.5127 24.0914 83.9228L64.3078 131.006C66.9844 134.14 70.882 135.938 75 135.938C79.1203 135.938 83.0156 134.14 85.6922 131.009L125.782 84.0611C139.301 70.5447 139.301 48.5533 125.784 35.0369Z"
					fill="#535353"
				/>
			</svg>
		{:else}
			<svg
				width="40"
				height="40"
				viewBox="0 0 150 150"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M125.784 35.0369C113.039 22.2916 92.9859 21.3682 79.1227 32.8994C79.1062 32.9135 77.318 34.3807 75 34.3807C72.6234 34.3807 70.9266 32.9416 70.8609 32.8853C57.0141 21.3682 36.9609 22.2916 24.2156 35.0369C17.6695 41.583 14.0625 50.2877 14.0625 59.5478C14.0625 68.808 17.6695 77.5127 24.0914 83.9228L64.3078 131.006C66.9844 134.14 70.882 135.938 75 135.938C79.1203 135.938 83.0156 134.14 85.6922 131.009L125.782 84.0611C139.301 70.5447 139.301 48.5533 125.784 35.0369ZM122.346 80.8807L82.1297 127.964C80.3461 130.05 77.7469 131.25 75 131.25C72.2531 131.25 69.6562 130.053 67.8703 127.964L27.532 80.7447C21.8695 75.0822 18.75 67.5541 18.75 59.5478C18.75 51.5392 21.8695 44.0135 27.5297 38.351C33.3961 32.4822 41.0555 29.5127 48.7336 29.5127C55.4742 29.5127 62.2289 31.8025 67.7977 36.4338C68.0977 36.7033 70.8586 39.0682 75 39.0682C79.0266 39.0682 81.8578 36.7314 82.1367 36.49C94.1109 26.5291 111.45 27.3307 122.47 38.351C134.159 50.0393 134.159 69.0564 122.346 80.8807Z"
					fill="#535353"
				/>
			</svg>
		{/if}
	</div>
</div>

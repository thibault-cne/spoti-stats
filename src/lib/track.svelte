<script lang="ts">
	import type { TrackObject } from './types';

	export let track: TrackObject;
</script>

<div class="z-10 sm:order-2 sm:col-span-6 h-full flex items-center justify-center">
	<img src={track.album.images[0].url} alt={track.name} class="w-16 h-16 mr-4" />
	<div class="flex flex-col h-full">
		<h3>
			<a
				class="inline-flex items-baseline font-medium leading-tight text-primary-500 group/link text-base"
				href={track.external_urls.spotify}
				target="_blank"
				rel="noreferrer"
				aria-label="Build a Spotify Connected App"
			>
				<span
					class="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"
				/>
				<span class="inline-block">
					{track.name}<svg
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
		<p>
			{track.artists.map((artist) => artist.name).join(', ')}
		</p>
	</div>
</div>

export type SpotifyResponse<T> = {
	href: string;
	limit: number;
	next: string;
	offset: number;
	previous: string;
	total: number;
	items: T[];
};

export type TrackObject = {
	album: Album;
	artists: ArtistObject[];
	available_markets: string[];
	disc_number: number;
	duration_ms: number;
	explicit: boolean;
	external_ids: object;
	external_urls: object;
	href: string;
	id: string;
	is_playable: boolean;
	linked_from: object;
	restrictions: object;
	name: string;
	popularity: number;
	preview_url: string | null;
	track_number: number;
	type: string;
	uri: string;
	is_local: boolean;
};

export type ArtistObject = {
	external_urls: object;
	followers: object;
	genres: string[];
	href: string;
	id: string;
	images: ImageObject[];
	name: string;
	popularity: number;
	type: string;
	uri: string;
};

type Album = {
	album_type: string;
	total_tracks: number;
	available_markets: string[];
	external_urls: object;
	href: string;
	id: string;
	images: ImageObject[];
	name: string;
	release_date: string;
	release_date_precision: string;
	restrictions: object;
	type: string;
	uri: string;
};

type ImageObject = {
	url: string;
	height: number;
	width: number;
};

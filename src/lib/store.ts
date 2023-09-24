import { writable } from 'svelte/store';
import type { SpotifyResponse, TrackObject, ArtistObject } from './types';

export var user = writable({});

export var top_tracks = writable<SpotifyResponse<TrackObject> | null>(null);

export var top_artists = writable<SpotifyResponse<ArtistObject> | null>(null);

export var current_track = writable<string | null>(null);

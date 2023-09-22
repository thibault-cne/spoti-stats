import { skeleton } from '@skeletonlabs/tw-plugin';
import { customTheme } from './theme';

/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		require('path').join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],
	theme: {
		extend: {}
	},
	plugins: [
		skeleton({
			themes: {
				// Register each theme within this array:
				preset: [{ name: 'skeleton', enhancements: true }],
				custom: [customTheme]
			}
		}),
		require('daisyui')
	]
};

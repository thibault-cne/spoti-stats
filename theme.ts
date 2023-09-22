import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const customTheme: CustomThemeConfig = {
	name: 'custom-theme',
	properties: {
		// =~= Theme Properties =~=
		'--theme-font-family-base': `system-ui`,
		'--theme-font-family-heading': `system-ui`,
		'--theme-font-color-base': '0 0 0',
		'--theme-font-color-dark': '255 255 255',
		'--theme-rounded-base': '9999px',
		'--theme-rounded-container': '8px',
		'--theme-border-base': '1px',
		// =~= Theme On-X Colors =~=
		'--on-primary': '0 0 0',
		'--on-secondary': '0 0 0',
		'--on-tertiary': '0 0 0',
		'--on-success': '0 0 0',
		'--on-warning': '0 0 0',
		'--on-error': '0 0 0',
		'--on-surface': '0 0 0',
		// =~= Theme Colors  =~=
		// primary | #1DB954
		'--color-primary-50': '221 245 229', // #ddf5e5
		'--color-primary-100': '210 241 221', // #d2f1dd
		'--color-primary-200': '199 238 212', // #c7eed4
		'--color-primary-300': '165 227 187', // #a5e3bb
		'--color-primary-400': '97 206 135', // #61ce87
		'--color-primary-500': '29 185 84', // #1DB954
		'--color-primary-600': '26 167 76', // #1aa74c
		'--color-primary-700': '22 139 63', // #168b3f
		'--color-primary-800': '17 111 50', // #116f32
		'--color-primary-900': '14 91 41', // #0e5b29
		// secondary | #12bdf6
		'--color-secondary-50': '219 245 254', // #dbf5fe
		'--color-secondary-100': '208 242 253', // #d0f2fd
		'--color-secondary-200': '196 239 253', // #c4effd
		'--color-secondary-300': '160 229 251', // #a0e5fb
		'--color-secondary-400': '89 209 249', // #59d1f9
		'--color-secondary-500': '18 189 246', // #12bdf6
		'--color-secondary-600': '16 170 221', // #10aadd
		'--color-secondary-700': '14 142 185', // #0e8eb9
		'--color-secondary-800': '11 113 148', // #0b7194
		'--color-secondary-900': '9 93 121', // #095d79
		// tertiary | #b38755
		'--color-tertiary-50': '244 237 230', // #f4ede6
		'--color-tertiary-100': '240 231 221', // #f0e7dd
		'--color-tertiary-200': '236 225 213', // #ece1d5
		'--color-tertiary-300': '225 207 187', // #e1cfbb
		'--color-tertiary-400': '202 171 136', // #caab88
		'--color-tertiary-500': '179 135 85', // #b38755
		'--color-tertiary-600': '161 122 77', // #a17a4d
		'--color-tertiary-700': '134 101 64', // #866540
		'--color-tertiary-800': '107 81 51', // #6b5133
		'--color-tertiary-900': '88 66 42', // #58422a
		// success | #d8c59c
		'--color-success-50': '249 246 240', // #f9f6f0
		'--color-success-100': '247 243 235', // #f7f3eb
		'--color-success-200': '245 241 230', // #f5f1e6
		'--color-success-300': '239 232 215', // #efe8d7
		'--color-success-400': '228 214 186', // #e4d6ba
		'--color-success-500': '216 197 156', // #d8c59c
		'--color-success-600': '194 177 140', // #c2b18c
		'--color-success-700': '162 148 117', // #a29475
		'--color-success-800': '130 118 94', // #82765e
		'--color-success-900': '106 97 76', // #6a614c
		// warning | #ef50b0
		'--color-warning-50': '253 229 243', // #fde5f3
		'--color-warning-100': '252 220 239', // #fcdcef
		'--color-warning-200': '251 211 235', // #fbd3eb
		'--color-warning-300': '249 185 223', // #f9b9df
		'--color-warning-400': '244 133 200', // #f485c8
		'--color-warning-500': '239 80 176', // #ef50b0
		'--color-warning-600': '215 72 158', // #d7489e
		'--color-warning-700': '179 60 132', // #b33c84
		'--color-warning-800': '143 48 106', // #8f306a
		'--color-warning-900': '117 39 86', // #752756
		// error | #527fc0
		'--color-error-50': '229 236 246', // #e5ecf6
		'--color-error-100': '220 229 242', // #dce5f2
		'--color-error-200': '212 223 239', // #d4dfef
		'--color-error-300': '186 204 230', // #bacce6
		'--color-error-400': '134 165 211', // #86a5d3
		'--color-error-500': '82 127 192', // #527fc0
		'--color-error-600': '74 114 173', // #4a72ad
		'--color-error-700': '62 95 144', // #3e5f90
		'--color-error-800': '49 76 115', // #314c73
		'--color-error-900': '40 62 94', // #283e5e
		// surface | #212121
		'--color-surface-50': '222 222 222', // #dedede
		'--color-surface-100': '211 211 211', // #d3d3d3
		'--color-surface-200': '200 200 200', // #c8c8c8
		'--color-surface-300': '166 166 166', // #a6a6a6
		'--color-surface-400': '100 100 100', // #646464
		'--color-surface-500': '33 33 33', // #212121
		'--color-surface-600': '30 30 30', // #1e1e1e
		'--color-surface-700': '25 25 25', // #191919
		'--color-surface-800': '20 20 20', // #141414
		'--color-surface-900': '16 16 16' // #101010
	}
};

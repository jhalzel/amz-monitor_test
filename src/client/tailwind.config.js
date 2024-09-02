/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			backgroundColor: {
				'custom-bg': 'var(--fallback-bc, oklch(var(--bc)/0.2))',
				'custom-bd': '(var(--btn-color, var(--b2)) / var(--tw-border-opacity))',
				'custom-txt': 'rgb(75 85 99 / var(--tw-text-opacity))',
				'custom-general':
					'oklch(var(--btn-color, var(--b2)) / var(--tw-bg-opacity))',
			},
			screens: {
				xs: '320px', // Adding a custom breakpoint for very small screens
			},
			colors: {
				'text-base-content': 'blue', // Set your custom color
			},
		},
	},
	plugins: [require('daisyui')],
	// daisyUI config (optional - here are the default values)
	daisyui: {
		themes: ['nord', 'lofi', 'dim', 'night'], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
	},
}

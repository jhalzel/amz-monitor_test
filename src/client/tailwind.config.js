/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			backgroundColor: {
				'custom-bg': 'var(--fallback-bc, oklch(var(--bc)/0.2))',
				'custom-bd': '(var(--btn-color, var(--b2)) / var(--tw-border-opacity))',
			},
		},
	},
	plugins: [require('daisyui')],
	// daisyUI config (optional - here are the default values)
	daisyui: {
		themes: ['light', 'dark', 'coffee'], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
	},
}

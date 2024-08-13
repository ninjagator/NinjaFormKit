/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				ninjaFormKit: {
					default: '#0073aa',
					defaultDark: '#005f8b',
					hover: '#005f8b',
					hoverDark: '#004c6e',
					inputBg: '#f3f4f6',
					inputBgDark: '#1a202c',
					text: '#000000',
					textDark: '#ffffff',
					placeholder: '#a0aec0',
					placeholderDark: '#a0aec0',
					border: '#e2e8f0',
					borderDark: '#2d3748',
					error: '#e53e3e',
					errorDark: '#e53e3e',
					outline: '#0073aa',
					outlineDark: '#005f8b',
					buttonText: '#ffffff',
					buttonTextDark: '#ffffff'
				}
			}
		}
	},
	plugins: [require('@tailwindcss/container-queries')]
};

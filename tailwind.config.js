/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		fontFamily: {
			bakbak: ['Bakbak One', 'sans-serif'],
			inter: ['Inter', 'sans-serif'],
		},
		accordion: {
			styles: {
				base: {
					header: {
						icon: 'hidden',
					},
				},
			},
		},
		extend: {
			backgroundImage: () => ({
				baoBackground: "url('/images/bao-background.png')",
			}),
			colors: {
				current: 'currentColor',
				white: '#ffffff',
				black: '#000000',
				red: '#dc3545',
				green: '#28a745',
				blue: '#007bff',
				pollyWhite: '#f8f8ff',
				pollyBlack: '#1e2022',
				baoRed: '#e21a53',
				pollyBlue: '#373865',
				pollyPurple: '#4d3765',
				pollyGreen: '#53c7e4',
				transparent: {
					100: 'rgba(0, 0, 0, 0.4)',
					200: 'rgba(256, 256, 256, 0.1)',
					300: 'rgba(256, 256, 256, 0.2)',
				},
			},
			fontSize: {
				hero: [
					'48px',
					{
						letterSpacing: '0.05em;',
						lineHeight: '96px',
					},
				],
			},
			keyframes: {
				slideIn: {
					'0%': {
						transform: 'translateX(0)',
					},
					'100%': {
						transform: 'translateX(-100%)',
					},
				},
				rainbowLight: {
					'0%': {
						backgroundPosition: '0% 50%',
					},
					'50%': {
						backgroundPosition: '100% 50%',
					},
					'100%': {
						backgroundPosition: '0% 50%',
					},
				},
			},
			animation: {
				'slide-in': 'slideIn 0.3s forwards ease-out',
				'rainbow-light': 'rainbowLight 2s linear infinite',
			},
			screens: {
				'3xl': '1600px',
			},
		},
		plugins: [require('@tailwindcss/forms')],
		corePlugins: {},
	},
}

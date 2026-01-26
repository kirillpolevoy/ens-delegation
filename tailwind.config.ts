import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'ens-blue': '#5298FF',
        'ens-purple': '#9333EA',
        'ens-cyan': '#22D3EE',
        'space': {
          900: '#0a0e1a',
          800: '#0f172a',
          700: '#1e293b',
        }
      },
      animation: {
        'shimmer': 'shimmer 3s linear infinite',
        'glow-pulse': 'pulse-glow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'scan': 'scan 8s ease-in-out infinite',
        'holographic': 'holographic-border 8s ease infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        'pulse-glow': {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(82, 152, 255, 0.3), 0 0 40px rgba(82, 152, 255, 0.2)',
          },
          '50%': {
            boxShadow: '0 0 40px rgba(82, 152, 255, 0.5), 0 0 80px rgba(82, 152, 255, 0.3)',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        scan: {
          '0%, 100%': { transform: 'translateY(-100%)' },
          '50%': { transform: 'translateY(100%)' },
        },
        'holographic-border': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backgroundImage: {
        'holographic': 'linear-gradient(135deg, rgba(82, 152, 255, 0.6), rgba(147, 51, 234, 0.4), rgba(34, 211, 238, 0.5), rgba(82, 152, 255, 0.6))',
      },
    },
  },
  plugins: [],
};
export default config;

import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0F172A',
        ground: '#F8FAFC',
        surface: {
          DEFAULT: '#FFFFFF',
          alt: '#F1F5F9',
        },
        primary: {
          DEFAULT: '#037EC4',
          hover: '#0265A1',
          light: '#E0F2FE',
          dark: '#024A78',
        },
        accent: {
          DEFAULT: '#00B8EC',
          hover: '#0096C1',
          light: '#ECFEFF',
        },
        success: {
          DEFAULT: '#059669',
          light: '#ECFDF5',
        },
        danger: {
          DEFAULT: '#DC2626',
          light: '#FEF2F2',
        },
        warning: {
          DEFAULT: '#D97706',
          light: '#FFFBEB',
        },
        secondary: '#475569',
        tertiary: '#94A3B8',
        hairline: {
          DEFAULT: '#CBD5E1',
          light: '#E2E8F0',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', "'Times New Roman'", 'serif'],
        mono: ['var(--font-mono)', "'Courier New'", 'monospace'],
      },
      fontSize: {
        'display': ['clamp(2.5rem, 5vw, 4rem)', { lineHeight: '1.1' }],
        'heading': ['clamp(1.75rem, 3vw, 2.5rem)', { lineHeight: '1.15' }],
        'subheading': ['1.25rem', { lineHeight: '1.3' }],
      },
      borderRadius: {
        sm: '4px',
        DEFAULT: '6px',
        md: '6px',
        lg: '8px',
        xl: '12px',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(26, 31, 43, 0.06)',
        'card-hover': '0 4px 12px rgba(26, 31, 43, 0.08)',
        'elevated': '0 8px 24px rgba(26, 31, 43, 0.12)',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '128': '32rem',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
export default config

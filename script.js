        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Outfit', 'sans-serif'],
                    },
                    colors: {
                        // A more joyful, electric palette
                        accent: {
                            400: '#22d3ee', // Cyan
                            500: '#0ea5e9', // Sky
                            600: '#2563eb', // Blue
                        },
                        joy: {
                            purple: '#a855f7',
                            pink: '#ec4899',
                            orange: '#f97316'
                        },
                        dark: {
                            800: '#0f172a',
                            900: '#020617',
                        }
                    },
                    animation: {
                        'float': 'float 6s ease-in-out infinite',
                        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                        'spin-slow': 'spin 12s linear infinite',
                    },
                    keyframes: {
                        float: {
                            '0%, 100%': { transform: 'translateY(0)' },
                            '50%': { transform: 'translateY(-20px)' },
                        }
                    }
                }
            }
        }
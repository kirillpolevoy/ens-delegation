import { ImageResponse } from 'next/og';

// Image metadata
export const alt = 'ENS Self-Delegation - Activate Your Voting Power';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a0e1a',
          backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(82, 152, 255, 0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.15) 0%, transparent 50%)',
          position: 'relative',
        }}
      >
        {/* Grid pattern overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'linear-gradient(rgba(82, 152, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(82, 152, 255, 0.05) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '40px',
            zIndex: 1,
          }}
        >
          {/* Icon */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '160px',
              height: '160px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(82, 152, 255, 0.3) 0%, rgba(82, 152, 255, 0.1) 50%, transparent 100%)',
            }}
          >
            <svg
              width="80"
              height="100"
              viewBox="0 0 80 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M40 0L60 20H50V50H60L40 100L20 50H30V20H20L40 0Z"
                fill="white"
                stroke="#5298FF"
                stroke-width="4"
              />
            </svg>
          </div>

          {/* Title */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px',
            }}
          >
            <div
              style={{
                fontSize: 72,
                fontWeight: 800,
                color: 'white',
                textAlign: 'center',
                letterSpacing: '-0.02em',
              }}
            >
              ENS Self-Delegation
            </div>
            <div
              style={{
                fontSize: 36,
                fontWeight: 500,
                color: 'rgba(255, 255, 255, 0.7)',
                textAlign: 'center',
              }}
            >
              Activate Your Voting Power
            </div>
          </div>

          {/* Decorative line */}
          <div
            style={{
              width: '400px',
              height: '3px',
              background: 'linear-gradient(90deg, #5298FF 0%, #9333EA 50%, #22D3EE 100%)',
              borderRadius: '2px',
            }}
          />

          {/* URL */}
          <div
            style={{
              fontSize: 24,
              fontWeight: 500,
              color: 'rgba(82, 152, 255, 0.8)',
              fontFamily: 'monospace',
            }}
          >
            ens-delegate.kirillpolevoy.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

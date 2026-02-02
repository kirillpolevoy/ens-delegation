import { ImageResponse } from 'next/og';

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0f172a',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          borderRadius: '6px',
          overflow: 'hidden',
        }}
      >
        {/* Holographic border */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, #5298FF, #9333EA, #22D3EE, #5298FF)',
            padding: '2px',
            borderRadius: '6px',
            display: 'flex',
          }}
        >
          <div
            style={{
              background: '#0f172a',
              flex: 1,
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Vote checkmark icon */}
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
                fill="url(#gradient)"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#5298FF' }} />
                  <stop offset="100%" style={{ stopColor: '#22D3EE' }} />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

import { ImageResponse } from 'next/og';

// Image metadata
export const alt = 'Turn Your ENS Into Votes - ENS Governance';
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
          backgroundColor: '#0f172a',
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(82, 152, 255, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(147, 51, 234, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(34, 211, 238, 0.15) 0%, transparent 60%)
          `,
          position: 'relative',
        }}
      >
        {/* Cyber grid pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(82, 152, 255, 0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(82, 152, 255, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
            opacity: 0.6,
          }}
        />

        {/* Scan line effect */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: 'linear-gradient(90deg, transparent, rgba(82, 152, 255, 0.8), transparent)',
            transform: 'translateY(200px)',
          }}
        />

        {/* Content container */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '48px',
            zIndex: 1,
            padding: '80px',
          }}
        >
          {/* Main headline */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '24px',
            }}
          >
            <div
              style={{
                fontSize: 84,
                fontWeight: 800,
                color: 'white',
                textAlign: 'center',
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
              }}
            >
              Turn Your ENS
            </div>
            <div
              style={{
                fontSize: 84,
                fontWeight: 800,
                background: 'linear-gradient(135deg, #5298FF 0%, #9333EA 50%, #22D3EE 100%)',
                backgroundClip: 'text',
                color: 'transparent',
                textAlign: 'center',
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
              }}
            >
              Into Votes
            </div>
          </div>

          {/* Subheadline */}
          <div
            style={{
              fontSize: 32,
              fontWeight: 500,
              color: 'rgba(203, 213, 225, 0.9)',
              textAlign: 'center',
              maxWidth: '700px',
            }}
          >
            Own ENS tokens? That means you get a vote.
          </div>

          {/* Holographic decorative bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginTop: '20px',
            }}
          >
            <div
              style={{
                width: '120px',
                height: '4px',
                background: 'linear-gradient(90deg, transparent, #5298FF)',
                borderRadius: '2px',
              }}
            />
            <div
              style={{
                padding: '12px 32px',
                background: 'rgba(82, 152, 255, 0.1)',
                border: '2px solid rgba(82, 152, 255, 0.3)',
                borderRadius: '12px',
                fontSize: 20,
                fontWeight: 600,
                color: '#5298FF',
                fontFamily: 'monospace',
              }}
            >
              ENS Governance
            </div>
            <div
              style={{
                width: '120px',
                height: '4px',
                background: 'linear-gradient(90deg, #22D3EE, transparent)',
                borderRadius: '2px',
              }}
            />
          </div>
        </div>

        {/* Corner accents */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle at 0% 0%, rgba(82, 152, 255, 0.3), transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle at 100% 100%, rgba(147, 51, 234, 0.3), transparent 70%)',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}

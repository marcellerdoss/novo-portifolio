import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Marcelle Rocha | Produto estratégico';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#ffffff',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: '#C8236A',
          }}
        />

        <p
          style={{
            fontSize: 72,
            fontWeight: 600,
            color: '#131226',
            letterSpacing: '-1px',
            margin: 0,
          }}
        >
          Marcelle Rocha
        </p>

        <p
          style={{
            fontSize: 32,
            fontWeight: 400,
            color: '#808080',
            margin: 0,
            letterSpacing: '0.5px',
          }}
        >
          Produto estratégico
        </p>
      </div>
    ),
    { ...size },
  );
}

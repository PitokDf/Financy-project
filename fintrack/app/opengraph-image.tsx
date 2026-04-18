import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'FinTrack App Preview'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #065f46, #10b981)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '24px 48px',
            borderRadius: '24px',
            marginBottom: '40px',
          }}
        >
          <h1
            style={{
              fontSize: 84,
              color: 'white',
              margin: 0,
              fontWeight: 800,
              letterSpacing: '-2px',
            }}
          >
            FinTrack
          </h1>
        </div>
        <p
          style={{
            fontSize: 42,
            color: 'white',
            margin: 0,
            fontWeight: 500,
            textAlign: 'center',
            maxWidth: '800px',
            opacity: 0.9,
          }}
        >
          Manajemen Keuangan Pribadi dengan Klasterisasi AI
        </p>
      </div>
    ),
    {
      ...size,
    }
  )
}

import { UNDP_CLIENT_DATA } from '@/data';
import logger from "@/logger";
import { ImageResponse } from '@vercel/og';
import fs from 'node:fs';
import path from 'node:path';
import React from 'react';

async function generateImages() {
  const outputDir = path.join(process.cwd(), 'src/components/templates/images/og')

  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  // Generate default image
  const defaultImage = new ImageResponse(
    React.createElement(
      'div',
      {
        style: {
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0468B1',
          padding: '40px',
        },
      },
      React.createElement(
        'div',
        {
          style: {
            display: 'flex',
            fontSize: 60,
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '20px',
            textAlign: 'center',
          },
        },
        'UNDP AI Co-pilot'
      )
    ),
    {
      width: 1200,
      height: 630,
    }
  )

  const defaultBuffer = await defaultImage.arrayBuffer()
  fs.writeFileSync(path.join(outputDir, 'default.png'), Buffer.from(defaultBuffer))

  // Generate images for each client
  for (const client of UNDP_CLIENT_DATA) {
    const image = new ImageResponse(
      React.createElement(
        'div',
        {
          style: {
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0468B1',
            padding: '40px',
          },
        },
        [
          React.createElement(
            'div',
            {
              key: 'title',
              style: {
                display: 'flex',
                fontSize: 60,
                fontWeight: 'bold',
                color: 'white',
                marginBottom: '20px',
                textAlign: 'center',
              },
            },
            client.name
          ),
          React.createElement(
            'div',
            {
              key: 'subtitle',
              style: {
                fontSize: 30,
                color: 'white',
                textAlign: 'center',
              },
            },
            'UNDP AI Co-pilot'
          ),
        ]
      ),
      {
        width: 1200,
        height: 630,
      }
    )

    const buffer = await image.arrayBuffer()
    fs.writeFileSync(path.join(outputDir, `${client.subdomain}.png`), Buffer.from(buffer))
  }

  logger.lug('Generated OG preview images in src/components/templates/images/og/')
}

generateImages().catch(console.error) 
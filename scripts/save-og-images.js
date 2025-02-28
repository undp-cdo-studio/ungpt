const fs = require('node:fs')
const path = require('node:path')
const http = require('node:http')

const outputDir = path.join(process.cwd(), 'public/og')

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

// Function to save base64 image
function saveBase64Image(base64Data, filename) {
  const buffer = Buffer.from(base64Data, 'base64')
  fs.writeFileSync(path.join(outputDir, filename), buffer)
  logger.lug(`Saved ${filename}`)
}

// Make request to preview endpoint
http.get('http://localhost:4208/api/og/preview/', (res) => {
  let data = ''

  res.on('data', (chunk) => {
    data += chunk
  })

  res.on('end', () => {
    try {
      const response = JSON.parse(data)
      
      // Save default image
      saveBase64Image(response.default, 'default.png')

      // Save client images
      for (const client of response.clients) {
        saveBase64Image(client.imageData, `${client.subdomain}.png`)
      }

      logger.lug('All images saved successfully!')
    } catch (error) {
      console.error('Error saving images:', error)
      if (data) {
        console.error('Response data:', data)
      }
    }
  })
}).on('error', (error) => {
  console.error('Error making request:', error)
}) 
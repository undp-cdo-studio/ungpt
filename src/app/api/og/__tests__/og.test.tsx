import { UNDP_CLIENT_DATA } from '@/data'
import '@testing-library/jest-dom'
import { NextRequest } from 'next/server'
import { GET } from '../route'

// Mock NextRequest
jest.mock('next/server', () => ({
  NextRequest: jest.fn().mockImplementation((url) => {
    const parsedUrl = new URL(url)
    return {
      url,
      nextUrl: {
        searchParams: parsedUrl.searchParams
      }
    }
  })
}))

describe('OpenGraph Image API', () => {
  const mockRequest = (subdomain: string | null) => {
    const url = new URL('https://test.com')
    if (subdomain) {
      url.searchParams.set('subdomain', subdomain)
    }
    return new NextRequest(url.toString())
  }

  interface JSXElement {
    props?: {
      children?: JSXElement | JSXElement[] | string;
    };
  }

  const extractTextContent = (element: JSXElement | string | undefined): string => {
    if (typeof element === 'string') return element
    if (!element || !element.props) return ''
    if (Array.isArray(element.props.children)) {
      return element.props.children.map(child => extractTextContent(child)).join('')
    }
    return extractTextContent(element.props.children)
  }

  it('should generate a default image with platform title', async () => {
    const response = await GET(mockRequest(null))
    
    expect(response.status).toBe(200)
    expect(response.headers.get('content-type')).toBe('image/png')
    
    // Verify the mock response contains the correct title
    const mockImageResponse = jest.requireMock('@vercel/og').ImageResponse.mock.calls[0][0]
    const textContent = extractTextContent(mockImageResponse)
    expect(textContent).toBe('UNDP AI Co-pilot Platform')
  })

  it('should generate an image response with correct client name', async () => {
    const validClient = UNDP_CLIENT_DATA[0] // Ethics Co-pilot
    const response = await GET(mockRequest(validClient.subdomain))
    
    expect(response.status).toBe(200)
    expect(response.headers.get('content-type')).toBe('image/png')
    
    // Verify the mock response contains the correct client name
    const mockImageResponse = jest.requireMock('@vercel/og').ImageResponse.mock.calls[1][0]
    const textContent = extractTextContent(mockImageResponse)
    expect(textContent).toContain(validClient.name)
    expect(textContent).toContain('UNDP AI Co-pilot')
  })

  it('should return 404 for invalid subdomain', async () => {
    const response = await GET(mockRequest('invalid-subdomain'))
    
    expect(response.status).toBe(404)
    expect(await response.text()).toBe('Subdomain not found')
  })

  it('should generate images for all clients with correct names', async () => {
    for (const client of UNDP_CLIENT_DATA) {
      const response = await GET(mockRequest(client.subdomain))
      
      expect(response.status).toBe(200)
      expect(response.headers.get('content-type')).toBe('image/png')
      
      // Get the last mock call for this iteration
      const mockCalls = jest.requireMock('@vercel/og').ImageResponse.mock.calls
      const lastCall = mockCalls[mockCalls.length - 1]
      const textContent = extractTextContent(lastCall[0])
      
      // Verify the client name and subtitle are present
      expect(textContent).toContain(client.name)
      expect(textContent).toContain('UNDP AI Co-pilot')
    }
  })

  it('should handle errors gracefully', async () => {
    // Mock NextRequest to throw an error
    const mockNextRequest = NextRequest as jest.Mock
    mockNextRequest.mockImplementationOnce(() => ({
      nextUrl: {
        searchParams: {
          get: () => { throw new Error('Search params error') }
        }
      }
    }))

    const response = await GET(mockRequest('any'))
    
    expect(response.status).toBe(500)
    expect(await response.text()).toBe('Failed to generate image')

    // Restore original implementation
    mockNextRequest.mockRestore()
  })
}) 
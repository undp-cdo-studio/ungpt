import '@testing-library/jest-dom';
import { ReadableStream, TransformStream } from 'node:stream/web';
import { TextDecoder, TextEncoder } from 'node:util';

// Mock TextEncoder/TextDecoder
global.TextEncoder = TextEncoder as typeof global.TextEncoder;
global.TextDecoder = TextDecoder as typeof global.TextDecoder;

// Mock ReadableStream and TransformStream
global.ReadableStream = ReadableStream as unknown as typeof global.ReadableStream;
global.TransformStream = TransformStream as unknown as typeof global.TransformStream;

// Mock NextRequest
const originalURL = global.URL;
class MockURL extends originalURL {
  constructor(url: string | URL, base?: string | URL) {
    if (typeof url === 'string' && !url.startsWith('http')) {
      const newUrl = `http://localhost${url}`;
      super(newUrl, base);
    } else {
      super(url, base);
    }
  }
}
global.URL = MockURL as typeof URL;

// Mock Headers
class MockHeaders {
  private headers: Map<string, string>;

  constructor(init?: Record<string, string>) {
    this.headers = new Map(Object.entries(init || {}));
  }

  append(key: string, value: string) {
    this.headers.set(key, value);
  }

  get(key: string) {
    return this.headers.get(key) || null;
  }

  set(key: string, value: string) {
    this.headers.set(key, value);
  }

  has(key: string) {
    return this.headers.has(key);
  }
}
global.Headers = MockHeaders as unknown as typeof Headers;

// Mock Request
class MockRequest {
  private _url: string;
  method: string;
  headers: Headers;
  body: string | null;

  constructor(input: string | Request, init?: RequestInit) {
    if (typeof input === 'string') {
      this._url = input;
    } else {
      this._url = input.url;
    }
    this.method = init?.method || 'GET';
    this.headers = new Headers(init?.headers);
    this.body = init?.body as string || null;
  }

  get url() {
    return this._url;
  }

  async json() {
    return this.body ? JSON.parse(this.body) : null;
  }
}
global.Request = MockRequest as unknown as typeof Request;

// Mock Response
class MockResponse {
  status: number;
  headers: Headers;
  body: string | null;

  constructor(body?: BodyInit | null, init?: ResponseInit) {
    this.status = init?.status || 200;
    this.headers = new Headers(init?.headers);
    this.body = body as string || null;
  }

  async json() {
    return this.body ? JSON.parse(this.body) : null;
  }
}
global.Response = MockResponse as unknown as typeof Response;

// Add missing Node.js functions
const noop = () => {};
noop.__promisify__ = noop;
global.setImmediate = noop as unknown as typeof setImmediate;
global.clearImmediate = (() => {}) as unknown as typeof clearImmediate; 
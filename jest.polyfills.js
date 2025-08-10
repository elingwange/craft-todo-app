// jest.polyfills.js
// 为 jsdom 环境提供 TextEncoder 和 TextDecoder 的 polyfill
import { TextEncoder, TextDecoder } from 'util';

if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder;
}
if (typeof global.TextDecoder === 'undefined') {
  global.TextDecoder = TextDecoder;
}

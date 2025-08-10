const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  // `setupFiles` 在测试框架加载前执行，适合用于全局 polyfill
  setupFiles: ['<rootDir>/jest.polyfills.js'],
  // `setupFilesAfterEnv` 在测试环境加载后执行，适合用于 Jest 扩展配置
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  modulePathIgnorePatterns: ['<rootDir>/node_modules'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  transform: {
    // 使用 ts-jest 转换 ts/tsx 文件
    '^.+\\.(ts|tsx)$': 'ts-jest',
    // 使用 babel-jest 转换 js/jsx 文件
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  // 确保 Jest 不忽略 nanoid 和 lucide-react 模块
  transformIgnorePatterns: [
    // 排除 nanoid 和 lucide-react，但仍然忽略其他 node_modules
    '/node_modules/(?!(nanoid|lucide-react)/)',
  ],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);

console.log('------- Jest config loaded!');

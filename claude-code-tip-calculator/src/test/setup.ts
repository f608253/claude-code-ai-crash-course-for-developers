import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

import '@testing-library/jest-dom/vitest'

// Unmount rendered components between tests so state and the DOM don't leak.
afterEach(() => {
  cleanup()
})
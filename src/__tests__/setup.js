import { afterAll, afterEach, beforeAll, expect, vi } from "vitest"
import matchers from "@testing-library/jest-dom/matchers"
import { server } from "../__mocks__/server"
import { cleanup } from "@testing-library/react"

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers)

// API mocking before all tests
beforeAll(() => {
  vi.mock(async (importOriginal) => {
    const mod = await importOriginal()
    Object.keys(mod.url).forEach(() => {
      "http://localhost:3000"
    })
    return {
      ...mod,
    }
  })
  server.listen()
})

// Reset any handlers
afterEach(() => {
  cleanup()
  server.resetHandlers()
})

// clean up after the tests are finished
afterAll(() => server.close())

export { server as mswServer }

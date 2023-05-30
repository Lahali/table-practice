import { render, screen } from "@testing-library/react"
import App from "../App"
import { describe, expect, it } from "vitest"

describe("Main page", () => {
  it("Renders correctly", () => {
    render(<App />)

    expect(screen.getByText(/Colored rows/)).toBeInTheDocument()
  })
})

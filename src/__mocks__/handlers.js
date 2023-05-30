import { rest } from "msw"

const apiUrl = "https://randomuser.me/api/?results=100"
export const handlers = [
  rest.get(apiUrl, (req, res, ctx) => res(ctx.status(200))),
]

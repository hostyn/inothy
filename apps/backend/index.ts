import { type inferRouterInputs, type inferRouterOutputs } from '@trpc/server'

import { type AppRouter } from './src/root'

export { appRouter, type AppRouter } from './src/root'
export { createInnerTRPCContext } from './src/trpc'

export type RouterInputs = inferRouterInputs<AppRouter>

export type RouterOutputs = inferRouterOutputs<AppRouter>

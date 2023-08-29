import { createTRPCRouter } from '../trpc'
import { publicProcedure } from '../procedures'

export const documentRouter = createTRPCRouter({
  getDocumentTypes: publicProcedure.query(async ({ ctx }) => {
    const documentTypes = await ctx.prisma.documentType.findMany()
    return documentTypes
  }),
})

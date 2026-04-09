import NextAuth from 'next-auth'

const isPublicShowcaseDeployment = Boolean(process.env.VERCEL)

export async function GET(request: Request, context: unknown) {
  if (isPublicShowcaseDeployment) {
    return Response.json(null)
  }

  const { authOptions } = await import('@/lib/auth')
  const nextAuthHandler = NextAuth(authOptions)

  const { ensureRuntimeAuthBootstrap } = await import('@/lib/auth-bootstrap')
  await ensureRuntimeAuthBootstrap().catch(() => null)

  return nextAuthHandler(request, context)
}

export async function POST(request: Request, context: unknown) {
  if (isPublicShowcaseDeployment) {
    return Response.json({ error: 'Auth non disponibile nella preview pubblica' }, { status: 503 })
  }

  const { authOptions } = await import('@/lib/auth')
  const nextAuthHandler = NextAuth(authOptions)

  const { ensureRuntimeAuthBootstrap } = await import('@/lib/auth-bootstrap')
  await ensureRuntimeAuthBootstrap().catch(() => null)

  return nextAuthHandler(request, context)
}

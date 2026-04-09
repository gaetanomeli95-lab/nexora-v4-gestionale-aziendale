import { redirect } from 'next/navigation'

const isPublicShowcaseDeployment = Boolean(process.env.VERCEL)

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  if (isPublicShowcaseDeployment) {
    redirect('/auth/signin')
  }

  const [{ getServerSession }, { authOptions }, { default: LayoutWithNav }] = await Promise.all([
    import('next-auth'),
    import('@/lib/auth'),
    import('@/app/layout-with-nav'),
  ])

  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/signin?error=SessionRequired')
  }

  return <LayoutWithNav>{children}</LayoutWithNav>
}

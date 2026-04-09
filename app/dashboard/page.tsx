import { redirect } from 'next/navigation'

const isPublicShowcaseDeployment = Boolean(process.env.VERCEL)

export default function DashboardPage() {
  redirect(isPublicShowcaseDeployment ? '/auth/signin' : '/dashboard-real')
}

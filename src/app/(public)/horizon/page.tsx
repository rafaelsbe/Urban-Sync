import { Company } from '@/types/company'
import { Metadata } from 'next'
import { companies } from '@/lib/data'
import CompanyPage from '@/components/ui/horizon'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'


export default function horizonpage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-8">Horizon - Soluções de Iluminação</h1>
      <CompanyPage params={{ slug: 'horizon' }} />
    company={companies.find((item) => item.slug === 'horizon') as Company}  
    </div>
  )
}
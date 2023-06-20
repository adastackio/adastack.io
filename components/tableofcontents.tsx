import Link from 'next/link'
import Head from 'next/head'
import type { NextraThemeLayoutProps } from 'nextra'
 
export default function TableOfContents({ pageOpts }: NextraThemeLayoutProps) { 
  const { title } = pageOpts 
  console.log(title);
  
  return (
    <div>
      <h1>{title}</h1>
    </div>
  )
}


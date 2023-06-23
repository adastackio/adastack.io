import type { NextraThemeLayoutProps } from 'nextra'
 
export default function TableOfContents({ pageOpts }: NextraThemeLayoutProps) { 
  const { title } = pageOpts 
  console.log("Title:", title);
  console.log("pageOpts:", pageOpts);
  
  return (
    <div>
      <h1>{title}</h1>
    </div>
  )
}


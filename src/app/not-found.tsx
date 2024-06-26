import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div>
      <h2>User Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/admin">Return admin home</Link>
    </div>
  )
}
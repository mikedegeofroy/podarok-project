import Link from 'next/link'
import toast from 'react-hot-toast'
import Box from '../components/box'

export default function Home() {
  return (
    <div className="grid place-items-center h-screen">
      {/* <button onClick={() => {toast.success("Clicked")}}>Click Me!</button> */}
      <div>
        <Link href="/setup"><a>Send</a></Link>
        <Link href="/setup"><a>Recieve</a></Link>
      </div>
      {/* Here I should have two buttons, one to recive, another one to send */}
      {/* <Link href="/setup"><a className="text-black">Recieve</a></Link> */}
    </div>
  )
}

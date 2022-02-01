import Link from 'next/link'
import { useEffect } from 'react'
import toast from 'react-hot-toast'


export default function Home() {

  return (
    <div>
      <div className="grid place-items-center">
        {/* <button onClick={() => {toast.success("Clicked")}}>Click Me!</button> */}
        <div className="flex flex-row justify-center pt-16">
          <video controls={false} playsInline autoPlay muted loop className="lg:w-1/2 sm:w-2/3 xs:w-full">
            <source src="/background-video.mp4" type="video/mp4" />
          </video>
        </div>
        <div>
          <Link href="/setup"><a className="p-3">Send</a></Link>
          <Link href="/setup"><a className="p-3">Recieve</a></Link>
        </div>
        {/* Here I should have two buttons, one to recive, another one to send */}
        {/* <Link href="/setup"><a className="text-black">Recieve</a></Link> */}
      </div>
    </div>
  )
}

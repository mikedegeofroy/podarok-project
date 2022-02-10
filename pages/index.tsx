import Link from 'next/link'
import { useContext } from 'react'
import { UserContext } from '../lib/context'


export default function Home() {

  const { user } = useContext(UserContext)

  let redirect = "/login"

  if(user){
   redirect = "/dashboard"
  }

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
          <Link href={redirect}><a className="p-2 m-5">Wish a present</a></Link>
          <Link href="/"><a className="p-2 m-5">Send a present</a></Link>
        </div>
        {/* Here I should have two buttons, one to recive, another one to send */}
        {/* <Link href="/setup"><a className="text-black">Recieve</a></Link> */}
      </div>
    </div>
  )
}

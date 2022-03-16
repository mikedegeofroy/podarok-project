import Link from 'next/link'
import { useContext } from 'react'
import { UserContext } from '../lib/context'
import Image from 'next/image'


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
          <Link href="/send"><a className="p-2 m-5 text-2xl md:text-4xl">Send a present</a></Link>
          <Link href={redirect}><a className="p-2 m-5 text-2xl md:text-4xl">Wish a present</a></Link>
        </div>
        <br />
        {/* Here I should have two buttons, one to recive, another one to send */}
        {/* <Link href="/setup"><a className="text-black">Recieve</a></Link> */}
        {/* <h1 className='text-4xl'>About the project</h1>
        <br /> */}
        {/* <div className='grid gap-4 auto-cols-max	w-min'>
          <div className='col-span-2'>
            <Image src={'/comic1.png'} height="356px" width="760px"></Image>
          </div>
          <div className='col-span-1 w-full'>
            <Image src={'/comic2.png'} height="319px" width="240px"></Image>
          </div>
          <div className='col-span-1 w-full'>
            <Image src={'/comic2.png'} height="319px" width="240px"></Image>
          </div>
        </div> */}
        <div className='grid grid-cols-2 gap-5'>
          <div className='grid place-items-center'>
            <Image src={'/boy.png'} height="139px" width="65px"/>
            <p>@mikedegeofroy</p>
          </div>
          <div className='grid place-items-center'>
            <Image src={'/girl.png'} height="139px" width="65px"/>
            <p>@polunovsskaya</p>
          </div>

        </div>
      </div>
    </div>
  )
}

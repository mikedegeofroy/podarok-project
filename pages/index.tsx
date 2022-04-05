import Link from 'next/link'
import { useContext } from 'react'
import { UserContext } from '../lib/context'
import Image from 'next/image'


export default function Home() {

  const { user } = useContext(UserContext)

  let redirect = "/login"

  if (user) {
    redirect = "/dashboard"
  }

  return (
    <div>
      {/* <button onClick={() => {toast.success("Clicked")}}>Click Me!</button> */}
      <div className="flex flex-row justify-center pt-16">
        <video controls={false} playsInline autoPlay muted loop className="lg:w-1/4 sm:w-2/6 w-1/2">
          <source src="/animations/background-video.mp4" type="video/mp4" />
        </video>
      </div>
      <div className='px-10 py-5'>
        <h1 className="text-4xl font-medium text-center font-['Kuku']">Участвовать</h1>
        <div className='text-center grid grid-cols-2'>
          <Link href="/send"><a className="text-center p-2 m-5 text-2xl md:text-3xl font-['Kuku']">Послать Поадрок</a></Link>
          <Link href={redirect}><a className="text-center p-2 m-5 text-2xl md:text-3xl font-['Kuku']">Пожелать Подарок</a></Link>
        </div>
      </div>
      <div className='object-top w-full overflow-hidden'>
        <div className='animate-bounceSlow'>
          <div className='pt-4 scale-150 md:scale-110'>
            <Image src={'/images/les1.png'} height="997px" width="7111px"></Image>
            {/* <Image src={'/les1.png'} height="1805px" width="7513px"></Image> */}
          </div>
        </div>
      </div>
      {/* About Comic */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-10 py-10'>
        <div className='col-span-1 lg:col-span-2 p-2'>
          <h1 className="text-4xl font-medium font-['Kuku']">Про наш проект</h1>
          <p className='text-justify md:text-left'>А тут должны быть несколько строчек про то, какой это крутой проект.</p>
        </div>
        <div className='col-span-1 p-2'>
          <div className='grid gap-4 grid-cols-6 auto-cols-max w-fit mx-auto'>
            <div className='col-span-6 w-full flex'>
              <Image src={'/images/comic1.png'} height="356px" width="760px"></Image>
            </div>
            <div className='col-span-2 w-full flex'>
              <Image src={'/images/comic2.png'} height="319px" width="240px"></Image>
            </div>
            <div className='col-span-2 w-full flex'>
              <Image src={'/images/comic3.png'} height="319px" width="240px"></Image>
            </div>
            <div className='col-span-2 w-full flex'>
              <Image src={'/images/comic4.png'} height="319px" width="240px"></Image>
            </div>
            <div className='col-span-3 w-full flex'>
              <Image src={'/images/comic5.png'} height="495px" width="495px"></Image>
            </div>
            <div className='col-span-3 w-full flex'>
              <Image src={'/images/comic6.png'} height="495px" width="495px"></Image>
            </div>
          </div>
        </div>
      </div>
      <div className='object-top w-full overflow-hidden py-5'>
        <div className='scale-150 md:scale-110'>
          <Image src={'/images/les3.png'} height="1107px" width="7527px"></Image>
        </div>
      </div>
      {/* End of comic */}
      <div className='grid grid-cols-2 w-fit gap-5 mx-auto py-5'>
        <div className='grid place-items-center'>
          <Image src={'/images/mike.png'} height="139px" width="65px" />
          <p>@mikedegeofroy</p>
        </div>
        <div className='grid place-items-center'>
          <Image src={'/images/sonya.png'} height="139px" width="65px" />
          <p>@polunovsskaya</p>
        </div>
      </div>
    </div>
  )
}

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
          <source src="/background-video.mp4" type="video/mp4" />
        </video>
      </div>
      <div className='object-botton object-top scale-150 md:scale-110 h-[30vh] w-full overflow-hidden'>
        <div className='pt-5 animate-bounceSlow'>
          <Image src={'/background1.png'} height="2831px" width="7686px"></Image>
        </div>
      </div>
      <br />
      <div className='px-10 pt-10 pb-5'>
        <h1 className='text-4xl font-medium text-center'>Участвовать</h1>
        <div className='text-center grid grid-cols-2'>
          <Link href="/send"><a className="p-2 m-5 text-2xl md:text-3xl">Послать Поадрок</a></Link>
          <Link href={redirect}><a className="p-2 m-5 text-2xl md:text-3xl">Пожелать Подарок</a></Link>
        </div>
      </div>
      {/* About Comic */}
      <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 px-10 py-5'>
        <div>
          <h1 className='text-4xl font-medium'>Про наш проект</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. A, laborum facilis vero recusandae nihil est error nulla saepe culpa ab consequuntur quae deserunt molestiae eum tempora dolorum atque iure laudantium rem, beatae mollitia cumque corporis ducimus fugiat. Necessitatibus, molestias. Ducimus magni quo natus est inventore? Ducimus nostrum amet nesciunt ipsam minima similique quibusdam voluptatem, dignissimos corporis, soluta dolorum aut sunt in dolores tempore quo, quidem laboriosam corrupti maxime expedita eius. Blanditiis quam sequi ad minus ducimus voluptatem id cum quisquam eaque, rem cupiditate at dolorum quo laborum nulla, dolor facilis eos earum minima a magnam adipisci. Voluptate quae laboriosam quas voluptatum labore unde quibusdam cumque aspernatur? Sequi quia provident iusto nisi eaque eum, culpa deleniti officia reprehenderit suscipit ex, et officiis ipsum consectetur inventore voluptas.</p>
        </div>
        <div>
          <div className='grid gap-4 grid-cols-6 auto-cols-max w-fit mx-auto'>
            <div className='col-span-6'>
              <Image src={'/comic1.png'} height="356px" width="760px"></Image>
            </div>
            <div className='col-span-2 w-full'>
              <Image src={'/comic2.png'} height="319px" width="240px"></Image>
            </div>
            <div className='col-span-2 w-full'>
              <Image src={'/comic3.png'} height="319px" width="240px"></Image>
            </div>
            <div className='col-span-2 w-full'>
              <Image src={'/comic4.png'} height="319px" width="240px"></Image>
            </div>
            <div className='col-span-3 w-full'>
              <Image src={'/comic5.png'} height="495px" width="495px"></Image>
            </div>
            <div className='col-span-3 w-full'>
              <Image src={'/comic6.png'} height="495px" width="495px"></Image>
            </div>
          </div>
        </div>
      </div>
      {/* End of comic */}
      <br />
      <div className='grid grid-cols-2 w-fit gap-5 mx-auto'>
        <div className='grid place-items-center'>
          <Image src={'/boy.png'} height="139px" width="65px" />
          <p>@mikedegeofroy</p>
        </div>
        <div className='grid place-items-center'>
          <Image src={'/girl.png'} height="139px" width="65px" />
          <p>@polunovsskaya</p>
        </div>
      </div>
    </div>
  )
}

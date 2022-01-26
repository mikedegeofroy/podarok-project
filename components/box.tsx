export default function Box({children}){
    return(
    <div className='w-max h-max p-6 shadow-lg rounded-lg bg-white'>
        {children}
    </div>
    )
}
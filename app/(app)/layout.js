import ProfileCard from '../components/ProfileCard'

export default async function layout({ children }) {
  return (
    <main className='flex min-h-screen lg:h-full  w-full  background-linear justify-around lg:justify-between overflow-hidden '>
      <div className='flex flex-col lg:max-w-full lg:flex-row gap-2 md:h-screen lg:justify-center lg:items-center md:overflow-scroll  md:px-4 '>
        <ProfileCard />
        {children}
      </div>
    </main>
  )
}

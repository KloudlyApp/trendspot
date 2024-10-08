import ProfileCard from '../components/ProfileCard'

export default async function layout({ children }) {
  return (
    <main className='min-h-screen lg:h-full w-full background-linear overflow-hidden '>
      <div className='flex flex-col lg:w-full lg:flex-row gap-2 md:h-screen lg:justify-between md:overflow-y-scroll'>
        <ProfileCard />
        {children}
      </div>
    </main>
  )
}

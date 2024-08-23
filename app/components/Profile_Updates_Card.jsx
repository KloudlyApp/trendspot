import React from 'react'
import Profile from './Profile'
import Updates from './Updates'

function Profile_Updates_Card() {
  // Any weird behaviour, add height to parent
  return (
    <div className=' mx-auto bg-gradient-to-b rounded-lg from-black from-80% to-[#857fff] via-40% min-w-[370px] lg:from-black md:from-80%  lg:from-80% lg:via-20% lg:to-[#857fff] w-[80vw] md:w-screen max-w-[800px] flex flex-col md:flex-row  l g:py-12 items-center justify-around shadow-[#7a8eff5e] shadow-lg  lg:flex-col lg:mt-0 lg:w-20 md:pb-8 item-center  md:justify-evenly  lg:h-[95%] lg:gap-0 lg:m-4 lg:pb-12  lg:rounded-xl lg:overflow-scroll md:mt-4 md:rounded-md gap-6  pb-6'>
      <Profile />
      <div className=' md:mt-14 flex justify-center items-center lg:mb-3   '>
        <Updates />
      </div>
    </div>
  )
}

export default Profile_Updates_Card

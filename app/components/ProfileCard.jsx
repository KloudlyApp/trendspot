import React from 'react'
import Profile from './Profile'
import Updates from './Updates'

function ProfileCard() {
  const backgroundGradient =
    'bg-gradient-to-b from-black from-80% to-[#857fff] via-40% lg:from-black md:from-80% lg:from-80% lg:via-20% lg:to-[#857fff]'
  const flexLayout =
    'flex flex-col gap-6 justify-evenly items-center md:flex-row md:gap-0 lg:flex-col'
  const cornersAndShadow =
    'rounded-xl shadow-[0.18px_0.3px_1.75px_-0.58px_rgba(122,142,255,0.37),0.68px_1.14px_6.67px_-1.16px_rgba(122,142,255,0.42),3px_5px_29.15px_-1.75px_rgba(122,142,255,0.65)]'
  const widthAndHeight =
    'w-[80vw] min-w-[390px] max-w-[800px] md:w-[90vw] lg:w-20 lg:h-[calc(100vh-4rem)] lg:min-h-[850px]'
  const marginAndPadding = 'mx-auto mt-4 pb-6 md:pb-10 lg:m-4 lg:mt-8 lg:pt-2'
  return (
    <div
      className={`${backgroundGradient} ${flexLayout} ${cornersAndShadow} ${widthAndHeight} ${marginAndPadding} lg:sticky lg:top-8`}
    >
      <Profile />
      <div className=' md:mt-14 flex justify-center items-center lg:mb-3'>
        <Updates />
      </div>
    </div>
  )
}

export default ProfileCard

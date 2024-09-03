import { Button } from '@/components/ui/button'
import { FaDiscord } from 'react-icons/fa'

export default function Login() {
  const backgroundGradient =
    'bg-gradient-to-b from-black from-80% to-[#857fff] via-40% lg:from-black md:from-80% lg:from-80% lg:via-20% lg:to-[#857fff]'
  const flexLayout =
    'flex flex-col gap-6 justify-evenly items-center md:flex-row md:gap-0 lg:flex-col'
  const cornersAndShadow = 'rounded-xl shadow-[#7a8eff5e] shadow-lg'
  const widthAndHeight =
    'w-[80vw] min-w-[390px] max-w-[800px] md:w-[90vw] lg:w-20 lg:h-[calc(100vh-4rem)] lg:min-h-[850px]'
  const marginAndPadding = 'mx-auto mt-4 pb-6 md:pb-10 lg:m-4 lg:mt-8 lg:pt-2'

  return (
    <main className='min-h-screen lg:h-full w-full background-linear overflow-hidden '>
      <div className='flex flex-col lg:w-full lg:flex-row gap-2 h-screen lg:justify-between md:overflow-y-scroll'>
        <div
          className={`${backgroundGradient} ${flexLayout} ${cornersAndShadow} ${widthAndHeight} ${marginAndPadding} lg:sticky lg:top-8`}
        >
          <div className='flex items-center flex-col gap-4  md:px-2  lg:px-4 mt-2 lg:h-fit '>
            <img
              src='./images/word_logo.svg'
              alt='Trendspot Logo'
              className='object-cover h-10 w-64 mt-10 md:mt-8 lg:mt-8'
            />
            <div className='object-cover bg-[#857FFF] rounded-full w-14 h-14 md:rounded-xl md:w-1/2 md:h-[150px] mt-6 md:flex items-center justify-center'></div>

            <p className='font-bold text-white text-wrap w-3/4 text-center'>
              Welcome to Trendspot!
            </p>

            <div className='flex gap-2 mt-6'>
              <a
                href='https://discord.gg/wvcdtfXAZ2'
                target='_blank'
                rel='noopener noreferrer'
              >
                <Button variant='default'>
                  <FaDiscord className='mr-2' size={20} /> Discord
                </Button>
              </a>
            </div>
          </div>
        </div>
        <div className='mt-6 lg:mt-0 h-[50%] lg:w-[calc(100vw-28rem)] px-2 lg:h-screen flex flex-col gap-10 place-content-center place-items-center'>
          <h1 className='text-[#857FFF] text-4xl font-bold text-center'>
            Please log in
          </h1>
          <a
            href={`https://whop.com/hub/${process.env.WHOP_APP_URL_SLUG}/app/`}
          >
            <Button variant='active'>Open Whop to login</Button>
          </a>
        </div>
      </div>
    </main>
  )
}

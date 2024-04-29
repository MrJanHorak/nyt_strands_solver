
//Components
import Header from '../../components/Header/Header'
import TodaysTheme from '../../components/TodaysTheme/TodaysTheme'
import CurrentStrandsBoard from '../../components/CurrentStrandsBoard/CurrentStrandsBoard'

//styles
import './LandingPage.css'

// import PossibleWords from '../../components/PossibleWords/PossibleWords'


function LandingPage() {
  return (
    <div className='solver-container'>
    <Header />
    <TodaysTheme />
    <CurrentStrandsBoard />
    {/* <PossibleWords /> */}
    </div>
  )
}

export default LandingPage
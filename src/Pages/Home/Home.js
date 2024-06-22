import HeroSection from '../../components/HomeComponents/HeroSection';
import GetStarted from '../../components/HomeComponents/GetStarted';
import Hiring from '../../components/HomeComponents/Hiring';

export default function Home() {

    return (
        <div className="bg-white">

            <HeroSection />

            <GetStarted />

            <Hiring />

        </div>
    )
}

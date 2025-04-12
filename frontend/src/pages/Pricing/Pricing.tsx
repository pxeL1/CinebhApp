import PricingCard from "../../components/PricingCard/PricingCard.tsx";
import Footer from "../../components/Footer/Footer.tsx";

export default function Pricing() {
    return (
        <div className='flex flex-col items-center'>
            <div className='flex flex-col items-center h-[189px]'>
                <div className='text-[32px] font-bold mt-[45px]'>Pricing</div>
                <div className='w-[632px] h-[72px] text-center mt-[32px]'>
                    Welcome to our cinema ticket pricing options! We offer three tiers to suit everyone’s
                    preferences. Explore our pricing options below and treat yourself to a cinematic
                    <br/>
                    adventure like never before!
                </div>
            </div>
            <div className='flex items-center justify-center h-[800px] w-full'>
                <PricingCard type={'Regular Seats'} price={'7 KM'} list={['Comfortable seating', 'Affordable pricing', 'Wide selection', 'Accessible locations', 'Suitable for everyone']}/>
                <PricingCard type={'Love Seats'} price={'24 KM'} list={['Side-by-side design', 'Comfortable padding', 'Adjustable armrests', 'Cup holders', 'Reserved for couples']}/>
                <PricingCard type={'Vip Seats'} price={'10 KM'} list={['Enhanced comfort', 'Priority seating', 'Prime viewing', 'Personal space', 'Luxury extras']}/>
            </div>
            <Footer/>
        </div>
    )
}
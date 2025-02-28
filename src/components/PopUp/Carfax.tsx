// Components
import Image from "utils/Image"
import { useForm } from '@formspree/react';

// Styles
import CSS from "./Carfax.module.scss"


export default function Carfax({ car }: {
    car?: string,
}) {

    const [state, handleSubmit] = useForm('ID HERE');

    return (
        <div className={CSS.wrapper}>
            <div className={CSS.image}>
                <Image img={{'filename': 'https://a-us.storyblok.com/f/1014612/477x619/f83b5eaaae/car-interior.jpg'}} />
            </div>
            <div className={CSS.text}>
                <h3>Download Carfax</h3>
                <p>Find out more about the vehicle{`’`}s history.</p>
                <p style={{marginTop: '0'}}>Enter your email below to receive its up-to-date Carfax report.</p>
                <form className={CSS.form} onSubmit={handleSubmit}>
                    <label>
                        <span className="sr-only">Email</span>
                        <input type="email" name="Email" placeholder="Enter your email" />
                    </label>
                    <label style={{display: 'none'}}>
                        <input type="text" name="Car" value={car} />
                    </label>
                    <input disabled={state.submitting} className="button" type="submit" value="Send carfax"/>
                    {state?.succeeded && <p>Successfully sent! One of our team members will send you the Carfax soon.</p>}
                </form>
            </div>
        </div>
    )
}
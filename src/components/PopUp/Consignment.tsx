// Packages
import { useState } from "react";
import { useForm } from '@formspree/react';

// Components
import Image from "utils/Image"

// Styles
import CSS from "./Consignment.module.scss"


export default function Consignment({ children, tradeIn }) {

    const [state, handleSubmit] = useForm('xeqbogry');
    const [step, setStep] = useState(1);

    const svg = <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg"> <mask id="path-1-inside-1_3926_683" fill="white"> <path d="M15.0818 2.68408H0.920842C0.781256 2.68408 0.667969 2.79712 0.667969 2.93696V14.0634C0.667969 14.2032 0.781256 14.3163 0.920842 14.3163H15.0818C15.2213 14.3163 15.3346 14.2032 15.3346 14.0634V2.93696C15.3346 2.79712 15.2213 2.68408 15.0818 2.68408ZM14.8289 13.8105H1.17372V3.18983H14.8289V13.8105Z"/> </mask> <path d="M15.0818 2.68408H0.920842C0.781256 2.68408 0.667969 2.79712 0.667969 2.93696V14.0634C0.667969 14.2032 0.781256 14.3163 0.920842 14.3163H15.0818C15.2213 14.3163 15.3346 14.2032 15.3346 14.0634V2.93696C15.3346 2.79712 15.2213 2.68408 15.0818 2.68408ZM14.8289 13.8105H1.17372V3.18983H14.8289V13.8105Z" fill="#383838"/> <path d="M14.8289 13.8105V16.8105H17.8289V13.8105H14.8289ZM1.17372 13.8105H-1.82628V16.8105H1.17372V13.8105ZM1.17372 3.18983V0.189829H-1.82628V3.18983H1.17372ZM14.8289 3.18983H17.8289V0.189829H14.8289V3.18983ZM15.0818 -0.315918H0.920842V5.68408H15.0818V-0.315918ZM0.920842 -0.315918C-0.873644 -0.315918 -2.33203 1.13831 -2.33203 2.93696H3.66797C3.66797 4.45592 2.43616 5.68408 0.920842 5.68408V-0.315918ZM-2.33203 2.93696V14.0634H3.66797V2.93696H-2.33203ZM-2.33203 14.0634C-2.33203 15.862 -0.873644 17.3163 0.920842 17.3163V11.3163C2.43616 11.3163 3.66797 12.5444 3.66797 14.0634H-2.33203ZM0.920842 17.3163H15.0818V11.3163H0.920842V17.3163ZM15.0818 17.3163C16.8762 17.3163 18.3346 15.862 18.3346 14.0634H12.3346C12.3346 12.5444 13.5664 11.3163 15.0818 11.3163V17.3163ZM18.3346 14.0634V2.93696H12.3346V14.0634H18.3346ZM18.3346 2.93696C18.3346 1.13831 16.8762 -0.315918 15.0818 -0.315918V5.68408C13.5664 5.68408 12.3346 4.45592 12.3346 2.93696H18.3346ZM14.8289 10.8105H1.17372V16.8105H14.8289V10.8105ZM4.17372 13.8105V3.18983H-1.82628V13.8105H4.17372ZM1.17372 6.18983H14.8289V0.189829H1.17372V6.18983ZM11.8289 3.18983V13.8105H17.8289V3.18983H11.8289Z" fill="#383838" mask="url(#path-1-inside-1_3926_683)"/> <mask id="path-3-inside-2_3926_683" fill="white"> <path d="M4.71294 8.28233C5.48951 8.28233 6.12119 7.65065 6.12119 6.87433C6.12119 6.0975 5.48951 5.46582 4.71294 5.46582C3.93637 5.46582 3.30469 6.0975 3.30469 6.87407C3.30469 7.65065 3.93637 8.28233 4.71294 8.28233ZM4.71294 5.97157C5.2106 5.97157 5.61545 6.37667 5.61545 6.87407C5.61545 7.37148 5.2106 7.77658 4.71294 7.77658C4.21529 7.77658 3.81043 7.37173 3.81043 6.87433C3.81043 6.37692 4.21529 5.97157 4.71294 5.97157Z"/> </mask> <path d="M4.71294 8.28233C5.48951 8.28233 6.12119 7.65065 6.12119 6.87433C6.12119 6.0975 5.48951 5.46582 4.71294 5.46582C3.93637 5.46582 3.30469 6.0975 3.30469 6.87407C3.30469 7.65065 3.93637 8.28233 4.71294 8.28233ZM4.71294 5.97157C5.2106 5.97157 5.61545 6.37667 5.61545 6.87407C5.61545 7.37148 5.2106 7.77658 4.71294 7.77658C4.21529 7.77658 3.81043 7.37173 3.81043 6.87433C3.81043 6.37692 4.21529 5.97157 4.71294 5.97157Z" fill="#383838"/> <path d="M4.71294 11.2823C7.14602 11.2823 9.12119 9.30785 9.12119 6.87433H3.12119C3.12119 5.99344 3.83301 5.28233 4.71294 5.28233V11.2823ZM9.12119 6.87433C9.12119 4.44099 7.14672 2.46582 4.71294 2.46582V8.46582C3.83231 8.46582 3.12119 7.754 3.12119 6.87433H9.12119ZM4.71294 2.46582C2.27951 2.46582 0.304688 4.44064 0.304688 6.87407H6.30469C6.30469 7.75435 5.59322 8.46582 4.71294 8.46582V2.46582ZM0.304688 6.87407C0.304687 9.3075 2.27951 11.2823 4.71294 11.2823V5.28233C5.59322 5.28233 6.30469 5.99379 6.30469 6.87407L0.304688 6.87407ZM4.71294 8.97157C3.55319 8.97157 2.61545 8.03298 2.61545 6.87407H8.61545C8.61545 4.72036 6.868 2.97157 4.71294 2.97157V8.97157ZM2.61545 6.87407C2.61545 5.71517 3.55319 4.77658 4.71294 4.77658V10.7766C6.868 10.7766 8.61545 9.02778 8.61545 6.87407H2.61545ZM4.71294 4.77658C5.87159 4.77658 6.81043 5.71433 6.81043 6.87433H0.810435C0.810435 9.02913 2.55898 10.7766 4.71294 10.7766V4.77658ZM6.81043 6.87433C6.81043 8.03214 5.87378 8.97157 4.71294 8.97157V2.97157C2.55679 2.97157 0.810435 4.72171 0.810435 6.87433H6.81043Z" fill="#383838" mask="url(#path-3-inside-2_3926_683)"/> <path d="M2.4366 12.7988C2.49577 12.7988 2.55545 12.7781 2.6035 12.7359L6.72862 9.10409L9.33373 11.7089C9.4326 11.8078 9.59242 11.8078 9.69129 11.7089C9.79016 11.6101 9.79016 11.4502 9.69129 11.3514L8.47573 10.1358L10.7974 7.59342L13.645 10.2038C13.7479 10.2982 13.908 10.2911 14.0023 10.1882C14.0966 10.0852 14.0898 9.92517 13.9866 9.83084L10.9521 7.04924C10.9026 7.00397 10.8366 6.98146 10.7701 6.98298C10.703 6.98602 10.6398 7.0156 10.5946 7.06517L8.11791 9.77774L6.91853 8.57836C6.82396 8.48404 6.67274 8.47924 6.5726 8.56724L2.26945 12.356C2.16451 12.4483 2.15439 12.6082 2.24669 12.7131C2.29676 12.77 2.36656 12.7988 2.4366 12.7988Z" fill="#383838"/> </svg>

    return (
        <div className={CSS.wrapper}>
            <div className={CSS.header}>
                <img className={CSS.logo} src="/winding-road-logo.svg" alt="Winding Road logo" loading="eager" width="167" height="37" />
                {!state?.succeeded && 
                    <div className={CSS.progressBar}>
                        <span>{step}/7</span>
                        <div className={CSS.bar}>
                            <span style={{width: (100 * (step / 7)) + '%'}}></span>
                        </div>
                    </div>
                }
                <a className={CSS.tel} href="tel:+1 (604) 764-7225"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <g id="phone-call"> <path id="Vector" d="M8.01913 4.75122C8.35444 4.75122 8.66339 4.9331 8.82617 5.22627L9.95528 7.26018C10.1031 7.52648 10.1101 7.84859 9.97384 8.12104L8.88608 10.2965C8.88608 10.2965 9.20131 11.9172 10.5206 13.2365C11.8399 14.5558 13.4551 14.8655 13.4551 14.8655L15.6303 13.778C15.9029 13.6416 16.2252 13.6487 16.4916 13.7968L18.5313 14.9308C18.8243 15.0936 19.0059 15.4025 19.0059 15.7376V18.0792C19.0059 19.2717 17.8982 20.1329 16.7683 19.7517C14.4478 18.9687 10.8456 17.4778 8.56245 15.1946C6.27927 12.9115 4.78841 9.30931 4.0054 6.98875C3.62416 5.85885 4.48543 4.75122 5.67788 4.75122H8.01913Z" stroke="#383838" strokeWidth="1.84615" stroke-linejoin="round"/> </g> </svg> +1 (604) 764-7225</a>
            </div>

            {!state?.succeeded &&
                <div className={`${CSS.content} wrapper`}>

                    <form className={CSS.form} onSubmit={handleSubmit} encType="multipart/form-data">

                        <div className={CSS.step} style={{display: step === 1 ? 'block' : 'none'}}>
                            {tradeIn && <p><strong>Trade-in for {tradeIn}</strong></p>}
                            <h3>Step 1. About your car</h3>
                            <p>Fill in your vehicle{`’`}s details. We will use this information to prepare an estimation.</p>
                        
                            <label style={{display: 'none'}}>
                                <span>Trade-in for</span>
                                <input type="text" name="Trade-in for" value={tradeIn ? tradeIn : 'Not a trade-in'} />
                            </label>

                            <label>
                                <span>Make</span>
                                <input type="text" name="Make" placeholder="Enter make" />
                            </label>

                            <label>
                                <span>Model</span>
                                <input type="text" name="Model" placeholder="Enter model name" />
                            </label>

                            <label>
                                <span>Year</span>
                                <input type="text" name="Year" placeholder="Enter year" />
                            </label>

                            <label>
                                <span>Edition</span>
                                <input type="text" name="Edition" placeholder="Enter edition" />
                            </label>
                        </div>


                        <div className={CSS.step} style={{display: step === 2 ? 'block' : 'none'}}>
                            <h3>Step 2. Condition</h3>
                            <p>Fill in your vehicle{`’`}s condition. We will use this information to prepare an estimation.</p>

                            <label>
                                <span>Condition</span>
                                <select name="Condition" placeholder="Select condition"> 
                                    <option value="Brand new">Brand new</option> 
                                    <option value="New">New</option> 
                                    <option value="Very good">Very good</option> 
                                    <option value="Good">Good</option> 
                                    <option value="Acceptable">Acceptable</option> 
                                </select>
                            </label>

                            <label>
                                <span>Mileage</span>
                                <input type="text" name="Mileage" placeholder="Enter mileage" />
                            </label>
                        </div>


                        <div className={CSS.step} style={{display: step === 3 ? 'block' : 'none'}}>
                            <h3>Step 3. VIN number</h3>
                            <p>We require your car{`'`}s vehicle identification number (VIN) to ensure all information collected is correct.</p>

                            <label>
                                <span>Vin number</span>
                                <input type="text" name="Vin number" placeholder="Enter vin number" />
                            </label>
                        </div>


                        <div className={CSS.step} style={{display: step === 4 ? 'block' : 'none'}}>
                            <h3>Step 4. Photographs</h3>
                            <p>Please upload photographs of the front, back and side of your car. We will use these to review its current condition.</p>
                            
                            <div className={CSS.files}>
                                <label className={CSS.file}>
                                    <span><span>Upload front photo {step === 4 ? svg : ''}</span></span>
                                    <input type="file" onChange={(e) =>  {(e as any).target.previousElementSibling.innerText = e?.target?.files[0]?.name}} name="Front photo" accept="image/*" />
                                </label>

                                <label className={CSS.file}>
                                    <span><span>Upload side photo {step === 4 ? svg : ''}</span></span>
                                    <input type="file" onChange={(e) =>  {(e as any).target.previousElementSibling.innerText = e?.target?.files[0]?.name}} name="Side photo" accept="image/*" />
                                </label>

                                <label className={CSS.file}>
                                    <span><span>Upload back photo {step === 4 ? svg : ''}</span></span>
                                    <input type="file" onChange={(e) =>  {(e as any).target.previousElementSibling.innerText = e?.target?.files[0]?.name}} name="Back photo" accept="image/*" />
                                </label>
                            </div>
                        </div>


                        <div className={CSS.step} style={{display: step === 5 ? 'block' : 'none'}}>
                            <h3>Step 5. Interior photographs</h3>
                            <p>Please upload photographs of your car{`’`}s interior. We will use these to review its current condition.</p>
                            
                            <div className={CSS.files}>
                                <label className={CSS.file}>
                                    <span><span>Upload driver seat photo {step === 5 ? svg : ''}</span></span>
                                    <input type="file" onChange={(e) =>  {(e as any).target.previousElementSibling.innerText = e?.target?.files[0]?.name}} name="Driver seat photo" accept="image/*" />
                                </label>

                                <label className={CSS.file}>
                                    <span><span>Upload steering wheel photo {step === 5 ? svg : ''}</span></span>
                                    <input type="file" onChange={(e) =>  {(e as any).target.previousElementSibling.innerText = e?.target?.files[0]?.name}} name="Steering wheel photo" accept="image/*" />
                                </label>

                                <label className={CSS.file}>
                                    <span><span>Upload sun roof photo {step === 5 ? svg : ''}</span></span>
                                    <input type="file" onChange={(e) =>  {(e as any).target.previousElementSibling.innerText = e?.target?.files[0]?.name}} name="Sun roof photo" accept="image/*" />
                                </label>

                                <label className={CSS.file}>
                                    <span><span>Upload back seat photo {step === 5 ? svg : ''}</span></span>
                                    <input type="file" onChange={(e) =>  {(e as any).target.previousElementSibling.innerText = e?.target?.files[0]?.name}} name="Back seat photo" accept="image/*" />
                                </label>
                            </div>
                        </div>


                        <div className={CSS.step} style={{display: step === 6 ? 'block' : 'none'}}>
                            <h3>Step 6. Additional photographs</h3>
                            <p>Please upload any additional photographs of your car to help inform our review.</p>

                            <div className={CSS.files}>
                                <label className={CSS.file}>
                                    <span><span>Upload engine bay photo {step === 6 ? svg : ''}</span></span>
                                    <input type="file" onChange={(e) =>  {(e as any).target.previousElementSibling.innerText = e?.target?.files[0]?.name}} name="Engine bay photo" accept="image/*" />
                                </label>

                                <label className={CSS.file}>
                                    <span><span>Upload front wheel photo {step === 6 ? svg : ''}</span></span>
                                    <input type="file" onChange={(e) =>  {(e as any).target.previousElementSibling.innerText = e?.target?.files[0]?.name}} name="Front wheel photo" accept="image/*" />
                                </label>

                                <label className={CSS.file}>
                                    <span><span>Upload trunk compartment photo {step === 6 ? svg : ''}</span></span>
                                    <input type="file" onChange={(e) =>  {(e as any).target.previousElementSibling.innerText = e?.target?.files[0]?.name}} name="Trunk compartment photo" accept="image/*" />
                                </label>
                            </div>
                        </div>


                        <div className={CSS.step} style={{display: step === 7 ? 'block' : 'none'}}>
                            <h3>Your contact details</h3>
                            <p>Please fill in your contact information. We will use this information to get in touch to discuss the next steps.</p>

                            <label>
                                <span>Name</span>
                                <input type="text" name="Name" placeholder="Enter your name" required />
                            </label>

                            <label>
                                <span>Phone</span>
                                <input type="tel" name="Phone" placeholder="Enter your phone" required />
                            </label>

                            <label>
                                <span>Email</span>
                                <input type="email" name="Email" placeholder="Enter your email" required />
                            </label>

                            <div className={CSS.backAndNext}>
                                <button className={`button ${CSS.back}`} onClick={() => setStep(step - 1)}>Back</button>
                                <input disabled={state.submitting} className="button" type="submit" value="Next"/>
                            </div>
                        </div>
                
                    </form>

                    {step !== 7 &&
                        <div className={CSS.backAndNext}>
                            {step !== 1 && <button className={`button ${CSS.back}`} onClick={() => setStep(step - 1)}>Back</button>}
                            {step !== 7 ?
                                <button className="button" onClick={() => setStep(step + 1)}>Next</button>
                                :
                                <input disabled={state.submitting} className="button" type="submit" value="Next"/>
                            }
                        </div>
                    }

                    {state.submitting === true && <p>Sending, please wait.</p>}
                    {state.submitting !== true && state.succeeded === false && state.errors.length > 0 && <p>Form submit failed. Have you filled the form correctly?</p>}

                </div>
            }

            {state?.succeeded && 
                <div className={CSS.finalScreen}>
                    <div className={CSS.text}>
                        <h3>Thank you for your inquiry!</h3>
                        <p>Our expert team will contact you within one business day to answer your question or query.</p>
                        <p>We are looking forward to working with you to sell your car.</p>
                        {children}
                    </div>
                    <div className={CSS.image}>
                        <Image img={{'filename': 'https://a-us.storyblok.com/f/1014612/1200x800/5ebd030435/ferrari.jpg'}} />
                    </div>
                </div>
            }

        </div>
    )
}
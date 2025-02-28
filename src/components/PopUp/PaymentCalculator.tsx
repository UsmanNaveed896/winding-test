// Packages
import { useState } from "react";
import Link from "next/link"

// Styles
import CSS from "./PaymentCalculator.module.scss"


export default function PaymentCalculator({ price }) {

    const [state, setState] = useState(1);

    const [vahiclePrice, setVehiclePrice] = useState(price);
    const [loanTerm, setLoanTerm] = useState(12);
    const [interestRate, setInteresetRate] = useState(4.9);
    const [downPayment, setDownPayment] = useState(0);
    const [tradeInValue, setTradeInValue] = useState(0);

    function calculate(e) {
        e.preventDefault();
        setState(2);
    }

    return (
        <div className={CSS.text}>
            <h3>{state === 1 ? 'Payment Calculator' : 'Payment Details'}</h3>

            {state === 1 &&
                <form className={CSS.form} onSubmit={(e) => calculate(e)}>
                    <label className={CSS.price}>
                        <span>Vehicle Price $</span>
                        <input type="number" name="Name" placeholder="Vehicle Price" defaultValue={price} onChange={(e) => setInteresetRate(Number(e.target.value))} required />
                    </label>

                    <label>
                        <span>Interest Rate</span>
                        <select name="Interest Rate" placeholder="Select interest rate" defaultValue="4.9" onChange={(e) => setInteresetRate(Number(e.target.value))}> 
                            <option value="4.9">4.9</option> 
                            <option value="5.9">5.9</option> 
                            <option value="6.9">6.9</option> 
                        </select>
                    </label>

                    <label>
                        <span>Loan Term</span>
                        <select name="Loan Term" placeholder="Select loan term" defaultValue="12" onChange={(e) => setLoanTerm(Number(e.target.value))}> 
                            <option value="12">12 months beweekly</option> 
                            <option value="18">18 months beweekly</option> 
                            <option value="24">24 months beweekly</option> 
                        </select>
                    </label>

                    <label>
                        <span>Down Payment $</span>
                        <input type="number" name="Best Time" placeholder="Best Time" defaultValue="0" onChange={(e) => setDownPayment(Number(e.target.value))} required />
                    </label>

                    <label>
                        <span>Trade In Value $</span>
                        <input type="number" name="Best Time" placeholder="0" defaultValue="0" onChange={(e) => setTradeInValue(Number(e.target.value))} required />
                    </label>

                    <input className="button" type="submit" value="Calculate"/>
                </form>
            }

            {state === 2 &&
                <div className={CSS.finalScreen}>
                    <div>
                        <h4>Estimated Amount Financed</h4>
                        <p><span>$123456</span></p>
                    </div>

                    <div>
                        <h4>Your Biweekly Payment</h4>
                        <p><span>$123456</span> <span>{loanTerm} months biweekly</span></p>
                    </div>

                    <Link href="/contact-us/" className="button">Call us</Link>
                </div>
            }

        </div>
    )
}
// Packages
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

// Components
import PaymentCalculator from "./PaymentCalculator";
import Carfax from "./Carfax";
import TestDrive from "./TestDrive";
import Consignment from "./Consignment";

// Styles
import CSS from "./PopUp.module.scss"


export default function Button({ data, className, is, children, car, tradeIn, price }: {
    data?: any,
    className?: string,
    children?: object,
    is?: string,
    car?: string,
    tradeIn?: string,
    price?: string,
}) {

    const [popupIsOpen, setPopupIsOpen] = useState(false);

    is = data?.whatToShow ? data.whatToShow : is;

    const router = useRouter()
    useEffect(() => {
        const handleRouteChange = (url) => { setPopupIsOpen(false) }
        router.events.on('routeChangeStart', handleRouteChange)
        return () => { router.events.off('routeChangeStart', handleRouteChange) }
    }, []);


    return (
        <>
            <button
                className={`${className ? className : ''} ${data?.style ? data.style : ''}`}
                id={data?.id}
                onClick={() => setPopupIsOpen(true)}
            >
                {data?.text || children}
            </button>


            {popupIsOpen === true && 
            <>
                <div className={`${CSS.popup} ${is === 'Consignment' ? CSS.consignment : ''} ${popupIsOpen === true ? `${CSS.active}` : ''}`} >
                    
                    {is === 'Payment Calculator' && <PaymentCalculator price={price} />}
                    {is === 'Carfax' && <Carfax car={car}/>}
                    {is === 'Test Drive' && <TestDrive car={car}/>}
                    {is === 'Consignment' && 
                        <Consignment tradeIn={tradeIn}>
                            <button className="button" onClick={() => setPopupIsOpen(false)}>Go back</button>
                        </Consignment>
                    }

                    <button 
                        onClick={() => setPopupIsOpen(false)}
                        aria-label="Close popup"
                        className={CSS.close}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.9997 13.1934L6.82142 18.3717C6.65149 18.5416 6.45257 18.6265 6.22467 18.6265C5.99677 18.6265 5.79786 18.5416 5.62792 18.3717C5.45801 18.2017 5.37305 18.0028 5.37305 17.7749C5.37305 17.547 5.45801 17.3481 5.62792 17.1782L10.8062 11.9999L5.62792 6.82167C5.45801 6.65173 5.37305 6.45282 5.37305 6.22492C5.37305 5.99702 5.45801 5.7981 5.62792 5.62817C5.79786 5.45825 5.99677 5.37329 6.22467 5.37329C6.45257 5.37329 6.65149 5.45825 6.82142 5.62817L11.9997 10.8064L17.1779 5.62817C17.3479 5.45825 17.5468 5.37329 17.7747 5.37329C18.0026 5.37329 18.2015 5.45825 18.3714 5.62817C18.5413 5.7981 18.6263 5.99702 18.6263 6.22492C18.6263 6.45282 18.5413 6.65173 18.3714 6.82167L13.1931 11.9999L18.3714 17.1782C18.5413 17.3481 18.6263 17.547 18.6263 17.7749C18.6263 18.0028 18.5413 18.2017 18.3714 18.3717C18.2015 18.5416 18.0026 18.6265 17.7747 18.6265C17.5468 18.6265 17.3479 18.5416 17.1779 18.3717L11.9997 13.1934Z" fill="#fff"/></svg>
                    </button>
                </div>

                {is === 'Consignment' &&
                    <style>{`header { display: none; }`}</style>
                }

                <div className={CSS.closePopupBg} onClick={() => setPopupIsOpen(false)} />
            </>
            }
        </>
    )
}
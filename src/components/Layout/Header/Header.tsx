// Packages
import Link from 'next/link';
import { useState, useEffect, useContext } from "react"

// Components
import LinkLogic from 'utils/Link'
import Button from 'components/Button'
import RichText from "utils/RichTextRenderer"

// eCommerce
import { StoreContext } from "components/Shopify/Misc/store-context"
import { CartButton } from "components/Shopify/Misc/cart-button"
import { Toast } from "components/Shopify/Misc/toast"

// Styles
import CSS from './Header.module.scss'


export default function Header({ data, url, showCart }: {
    data: {
        nav: Array<any>,
        leftText: object,
        location: object,
        openHours: object,
        buttons: Array<any>,
    },
    url: string,
    showCart?: boolean,
}) {

    // Menu state
    const [isMenuOpen, setMenuOpen] = useState(false);

    // Menu state was persisting on page changes, so had to add this
    useEffect(() => {
        setMenuOpen(false);
    }, [url])

    // Ecommerce
    const { checkout, loading, didJustAddToCart } = useContext(StoreContext)
    const items = checkout ? checkout.lineItems : []
    const quantity = items.reduce((total, item) => {
        return total + item.quantity
    }, 0)

    return (
        <header>
            <div className={CSS.notification}>
                {data.leftText &&
                    <div className={CSS.leftText}>
                        <RichText data={data.leftText} />
                    </div>
                }
                <div className={CSS.rightText}>
                    <div>
                        <RichText data={data.location} />
                    </div>
                    <div>
                        <RichText data={data.openHours} />
                    </div>
                </div>
            </div>

            <div className={`${CSS.header} ${isMenuOpen ? CSS.menuIsOpen : ''}`}>
                <div className={CSS.menuAndLogo}>
                    <button
                        aria-label="Open main menu"
                        className={CSS.menuButton}
                        onClick={() => isMenuOpen === true ? setMenuOpen(false) : setMenuOpen(true) }
                        aria-expanded={isMenuOpen === false ? 'false' : 'true'}
                        aria-controls="header-menu"
                        aria-haspopup="true" 
                    >
                        <svg viewBox="0 0 100 80" width="25" fill="#fff" height="27">
                            <rect y="2" width="100" height="7"></rect>
                            <rect y="32" width="100" height="7"></rect>
                            <rect y="62" width="100" height="7"></rect>
                        </svg>
                    </button>

                    <Link href="/">
                        <img src="/winding-road-logo.svg" alt="Winding Road logo" loading="eager" width="167" height="37" />
                    </Link>
                </div>

                <nav className={CSS.nav}>
                    <ul>
                        {data.nav.map((loop, i) => (
                            <li key={i}>
                                <LinkLogic text={loop.text} link={loop?.link}/>
                            </li>
                        ))}
                    </ul>
                </nav>

                <Toast className="" show={loading || didJustAddToCart}>
                    {!didJustAddToCart ? (
                        "Updating…"
                    ) : (
                    <>
                        Added to cart{" "}
                        <svg
                            width="14"
                            height="14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                        <path
                            d="M5.019 10.492l-2.322-3.17A.796.796 0 013.91 6.304L6.628 9.14a1.056 1.056 0 11-1.61 1.351z"
                            fill="#fff"
                        />
                        <path
                            d="M5.209 10.693a1.11 1.11 0 01-.105-1.6l5.394-5.88a.757.757 0 011.159.973l-4.855 6.332a1.11 1.11 0 01-1.593.175z"
                            fill="#fff"
                        />
                        <path
                            d="M5.331 7.806c.272.326.471.543.815.163.345-.38-.108.96-.108.96l-1.123-.363.416-.76z"
                            fill="#fff"
                        />
                        </svg>
                    </>
                    )}
                </Toast>

                <div className={CSS.cartAndCta}>
                    {showCart &&
                        <CartButton quantity={quantity} />
                    }
                    {data?.buttons[0] &&
                        <Button data={data.buttons[0]} />
                    }
                </div>

            </div>
        </header>
    )
}
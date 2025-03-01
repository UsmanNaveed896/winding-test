// Packages
import Link from 'next/link';

// Components
import Image from "utils/Image"

// Styles
import CSS from './Car.module.scss'


export default function Car({ data }: {
    data: any,
}) {
    
    return (
        <div className={CSS.car}>
            <div className={CSS.image}>
                <Image img={data.image} heightRatio={0.6} />
                {!data.image &&
                <></>
                    // <img src="/images/winding-road-16-10.png" loading="lazy" alt="" width="840" height="504" />
                }
                <p>
                    ${Number(data.price).toLocaleString('en-CA').replaceAll(',', ' ')}
                    {data.monthlyPrice && <span> ${data.monthlyPrice}/mo</span>}
                </p>
            </div>
            <div className={CSS.content}>
                <div className={CSS.titleAndStocknumber}>
                    <p className={CSS.title}>{data.title}</p>
                    <p className={CSS.stockNumber}>#{data.vin.slice(-4)}</p>
                </div>
                {data?.excerpt && <p className={CSS.excerpt}>{data.excerpt}</p>}
                <div className={CSS.details}>
                    <div className={CSS.info}>
                        <p className={CSS.miles}><span className="sr-only">Mileage </span>{data.miles}</p>
                        <p className={CSS.year}><span className="sr-only">Year </span>{data.year}</p>
                        <p className={CSS.fuelType}><span className="sr-only">Fuel type </span>{data.fuelType}</p>
                        <p className={CSS.drive}><span className="sr-only">Drive </span>{data.drive}</p>
                    </div>
                    <p><Link href={data.full_slug}>Details</Link></p>
                </div>
            </div>
        </div>
    )
}
// Packages
import Link from 'next/link';

// Components
import Image from "components/Shopify/Image"

// Styles
import CSS from './ShopProduct.module.scss'


export default function ShopProduct({ data }: {
    data: any,
}) {
    
    return (
        <div className={CSS.product}>
            <div className={CSS.image}>
                <Image img={data.image} heightRatio={1} />
            </div>
            <p className={CSS.title}>{data.title}</p>
            <div className={CSS.priceAndDetails}>
                <p><span>from</span> ${Number(data.price).toLocaleString('en-CA').replaceAll(',', ' ')}</p>
                <p><Link href={'/shop/'+data.url}>Details</Link></p>
            </div>
        </div>
    )
}
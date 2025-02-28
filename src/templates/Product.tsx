// Packages

// Style
import CSS from 'styles/Car.module.scss'

// Components
import StoryblokComponents from 'utils/StoryblokComponents'
import Seo from 'components/Layout/Seo'
import Header from 'components/Layout/Header/Header'
import Footer from 'components/Layout/Footer/Footer'
import Product from 'components/Shopify/Product/Product'


export default function PageTemplate({ data, header, footer, products, contentAfterProducts }: {
    data: any,
    header: any,
    footer: any,
    products: Array<object>,
    contentAfterProducts: any,
}) {
    
    return (
        <>
            <Header
                data={header}
                url={'shop/'+data.handle}
                showCart
            />

            <Seo
                title={data?.title}
                description={data?.description?.substring(0, 160)}
                url={'shop/'+data.handle}
            />

            <main className={CSS.wrapper} id="content">
                <Product data={data} />
            </main>

            <aside className={CSS.aside}>
                <StoryblokComponents
                    data={contentAfterProducts}
                    products={products}
                    url={data.handle}
                />
            </aside>

            <Footer data={footer} />
        </>
    )
}
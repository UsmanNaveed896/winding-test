// Packages
import { getStoryblokApi } from "@storyblok/react";
import Client from "shopify-buy";

// Components
import ProductTemplate from 'templates/Product'

// Call page template
export default function Page({ data, header, footer, products, contentAfterProducts }: {
    data: any,
    header: object,
    footer: object,
    contentAfterProducts: any,
    products: Array<object>,
}) {
  
    return (
        <ProductTemplate data={data} header={header} contentAfterProducts={contentAfterProducts} products={products} footer={footer} />
    )
}


// Get page content by using getStaticProps (Next docs give more info about what it does)
export async function getStaticProps({ params }: {
    params: {
        slug: Array<string>
    }
}) {

    let data = null;
    let products = [];

    // Connect to Shopify
    const client = Client.buildClient({
        storefrontAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
        domain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
    })

    // Loop through products
    let productsArray = await client.product.fetchAll();
    productsArray = JSON.parse(JSON.stringify(productsArray));
    productsArray.map((product) => {
        // Let's optimize an array of products to client side
        products.push({
            'url': product.handle,
            'image': product?.images[0] || null,
            'title': product.title,
            'price': product?.variants[0]?.price?.amount || null,
        })

        // If product URL matches page URL, set the page data
        if (product.handle === params.slug.join("/")) {
            data = product;
        }
    });

    // Let's do a Storyblok API call to get the story content
    let header = await getStoryblokApi().get(`cdn/stories/site-configuration/header`, { version: "published" });
    let footer = await getStoryblokApi().get(`cdn/stories/site-configuration/footer`, { version: "published" });
    let contentAfterProducts = await getStoryblokApi().get(`cdn/stories/site-configuration/content-after-products`, { version: "published" });


    return {
        props: {
            data: data,
            products: products,
            header: header.data.story.content,
            footer: footer.data.story.content,
            contentAfterProducts: contentAfterProducts?.data?.story?.content?.content || null,
        },
        revalidate: 3600,
    };
}
 
// Get page paths to use with getStaticProps above
export async function getStaticPaths() {
  
    // Connect to Shopify
    const client = Client.buildClient({
        storefrontAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
        domain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
    })

    // Create an array of paths that get returned to getStaticProps
    let products = await client.product.fetchAll();
    products = JSON.parse(JSON.stringify(products));
    const paths = products.map((product) => ({
        params: { slug: product.handle.split("/") },
    }));


    return {
        paths: paths,
        fallback: false,
    };
}
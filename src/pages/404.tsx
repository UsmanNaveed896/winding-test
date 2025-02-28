// Packages
import { useState, useEffect } from "react"
import { getStoryblokApi, storyblokEditable } from "@storyblok/react";
import Link from "next/link";
import Client from "shopify-buy";

// Components
// Components
import PageTemplate from 'templates/PageTemplate'
import CarTemplate from 'templates/Car'
import BlogPostTemplate from 'templates/BlogPost'


export default function Page404({ header, footer, cars, soldCars, blogPosts, contentAfterBlogPosts, contentAfterInventory, products }: {
    header: object,
    footer: object,
    cars: Array<any>,
    soldCars: Array<any>,
    blogPosts: Array<any>,
    contentAfterBlogPosts: Array<any>,
    contentAfterInventory: Array<any>,
    products: Array<any>,
}) {

    const [previewStory, setPreviewStory] = useState(null);

    const data404 = {
        'full_slug': '404',
        'content': {
            'noindex': true,
            'title': '404 - Page Not Found',
            'description': 'Page not found',
        }
    };

    useEffect(() => {

        if (window.location.search.includes('_storyblok')) {
            const url = `https://api-us.storyblok.com/v2/cdn/stories/${window.location.pathname}?version=draft&token=${process.env.NEXT_STORYBLOK_ACCESS_TOKEN}&cv=${Date.now()}`;

            // Fetch Preview Data
            const fetchData = async () => {
                try {
                    const response = await fetch(url);
                    const json = await response.json();
                    setPreviewStory(json.story);
                } catch (error) { console.log("error", error); }
            };

            fetchData();

        }
    }, []);


    return (
        <>

            {!previewStory?.content &&
                <PageTemplate data={data404} header={header} footer={footer} >
                    <div style={{margin: '9em auto'}} className="wrapper !mt-[10rem] !mb-[8rem] text-center">
                        <h1>Page not found</h1>
                        <p className="mx-auto max-w-[25rem] mt-[-1em] mb-[1em]">The page you are looking for might have moved elsewhere or the address you entered was incorrect.</p>
                        <Link href="/" className="button">Back to homepage</Link>
                    </div>
                </PageTemplate>
            }

            {previewStory?.content?.component === 'Page' &&
                <PageTemplate {...storyblokEditable(previewStory?.content)} data={previewStory} products={products} header={header} footer={footer} cars={cars} soldCars={soldCars} blogPosts={blogPosts} />
            }

            {previewStory?.content?.component === 'Car' &&
                <CarTemplate {...storyblokEditable(previewStory?.content)} data={previewStory} contentAfterInventory={contentAfterInventory} header={header} footer={footer} cars={cars} soldCars={soldCars} />
            }
            
            {previewStory?.content?.component === 'Blog Post' &&
                <BlogPostTemplate {...storyblokEditable(previewStory?.content)} data={previewStory} contentAfterBlogPosts={contentAfterBlogPosts} header={header} footer={footer} blogPosts={blogPosts} cars={cars} />
            }

        </>
    )
}

// Get page content by using getStaticProps (Next docs give more info about what it does)
export async function getStaticProps({ params }: {
  params: {
    slug: Array<string>
  }
}) {


  // Let's do a Storyblok API call to get the story content
  let header = await getStoryblokApi().get(`cdn/stories/site-configuration/header`, { version: "published" });
  let footer = await getStoryblokApi().get(`cdn/stories/site-configuration/footer`, { version: "published" });
  let contentAfterBlogPosts = await getStoryblokApi().get(`cdn/stories/site-configuration/content-after-blog-posts`, { version: "published" });
  let contentAfterInventory = await getStoryblokApi().get(`cdn/stories/site-configuration/content-after-inventory`, { version: "published" });


  // Let's optimize an array of cars
  let requests = []
  let cars = []
  let one = await getStoryblokApi().get("cdn/stories", { per_page: 1});
  // Storyblok has limit of 100 stories per request, so we do multiple requests based on how many stories there are
  // @ts-ignore
  let totalPages = Math.ceil(one.headers.total / 100)
  for (let i = 1; i <= totalPages; i++) {
      requests.push(getStoryblokApi().get('cdn/stories', {
      per_page: 100,
      page: i
      }))
  }
  cars = await Promise.all(requests)
  let carsArray = []
  let soldCarsArray = []
  cars[0]?.data.stories?.forEach((loop) => {
    if (loop.content.component === 'Car') {
      if (loop.content.available) {
        carsArray.push({
          'image': loop.content?.exteriorImages?.[0] || null,
          'full_slug': loop.full_slug,
          'first_published_at': loop?.first_published_at,
          'title': loop.content?.title,
          'price': loop.content?.price,
          'monthlyPrice': loop.content?.monthlyPrice,
          'miles': loop.content?.miles,
          'drive': loop.content?.drive,
          'year': loop.content?.year,
          'fuelType': loop.content?.fuelType,
          'vin': loop.content?.vin,
          'make': loop.content?.make,
          'model': loop.content?.model,
          'uuid': loop.uuid,
          'excerpt': loop.content?.excerpt,
        })
      } else {
        soldCarsArray.push({
          'image': loop.content?.exteriorImages?.[0] || null,
          'full_slug': loop.full_slug,
          'first_published_at': loop?.first_published_at,
          'title': loop.content?.title,
          'miles': loop.content?.miles,
          'drive': loop.content?.drive,
          'year': loop.content?.year,
          'fuelType': loop.content?.fuelType,
          'uuid': loop.uuid,
          'excerpt': loop.content?.excerpt,
        })
      }
    }
  })
  // Sort by publish date
  carsArray.sort(function(a,b){return new Date(b.first_published_at).valueOf() - new Date(a.first_published_at).valueOf();});
  soldCarsArray.sort(function(a,b){return new Date(b.first_published_at).valueOf() - new Date(a.first_published_at).valueOf();});


  const blog = await getStoryblokApi().get("cdn/stories", {"content_type": "Blog Post", "per_page": 100});
  let blogPostsArray = []
  blog?.data?.stories?.forEach((loop) => {
    blogPostsArray.push({
      'full_slug': loop.full_slug,
      'title': loop?.content?.title,
      'description': loop?.content?.description || null,
      'thumbnail': loop?.content?.thumbnail?.filename || null,
      'uuid': loop.uuid,
      'published': loop?.content?.releaseDate || null,
      'category': loop?.content?.category || null,
    })
  })
  blogPostsArray.sort(function(a,b){ return new Date(b.published).valueOf() - new Date(a.published).valueOf(); });


  // Connect to Shopify
  const client = Client.buildClient({
    storefrontAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    domain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
  })
  let products = [];
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
      'make': product?.vendor || null,
      'model': product?.productType || null,
    })
  });


  return {
    props: {
      header: header.data.story.content,
      footer: footer.data.story.content,
      cars: carsArray,
      soldCars: soldCarsArray,
      blogPosts: blogPostsArray,
      contentAfterBlogPosts: contentAfterBlogPosts?.data?.story?.content?.content || null,
      contentAfterInventory: contentAfterInventory?.data?.story?.content?.content || null,
      products: products,
    },
    revalidate: 3600,
  };
}

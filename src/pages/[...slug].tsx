// Packages
import { getStoryblokApi } from "@storyblok/react";
import Client from "shopify-buy";

// Components
import PageTemplate from 'templates/PageTemplate'
import CarTemplate from 'templates/Car'
import BlogPostTemplate from 'templates/BlogPost'
import fetchImagesFromGCP from "utils/GcpClient";

// Call page template
export default function Page({ story, header, footer, cars, soldCars, blogPosts, contentAfterBlogPosts, contentAfterInventory, products }: {
  story: any,
  header: object,
  footer: object,
  cars: Array<any>,
  soldCars: Array<any>,
  blogPosts: Array<any>,
  contentAfterBlogPosts: Array<any>,
  contentAfterInventory: Array<any>,
  products: Array<any>,
}) {

  // Select page template
  if (story.content.component === 'Page') {
    return (
      <PageTemplate data={story} header={header} products={products} footer={footer} cars={cars} soldCars={soldCars} blogPosts={blogPosts} />
    );
  } else if (story.content.component === 'Car') {
    return (
      <CarTemplate data={story} header={header} contentAfterInventory={contentAfterInventory} footer={footer} cars={cars} soldCars={soldCars} />
    )
  } else if (story.content.component === 'Blog Post') {
    return (
      <BlogPostTemplate data={story} contentAfterBlogPosts={contentAfterBlogPosts} header={header} footer={footer} blogPosts={blogPosts} cars={cars} />
    )
  }
}


export async function getStaticProps({ params }: {
  params: {
    slug: Array<string>
  }
}) {


  const url = params.slug.join("/");


  // Let's do a Storyblok API call to get the story content
  let { data } = await getStoryblokApi().get(`cdn/stories/${url}`, { version: "published" });
  let header = await getStoryblokApi().get(`cdn/stories/site-configuration/header`, { version: "published" });
  let footer = await getStoryblokApi().get(`cdn/stories/site-configuration/footer`, { version: "published" });
  let contentAfterBlogPosts = await getStoryblokApi().get(`cdn/stories/site-configuration/content-after-blog-posts`, { version: "published" });
  let contentAfterInventory = await getStoryblokApi().get(`cdn/stories/site-configuration/content-after-inventory`, { version: "published" });


  // Let's optimize an array of cars array if the page has the 'Section: Inventory' to prevent client side bloat
  let hasFeaturedCars = (data.story.content.component === 'Car' || data.story.content.component === 'Blog Post'); // Start off with true to if blog post, otherwise start with false
  (data.story.content.component === 'Page') && data.story.content.content.forEach((e) => {
    if (e.component === 'Section: Featured Cars' || e.component === 'Section: Inventory') {
      hasFeaturedCars = true;
    }
  })
  let requests = []
  let cars = []
  if (hasFeaturedCars) {
    let one = await getStoryblokApi().get("cdn/stories", { per_page: 1 });
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
  }
  let carsArray = []
  let soldCarsArray = []
  // cars?.forEach((query) => {
  //   query?.data.stories?.forEach(async (loop) => {
  //     if (loop.content.component === 'Car') {
  //       if (loop.content.available) {
  //         // 'image': loop?.content?.exteriorImages?.length > 0 ? loop?.content?.exteriorImages[0] :fetchImagesFromGCP()  ,
  //         // console.log("Image--------------------------------------", loop.content)
  //         if (loop?.content?.exteriorImages?.length > 0) {
  //           carsArray.push({
  //             'image': loop.content?.exteriorImages[0] || null,
  //             'full_slug': loop.full_slug,
  //             'first_published_at': loop?.first_published_at,
  //             'title': loop.content?.title,
  //             'price': loop.content?.price,
  //             'monthlyPrice': loop.content?.monthlyPrice,
  //             'miles': loop.content?.miles,
  //             'drive': loop.content?.drive,
  //             'year': loop.content?.year,
  //             'fuelType': loop.content?.fuelType,
  //             'vin': loop.content?.vin,
  //             'make': loop.content?.make,
  //             'model': loop.content?.model,
  //             'uuid': loop.uuid,
  //             'excerpt': loop.content?.excerpt,
  //           })
  //         }
  //         else {
  //           console.log("loop.content?.title============", loop.content?.title)
  //           carsArray.push({
  //             'image': await fetchImagesFromGCP(loop.content?.tag, "exterior") || null,
  //             'full_slug': loop.full_slug,
  //             'first_published_at': loop?.first_published_at,
  //             'title': loop.content?.title,
  //             'price': loop.content?.price,
  //             'monthlyPrice': loop.content?.monthlyPrice,
  //             'miles': loop.content?.miles,
  //             'drive': loop.content?.drive,
  //             'year': loop.content?.year,
  //             'fuelType': loop.content?.fuelType,
  //             'vin': loop.content?.vin,
  //             'make': loop.content?.make,
  //             'model': loop.content?.model,
  //             'uuid': loop.uuid,
  //             'excerpt': loop.content?.excerpt,
  //           })

  //         }
  //       } else {
  //         soldCarsArray.push({
  //           'image': loop.content?.exteriorImages[0] || null,
  //           'full_slug': loop.full_slug,
  //           'first_published_at': loop?.first_published_at,
  //           'title': loop.content?.title,
  //           'miles': loop.content?.miles,
  //           'drive': loop.content?.drive,
  //           'year': loop.content?.year,
  //           'fuelType': loop.content?.fuelType,
  //           'uuid': loop.uuid,
  //           'excerpt': loop.content?.excerpt,
  //         })
  //       }
  //     }
  //   })
  // })
  // Sort by publish date

  for (const query of cars || []) {
    for (const loop of query?.data?.stories || []) {
      if (loop.content.component === 'Car') {
        if (loop.content.available) {
          if (loop?.content?.exteriorImages?.length > 0) {
            carsArray.push({
              image: loop.content?.exteriorImages[0] || null,
              full_slug: loop.full_slug,
              first_published_at: loop?.first_published_at,
              title: loop.content?.title,
              price: loop.content?.price,
              monthlyPrice: loop.content?.monthlyPrice,
              miles: loop.content?.miles,
              drive: loop.content?.drive,
              year: loop.content?.year,
              fuelType: loop.content?.fuelType,
              vin: loop.content?.vin,
              make: loop.content?.make,
              model: loop.content?.model,
              uuid: loop.uuid,
              excerpt: loop.content?.excerpt,
            });
          } else {
            // console.log("loop.content?.title============", loop.content?.title);
            const image = await fetchImagesFromGCP(loop.content?.tag, "exterior");
            carsArray.push({
              image: image || null,
              full_slug: loop.full_slug,
              first_published_at: loop?.first_published_at,
              title: loop.content?.title,
              price: loop.content?.price,
              monthlyPrice: loop.content?.monthlyPrice,
              miles: loop.content?.miles,
              drive: loop.content?.drive,
              year: loop.content?.year,
              fuelType: loop.content?.fuelType,
              vin: loop.content?.vin,
              make: loop.content?.make,
              model: loop.content?.model,
              uuid: loop.uuid,
              excerpt: loop.content?.excerpt,
            });
          }
        } else {
          if (loop.content?.exteriorImages.length > 0) {
            soldCarsArray.push({
              image: loop.content?.exteriorImages[0] || null,
              full_slug: loop.full_slug,
              first_published_at: loop?.first_published_at,
              title: loop.content?.title,
              miles: loop.content?.miles,
              drive: loop.content?.drive,
              year: loop.content?.year,
              fuelType: loop.content?.fuelType,
              uuid: loop.uuid,
              excerpt: loop.content?.excerpt,
            });
          }
          else {
            soldCarsArray.push({
              image: await fetchImagesFromGCP(loop.content?.tag, "exterior") || null,
              full_slug: loop.full_slug,
              first_published_at: loop?.first_published_at,
              title: loop.content?.title,
              miles: loop.content?.miles,
              drive: loop.content?.drive,
              year: loop.content?.year,
              fuelType: loop.content?.fuelType,
              uuid: loop.uuid,
              excerpt: loop.content?.excerpt,
            });
          }

        }
      }
    }
  }

  carsArray.sort(function (a, b) { return new Date(b.first_published_at).valueOf() - new Date(a.first_published_at).valueOf(); });
  soldCarsArray.sort(function (a, b) { return new Date(b.first_published_at).valueOf() - new Date(a.first_published_at).valueOf(); });


  // Let's optimize an array of blog posts if the page has the 'Section: Featured Articles' to prevent client side bloat
  let hasFeaturedArticles = (data.story.content.component === 'Blog Post'); // Start off with true to if blog post, otherwise start with false
  data.story.content.component === 'Page' && data.story.content.content.forEach((e) => {
    if (e.component === 'Section: Featured Posts' || e.component === 'Section: Blog') {
      hasFeaturedArticles = true;
    }
  })
  const blog = hasFeaturedArticles ? await getStoryblokApi().get("cdn/stories", { "content_type": "Blog Post", "per_page": 100 }) : null;
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
  blogPostsArray.sort(function (a, b) { return new Date(b.published).valueOf() - new Date(a.published).valueOf(); });


  // Let's pass products to the pages
  let hasFeaturedProducts = false; // Start off with true to if blog post, otherwise start with false
  data.story.content.component === 'Page' && data.story.content.content.forEach((e) => {
    if (e.component === 'Section: Featured Products' || e.component === 'Section: Shop') {
      hasFeaturedProducts = true;
    }
  })
  let products = [];
  if (hasFeaturedProducts) {
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
        'make': product?.vendor || null,
        'model': product?.productType || null,
      })
    });
  }


  return {
    props: {
      story: data.story,
      header: header.data.story.content,
      footer: footer.data.story.content,
      cars: carsArray,
      soldCars: soldCarsArray,
      blogPosts: blogPostsArray,
      products: products,
      contentAfterBlogPosts: contentAfterBlogPosts?.data?.story?.content?.content || null,
      contentAfterInventory: contentAfterInventory?.data?.story?.content?.content || null,
    },
    revalidate: 3600,
  };
}

// Get page paths to use with getStaticProps above
export async function getStaticPaths() {

  // Get one story to count how many stories there are in Storyblok
  let one = await getStoryblokApi().get("cdn/stories", { per_page: 1 });

  let requests = []
  // @ts-ignore
  let totalPages = Math.ceil(one.headers.total / 100)
  for (let i = 1; i <= totalPages; i++) {
    requests.push(getStoryblokApi().get('cdn/stories', {
      per_page: 100,
      page: i
    }))
  }
  let responses = await Promise.all(requests)

  // Create an array of paths that get returned to getStaticProps
  let paths = [];

  // Populate the array with all page URLs
  responses.forEach((pagination) => {
    pagination.data.stories.forEach((story) => {
      if (
        (story.content.component === 'Page' || story.content.component === 'Car' || story.content.component === 'Blog Post') && !story.full_slug.startsWith('site-configuration')
      ) {
        paths.push({
          params: {
            slug: story.full_slug.split("/")
          }
        });
      }
    })
  });

  return {
    paths: paths,
    fallback: false,
  };
}
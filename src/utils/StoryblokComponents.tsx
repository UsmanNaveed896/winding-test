// Storyblok Components
import Hero from 'components/Hero/Hero'
import Text from 'components/Text/Text'
import TextAndImage from 'components/TextAndImage/TextAndImage'
import Logos from 'components/Logos/Logos'
import AnchorId from 'components/AnchorId'
import Faq from 'components/Faq/Faq'
import Quote from 'components/Quote/Quote'
import FeaturedCars from 'components/FeaturedCars/FeaturedCars'
import SoldCars from 'components/SoldCars/SoldCars'
import Cards from 'components/Cards/Cards'
import Reviews from 'components/Reviews/Reviews'
import Inventory from 'components/Inventory/Inventory'
import SoldInventory from 'components/SoldInventory/SoldInventory'
import ImageCollage from 'components/ImageCollage/ImageCollage'
import TextWithBackgroundImage from 'components/TextWithBackgroundImage/TextWithBackgroundImage'
import Statistics from 'components/Statistics/Statistics'
import FeaturedPosts from 'components/FeaturedPosts/FeaturedPosts'
import Blog from 'components/Blog/Blog'
import ContactUs from 'components/ContactUs/ContactUs'
import Shop from 'components/Shop/Shop'
import FeaturedProducts from 'components/FeaturedProducts/FeaturedProducts'
import PhotoGallery from 'components/ImageGallery/PhotoGallery'


export default function StoryblokComponents({ data, cars, blogPosts, soldCars, products, url }: {
    data: any,
    cars?: Array<object>,
    blogPosts?: Array<object>,
    soldCars?: Array<object>,
    url?: string,
    products?: Array<object>,
}) {

    return (
        data?.length > 0 && data.map((blok, i) => {
            switch (blok.component) {
                case 'Section: Hero': return <Hero key={i} blok={blok} />
                case 'Section: Text': return <Text key={i} blok={blok} />
                case 'Section: Text and Image': return <TextAndImage key={i} blok={blok} />
                case 'Section: Logos': return <Logos key={i} blok={blok} />
                case 'Section: ID Anchor': return <AnchorId key={i} blok={blok} />
                case 'Section: Faq': return <Faq key={i} blok={blok} />
                case 'Section: Quote': return <Quote key={i} blok={blok} />
                case 'Section: Featured Cars': return <FeaturedCars url={url} key={i} cars={cars} blok={blok} />
                case 'Section: Sold Cars': return <SoldCars key={i} soldCars={soldCars} blok={blok} />
                case 'Section: Cards': return <Cards key={i} blok={blok} />
                case 'Section: Reviews': return <Reviews key={i} blok={blok} />
                case 'Section: Inventory': return <Inventory key={i} blok={blok} cars={cars} />
                case 'Section: Sold Inventory': return <SoldInventory key={i} blok={blok} cars={soldCars} />
                case 'Section: Image Collage': return <ImageCollage key={i} blok={blok} />
                case 'Section: Text With Background Image': return <TextWithBackgroundImage key={i} blok={blok} />
                case 'Section: Statistics': return <Statistics key={i} blok={blok} />
                case 'Section: Featured Posts': return <FeaturedPosts key={i} url={url} blogPosts={blogPosts} blok={blok} />
                case 'Section: Blog': return <Blog key={i} blogPosts={blogPosts} blok={blok} />
                case 'Section: Contact Us': return <ContactUs key={i} blok={blok} />
                case 'Section: Shop': return <Shop products={products} key={i} blok={blok} />
                case 'Section: Featured Products': return <FeaturedProducts url={url} products={products} key={i} blok={blok} />
                case 'Section: Photo Gallery': return <PhotoGallery key={i} blok={blok} />
            }
        })
    )
}
import { useContext } from "react"
import Link from "next/link"
import Seo from 'components/Layout/Seo'
import { StoreContext } from "components/Shopify/Misc/store-context"
import { getStoryblokApi } from "@storyblok/react";
import Header from 'components/Layout/Header/Header'
import Footer from 'components/Layout/Footer/Footer'
import { LineItem } from "components/Shopify/Misc/line-item"
import {
  section,
  wrapper,
  table,
  wrap,
  totals,
  grandTotal,
  summary,
  checkoutButton,
  collapseColumn,
  labelColumn,
  imageHeader,
  productHeader,
  emptyStateContainer,
  emptyStateHeading,
  emptyStateLink,
  title,
  quantity,
} from "./cart.module.scss"

export default function CartPage({ header, footer }) {
  const { checkout, loading } = useContext(StoreContext);
  const emptyCart = checkout.lineItems?.length === 0;

  const handleCheckout = () => {
    window.open(checkout.webUrl.replace('OLD_SHOPIFY_URL', 'NEW_SHOPIFY_URL'))
  }

  return (
    <>
      <Header
          data={header}
          url={'cart/'}
          showCart
      />

      <Seo
          title="Cart"
          description="Cart"
          url={'cart/'}
          noindex
      />

      <main className={section} id="content">
        <div className={`${wrapper} wrapper`}>
          <div className={wrap}>
            {emptyCart ? (
              <div className={emptyStateContainer}>
                <h1 className={emptyStateHeading}>Your cart is empty</h1>
                <p>
                  Looks like you haven’t found anything yet.
                </p>
                <Link href="/shop/" className={emptyStateLink}>
                  View products
                </Link>
              </div>
            ) : (
              <>
                <h1 className={title}>Your cart</h1>
                <table className={table}>
                  <thead>
                    <tr>
                      <th className={imageHeader}></th>
                      <th className={productHeader}>Product</th>
                      <th className={collapseColumn}>Price</th>
                      <th className={quantity}>Qty.</th>
                      <th className={[totals, collapseColumn].join(" ")}>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {checkout.lineItems.map((item) => (
                      <LineItem item={item} key={item.id} />
                    ))}

                    <tr className={summary}>
                      <td className={collapseColumn}></td>
                      <td className={collapseColumn}></td>
                      <td className={collapseColumn}></td>
                      <td className={labelColumn}>
                        {/* Subtotal */}
                      </td>
                      <td className={totals}>
                        {/* ${checkout.subtotalPriceV2.amount} */}
                      </td>
                    </tr>
                    <tr className={summary}>
                      <td className={collapseColumn}></td>
                      <td className={collapseColumn}></td>
                      <td className={collapseColumn}></td>
                      <td className={labelColumn}>
                        {/* Taxes */}
                      </td>
                      <td className={totals}>
                        {/* ${checkout.totalTaxV2.amount} */}
                      </td>
                    </tr>
                    <tr className={summary}>
                      <td className={collapseColumn}></td>
                      <td className={collapseColumn}></td>
                      <td className={collapseColumn}></td>
                      <td className={labelColumn}>Shipping</td>
                      <td className={totals}>Calculated at checkout</td>
                    </tr>
                    <tr className={grandTotal}>
                      <td className={collapseColumn}></td>
                      <td className={collapseColumn}></td>
                      <td className={collapseColumn}></td>
                      <td className={labelColumn}>Total before taxes</td>
                      <td className={totals}>
                        ${Number(checkout.totalPriceV2.amount).toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <button
                  onClick={() => { handleCheckout() }}
                  disabled={loading}
                  className={`${checkoutButton} button`}
                >
                  Checkout
                </button>
              </>
            )}
          </div>
        </div>
      </main>

      <Footer data={footer} />
    </>
  )
}


// Get page content by using getStaticProps (Next docs give more info about what it does)
export async function getStaticProps() {

  // Let's do a Storyblok API call to get the story content
  let header = await getStoryblokApi().get(`cdn/stories/site-configuration/header`, { version: "published" });
  let footer = await getStoryblokApi().get(`cdn/stories/site-configuration/footer`, { version: "published" });

  return {
    props: {
      header: header.data.story.content,
      footer: footer.data.story.content,
    },
    revalidate: 3600,
  };
}
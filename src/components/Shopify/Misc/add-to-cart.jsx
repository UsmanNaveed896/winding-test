import { useContext } from "react"
import { StoreContext } from "components/Shopify/Misc/store-context"
import { addToCart as addToCartStyle } from "./add-to-cart.module.scss"

export function AddToCart({ variant, product, variantId, quantity, available, ...props }) {
  const { addVariantToCart, loading } = useContext(StoreContext)

  function addToCart(e) {
    e.preventDefault()
    addVariantToCart(variantId, quantity)
  }

  return (
    <button
      type="submit"
      className={`${addToCartStyle} button`}
      onClick={(e) => addToCart(e)}
      disabled={!available || loading}
      {...props}
    >
      {available ? "Add to Cart" : "Out of Stock"}
    </button>
  )
}

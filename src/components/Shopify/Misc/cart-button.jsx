import Link from "next/link"
import CartIcon from "./Icons/cart"
import { cartButton, badge } from "./cart-button.module.css"

export function CartButton({ quantity }) {
  return (
    <Link
      aria-label={`Shopping Cart with ${quantity} items`}
      href="/cart/"
      className={cartButton}
    >
      <CartIcon />
      {quantity > 0 && <div className={badge}>{quantity}</div>}
    </Link>
  )
}

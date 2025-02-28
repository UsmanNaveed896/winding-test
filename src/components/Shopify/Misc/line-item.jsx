import * as React from "react"
import debounce from "lodash.debounce"
import { StoreContext } from "components/Shopify/Misc/store-context"
import DeleteIcon from "./Icons/delete"
import { NumericInput } from "./numeric-input"
import {
  title,
  remove,
  variant,
  totals,
  priceColumn,
  lineItem,
  img,
  imgWrapper
} from "./line-item.module.scss"

export function LineItem({ item }) {
  const {
    removeLineItem,
    checkout,
    updateLineItem,
    loading,
  } = React.useContext(StoreContext)
  const [quantity, setQuantity] = React.useState(item.quantity)

  function handleRemove() {
    window?.dataLayer && window.dataLayer.push({ ecommerce: null });  // Clear the previous ecommerce object.
    window?.dataLayer && window.dataLayer.push({
      event: "remove_from_cart",
      ecommerce: {
      items: [{
        item_id: item.variant.id.replace(/[^0-9]/g, ''),
        item_name: item?.title,
        affiliation: "Spotless Store",
        currency: "CAD",
        discount: item.variant?.compareAtPrice ? item.variant?.compareAtPrice - item.variant.price  : null,
        index: 0,
        // item_brand: (product?.collections[0]?.title !== "Skin Care" && product?.collections[0]?.title !== "Makeup" && product?.collections[0]?.title !== "12 Days of Christmas" ) ? product?.collections[0]?.title : product?.collections[1]?.title,
        google_business_vertical: "retail",
        // item_category: item.productType,
        price: item.variant?.price.amount,
        quantity: quantity
      }]
      }
    });

    removeLineItem(checkout.id, item.id)
  }

  const uli = debounce(
    (value) => updateLineItem(checkout.id, item.id, value),
    300
  )
  // eslint-disable-next-line
  const debouncedUli = React.useCallback((value) => uli(value), [])

  const handleQuantityChange = (value) => {
    if (value !== "" && Number(value) < 1) {
      return
    }
    setQuantity(value)
    if (Number(value) >= 1) {
      debouncedUli(value)
    }
  }

  function doIncrement() {
    handleQuantityChange(Number(quantity || 0) + 1)
  }

  function doDecrement() {
    handleQuantityChange(Number(quantity || 0) - 1)
  }

  return (
    <tr className={lineItem}>
      <td>

      </td>
      <td>
        <h2 className={title}>{item.title}</h2>
        <div className={variant}>
          {item.variant.title === "Default Title" ? "" : item.variant.title}
        </div>
        <div className={remove}>
          <button onClick={() => { handleRemove() }}>
            <DeleteIcon /> Remove
          </button>
        </div>
      </td>
      <td className={priceColumn}>
        {item.variant?.compareAtPriceV2?.amount &&
          <><span>${Number(item.variant?.compareAtPriceV2?.amount).toFixed(2)}</span><br/></>
        }
        ${Number(item.variant.priceV2.amount).toFixed(2)}
      </td>
      <td>
        <NumericInput
          disabled={loading}
          value={quantity}
          aria-label="Quantity"
          onIncrement={doIncrement}
          onDecrement={doDecrement}
          onChange={(e) => handleQuantityChange(e.currentTarget.value)}
        />
      </td>
      <td className={totals}>
        {item.variant?.compareAtPriceV2?.amount &&
          <><span>${Number((item.variant?.compareAtPriceV2?.amount) * quantity).toFixed(2)}</span><br/></>
        }
        ${Number((item.variant.priceV2.amount) * quantity).toFixed(2)}
      </td>
    </tr>
  )
}

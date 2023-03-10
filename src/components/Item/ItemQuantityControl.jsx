import { motion } from "framer-motion"
import React, { useCallback } from "react"
import { BiMinus, BiPlus } from "react-icons/bi"

import { actionType, useStateValue } from "@/context"

const ItemQuantityControl = ({ item, bgColor = "white" }) => {
  const [{ cartItems }, dispatch] = useStateValue()
  const isBgWhite = bgColor === "white"

  const updateQty = useCallback(
    (action, itemId) => {
      const item = cartItems[itemId]
      let newItem = null
      switch (action) {
        case "add": {
          newItem = { ...item, cartQty: item.cartQty + 1 }
          break
        }
        case "remove": {
          if (item.cartQty > 1) {
            newItem = { ...item, cartQty: item.cartQty - 1 }
          }
          break
        }
      }

      let newCartItems = null
      if (!newItem) {
        const { [itemId]: _, ...rest } = cartItems
        newCartItems = rest
      } else {
        newCartItems = { ...cartItems, [itemId]: newItem }
      }

      dispatch({
        type: actionType.SET_CART,
        cartItems: newCartItems,
      })
    },
    [cartItems]
  )

  return (
    <div className="group ml-auto flex cursor-pointer select-none items-center gap-2">
      <motion.div
        whileTap={{ scale: 0.75 }}
        onClick={() => updateQty("remove", item.id)}
      >
        <BiMinus
          className={`${
            isBgWhite ? "text-textColor dark:text-primary" : "text-gray-50"
          }  cursor-pointer`}
        />
      </motion.div>

      <p
        className={`h-5 w-5 rounded-sm ${
          isBgWhite ? "bg-gray-200 text-textColor" : "bg-cartBg text-gray-50"
        }   flex items-center justify-center`}
      >
        {item.cartQty}
      </p>

      <motion.div
        whileTap={{ scale: 0.75 }}
        onClick={() => updateQty("add", item.id)}
      >
        <BiPlus
          className={`${
            isBgWhite ? "text-textColor dark:text-primary" : "text-gray-50"
          }  cursor-pointer`}
        />
      </motion.div>
    </div>
  )
}

export default ItemQuantityControl

import { motion } from "framer-motion"
import React, { createRef, useState } from "react"
import { MdChevronLeft, MdChevronRight } from "react-icons/md"

import { Heading } from "@/components"
import { ItemListRow } from "@/components/Item"
import { useStateValue } from "@/context"

const ContentSectionSlider = () => {
  const ref = createRef()

  const [{ foodItems }, dispatch] = useStateValue()
  const fruitsData = foodItems?.filter((item) => item.category === "fruits")

  const [scrollX, setScrollX] = useState(0)
  const [endScroll, setEndScroll] = useState(false)

  const handleScroll = (offset) => {
    ref.current.scrollLeft += offset
    setScrollX(scrollX + offset) // update current position X

    if (Math.floor(ref.current.scrollWidth - ref.current.scrollLeft) <= ref.current.offsetWidth) {
      setEndScroll(true)
    } else {
      setEndScroll(false)
    }
  }

  return (
    <div className="w-full my-3">
      <div className="w-full flex items-center justify-between">
        <Heading title="Our fresh & healthy fruits" />

        <div className="hidden md:flex gap-3 items-center">
          <motion.button
            whileTap={{ scale: 0.75 }}
            className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 flex items-center justify-center cursor-pointer"
            onClick={() => handleScroll(-200)}
            disabled={scrollX === 0}
          >
            <MdChevronLeft className="text-lg text-white" />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.75 }}
            className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 flex items-center justify-center cursor-pointer"
            onClick={() => handleScroll(200)}
            disabled={endScroll}
          >
            <MdChevronRight className="text-lg text-white" />
          </motion.button>
        </div>
      </div>

      <ItemListRow ref={ref} scrollable={true} items={fruitsData} />
    </div>
  )
}

export default ContentSectionSlider
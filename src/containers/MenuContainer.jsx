import React, { useState, useEffect } from "react"

import { CategoryCard, Heading } from "../components"
import { categoriesData } from "../utils/data"

const MenuContainer = () => {
  const [filter, setFilter] = useState("chicken")

  useEffect(() => {
    console.log(filter)
  }, [filter])

  return (
    <section id="menu" className="w-full my-6">
      <div className="w-full flex flex-col items-center justify-center">
        <Heading title="Our Hot Dishes" className="before:left-6" />

        <div className="w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none">
          {categoriesData &&
            categoriesData.map((category) => (
              <CategoryCard
                key={category.id}
                data={category}
                isActive={filter === category.urlParamName}
                onClick={() => setFilter(category.urlParamName)}
              />
            ))}
        </div>
      </div>
    </section>
  )
}

export default MenuContainer

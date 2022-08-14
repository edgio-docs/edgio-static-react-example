import LeftSidebar from './LeftSidebar'
import RightSidebar from './RightSidebar'
import ProductPreview from './ProductPreview'
import { filterProducts } from '../lib/helper'
import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

const Commerce = ({}) => {
  let { name } = useParams()
  let [searchParams, setSearchParams] = useSearchParams()

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      let resp = await fetch(name ? `/l0-api/categories/${name}` : '/l0-api/products/all')
      let data = await resp.json()
      if (name) {
        data = data['items']
      }
      let filter = searchParams.get('filter')
      if (filter) {
        data = filterProducts(data, filter)
      }
      setData(data)
      setLoading(false)
    }
    fetchData()
  }, [name, searchParams])

  return (
    <div className="flex-col items-center justify-start">
      <div className="mb-5 flex w-full flex-row items-start px-5">
        <div className="hidden w-[15%] pt-5 md:block">
          <LeftSidebar />
        </div>
        <div className="flex w-full flex-col items-start pt-5 md:w-[70%]">
          <h2 className="text-[#FFFFFF75]">Showing {loading ? '...' : data.length} Results</h2>
          <div className="mt-5 flex flex-row flex-wrap items-start">
            {loading &&
              new Array(12)
                .fill(0)
                .map((_, _ind) => ({
                  name: '',
                  path: `/${_ind}`,
                  images: [{ url: 'https://via.placeholder.com/250x250' }],
                  prices: { price: { value: '', currencyCode: '' } },
                }))
                .map((i) => <ProductPreview key={i.path} loading={true} {...i} />)}
            {!loading && data.map((i) => <ProductPreview key={i.path} {...i} />)}
          </div>
        </div>
        <div className="hidden w-[15%] pt-5 md:block">
          <RightSidebar />
        </div>
      </div>
    </div>
  )
}

export default Commerce

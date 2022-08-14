import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { Prefetch } from '@layer0/react'
import React, { Fragment, useEffect, useState } from 'react'

const LeftSidebar = ({ pathname = window.location.pathname }) => {
  const [listingItems, setListingItems] = useState([])
  useEffect(() => {
    fetch('/l0-api/categories/all')
      .then((res) => res.json())
      .then((res) => {
        setListingItems(res)
      })
  }, [])
  return (
    <div className="flex w-full flex-col">
      <Link to={`/commerce`}>
        <Prefetch href={`/l0-api/products/all`}>
          <h3
            className={classNames(
              'text-md',
              { 'font-light text-[#FFFFFF75]': pathname !== `/commerce` },
              { 'font-medium text-[#FFFFFF]': pathname === `/commerce` }
            )}
          >
            Shop All
          </h3>
        </Prefetch>
      </Link>
      {listingItems.map((item) => (
        <Fragment key={item.slug}>
          <Link to={`/commerce/${item.slug}`}>
            <Prefetch url={`/l0-api/categories/${item.slug}`}>
              <h3
                className={classNames(
                  'text-md mt-2',
                  { 'font-light text-[#FFFFFF75]': pathname !== `/commerce/${item.slug}` },
                  { 'font-medium text-[#FFFFFF]': pathname === `/commerce/${item.slug}` }
                )}
              >
                {item.name}
              </h3>
            </Prefetch>
          </Link>
        </Fragment>
      ))}
    </div>
  )
}

export default LeftSidebar

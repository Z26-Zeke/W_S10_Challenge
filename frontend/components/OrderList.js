import React from 'react'
import {useDispatch, useSelector } from 'react-redux'
import { changeSizeFilter } from '../state/pizzaReducer'
import { useGetPizzaOrderQuery } from '../state/pizzaApi'
export default function OrderList() {
  const {data: orders} = useGetPizzaOrderQuery()
  const dispatch = useDispatch()
  const sizeFilter = useSelector(state => state.pizzaReducer.sizeFilter)
  const filters =  orders && sizeFilter !== 'All' ? orders.filter(ord => ord.size == sizeFilter) : orders
  
  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {
          orders && filters.map((order, key) => {
            return (
              <li key={key}>
                <div>
                  {order.customer} ordered a size {order.size} with {order.toppings ? order.toppings.length : 'no'} toppings
                </div>
              </li>
            )
          })
        }
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {
          ['All', 'S', 'M', 'L'].map(size => {
            const className = `button-filter${size === sizeFilter ? ' active' : ''}`
            return <button onClick={() => dispatch(changeSizeFilter(size))}
              data-testid={`filterBtn${size}`}
              className={className}
              key={size}>{size}
              </button>
          })
        }
      </div>
    </div>
  )
}
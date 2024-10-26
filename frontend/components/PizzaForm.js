import React, { useReducer } from 'react'
import { useMakeOrderMutation } from '../state/pizzaApi'
const initialFormState = { // suggested
  fullName: '',
  size: '',
  '1': false,
  '2': false,
  '3': false,
  '4': false,
  '5': false,
}
const NAME = 'name'
const SIZE = 'size'
const TOPPING = 'topping'
const RESET = 'reset'
const reducer = (state, action) => {
  switch(action.type) {
    case NAME: return {...state, fullName: action.payload}
    case SIZE: return {...state, size: action.payload}
    case TOPPING: return {...state, [action.title]: action.payload}
    case RESET: return {...initialFormState}
    default: return state
  }
}
export default function PizzaForm() {
  const [makeOrder, {isLoading, error}] = useMakeOrderMutation()
  const [state, dispatch] = useReducer(reducer, initialFormState)
  const onchange = (evt) => {
    const {value, type, name, checked} = evt.target
    console.log(checked, type, name)
    if (name == 'fullName') dispatch({type: NAME, payload: value})
    if (name == 'size') dispatch({type: SIZE, payload: value})
    if (type == 'checkbox') dispatch({type: TOPPING, title: name, payload: checked})
  }
  const onSubmit = evt => {
    evt.preventDefault()
    const toppings = Object.keys(state).filter(key => state[key] === true);
    makeOrder({fullName: state.fullName, size: state.size, toppings: toppings})
    .then(() => dispatch({type: RESET})).catch(err => {})
  }
  return (
    <form onSubmit={onSubmit}>
      <h2>Pizza Form</h2>
      {isLoading && <div className='pending'>Order in progress...</div>}
      {error && <div className='failure'>{error.data.message}</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input
            data-testid="fullNameInput"
            id="fullName"
            name="fullName"
            placeholder="Type full name"
            type="text"
            value={state.fullName}
            onChange={onchange}
          />
        </div>
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select data-testid="sizeSelect" id="size" name="size" onChange={onchange}>
            <option value="">----Choose size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
      </div>

      <div className="input-group">
        <label>
          <input data-testid="checkPepperoni" name="1" type="checkbox" onChange={onchange} checked={state[1]}/>
          Pepperoni<br /></label>
        <label>
          <input data-testid="checkGreenpeppers" name="2" type="checkbox" onChange={onchange} checked={state[2]}/>
          Green Peppers<br /></label>
        <label>
          <input data-testid="checkPineapple" name="3" type="checkbox" onChange={onchange} checked={state[3]}/>
          Pineapple<br /></label>
        <label>
          <input data-testid="checkMushrooms" name="4" type="checkbox" onChange={onchange} checked={state[4]}/>
          Mushrooms<br /></label>
        <label>
          <input data-testid="checkHam" name="5" type="checkbox" onChange={onchange} checked={state[5]}/>
          Ham<br /></label>
      </div>
      <input data-testid="submit" type="submit" />
    </form>
  )
}
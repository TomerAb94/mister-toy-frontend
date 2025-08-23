// import { UserMsg } from './UserMsg.jsx'
// import { ShoppingToyt } from './ShoppingToyt.jsx'
// import { TOGGLE_TOYT_IS_SHOWN } from '../store/reducers/toy.reducer.js'
import { useDispatch, useSelector } from 'react-redux'

export function AppFooter() {
    const dispatch = useDispatch()
    // const isToytShown = useSelector(storeState => storeState.toyModule.isToytShown)
    // const count = useSelector(storeState => storeState.userModule.count)
    // const toysLength = useSelector(storeState => storeState.toyModule.toys.length)
    // const shoppingToytLength = useSelector(storeState => storeState.toyModule.shoppingToyt.length)

    return (
        <footer className='app-footer'>
            {/* <h5> */}
                {/* Currently {toysLength} toys in the shop */}
            {/* </h5> */}
            {/* <p> */}
                {/* Coffeerights to all - Count: {count} */}
            {/* </p> */}
            {/* <h5>
                <span>{shoppingToytLength}</span> Products in your Toyt
                <a href="#" onClick={(ev) => {
                    ev.preventDefault()
                    dispatch({ type: TOGGLE_TOYT_IS_SHOWN })
                }}>
                    ({(isToytShown) ? 'hide' : 'show'})
                </a> */}
            {/* </h5> */}
            {/* <ShoppingToyt isToytShown={isToytShown} /> */}
            {/* <UserMsg /> */}
        </footer>
    )
}

import logoImg from "../assets/img/logo.jpg"

// import { useDispatch, useSelector } from "react-redux"
// import { CHANGE_BY } from "../store/reducers/user.reducer.js"
// import { useState } from "react"

// const { useState } = React
// const { useSelector, useDispatch } = ReactRedux


export function HomePage() {
    // const dispatch = useDispatch()
    // const [_count, setCount] = useState(10)
    // const count = useSelector(storeState => storeState.count)

    // function changeCount(diff) {
    //     // setCount(count => count + diff)
    //     // dispatch({ type: INCREMENT })
    //     dispatch({ type: CHANGE_BY, diff })
    // }

    return (
        <section>
            {/* <h2> */}
                {/* Count {count} */}
                {/* <button onClick={() => { */}
                    {/* changeCount(1) */}
                {/* }}>+</button> */}
                {/* <button onClick={() => { */}
                    {/* changeCount(10) */}
                {/* }}>+10</button> */}
            {/* </h2 > */}
            <img src={logoImg} />
        </section >
    )
}
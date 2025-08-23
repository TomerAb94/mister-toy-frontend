import { useEffect, useState } from 'react'
import { toyService } from '../services/toy.service-local.js'
import { Link, useParams ,useNavigate} from 'react-router-dom'

export function ToyDetails() {
  const [toy, setToy] = useState(null)
  const { toyId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (toyId) loadToy()
  }, [toyId])

  function loadToy() {
    toyService
      .getById(toyId)
      .then((toy) => setToy(toy))
      .catch((err) => {
        console.log('Had issues in toy details', err)
        navigate('/toy')
      })
  }
  if (!toy) return <div>Loading...</div>
  return (
    <section className="toy-details">
      <h1>Toy name : {toy.name}</h1>
      <h5>Price: ${toy.price}</h5>
      <img src={toy.imgUrl} alt="" style={{ maxWidth: '200px' }} />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi voluptas
        cumque tempore, aperiam sed dolorum rem! Nemo quidem, placeat
        perferendis tempora aspernatur sit, explicabo veritatis corrupti
        perspiciatis repellat, enim quibusdam!
      </p>
      <ul>
        {toy.labels.map((label) => (
          <li key={label}>{label}</li>
        ))}
      </ul>
      <h6>
        {toy.inStock ? (
          <span>In Stock Since {new Date(toy.createdAt).toLocaleString()}</span>
        ) : (
          <span>Out of Stock</span>
        )}
      </h6>
      <button><Link to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp;</button>
      <button><Link to={`/toy`}>Back</Link></button>
      <p>
        <button><Link to="/toy/11ex6">Next Toy</Link></button>
      </p>
    </section>
  )
}

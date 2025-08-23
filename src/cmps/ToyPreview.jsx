
export function ToyPreview({ toy }) {
  return (
    <article>
      <h4>{toy.name}</h4>
      <img src={toy.imgUrl} alt="" style={{ maxWidth: '200px' }} />
      <p>
        Price: <span>${toy.price.toLocaleString()}</span>
      </p>
      {/* {toy.owner && <p>Owner: <Link to={`/user/${toy.owner._id}`}>{toy.owner.fullname}</Link></p>} */}
    </article>
  )
}

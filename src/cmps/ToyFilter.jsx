import { useEffect, useRef, useState } from 'react'
import { utilService } from '../services/util.service.js'
import { getLabels } from '../services/toy.service-local.js'

export function ToyFilter({ filterBy, onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
  onSetFilter = useRef(utilService.debounce(onSetFilter, 300))

  useEffect(() => {
    onSetFilter.current(filterByToEdit)
  }, [filterByToEdit])

  function handleChange({ target }) {
    let { value, name: field, type } = target
    console.log(value, field, type)

    value = type === 'number' ? +value : value

    if (field === 'inStock') {
      if (value === 'true') value = true
      else if (value === 'false') value = false
      else value = ''
    }

    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
  }

  function handleLabelClick(label) {
    setFilterByToEdit((prevFilter) => ({
      ...prevFilter,
      labels: prevFilter.labels?.includes(label)
        ? prevFilter.labels.filter((l) => l !== label)
        : [...(prevFilter.labels || []), label],
    }))
  }

  return (
    <section className="toy-filter full main-layout">
      <h2>Toys Filter</h2>
      <form>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="txt"
          placeholder="By name"
          value={filterByToEdit.txt}
          onChange={handleChange}
        />

        <label htmlFor="maxPrice">Max price:</label>
        <input
          type="number"
          id="maxPrice"
          name="maxPrice"
          placeholder="By max price"
          value={filterByToEdit.maxPrice || ''}
          onChange={handleChange}
        />

        <label htmlFor="inStock"> In Stock:</label>
        <select name="inStock" id="inStock" onChange={handleChange}>
          <option value="">All</option>
          <option value="true">In Stock</option>
          <option value="false">Out of Stock</option>
        </select>

        <div className="labels-filter">
          <label>Labels:</label>
          <div className="labels-container">
            {getLabels().map((label) => (
              <button
                key={label}
                type="button"
                className={`label-btn ${
                  filterByToEdit.labels?.includes(label) ? 'selected' : ''
                }`}
                onClick={() => handleLabelClick(label)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <label htmlFor="sortBy">Sort By:</label>
        <select
          name="sortBy"
          id="sortBy"
          value={filterByToEdit.sortBy}
          onChange={handleChange}
        >
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="createdAt">Created At</option>
        </select>
      </form>
    </section>
  )
}

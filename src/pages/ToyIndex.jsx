import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { ToyList } from '../cmps/ToyList.jsx'
import { toyService } from '../services/toy.service-local.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import {
  loadToys,
  removeToy,
  removeToyOptimistic,
  saveToy,
  setFilterBy,
} from '../store/actions/toy.actions.js'

export function ToyIndex() {
  const toys = useSelector((storeState) => storeState.toyModule.toys)
  const filterBy = useSelector((storeState) => storeState.toyModule.filterBy)
  const isLoading = useSelector((storeState) => storeState.toyModule.isLoading)

  useEffect(() => {
    async function fetchToys() {
      try {
        await loadToys()
      } catch (err) {
        showErrorMsg('Cannot load toys!')
      }
    }
    fetchToys()
  }, [filterBy])

  function onSetFilter(filterBy) {
    setFilterBy(filterBy)
  }

  async function onRemoveToy(toyId) {
    try {
      await removeToyOptimistic(toyId)
      showSuccessMsg('Toy removed')
    } catch (err) {
      showErrorMsg('Cannot remove toy')
    }
  }

  async function onAddRandomToy() {
    try {
      const toyToSave = toyService.getRandomToy()
      const savedToy = await saveToy(toyToSave)
      showSuccessMsg(`Toy added (id: ${savedToy._id})`)
    } catch (err) {
      showErrorMsg('Cannot add toy')
    }
  }

  return (
    <div>
      <h3>Toys App</h3>
      <main>
        <button>
          <Link to="/toy/edit">Add Toy</Link>
        </button>
        <button className="add-btn" onClick={onAddRandomToy}>
          Add Random Toy 🧸
        </button>
        <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
        {!isLoading ? (
          <ToyList
            toys={toys}
            onRemoveToy={onRemoveToy}
          />
        ) : (
          <div>Loading...</div>
        )}
      </main>
    </div>
  )
}

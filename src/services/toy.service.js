import { utilService } from './util.service.js'
import { httpService } from './http.service.js'

const BASE_URL = 'toy/'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
    getRandomToy
}

function query(filterBy = {}) {
    return httpService.get(BASE_URL, filterBy)
}

function getById(toyId) {
    return httpService.get(BASE_URL + toyId)

}
function remove(toyId) {
    return httpService.delete(BASE_URL + toyId) 
}

function save(toy) {
    if (toy._id) {
        return httpService.put(BASE_URL + toy._id, toy)
    } else {
        return httpService.post(BASE_URL, toy)
    }
}


function getEmptyToy() {
  return {
    name: '',
    price: '',
    imgUrl: 'https://purepng.com/public/uploads/large/minion-toy-vbr.png',
    labels: [],
    createdAt: Date.now(),
    inStock: false,
  }
}


function getRandomToy() {
  return {
    name: 'toy-' + (Date.now() % 1000),
    imgUrl: 'https://purepng.com/public/uploads/large/minion-toy-vbr.png',
    price: utilService.getRandomIntInclusive(1000, 9000),
    labels: utilService.getRandomArrItems(getLabels()),
    createdAt: Date.now(),
    inStock: Math.random() > 0.5,
  }
}


function getDefaultFilter() {
  return { txt: '', maxPrice: '', labels: [], inStock: '' }
}

export function getLabels() {
  const labels = [
    'On wheels',
    'Box game',
    'Art',
    'Baby',
    'Doll',
    'Puzzle',
    'Outdoor',
    'Battery Powered',
  ]
  return labels
}


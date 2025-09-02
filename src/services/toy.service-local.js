import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'toyDB'

export const toyService = {
  query,
  getById,
  save,
  remove,
  getEmptyToy,
  getRandomToy,
  getDefaultFilter,
  getLabels,
}

function query(filterBy = {}) {
  // console.log('filterBy', filterBy)

  return storageService.query(STORAGE_KEY).then((toys) => {
    let toysToShow = toys

    //* Filter by text
    if (filterBy.txt) {
      const regExp = new RegExp(filterBy.txt, 'i')
      toysToShow = toysToShow.filter((toy) => regExp.test(toy.name))
    }

    //* Filter by maxPrice
    if (filterBy.maxPrice) {
      toysToShow = toysToShow.filter((toy) => toy.price <= filterBy.maxPrice)
    }

    //* Filter by inStock
    if (filterBy.inStock !== '') {
      toysToShow = toysToShow.filter(
        (toy) => toy.inStock === (filterBy.inStock === 'true')
      )
    }

    //* Filter by labels
    if (filterBy.labels && filterBy.labels.length) {
      toysToShow = toysToShow.filter((toy) =>
        filterBy.labels.every((label) => toy.labels.includes(label))
      )
    }

    //* Sort
    if (filterBy.sortBy) {
      if (filterBy.sortBy === 'name') {
        toysToShow = toysToShow.sort((a, b) => a.name.localeCompare(b.name))
      } else if (filterBy.sortBy === 'price') {
        toysToShow = toysToShow.sort((a, b) => a.price - b.price)
      } else if (filterBy.sortBy === 'createdAt') {
        toysToShow = toysToShow.sort((a, b) => b.createdAt - a.createdAt)
      }
    }

    return toysToShow
  })
}

function getById(toyId) {
  return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
  // return Promise.reject('Not now!')
  return storageService.remove(STORAGE_KEY, toyId)
}

function save(toy) {
  if (toy._id) {
    return storageService.put(STORAGE_KEY, toy)
  } else {
    // when switching to backend - remove the next line
    // toy.owner = userService.getLoggedinUser()
    return storageService.post(STORAGE_KEY, toy)
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

// TEST DATA

// const demoToys = [
//   {
//     _id: 't101',
//     name: 'Talking Doll',
//     imgUrl: 'https://purepng.com/public/uploads/large/minion-toy-vbr.png',
//     price: 123,
//     labels: ['Doll', 'Battery Powered', 'Baby'],
//     createdAt: 1631031801011,
//     inStock: true,
//   },
//   {
//     _id: 't102',
//     name: 'Toy Toy',
//     imgUrl: 'https://purepng.com/public/uploads/large/minion-toy-vbr.png',
//     price: 99,
//     labels: ['On wheels', 'Battery Powered', 'Outdoor'],
//     createdAt: 1631031801012,
//     inStock: true,
//   },
//   {
//     _id: 't103',
//     name: 'Puzzle Set',
//     imgUrl: 'https://purepng.com/public/uploads/large/minion-toy-vbr.png',
//     price: 45,
//     labels: ['Puzzle', 'Art', 'Indoor'],
//     createdAt: 1631031801013,
//     inStock: true,
//   },
//   {
//     _id: 't104',
//     name: 'Box Game',
//     imgUrl: 'https://purepng.com/public/uploads/large/minion-toy-vbr.png',
//     price: 60,
//     labels: ['Box game', 'Indoor', 'Baby'],
//     createdAt: 1631031801014,
//     inStock: true,
//   },
//   {
//     _id: 't105',
//     name: 'Art Supplies',
//     imgUrl: 'https://purepng.com/public/uploads/large/minion-toy-vbr.png',
//     price: 25,
//     labels: ['Art', 'Indoor', 'Baby'],
//     createdAt: 1631031801015,
//     inStock: true,
//   },
//   {
//     _id: 't106',
//     name: 'Outdoor Scooter',
//     imgUrl: 'https://purepng.com/public/uploads/large/minion-toy-vbr.png',
//     price: 150,
//     labels: ['On wheels', 'Outdoor', 'Battery Powered'],
//     createdAt: 1631031801016,
//     inStock: true,
//   },
//   {
//     _id: 't107',
//     name: 'Baby Rattle',
//     imgUrl: 'https://purepng.com/public/uploads/large/minion-toy-vbr.png',
//     price: 15,
//     labels: ['Baby', 'Doll', 'Indoor'],
//     createdAt: 1631031801017,
//     inStock: true,
//   },
//   {
//     _id: 't108',
//     name: 'Doll House',
//     imgUrl: 'https://purepng.com/public/uploads/large/minion-toy-vbr.png',
//     price: 80,
//     labels: ['Doll', 'Indoor', 'Art'],
//     createdAt: 1631031801018,
//     inStock: true,
//   },
// ]

// storageService.post(STORAGE_KEY, {
//     name: 'Talking Doll',
//     imgUrl: 'https://purepng.com/public/uploads/large/minion-toy-vbr.png',
//     price: 123,
//     labels: ['Doll', 'Battery Powered', 'Baby'],
//     createdAt: 1631031801011,
//     inStock: true,}).then(x => console.log(x))

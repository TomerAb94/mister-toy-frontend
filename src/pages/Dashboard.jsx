import { useSelector } from 'react-redux'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js'
import { Pie, Bar } from 'react-chartjs-2'
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
)
import { getLabels } from '../services/toy.service.js'

export function Dashboard() {
  const toys = useSelector((storeState) => storeState.toyModule.toys)
  const labels = getLabels().map((label) => label)
  const labelsData = getLabelsData()

  function getLabelsData() {
    const res = labels.map((label) => ({ label: label, amount: 0, sumedPrice:0 }))
    toys.forEach((toy) => {
      toy.labels.forEach((toyLabel) => {
        const match = res.find((item) => item.label === toyLabel)
        if (match) {
          match.amount += 1
          match.sumedPrice+=toy.price
        }
      })
    })

    return res
  }

  const pieData = {
    labels: labels,
    datasets: [
      {
        label: 'number of toys',
        data: labelsData.map((label) => label.amount),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(112, 90, 68, 0.2)',
          'rgba(99, 187, 111, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(129, 146, 36, 1)',
          'rgba(158, 164, 120, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  const BarData = {
    labels: labels,
    datasets: [
      {
        // label: labels,
        data: labelsData.map((label) => label.sumedPrice/label.amount),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(112, 90, 68, 0.2)',
          'rgba(99, 187, 111, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(129, 146, 36, 1)',
          'rgba(158, 164, 120, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  return (
    <section className="my-chart">
      <h1>Toys Data</h1>
      <h4>Inventory by Label</h4>
      <Pie data={pieData} />
      <h4>Avarage Price by Label</h4>
      <Bar data={BarData} />
    </section>
  )
}

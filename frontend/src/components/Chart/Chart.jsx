import './Chart.scss'

import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const data = [
  { name: 'Jan', Total: 1200 },
  { name: 'Feb', Total: 2100 },
  { name: 'Mar', Total: 800 },
  { name: 'Apr', Total: 1600 },
  { name: 'May', Total: 900 },
  { name: 'Jun', Total: 3600 },
  { name: 'Jul', Total: 500 },
  { name: 'Aug', Total: 110 },
  { name: 'Sep', Total: 448 },
]

const Chart = ({ aspect, title, height }) => {
  return (
    <div className='chart'>
      <div className='title'>{title}</div>
      <ResponsiveContainer width='100%' height={height} aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id='total' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='#8884d8' stopOpacity={0.8} />
              <stop offset='95%' stopColor='#8884d8' stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey='name' stroke='gray' />
          <CartesianGrid strokeDasharray='3 3' className='chartGrid' />
          <Tooltip />
          <Area
            type='monotone'
            dataKey='Total'
            stroke='#8884d8'
            fillOpacity={1}
            fill='url(#total)'
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Chart

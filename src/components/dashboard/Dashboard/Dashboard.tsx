import { Grid } from '@mui/material'
import Statics from './Statics'

import RevenueCharts from './RevenueCharts'
import UserGrowthChart from './UserGrowthChart'

export const Dashboard = () => {

  return (
    <div>
      <Grid container spacing={2}>
        <Grid size={12}><Statics /></Grid>
        <Grid size={6}>
          <RevenueCharts />
        </Grid>
        <Grid size={6}>
          <UserGrowthChart />
        </Grid>
      </Grid>
    </div>
  )
}

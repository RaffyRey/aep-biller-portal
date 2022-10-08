import { Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

const Footer = () => {
  const [year, setYear] = useState()

  useEffect(() => {
    setYear(new Date().getFullYear())
  }, [])

  return (
    <Typography variant='subtitle1' fontSize={10} color="#545252" marginTop={4}>© {year} AllEasy</Typography>
  )
}

export default Footer
import * as React from 'react'
import PropTypes, { InferProps } from 'prop-types'
import { Icon } from '@iconify/react'
import { Box } from '@mui/material'

Iconify.propTypes = {
  sx: PropTypes.object,
  icon: PropTypes.oneOfType([PropTypes.any, PropTypes.string]).isRequired,
  width: PropTypes.any,
  height: PropTypes.any,
  color: PropTypes.any
}

export default function Iconify (props: InferProps<typeof Iconify.propTypes>) {
  const { icon, sx, ...other } = props
  return <Box component={Icon} icon={icon} sx={{ ...sx }} {...other} />
}
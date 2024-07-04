import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { Card } from '@mui/material'

function createData(members: string, mP: string, yP: string) {
  return { members, mP, yP }
}

const rows = [
  createData('For the first 1 - 24', '$4.99', '$4.49'),
  createData('For the next 25 - 99', '$4.49', '$4.04'),
  createData('For the next 100 - 249', '$3.99', '$3.59'),
  createData('For the next 250 - 999', '$3.49', '$3.14'),
  createData('For the next 1000+', '$2.99', '$2.69')
]

export default function PlansTable() {
  return (
    <TableContainer component={Card} sx={{ marginTop: '10px' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Members</TableCell>
            <TableCell align='center'>
              Monthly
              <br />
              <span>Price Per user, per month</span>
            </TableCell>
            <TableCell align='center'>
              Yearly
              <br />
              <span>Price Per user, per month</span>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.members} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component='th' scope='row'>
                {row.members}
              </TableCell>
              <TableCell align='right'>{row.mP}</TableCell>
              <TableCell align='right'>{row.yP}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

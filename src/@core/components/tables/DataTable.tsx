import React, { useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Card } from '@mui/material'

interface DataTableProps {
  results: any
  totalResults?: number
  columns: any
  setQuery: (query: any) => void
}

const DataTable: React.FC<DataTableProps> = props => {
  const { results, totalResults, columns, setQuery } = props

  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 10
  })

  useEffect(() => {
    setQuery({ page: paginationModel.page + 1, limit: paginationModel.pageSize })
  }, [paginationModel, setQuery])

  return (
    <Card sx={{ width: '100%' }}>
      <DataGrid
        autoHeight
        rows={results || []}
        columns={columns}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        disableRowSelectionOnClick
        pageSizeOptions={[10, 25, 50]}
        pagination // Enable pagination
        paginationMode='server' // Set pagination mode to server
        rowCount={totalResults || 0} // Set the total number of rows
        sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0, width: '100%' } }}
      />
    </Card>
  )
}

export default DataTable

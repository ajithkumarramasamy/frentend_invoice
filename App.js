import {Component} from 'react'
import './App.css'
import {
  TextField,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core'

class App extends Component {
  state = {
    filterFinancialYear: '',
    filterInvoiceNumber: '',
    filterFromDate: '',
    filterToDate: '',
    fullData: [],
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const {
      filterFinancialYear,
      filterInvoiceNumber,
      filterFromDate,
      filterToDate,
    } = this.state
    const url = `https://invoice-database.onrender.com?${filterFinancialYear}&${filterInvoiceNumber}&${filterFromDate}&${filterToDate}`
    const options = {
      method: 'GET',
    }
    try {
      const data = await fetch(url, options)
      const convertedData = await data.json()
      this.setState({fullData: convertedData})
    } catch (error) {
      console.error(error.message)
    }
  }

  setFilterFinancialYear = event => {
    this.setState({filterFinancialYear: event.target.value})
  }

  setFilterInvoiceNumber = event => {
    this.setState({filterInvoiceNumber: event.target.value})
  }

  setFilterFromDate = event => {
    this.setState({filterFromDate: event.target.value})
  }

  setFilterToDate = event => {
    this.setState({filterToDate: event.target.value})
  }

  handleFilter = () => {
    this.getData()
  }

  render() {
    const {
      filterFinancialYear,
      filterInvoiceNumber,
      filterFromDate,
      filterToDate,
      fullData,
    } = this.state
    console.log(
      filterFinancialYear,
      filterInvoiceNumber,
      filterFromDate,
      filterToDate,
    )
    return (
      <div>
        <div>
          <TextField
            label="Financial Year"
            value={filterFinancialYear}
            onChange={this.setFilterFinancialYear}
            className="style"
          />
          <TextField
            label="Invoice Number"
            value={filterInvoiceNumber}
            onChange={this.setFilterInvoiceNumber}
            className="style"
          />
          <TextField
            type="date"
            label="From Date"
            value={filterFromDate}
            onChange={this.setFilterFromDate}
            className="style"
          />
          <TextField
            type="date"
            label="To Date"
            value={filterToDate}
            onChange={this.setFilterToDate}
            className="style"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleFilter}
            className="button"
          >
            Filter
          </Button>
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Invoice Number</TableCell>
              <TableCell>Invoice Date</TableCell>
              <TableCell>Invoice Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fullData.map(each => (
              <TableRow key={each.id}>
                <TableCell>{each.InvoiceNumber}</TableCell>
                <TableCell>{each.InvoiceDate}</TableCell>
                <TableCell>{each.InvoiceAmount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }
}

export default App

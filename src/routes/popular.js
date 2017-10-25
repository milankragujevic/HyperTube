import React, { Component } from 'react'
import axios from 'axios'
import Grid from '../components/grid'

class Accueil extends Component {
  constructor (props) {
    super(props)
    this.state = {
      page: 1,
      result: [],
      hasMore: true,
      nbPage: ''
    }
    this.handleChangePage = this.handleChangePage.bind(this)
  }

  handleChangePage () {
    axios.get(`https://api.themoviedb.org/3/movie/popular`, {
      params: {
        api_key: '4add767f00472cadffc84346bd8572e6',
        page: this.state.page,
        language: 'fr'
      }
    }).then((res) => {
      if (this.state.page === res.data.total_pages) this.setState({hasMore: false})
      this.setState({
        page: this.state.page + 1,
        result: this.state.result.concat(res.data.results)
      })
    }).catch((err) => {
      console.log(err)
    })
  }

  render () {
    return (
      <div>
        <Grid handleChangePage={this.handleChangePage} hasMore={this.state.hasMore} result={this.state.result} />
      </div>
    )
  }
}

export default Accueil
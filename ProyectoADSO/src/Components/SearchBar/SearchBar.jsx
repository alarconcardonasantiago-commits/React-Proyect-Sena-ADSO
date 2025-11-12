import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styles from './SearchBar.module.css'

const SearchBar = ({ onSearch, placeholder = 'Buscar...', buttonLabel = '🔍' }) => {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(query)
  }

  return (
    <div className={styles.searchContainer}>
      <form onSubmit={handleSubmit} className={styles.searchbar}>
        <input
          className={styles.text}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className={styles.btnBuscar} type="submit">
          {buttonLabel}
        </button>
      </form>
    </div>
  )
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  buttonLabel: PropTypes.string
}

export default SearchBar

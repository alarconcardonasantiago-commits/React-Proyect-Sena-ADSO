import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styles from './SearchBar.module.css'

const SearchBar = ({ onSearch, placeholder = 'Buscar...', buttonLabel = '🔍', delay = 500 }) => {
  const [query, setQuery] = useState('')

  // 🔹 Llama a onSearch automáticamente con un pequeño retraso (debounce)
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query)
    }, delay)

    return () => clearTimeout(timer)
  }, [query, delay, onSearch])

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
  buttonLabel: PropTypes.string,
  delay: PropTypes.number
}

export default SearchBar

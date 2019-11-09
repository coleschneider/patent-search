import React from 'react'

interface Props {
  perPage: number
  total: number
  onGoPage: (num: number) => void
}
function Pagination({ perPage, total, onGoPage }: Props) {
  const pageNumbers = []
  for (let i = 0; i <= Math.ceil(total / perPage); i++) {
    pageNumbers.push(i + 1)
  }
  const handleClick = (e: React.SyntheticEvent, page: number) => {
    e.preventDefault()
    onGoPage(page)
  }
  return (
    <ul className="pagination" role="menubar" aria-label="Pagination">
      <li>
        <a href="">
          <span>First</span>
        </a>
      </li>
      <li>
        <a href="">
          <span>Previous</span>
        </a>
      </li>
      {pageNumbers.map(number => (
        <li onClick={e => handleClick(e, number)}>
          <a href="">{number}</a>
        </li>
      ))}
      <li>
        <a href="">
          <span>Next</span>
        </a>
      </li>
      <li>
        <a href="">
          <span>Last</span>
        </a>
      </li>
    </ul>
  )
}

export default Pagination

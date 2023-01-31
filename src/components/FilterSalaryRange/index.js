import './index.css'

const FilterSalaryRange = props => {
  const {salaryDetail, getSalaryStats} = props
  const {salaryRangeId, label} = salaryDetail

  const changedSalaryStats = () => {
    getSalaryStats(salaryRangeId)
  }
  return (
    <li className="li-container">
      <input
        type="radio"
        name="salary"
        value={salaryDetail}
        id={salaryRangeId}
        onChange={changedSalaryStats}
      />
      <label htmlFor={salaryRangeId}>{label}</label>
    </li>
  )
}

export default FilterSalaryRange

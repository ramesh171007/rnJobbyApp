import './index.css'

const FilterEmployment = props => {
  const {employmentDetails, getClickedEmployment} = props
  const {label, employmentTypeId} = employmentDetails

  const changedCheckBox = () => {
    getClickedEmployment(employmentTypeId)
  }

  return (
    <li className="li-container" onChange={changedCheckBox}>
      <input
        type="checkbox"
        className="checkBox-style"
        id={employmentTypeId}
        value={label}
      />
      <label htmlFor={employmentTypeId}>{label}</label>
    </li>
  )
}

export default FilterEmployment

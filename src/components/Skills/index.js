import './index.css'

const Skills = props => {
  const {skillDetails} = props
  const {name, skillImageURl} = skillDetails
  return (
    <li className="li-skills-container">
      <img src={skillImageURl} alt={name} className="skill-image-style" />
      <p>{name}</p>
    </li>
  )
}

export default Skills

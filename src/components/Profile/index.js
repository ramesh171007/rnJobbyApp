import './index.css'

const Profile = props => {
  const {profileDetail} = props
  const {name, bio, profileImageURl} = profileDetail
  return (
    <div className="profile-container">
      <div className="profile-card">
        <img src={profileImageURl} alt="profile" />
        <h1>{name}</h1>
        <p>{bio}</p>
      </div>
    </div>
  )
}

export default Profile

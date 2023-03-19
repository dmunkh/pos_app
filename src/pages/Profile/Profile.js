import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <div>
      Profile
      <br />
      <Link to={"/about"}>about</Link>
      <br />
      <Link to={"/friends"}>friends</Link>
    </div>
  );
};

export default Profile;

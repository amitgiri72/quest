import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBirthdayCake, faCertificate, faPen, faPiggyBank } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import axios from 'axios';
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import Avatar from "../../components/Avatar/Avatar";
import EditProfileForm from "./EditProfileForm";
import ProfileBio from "./ProfileBio";
import "./UserProfile.css";
import UAParser from 'ua-parser-js';
import LocationMap from "../map/LocationMap";

// import useragent from 'useragent'; 
const UserProfile = () => {
  const { id } = useParams();
  const users = useSelector((state) => state.usersReducer);
  const currentProfile = users.filter((user) => user._id === id)[0];
  const currentUser = useSelector((state) => state.currentUserReducer);
  const [Switch, setSwitch] = useState(false);
  const [userHistory, setUserHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const apiKey = '';

  useEffect(() => {
    const fetchUserHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/user/history/${id}`);
        setUserHistory(response.data.loginHistory);
        setLoadingHistory(false);
      } catch (error) {
        console.error('Error fetching user history:', error);
        setLoadingHistory(false);
      }
    };

    fetchUserHistory();
  }, [id]);

  const extractOs = (userAgent) => {
    const parser = new UAParser(userAgent);
    const result = parser.getOS();
    return `${result.name} ${result.version}`;
  };
  
  const extractBrowser = (userAgent) => {
    const parser = new UAParser(userAgent);
    const result = parser.getBrowser();
    return `${result.name} ${result.version}`;
  };

 // Extract operating system from user-agent string
//  const extractOs = (userAgent) => {
//   const agent = useragent.parse(userAgent);
//   return `${agent.os.family} ${agent.os.major}.${agent.os.minor || '0'}`;
// };

// // Extract browser from user-agent string
// const extractBrowser = (userAgent) => {
//   const agent = useragent.parse(userAgent);
//   return `${agent.family} ${agent.major}.${agent.minor || '0'}`;
// };


  return (
    <div>
      <div className="home-container-1">
        <LeftSidebar />
        <div className="home-container-2">
          <section>
            <div className="user-details-container">
              <div className="user-details">
                <Avatar
                  backgroundColor="purple"
                  color="white"
                  fontSize="50px"
                  px="40px"
                  py="30px"
                >
                  {currentProfile?.name.charAt(0).toUpperCase()}
                </Avatar>
                <div className="user-name">
                  <h1>
                    {currentProfile?.name}
               </h1>
                  <p>
                    <FontAwesomeIcon icon={faBirthdayCake} /> Joined{" "}
                    {moment(currentProfile?.joinedOn).fromNow()}
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faCertificate} /> Ranking - {" "}
                   {currentProfile?.badges && currentProfile.badges.length > 0 && ` ${currentProfile.badges[currentProfile.badges.length - 1]}`}
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faPiggyBank} /> Points - {" "}
                    {currentProfile?.points}
                  </p>
                </div>
              </div>
              {currentUser?.result._id === id && (
                <button
                  type="button"
                  onClick={() => setSwitch(true)}
                  className="edit-profile-btn"
                >
                  <FontAwesomeIcon icon={faPen} /> Edit Profile
                </button>
              )}
            </div>
            <>
              {Switch ? (
                <EditProfileForm
                  currentUser={currentUser}
                  setSwitch={setSwitch}
                />
              ) : (
                <>
                  <ProfileBio currentProfile={currentProfile} />
                  <LocationMap apiKey={apiKey} />
                  <div className="user-history-container">
                    <h2>User Login History</h2>
                    {loadingHistory ? (
                      <p>Loading user history...</p>
                    ) : (
                      <table>
                        <thead>
                          <tr>
                            <th>IP Address</th>
                            <th>Operating System</th>
                            <th>Browser</th>
                            <th>Login Time</th>
                          </tr>
                        </thead>
                        <tbody>
                          {userHistory.map((entry) => (
                            <tr key={entry._id['$oid']}>
                              <td>{entry.ipAddress}</td>
                              <td>{extractOs(entry.systemInfo)}</td>
                              <td>{extractBrowser(entry.systemInfo)}</td>
                              <td>
                              {moment(entry.loginTime['$date']).format("MMMM Do YYYY, h:mm:ss a")}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </>
              )}
            </>
          </section>
        </div>
      </div>
    </div>
  );
};



export default UserProfile;

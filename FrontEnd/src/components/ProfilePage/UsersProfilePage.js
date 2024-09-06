import React from 'react';
import { useState, useEffect } from 'react';
import './UsersProfilePage.css';
import { useParams } from 'react-router';


const UserProfilePage = () => {

const { user } = useParams();
console.log(user);

const [sparks, setSparks] = useState([]);
const [mentions, setMentions] = useState([]);
const [view, setView] = useState('sparks');

const [userData, setUserData] = useState([]); //make a state from data object fetched 

const [userProfiles, setUserProfiles] = useState([]);  //the state to find user by id





function getClickedUser(){
    fetch(`http://localhost:8080/api/user-profiles/username/${user}`)
    .then(response => {
                 if (!response.ok) {
                     throw new Error('Network response was not ok');
                 }
                 return response.json(); 
             })
             .then(data => {
                setUserData(data);
                // document.getElementById("spark-user-tag").textContent = `@${data.userName} ${data.firstName} ${data.lastName}`;
                document.getElementById("get-user-name-profile").textContent = data.firstName + " " + data.lastName;
                document.getElementById("get-profile-tag").textContent = "@" + data.userName;
                document.getElementById("joined-date").textContent = data.createdDate;
                console.log(data.firstName + " " + data.lastName + " is here!");
                // setSparks(data.reverse()); 
             })
             .catch(error => {
                 console.error('Error fetching sparks:', error); 
             });
}

 function fetchUserSparks(){
         fetch(`http://localhost:8080/api/sparks/username/${user}`)
         .then(response => {
             if (!response.ok) {
                 throw new Error('Network response was not ok');
             }
             return response.json(); 
         })
         .then(data => {
             setSparks(data.reverse()); 
         })
         .catch(error => {
             console.error('Error fetching sparks:', error); 
         });
        }

        function fetchUserMentions(){
            fetch(`http://localhost:8080/api/sparks/username/mention/${user}`)
            .then(response => {
                if (!response.ok){
                    throw new Error('Network response not ok');
                }
                return response.json();
            })
            .then (data => {
                // console.log(data)
                setMentions(data.reverse()); 
            })
            .catch(error => {
                console.error('Error fetching mentions: ', error);
            });
        }
    
        function fetchUserProfiles(){
            fetch('http://localhost:8080/api/user-profiles')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network not ok');
                }
                return response.json();
            })
            .then(data => {
                setUserProfiles(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }

        function getUserProfileById(userIdToFind){
            return userProfiles.find(profile => profile.userId === userIdToFind);
        }
    

 useEffect(() => {
        return(  
        getClickedUser(),
        fetchUserSparks(),
        fetchUserMentions(),
        fetchUserProfiles()
        )},[]);

return (
    // <h1>testing user profile page {user}</h1>
    
        <div className="profile-page">
            <header className="profile-header">
                <div className="cover-photo"></div>
                <div className="profile-info">
                    <div className="profile-picture"></div>
                    <div className="profile-details">
                        <h1 className="profile-name" id="get-user-name-profile">Username</h1>
                        <p className="profile-handle" id="get-profile-tag">@userhandle</p>
                        {/* <p className="profile-bio">This will be a bio that a logged in user can change.</p> */}
                        <div className="profile-stats">
                            <span>Joined <strong id="joined-date">join date here</strong></span>
                        </div>
                    </div>
                </div>
            </header>
            <main className="profile-content">
                <nav className="profile-nav">
                    <ul>
                    <li className={view === 'sparks' ? 'active' : ''} onClick={() => setView('sparks')} id="spark-tab">Sparks</li>
                    <li className={view === 'mentions' ? 'active' : ''} onClick={() => setView('mentions')} id="mention-tab">Mentions</li>
                    </ul>
                </nav>
                <div className="tweets-section">
                {view === 'sparks' && sparks.map(spark => (
                        <div key={spark.id} className="tweet">
                            <p>@{userData.userName} {userData.firstName + " " + userData.lastName}</p>
                             <p>{spark.body}</p>
                            <p>{spark.date}</p> 
                        </div>
                    ))}
                     {view === 'mentions' && mentions.map(mention => {
                        const profile = getUserProfileById(mention.userId);
                        return (
                        <div key={mention.id} className="tweet">
                            <p>@{profile?.userName} {profile?.firstName + " " + profile?.lastName}</p>
                            <p>{mention.body}</p>
                            <p>{mention.date}</p>
                        </div>
                        );
                        })}
                </div>
            </main>
        </div>
)



    // function updateUserName (){
    //     document.getElementById("get-user-name-profile").textContent = currentLoggedInUser.firstName + " " + currentLoggedInUser.lastName;
    // }
    // function updateUserTagName(){
    //     document.getElementById("get-profile-tag").textContent = "@" + currentLoggedInUser.userName;
    // }
    // function updateUserDateJoined(){
    //     document.getElementById("joined-date").textContent = currentLoggedInUser.createdDate;
    // }
    // function fetchUserSparks(){
    //      fetch(`http://localhost:8080/api/sparks/username/${stateUser}`)
    //      .then(response => {
    //          if (!response.ok) {
    //              throw new Error('Network response was not ok');
    //          }
    //          return response.json(); 
    //      })
    //      .then(data => {
    //          setSparks(data.reverse()); 
    //      })
    //      .catch(error => {
    //          console.error('Error fetching sparks:', error); 
    //      });
    // }


    // useEffect(() => {
    //     return(  
    //     updateUserName(),
    //     updateUserTagName(),
    //     updateUserDateJoined(),
    //     fetchUserSparks()
    //     )},[]);
    


    // return (
    //     <div className="profile-page">
    //         <header className="profile-header">
    //             <div className="cover-photo"></div>
    //             <div className="profile-info">
    //                 <div className="profile-picture"></div>
    //                 <div className="profile-details">
    //                     <h1 className="profile-name" id="get-user-name-profile">Username</h1>
    //                     <p className="profile-handle" id="get-profile-tag">@userhandle</p>
    //                     {/* <p className="profile-bio">This will be a bio that a logged in user can change.</p> */}
    //                     <div className="profile-stats">
    //                         <span>Joined <strong id="joined-date">join date here</strong></span>
    //                     </div>
    //                 </div>
    //             </div>
    //         </header>
    //         <main className="profile-content">
    //             <nav className="profile-nav">
    //                 <ul>
    //                     <li>Sparks</li>
    //                     <li>Mentions</li>
    //                 </ul>
    //             </nav>
    //             <div className="tweets-section">
    //             {sparks.map(spark => (
    //                     <div key={spark.id} className="tweet">
    //                         <p>@{currentLoggedInUser.userName} {currentLoggedInUser.firstName + " " + currentLoggedInUser.lastName}</p>
    //                         <p>{spark.body}</p>
    //                         <p>{spark.date}</p>
    //                     </div>
    //                 ))}
    //             </div>
    //         </main>
    //     </div>
    // );
};

export default UserProfilePage;
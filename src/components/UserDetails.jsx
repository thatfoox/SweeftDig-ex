import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";


function UserDetails(match) {
   
    /* users details fetched*/
    const [userDetails, setUserDetails] = useState(null);
    const { id } = useParams();
    const [friends, setFriends] = useState({list:[]});
    const [isLoading, setIsLoading] = useState(true);
    const [nextPage, setNextPage] = useState(1);
    
    useEffect(() => {
      fetch(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}`)
        .then((response) => response.json())
        .then((userDetails) => {
          setUserDetails(userDetails);
        });

        fetch(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}/friends/1/5`)
        .then((response)=>response.json())
        .then((friends)=> setFriends(friends),
        setIsLoading(false))
        .catch(error => console.log(error))
    }, [id]);
  
    if (!userDetails ) {
      return <div>Loading...</div>;
    }
    if(isLoading){
        return <div>Loading...</div>
    }
    return (
        <div className='container'>
            <div className='head-wrapper'>
                <div className='header'>
                    <img src={userDetails.imageUrl} alt={userDetails.name}/>
                    <fieldset className='left-info'>
                    <legend>info</legend>
                        <div><strong>{userDetails.prefix} {userDetails.name} {userDetails.lastName}</strong></div>
                        <div><em>{userDetails.title}</em></div>
                        <br></br>
                        <div><span>Email</span>: {userDetails.email}</div>
                        <div><u>IP Adress</u>: {userDetails.ip}</div>
                        <div><u>IP Adress</u>: {userDetails.ip}</div>
                        <div><u>Job Area</u>: {userDetails.jobArea}</div>
                        <div><u>Job Type</u>: {userDetails.jobType}</div>
                    </fieldset>
                    <fieldset className='right-info'>
                    <legend>Adress</legend>
                        <div><strong>{userDetails.company.name} {userDetails.company.suffix}</strong></div>
                        <div><u>City</u>: {userDetails.address.city}</div>
                        <div><u>Country</u>: {userDetails.address.country}</div>
                        <div><u>State</u>:  {userDetails.address.state}</div>
                        <div><u>Street Adress</u>:  {userDetails.address.streetAdress}</div>
                        <div><u>ZIP</u>:  {userDetails.address.zipCode}</div>
                    </fieldset>
                </div>
            </div>
            
            <div className='breadCrumbs'>
                <a>UwU</a>
            </div>
            <h2 style={{marginLeft:"20px"}}>Friends:</h2>
            <div className='friends'>
                   <div className="users-container">
                      {friends.list.map(friend =>(
                        <div key={friend.id} className="user-card">
                        <a key={friend.id} href={`/user/${friend.id}`} >
                        <img src={friend.imageUrl} alt={friend.name} />
                        <h1>{friend.prefix} {friend.name} {friend.lastName} </h1>
                        <p>{friend.title}</p>
                </a>
              </div>
          ))}
       </div>
            </div>

        </div>
      
    );
    }


  export default UserDetails;

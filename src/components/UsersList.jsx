import { useState, useEffect } from 'react';

function UsersList() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/2/100')
      .then(response => response.json())
      .then(users => {setUsers(users);
      setIsLoading(false);})
      .catch(error => console.error(error));
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }


  return (
    <div className="users-container">
        {users.list.map(user =>(
            <div key={user.id} className="user-card">
              <a key={user.id} href={`/user/${user.id}`} >
                <img src={user.imageUrl} alt={user.name} />
                <h1>{user.prefix} {user.name} {user.lastName} </h1>
                <p>{user.title}</p>
              </a>
            </div>
        ))}
    </div>
  );
}

export default UsersList;

import { useState, useEffect, useRef } from 'react';

function UsersList() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isLoading && hasMore) {
      const observer = new IntersectionObserver(handleObserver, {
        root: null,
        rootMargin: '20px',
        threshold: 1.0,
      });
      if (loaderRef.current) {
        observer.observe(loaderRef.current);
      }
      return () => {
        observer.disconnect();
      };
    }
  }, [isLoading, hasMore]);

  const handleObserver = (entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setCurrentPage((page) => page + 1);
    }
  };

  const fetchUsers = () => {
    setIsLoading(true);
    fetch(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${currentPage}/10`)
      .then((response) => response.json())
      .then((data) => {
        setUsers((prevUsers) => [...prevUsers, ...data.list]);
        setHasMore(data.list.length > 0);
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="users-container">
      {users.map((user) => (
        <div key={user.id} className="user-card">
          <a key={user.id} href={`/user/${user.id}`}>
            <img src={user.imageUrl} alt={user.name} />
            <h1>
              {user.prefix} {user.name} {user.lastName}{' '}
            </h1>
            <p>{user.title}</p>
          </a>
        </div>
      ))}
      {isLoading && <div>Loading...</div>}
      {!isLoading && hasMore && (
        <div ref={loaderRef} style={{ textAlign: 'center', marginTop: '20px' }}>
          <span>Loading more users...</span>
        </div>
      )}
    </div>
  );
}

export default UsersList;

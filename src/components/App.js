import React, { useState, useEffect } from 'react';
import UserTable from './UserTable';
import UserModal from './UserModal';
import '../styles/App.css'

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  useEffect(() => {
    fetch('https://dummyjson.com/users')
        .then(response => response.json())
        .then(data => setUsers(data.users))
        .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key) {
      if (sortConfig.direction === 'ascending') {
        direction = 'descending';
      } else if (sortConfig.direction === 'descending') {
        direction = null;
      }
    }
    setSortConfig({ key, direction });
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (sortConfig.key && sortConfig.direction) {
      let aValue, bValue;

      if (sortConfig.key === 'name') {
        aValue = `${a.firstName || ''} ${a.lastName || ''}`.toLowerCase();
        bValue = `${b.firstName || ''} ${b.lastName || ''}`.toLowerCase();
      } else if (sortConfig.key === 'address') {
        aValue = `${a.address?.city || ''} ${a.address?.address || ''}`.toLowerCase();
        bValue = `${b.address?.city || ''} ${b.address?.address || ''}`.toLowerCase();
      } else {
        aValue = (a[sortConfig.key] || '').toString().toLowerCase();
        bValue = (b[sortConfig.key] || '').toString().toLowerCase();
      }

      if (aValue < bValue) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    }
    return 0;
  });

  return (
      <div className="App">
        <div className="Box">
        <UserTable users={sortedUsers} onSort={handleSort} sortConfig={sortConfig} setSelectedUser={setSelectedUser} />
        {selectedUser && <UserModal user={selectedUser} onClose={() => setSelectedUser(null)} />}
        </div>
      </div>
  );
};

export default App;

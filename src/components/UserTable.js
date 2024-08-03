import React, { useState } from 'react';
import TableRow from './TableRow';
import SearchBar from './SearchBar';
import '../styles/UserTable.css';

const UserTable = ({ users, onSort, sortConfig, setSelectedUser }) => {
    const [searchTerm, setSearchTerm] = useState("");  // Для хранения поискового запроса
    const [columnWidths, setColumnWidths] = useState({
        name: 150,
        age: 100,
        gender: 100,
        phone: 150,
        address: 200,
    });

    const handleMouseDown = (e, key) => {
        e.preventDefault();
        const startX = e.clientX;
        const startWidth = columnWidths[key];

        const handleMouseMove = (e) => {
            const newWidth = startWidth + (startX - e.clientX);
            setColumnWidths((prevWidths) => ({
                ...prevWidths,
                [key]: Math.max(newWidth, 50), // Минимальная ширина 50px
            }));
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const getSortDirection = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction;
        }
        return null;
    };

    // Обработка изменения в поисковой строке
    const handleSearch = (term) => {
        setSearchTerm(term.toLowerCase());
    };

    // Фильтрация пользователей по поисковому запросу
    const filteredUsers = users.filter((user) => {
        const normalizedPhone = user.phone.replace(/[\s-]/g, '');
        const normalizedSearchTerm = searchTerm.replace(/[\s-]/g, '');

        const searchStr = `
            ${user.firstName.toLowerCase()} 
            ${user.lastName.toLowerCase()} 
            ${user.age.toString()} 
            ${user.gender.toLowerCase()} 
            ${normalizedPhone}  // используем нормализованный номер
            ${user.address.city.toLowerCase()} 
            ${user.address.address.toLowerCase()}
        `;

        return searchStr.includes(normalizedSearchTerm);  // используем нормализованный поисковый запрос
    });

    return (
        <div>
            <SearchBar onSearch={handleSearch} />
        <table className="user-table">
            <thead>
            <tr>
                <th style={{ width: columnWidths.name, position: 'relative' }}>
                    <div>
                        ФИО
                        <button className="functional-button" onClick={() => onSort('name')}>
                            {getSortDirection('name') === 'ascending' ? '▲' :
                                getSortDirection('name') === 'descending' ? '▼' : '➖'}
                        </button>
                    </div>
                </th>
                <th style={{width: columnWidths.age, position: 'relative'}}>
                    <div>
                        <div
                            className="resizable"
                            onMouseDown={(e) => handleMouseDown(e, 'age')}
                        />
                        Возраст
                        <button className="functional-button" onClick={() => onSort('age')}>
                            {getSortDirection('age') === 'ascending' ? '▲' :
                                getSortDirection('age') === 'descending' ? '▼' : '➖'}
                        </button>
                    </div>
                </th>
                <th style={{width: columnWidths.gender, position: 'relative'}}>
                    <div>
                        <div
                            className="resizable"
                            onMouseDown={(e) => handleMouseDown(e, 'gender')}
                        />
                        Пол
                        <button className="functional-button" onClick={() => onSort('gender')}>
                            {getSortDirection('gender') === 'ascending' ? '▲' :
                                getSortDirection('gender') === 'descending' ? '▼' : '➖'}
                        </button>
                    </div>
                </th>
                <th style={{width: columnWidths.phone, position: 'relative'}}>
                    <div
                        className="resizable"
                        onMouseDown={(e) => handleMouseDown(e, 'phone')}
                    />
                    Номер телефона
                </th>
                <th style={{width: columnWidths.address, position: 'relative'}}>
                    <div>
                        <div
                            className="resizable"
                            onMouseDown={(e) => handleMouseDown(e, 'address')}
                        />
                        Адрес
                        <button className="functional-button" onClick={() => onSort('address')}>
                            {getSortDirection('address') === 'ascending' ? '▲' :
                                getSortDirection('address') === 'descending' ? '▼' : '➖'}
                        </button>
                    </div>
                </th>
            </tr>
            </thead>
            <tbody>
            {filteredUsers.map((user) => (
                <TableRow
                    key={user.id}
                    user={user}
                    onClick={() => setSelectedUser(user)}
                    columnWidths={columnWidths}
                    handleMouseDown={handleMouseDown}
                />
            ))}
            </tbody>
        </table>
        </div>
    );
};

export default UserTable;

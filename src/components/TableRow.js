import React from 'react';

const TableRow = ({ user, onClick, columnWidths, handleMouseDown }) => {
    const { firstName, lastName, age, gender, phone, address } = user;

    return (
        <tr onClick={onClick}>
            <td style={{width: columnWidths.name, position: 'relative'}}>
                {`${firstName || ''} ${lastName || ''}`}
            </td>
            <td style={{width: columnWidths.age, position: 'relative'}}>
                <div
                    className="resizable"
                    onMouseDown={(e) => handleMouseDown(e, 'age')}
                />
                {age}
            </td>
            <td style={{width: columnWidths.gender, position: 'relative'}}>
                <div
                    className="resizable"
                    onMouseDown={(e) => handleMouseDown(e, 'gender')}
                />
                {gender}
            </td>
            <td style={{width: columnWidths.phone, position: 'relative'}}>
                <div
                    className="resizable"
                    onMouseDown={(e) => handleMouseDown(e, 'phone')}
                />
                {phone}
            </td>
            <td style={{width: columnWidths.address, position: 'relative'}}>
                <div
                    className="resizable"
                    onMouseDown={(e) => handleMouseDown(e, 'address')}
                />
                {`${address?.city || ''}, ${address?.address || ''}`}
            </td>
        </tr>
    );
};

export default TableRow;

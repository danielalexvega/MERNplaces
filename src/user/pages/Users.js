import React from 'react';
import UsersList from '../components/UsersList';

const Users = () => {
    const USERS = [
        {
            id: 'u1', 
            name: 'Daniel Vega', 
            image: 'https://scontent-dfw5-2.xx.fbcdn.net/v/t31.18172-8/416472_10100552736334047_1702655874_o.jpg?_nc_cat=102&ccb=1-3&_nc_sid=174925&_nc_ohc=UuR3I-lMDmQAX8Lpf0c&tn=RLI-rc0CqoanltZe&_nc_ht=scontent-dfw5-2.xx&oh=0bdc5e48cb9753e71890b8ff4392f520&oe=60EEEA3B', 
            places: 3
        }
    ];
    return <UsersList items={USERS}/>;
};

export default Users;

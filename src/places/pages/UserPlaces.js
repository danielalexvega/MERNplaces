import React from 'react';

import PlaceList from '../components/PlaceList';

const UserPlaces = () => {
    const DUMMY_PLACES = [
        {
            id: 'p1',
            title: 'Empire State Building',
            description: 'One of the most famous sky scrapers in the world!',
            imageUrl: 'https://cdn.britannica.com/73/114973-050-2DC46083/Midtown-Manhattan-Empire-State-Building-New-York.jpg',
            address: '20 W 34th St, New York, NY 10001',
            creator: 'u1',
            location: {
                lat: 40.748817,
                long:-73.985428
            } 
        },
        {
            id: 'p2',
            title: 'Empire State Building',
            description: 'One of the most famous sky scrapers in the world!',
            imageUrl: 'https://cdn.britannica.com/73/114973-050-2DC46083/Midtown-Manhattan-Empire-State-Building-New-York.jpg',
            address: '20 W 34th St, New York, NY 10001',
            creator: 'u2',
            location: {
                lat: 40.748817,
                long:-73.985428
            }
        }
    ];

    return (
        <PlaceList items={DUMMY_PLACES} />
    );
}

export default UserPlaces;

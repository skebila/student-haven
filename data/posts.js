import { USERS } from "./users";
import { TOPICS } from "./topics";

export const POSTS = [
    {
        imageUrl: 'https://t4.ftcdn.net/jpg/03/03/14/99/240_F_303149949_2xS58UkiYUURZZclv9fx1pKb5lOOnY1g.jpg',
        user: USERS[0].user,
        likes: 501,
        caption: 'Train Ride to Hogwarts. :)',
        profile_picture: USERS[0].image,
        comments: [
            {
                user: 'mike02',
                comment: 'WOW! This is fire'
            },
            {
                user: 'sara03',
                comment: 'Great post buddy!'
            },
            {
                user: 'luke04',
                comment: 'See you at the mall :)'
            },
            
        ]
    },
    {
        imageUrl: 'https://t3.ftcdn.net/jpg/02/17/45/12/240_F_217451286_ixsvEptyrSYvxBvcyEGWKAVZUxFrayJ9.jpg',
        user: USERS[1].user,
        likes: 10000,
        caption: 'Been ballin lately',
        profile_picture: USERS[1].image,
        comments: [
            {
                user: 'sam05',
                comment: 'My guy'
            },
            
        ]
    }
]
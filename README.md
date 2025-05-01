# Snap-Vote

Snap-Vote is a real-time voting platform designed to enable users to participate in interactive polls and discussions. The project leverages modern web technologies to provide a seamless and engaging user experience.

## Features

- **Scalable Architecture**: Built with a server-client architecture using `Next.js` on the client and `Node.js` on the server.
- **Queue Management**: Uses `bullmq` for managing background jobs like comment processing, Email Sending and Voting.
- **Rate Limiting**: Implements rate limiting to restrict the number of requests a user can make within a specific time frame, ensuring fair usage.
- **Database Integration**: Powered by Prisma ORM for database operations.
- **Real-Time Voting**: Users can vote on items, and results are updated in real-time using WebSockets.
- **Comment System**: Add and view comments on polls with real-time updates.
- **Admin Features**: Admins can create, edit, and delete polls, as well as monitor user activity.
- **User Authentication**: Secure login and registration system for users.
- **Responsive Design**: Fully responsive UI for seamless use across devices.
- **Database Integration**: Powered by Prisma ORM for database operations.
- **Real-Time Notifications**: Users receive instant notifications for new comments or updates to polls.
- **Customizable Polls**: Poll creators can set options like time limits, multiple-choice answers, and more.
- **Rate

## Project Structure



## Technologies Used

### Frontend
- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: Tailwind CSS
- **State Management**: React Hooks

### Backend
- **Framework**: Node.js
- **Database**: PostgreSQL (via Prisma ORM)
- **Queue Management**: BullMQ ( Redis needed)
- **WebSockets**: Socket.IO

## Installation

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL
- Redis (for BullMQ)

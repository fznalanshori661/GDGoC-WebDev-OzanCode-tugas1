# Event FZN - Premium Event Registration Platform

A professional, modern, and futuristic full-stack event registration website built with cutting-edge technologies.

## Features

- **Modern Design**: Futuristic, clean, and professional UI with white/light color scheme
- **Responsive**: Fully responsive design for all devices
- **Interactive**: Smooth animations, hover effects, and micro-interactions
- **Custom Cursor**: Custom animated cursor effect
- **Event Management**: Browse, filter, and view event details
- **Registration System**: Complete registration form with validation
- **Contact Form**: Get in touch functionality
- **Social Links**: X, LinkedIn, Instagram, Email, GitHub in footer

## Tech Stack

### Frontend
- HTML5
- CSS3 (Modern CSS with custom properties, animations, gradients)
- JavaScript (ES6+)
- Font Awesome 6.5.1
- Google Fonts (Inter, Space Grotesk)
- Custom cursor effects
- Particle animations

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication ready
- Rate Limiting
- Input Validation
- CORS
- Helmet (Security)
- Compression

## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
cd event-fzn
```

2. **Install Backend Dependencies**
```bash
cd backend
npm install
```

3. **Configure Environment**
```bash
cp .env.example .env
# Edit .env with your MongoDB URI and secrets
```

4. **Start Backend Server**
```bash
npm run dev
# Server runs on http://localhost:3000
```

5. **Open Frontend**
```bash
cd ../frontend
# Open index.html in browser
# Or use a live server:
npx serve .
```

### Quick Start (Frontend Only - Demo Mode)
Simply open `frontend/index.html` in your browser. The frontend works in demo mode with sample data.

## API Endpoints

### Events
- `GET /api/events` - Get all events
- `GET /api/events/featured` - Get featured events
- `GET /api/events/:id` - Get event details
- `POST /api/events` - Create event (admin)
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event

### Registrations
- `POST /api/registrations` - Register for event
- `GET /api/registrations/event/:eventId` - Get event registrations
- `GET /api/registrations/confirmation/:code` - Get confirmation details
- `PATCH /api/registrations/:id/checkin` - Check-in attendee
- `DELETE /api/registrations/:id` - Cancel registration

### Health
- `GET /api/health` - API health check

## Project Structure

```
event-fzn/
├── backend/
│   ├── models/
│   │   ├── Event.js
│   │   └── Registration.js
│   ├── routes/
│   │   ├── event.js
│   │   └── registration.js
│   ├── middleware/
│   │   └── validation.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── assets/
│   │   ├── css/
│   │   │   └── styles.css
│   │   ├── js/
│   │   │   └── app.js
│   │   └── images/
│   └── index.html
└── README.md
```

## Design Features

- **Color Scheme**: Dominant white with light accents
- **Typography**: Inter (body) + Space Grotesk (headings)
- **Animations**: Smooth transitions, floating cards, particle effects
- **Glassmorphism**: Modern glass-like effects
- **Gradient Accents**: Subtle purple-blue gradients
- **Custom Cursor**: Interactive cursor with follower effect

## Created By

fznalanshori661

## License

MIT License

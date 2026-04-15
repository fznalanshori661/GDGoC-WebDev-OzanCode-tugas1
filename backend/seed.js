const mongoose = require('mongoose');
require('dotenv').config();

const Event = require('./models/Event');

const sampleEvents = [
    {
        name: 'Tech Summit Surabaya 2024',
        description: 'Join the biggest tech conference in East Java featuring industry leaders, innovative startups, and cutting-edge technologies. Network with over 500 attendees and learn from 20+ expert speakers.',
        date: new Date('2024-06-15T09:00:00'),
        endDate: new Date('2024-06-15T18:00:00'),
        location: 'Surabaya Convention Center',
        city: 'Surabaya',
        venue: 'Hall A, B, C',
        category: 'Tech',
        capacity: 500,
        registeredCount: 320,
        price: 0,
        image: 'tech-summit.jpg',
        speakers: [
            { name: 'Ahmad Wijaya', role: 'CTO', company: 'TechCorp Indonesia', avatar: 'speaker1.jpg' },
            { name: 'Sarah Putri', role: 'AI Researcher', company: 'DataMind', avatar: 'speaker2.jpg' }
        ],
        agenda: [
            { time: '09:00', title: 'Registration & Networking', description: 'Get your badge and meet fellow attendees' },
            { time: '10:00', title: 'Opening Keynote', description: 'The Future of Indonesian Tech', speaker: 'Ahmad Wijaya' },
            { time: '14:00', title: 'AI Workshop', description: 'Hands-on AI development session', speaker: 'Sarah Putri' }
        ],
        isActive: true,
        registrationDeadline: new Date('2024-06-14T23:59:59'),
        contact: {
            email: 'techsummit@eventfzn.com',
            phone: '+62 31 1234 5678',
            whatsapp: '+6281234567890'
        }
    },
    {
        name: 'Design Innovation Workshop',
        description: 'Learn cutting-edge design techniques from world-class designers. This hands-on workshop covers UI/UX, design systems, and prototyping with industry-standard tools.',
        date: new Date('2024-06-22T10:00:00'),
        endDate: new Date('2024-06-22T16:00:00'),
        location: 'Tunjungan Plaza Convention Hall',
        city: 'Surabaya',
        venue: 'Meeting Room 3',
        category: 'Design',
        capacity: 150,
        registeredCount: 120,
        price: 250000,
        image: 'design-workshop.jpg',
        speakers: [
            { name: 'Budi Santoso', role: 'Lead Designer', company: 'CreativeStudio', avatar: 'speaker3.jpg' }
        ],
        agenda: [
            { time: '10:00', title: 'Design Thinking', description: 'Introduction to design thinking methodology' },
            { time: '12:00', title: 'Lunch Break', description: 'Networking lunch' },
            { time: '13:00', title: 'Hands-on Workshop', description: 'Create your first design system' }
        ],
        isActive: true,
        registrationDeadline: new Date('2024-06-21T23:59:59'),
        contact: {
            email: 'design@eventfzn.com',
            phone: '+62 31 1234 5679'
        }
    },
    {
        name: 'Startup Networking Night',
        description: 'Connect with founders, investors, and tech enthusiasts in Surabaya\'s most anticipated networking event. Pitch your ideas, find co-founders, and discover investment opportunities.',
        date: new Date('2024-07-01T18:00:00'),
        endDate: new Date('2024-07-01T22:00:00'),
        location: 'Satoria Hotel Surabaya',
        city: 'Surabaya',
        venue: 'Rooftop Lounge',
        category: 'Networking',
        capacity: 200,
        registeredCount: 85,
        price: 0,
        image: 'networking.jpg',
        agenda: [
            { time: '18:00', title: 'Welcome Reception', description: 'Drinks and appetizers' },
            { time: '19:00', title: 'Startup Pitches', description: '5-minute pitches from selected startups' },
            { time: '20:30', title: 'Networking Session', description: 'Open networking with investors' }
        ],
        isActive: true,
        registrationDeadline: new Date('2024-06-30T23:59:59'),
        contact: {
            email: 'network@eventfzn.com',
            phone: '+62 31 1234 5680',
            whatsapp: '+6281234567891'
        }
    },
    {
        name: 'Business Leadership Forum',
        description: 'Strategic insights from successful business leaders. Learn from C-level executives about leadership, strategy, and navigating the modern business landscape.',
        date: new Date('2024-07-10T08:00:00'),
        endDate: new Date('2024-07-10T17:00:00'),
        location: 'Grand City Convention',
        city: 'Surabaya',
        venue: 'Grand Ballroom',
        category: 'Business',
        capacity: 300,
        registeredCount: 200,
        price: 500000,
        image: 'business-forum.jpg',
        speakers: [
            { name: 'Dr. Rina Wijaya', role: 'CEO', company: 'Wijaya Group', avatar: 'speaker4.jpg' },
            { name: 'Michael Chen', role: 'Managing Director', company: 'Global Ventures', avatar: 'speaker5.jpg' }
        ],
        agenda: [
            { time: '08:00', title: 'Registration', description: 'Badge pickup and breakfast' },
            { time: '09:00', title: 'Leadership in Digital Age', description: 'Keynote by Dr. Rina Wijaya' },
            { time: '14:00', title: 'Panel Discussion', description: 'Future of Business in Indonesia' }
        ],
        isActive: true,
        registrationDeadline: new Date('2024-07-09T23:59:59'),
        contact: {
            email: 'business@eventfzn.com',
            phone: '+62 31 1234 5681'
        }
    },
    {
        name: 'Web Development Masterclass',
        description: 'Master modern web development with React, Node.js, and cloud deployment. Build production-ready applications with industry best practices.',
        date: new Date('2024-07-20T09:00:00'),
        endDate: new Date('2024-07-20T17:00:00'),
        location: 'Co-Working Space Surabaya',
        city: 'Surabaya',
        venue: 'Main Hall',
        category: 'Workshop',
        capacity: 80,
        registeredCount: 80,
        price: 350000,
        image: 'web-dev.jpg',
        speakers: [
            { name: 'Andi Prasetyo', role: 'Senior Engineer', company: 'TechGiant', avatar: 'speaker6.jpg' }
        ],
        agenda: [
            { time: '09:00', title: 'React Fundamentals', description: 'Building modern UIs' },
            { time: '12:00', title: 'Lunch', description: 'Provided' },
            { time: '13:00', title: 'Node.js Backend', description: 'API development and deployment' }
        ],
        isActive: true,
        registrationDeadline: new Date('2024-07-19T23:59:59'),
        contact: {
            email: 'webdev@eventfzn.com',
            phone: '+62 31 1234 5682'
        }
    },
    {
        name: 'AI & Machine Learning Conference',
        description: 'Explore the future of AI and its applications in business. From generative AI to predictive analytics, discover how AI is transforming industries.',
        date: new Date('2024-08-05T09:00:00'),
        endDate: new Date('2024-08-05T18:00:00'),
        location: 'JW Marriott Surabaya',
        city: 'Surabaya',
        venue: 'Grand Ballroom A',
        category: 'Tech',
        capacity: 400,
        registeredCount: 250,
        price: 750000,
        image: 'ai-conference.jpg',
        speakers: [
            { name: 'Prof. Dr. Hadi Nugroho', role: 'AI Researcher', company: 'ITS', avatar: 'speaker7.jpg' },
            { name: 'Lisa Chen', role: 'ML Engineer', company: 'AI Solutions', avatar: 'speaker8.jpg' }
        ],
        agenda: [
            { time: '09:00', title: 'AI Revolution', description: 'Opening keynote' },
            { time: '11:00', title: 'Machine Learning Workshop', description: 'Hands-on ML' },
            { time: '15:00', title: 'AI Ethics Panel', description: 'Responsible AI development' }
        ],
        isActive: true,
        registrationDeadline: new Date('2024-08-04T23:59:59'),
        contact: {
            email: 'ai@eventfzn.com',
            phone: '+62 31 1234 5683',
            whatsapp: '+6281234567893'
        }
    },
    {
        name: 'Digital Marketing Summit',
        description: 'Stay ahead of the curve with the latest digital marketing strategies. Learn from industry experts about SEO, social media, content marketing, and data analytics.',
        date: new Date('2024-08-15T09:00:00'),
        endDate: new Date('2024-08-15T17:00:00'),
        location: 'Holiday Inn Surabaya',
        city: 'Surabaya',
        venue: 'Conference Center',
        category: 'Marketing',
        capacity: 250,
        registeredCount: 150,
        price: 300000,
        image: 'marketing-summit.jpg',
        speakers: [
            { name: 'Dewi Kusuma', role: 'Marketing Director', company: 'BrandMax', avatar: 'speaker9.jpg' }
        ],
        agenda: [
            { time: '09:00', title: 'Digital Marketing Trends 2024', description: 'Opening session' },
            { time: '11:00', title: 'Social Media Strategy', description: 'Building engaged communities' },
            { time: '14:00', title: 'Data-Driven Marketing', description: 'Analytics and optimization' }
        ],
        isActive: true,
        registrationDeadline: new Date('2024-08-14T23:59:59'),
        contact: {
            email: 'marketing@eventfzn.com',
            phone: '+62 31 1234 5684'
        }
    },
    {
        name: 'Flutter Mobile Development Bootcamp',
        description: 'Intensive 3-day bootcamp on building cross-platform mobile apps with Flutter. From basics to publishing on App Store and Play Store.',
        date: new Date('2024-08-20T09:00:00'),
        endDate: new Date('2024-08-22T17:00:00'),
        location: 'IT Career Center Surabaya',
        city: 'Surabaya',
        venue: 'Training Room A',
        category: 'Workshop',
        capacity: 50,
        registeredCount: 35,
        price: 1500000,
        image: 'flutter-bootcamp.jpg',
        speakers: [
            { name: 'Rizky Ramadhan', role: 'Mobile Developer', company: 'AppFactory', avatar: 'speaker10.jpg' }
        ],
        agenda: [
            { time: 'Day 1', title: 'Flutter Fundamentals', description: 'Dart basics and widgets' },
            { time: 'Day 2', title: 'State Management', description: 'Provider, Bloc, Riverpod' },
            { time: 'Day 3', title: 'Final Project', description: 'Build and publish your app' }
        ],
        isActive: true,
        registrationDeadline: new Date('2024-08-19T23:59:59'),
        contact: {
            email: 'flutter@eventfzn.com',
            phone: '+62 31 1234 5685'
        }
    }
];

async function seedDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/eventfzn');
        console.log('Connected to MongoDB');

        await Event.deleteMany({});
        console.log('Cleared existing events');

        const insertedEvents = await Event.insertMany(sampleEvents);
        console.log(`Inserted ${insertedEvents.length} events`);

        console.log('\nSeeded Events:');
        insertedEvents.forEach(event => {
            console.log(`  - ${event.name} (${event.category})`);
        });

        await mongoose.disconnect();
        console.log('\nDatabase seeding completed!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();

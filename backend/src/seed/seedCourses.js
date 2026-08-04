require('dotenv').config();
    const dns = require('node:dns');

dns.setServers(['8.8.8.8', '8.8.4.4']);

const mongoose = require('mongoose');

const Course = require('../models/Course');

async function seedCourses() {

    try {

        await mongoose.connect(process.env.MONGODB_URI);

        console.log('✅ MongoDB Connected');

        await Course.deleteMany({});

        console.log('🗑 Old courses removed');

        await Course.insertMany([

            {
                title: 'AI Adventure',
                description: 'Learn what Artificial Intelligence is through fun stories.',
                ageGroup: [7],
                difficulty: 'beginner',
                category: 'ai-basics',
                lessonsCount: 8,
                xpReward: 120,
                image: '/assets/images/courses/ai-adventure.png'
            },

            {
                title: 'Creative AI',
                description: 'Create amazing drawings and music using AI.',
                ageGroup: [8],
                difficulty: 'beginner',
                category: 'creativity',
                lessonsCount: 10,
                xpReward: 160,
                image: '/assets/images/courses/creative-ai.png'
            },

            {
                title: 'Logic Explorer',
                description: 'Improve your thinking skills using AI puzzles.',
                ageGroup: [9],
                difficulty: 'intermediate',
                category: 'logic',
                lessonsCount: 12,
                xpReward: 220,
                image: '/assets/images/courses/logic-ai.png'
            },

            {
                title: 'Junior Coding',
                description: 'Build your first AI projects with block coding.',
                ageGroup: [10],
                difficulty: 'intermediate',
                category: 'coding',
                lessonsCount: 15,
                xpReward: 300,
                image: '/assets/images/courses/junior-coding.png'
            },

            {
                title: 'AI Quiz Challenge',
                description: 'Test everything you learned with fun quizzes.',
                ageGroup: [7,8,9,10],
                difficulty: 'beginner',
                category: 'quizzes',
                lessonsCount: 20,
                xpReward: 100,
                image: '/assets/images/courses/quiz.png'
            }

        ]);

        console.log('🎉 Courses Added Successfully');

        process.exit();

    }

    catch(error){

        console.error(error);

        process.exit(1);

    }

}

seedCourses();
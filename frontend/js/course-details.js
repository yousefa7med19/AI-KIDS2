const token = localStorage.getItem('token');

if (!token) {
  window.location.href = 'login.html';
}

const params = new URLSearchParams(window.location.search);

const courseId = params.get('courseId');
const childId = params.get('childId');

if (!courseId || !childId) {
    window.location.href = 'parent-dashboard.html';
}

function courseIcon(category){

    switch(category){

        case 'coding':
            return '💻';

        case 'logic':
            return '🧩';

        case 'creativity':
            return '🎨';

        case 'quizzes':
            return '🧠';

        default:
            return '🤖';

    }

}

async function loadCourse(){

    try{

        const data = await apiRequest(
            `/courses/${courseId}?childId=${childId}`
        );

        const course = data.course;

        document.title =
            `AI Kids — ${course.title}`;

        document.getElementById('course-title').textContent =
            course.title;

        document.getElementById('course-description').textContent =
            course.description;

        document.getElementById('course-icon').textContent =
            courseIcon(course.category);

        document.getElementById('course-difficulty').textContent =
            course.difficulty;

        document.getElementById('course-lessons').textContent =
            `${course.lessonsCount} Lessons`;

        document.getElementById('course-xp').textContent =
            `${course.xpReward} XP`;

        document.getElementById('learning-goal').textContent =
            course.description;

        document.getElementById('back-to-child').href =
            `child-dashboard.html?id=${childId}`;

    }

    catch(error){

        console.error(error);

        alert(error.message);

        window.location.href =
            `child-dashboard.html?id=${childId}`;

    }

}

const startButton = document.getElementById('start-course-button');

startButton.addEventListener('click', async () => {

    startButton.disabled = true;
    startButton.textContent = 'Starting...';

    try {

        await apiRequest(`/progress/${childId}/${courseId}`, {
            method: 'PUT',
            body: JSON.stringify({
                completedLessons: [],
                completedQuizzes: [],
                progressPercentage: 0,
                completed: false
            })
        });

        document.getElementById('course-status').textContent =
            '✅ Course started successfully!';

        startButton.textContent = 'Continue Course';

    } catch (error) {

        document.getElementById('course-status').textContent =
            error.message;

        startButton.disabled = false;
        startButton.textContent = 'Start Course';
    }

});

loadCourse();
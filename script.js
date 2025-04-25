// Initialize state
let state = {
    dailyGoal: 2000,
    meals: [],
    weeklyData: []
};

// Load data from localStorage
function loadData() {
    const savedState = localStorage.getItem('calorieTrackerState');
    if (savedState) {
        state = JSON.parse(savedState);
        document.getElementById('calorieGoal').value = state.dailyGoal;
        document.getElementById('goalCalories').textContent = state.dailyGoal;
        updateProgress();
        renderMealList();
        updateChart();
    }
    // Initialize ARIA live region
    updateAriaLiveRegion('Application loaded successfully');
}

// Save data to localStorage
function saveData() {
    localStorage.setItem('calorieTrackerState', JSON.stringify(state));
}

// Update ARIA live region
function updateAriaLiveRegion(message) {
    const liveRegion = document.getElementById('ariaLive') || createAriaLiveRegion();
    liveRegion.textContent = message;
}

// Create ARIA live region
function createAriaLiveRegion() {
    const liveRegion = document.createElement('div');
    liveRegion.id = 'ariaLive';
    liveRegion.className = 'visually-hidden';
    liveRegion.setAttribute('role', 'status');
    liveRegion.setAttribute('aria-live', 'polite');
    document.body.appendChild(liveRegion);
    return liveRegion;
}

// Form validation
function validateForm(value, type) {
    const errors = [];
    if (type === 'goal' || type === 'calories') {
        if (isNaN(value) || value <= 0) {
            errors.push('Please enter a valid positive number');
        }
    }
    if (type === 'food' && !value.trim()) {
        errors.push('Please enter a food name');
    }
    return errors;
}

// Update calorie goal
function updateGoal() {
    const goalInput = document.getElementById('calorieGoal');
    const newGoal = parseInt(goalInput.value);
    const errors = validateForm(newGoal, 'goal');

    if (errors.length === 0) {
        state.dailyGoal = newGoal;
        document.getElementById('goalCalories').textContent = newGoal;
        updateProgress();
        saveData();
        updateAriaLiveRegion(`Daily calorie goal updated to ${newGoal}`);
    } else {
        updateAriaLiveRegion(errors.join('. '));
        goalInput.focus();
    }
}

// Log a meal
function logMeal() {
    const foodInput = document.getElementById('foodSearch');
    const caloriesInput = document.getElementById('calories');
    
    const food = foodInput.value;
    const calories = parseInt(caloriesInput.value);

    const foodErrors = validateForm(food, 'food');
    const calorieErrors = validateForm(calories, 'calories');
    const errors = [...foodErrors, ...calorieErrors];

    if (errors.length === 0) {
        const meal = {
            food,
            calories,
            timestamp: new Date().toISOString()
        };

        state.meals.push(meal);
        updateProgress();
        renderMealList();
        updateChart();
        saveData();

        // Clear inputs
        foodInput.value = '';
        caloriesInput.value = '';
        updateAriaLiveRegion(`Added ${food} with ${calories} calories`);
    } else {
        updateAriaLiveRegion(errors.join('. '));
        if (foodErrors.length > 0) foodInput.focus();
        else caloriesInput.focus();
    }
}

// Update progress bar and calorie count
function updateProgress() {
    const totalCalories = getTodayCalories();
    const progressPercent = Math.min((totalCalories / state.dailyGoal) * 100, 100);
    
    const progressBar = document.getElementById('progress');
    progressBar.style.width = `${progressPercent}%`;
    progressBar.parentElement.setAttribute('aria-valuenow', Math.round(progressPercent));
    
    document.getElementById('currentCalories').textContent = totalCalories;
}

// Get today's total calories
function getTodayCalories() {
    const today = new Date().toDateString();
    return state.meals
        .filter(meal => new Date(meal.timestamp).toDateString() === today)
        .reduce((sum, meal) => sum + meal.calories, 0);
}

// Render meal list
function renderMealList() {
    const mealList = document.getElementById('mealList');
    const today = new Date().toDateString();
    
    const todayMeals = state.meals
        .filter(meal => new Date(meal.timestamp).toDateString() === today)
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    mealList.innerHTML = todayMeals
        .map((meal, index) => `
            <div class="meal-item" role="listitem">
                <span>${meal.food} - ${meal.calories} calories</span>
                <button onclick="deleteMeal(${index})" aria-label="Delete ${meal.food}">Delete</button>
            </div>
        `).join('');
}

// Delete a meal
function deleteMeal(index) {
    const today = new Date().toDateString();
    const todayMeals = state.meals
        .filter(meal => new Date(meal.timestamp).toDateString() === today);
    
    const mealToDelete = todayMeals[index];
    state.meals = state.meals.filter(meal => meal !== mealToDelete);
    
    updateProgress();
    renderMealList();
    updateChart();
    saveData();
    updateAriaLiveRegion(`Deleted ${mealToDelete.food} from meal list`);
}

// Update the progress chart
function updateChart() {
    const ctx = document.getElementById('progressChart').getContext('2d');
    const dates = getLast7Days();
    
    const dailyCalories = dates.map(date => {
        return state.meals
            .filter(meal => new Date(meal.timestamp).toDateString() === date.toDateString())
            .reduce((sum, meal) => sum + meal.calories, 0);
    });

    const labels = dates.map(date => date.toLocaleDateString('en-US', { weekday: 'short' }));

    if (window.myChart) {
        window.myChart.destroy();
    }

    window.myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Calories',
                data: dailyCalories,
                backgroundColor: '#4CAF50',
                borderColor: '#45a049',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    suggestedMax: state.dailyGoal * 1.2
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.parsed.y} calories`;
                        }
                    }
                }
            },
            animation: {
                duration: 500
            },
            layout: {
                padding: {
                    left: 10,
                    right: 10,
                    top: 0,
                    bottom: 0
                }
            }
        }
    });
}

// Get the last 7 days
function getLast7Days() {
    const dates = [];
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        dates.push(date);
    }
    return dates;
}

// Food search suggestions
document.getElementById('foodSearch').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const suggestionsDiv = document.getElementById('foodSuggestions');
    
    if (searchTerm.length < 2) {
        suggestionsDiv.style.display = 'none';
        return;
    }

    const matches = foodDatabase.filter(food => 
        food.name.toLowerCase().includes(searchTerm)
    );

    if (matches.length > 0) {
        suggestionsDiv.innerHTML = matches
            .map(food => `
                <div role="option" tabindex="0" onclick="selectFood('${food.name}', ${food.calories})" 
                     onkeypress="if(event.key==='Enter')selectFood('${food.name}', ${food.calories})"
                     aria-selected="false">
                    ${food.name} (${food.calories} cal)
                </div>
            `).join('');
        suggestionsDiv.style.display = 'block';
    } else {
        suggestionsDiv.style.display = 'none';
    }
});

// Select food from suggestions
function selectFood(name, calories) {
    document.getElementById('foodSearch').value = name;
    document.getElementById('calories').value = calories;
    document.getElementById('foodSuggestions').style.display = 'none';
    updateAriaLiveRegion(`Selected ${name} with ${calories} calories`);
}

// Close suggestions when clicking outside
document.addEventListener('click', function(e) {
    if (!e.target.closest('.input-group')) {
        document.getElementById('foodSuggestions').style.display = 'none';
    }
});

// Keyboard navigation for suggestions
document.getElementById('foodSuggestions').addEventListener('keydown', function(e) {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const options = this.querySelectorAll('[role="option"]');
        const currentIndex = Array.from(options).indexOf(document.activeElement);
        let nextIndex;

        if (e.key === 'ArrowDown') {
            nextIndex = currentIndex < options.length - 1 ? currentIndex + 1 : 0;
        } else {
            nextIndex = currentIndex > 0 ? currentIndex - 1 : options.length - 1;
        }

        options[nextIndex].focus();
    }
});

// Add resize observer for chart responsiveness
let resizeObserver;
function setupChartResizeObserver() {
    const chartContainer = document.querySelector('.chart-container');
    if (!chartContainer) return;

    if (resizeObserver) {
        resizeObserver.disconnect();
    }

    resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
            if (window.myChart) {
                window.myChart.resize();
            }
        }
    });

    resizeObserver.observe(chartContainer);
}

// Update the initialization
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    updateChart();
    setupChartResizeObserver();
});

// Handle window resize
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        if (window.myChart) {
            window.myChart.resize();
        }
    }, 250);
}); 
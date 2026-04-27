// ==================== GAME STATE ====================
const gameState = {
    // Character Info
    character: {
        name: 'Jordan Smith',
        birthplace: 'Norfolk, VA',
        birthDate: new Date(2006, 0, 1), // Approximate based on age 18
    },

    // Current Stats
    age: 0,
    level: 1,
    experience: 0,
    experienceNeeded: 100,

    // Core Stats (0-100 scale)
    stats: {
        Strength: 10,
        Discipline: 15,
        Intelligence: 20,
        Focus: 15,
        Resilience: 12,
        Ambition: 25,
        Charisma: 18,
        Technical: 5,
        MentalHealth: 30,
        SocialSkills: 20,
    },

    // Vitals
    vitals: {
        Health: 75,
        Sobriety: 100,
        MentalStability: 40, // Reflects trauma
        Happiness: 50,
    },

    // Relationships
    relationships: {
        'Stephanie King (Mom)': 40,
        'Vincent Rivera (Stepdad)': 25,
        'Dejuan Smith (Dad)': 30,
        'Preston (Half-Brother)': 60,
        'Alyssa Rivera (Half-Sister)': 50,
        'Akayla Smith (Half-Sister)': 45,
    },

    // Hidden Trauma & Recovery Tracking
    trauma: {
        neglect: 80, // Mother working all the time
        abuse: 85, // Stepdad beating
        sexualTrauma: 70, // Darrion incident in 2nd grade
        addiction: 0, // Weed addiction severity
        recoveryProgress: 0, // How far along in healing
    },

    // Career Path
    career: {
        currentPath: null,
        paths: ['Navy Aircraft Mechanic', 'Civilian Tech', 'Entrepreneur'],
        progress: 0,
    },

    // Achievements
    achievements: {
        'First Breath': false,
        'Troubled Youth': false,
        'Turning Point': false,
        'Survival Instinct': false,
        'Breaking Chains': false,
        'Rising Star': false,
        'Technical Mastery': false,
        'Healed Soul': false,
    },

    // Story Progress
    storyPhase: 0, // 0-5, representing life segments
    currentAge: 0,
    decisions: [],

    // Settings
    settings: {
        gameStartDate: new Date().toISOString(),
        lastLogDate: new Date().toDateString(),
    },
};

// ==================== STORY EVENTS ====================
const storyEvents = {
    0: { // Ages 0-3: Early Childhood
        title: '🍼 Early Years: Survival Mode',
        text: `You were born in Norfolk, VA on a cold January morning. Your mom, Stephanie, had big dreams, but raising you meant working long hours. Your grandma raised you most of the time while your mom hustled to make ends meet.\n\nAt age 1, you caught Bronchitis - a scary reminder that life was fragile. You remember struggling to breathe, the fear in your grandma's eyes. She held you close, whispering that everything would be okay.\n\nThose early years taught you: Love comes from proximity, not promises.`,
        choices: [
            {
                text: '💭 Accept that mom had to work (Resilience +5, Mental Health -10)',
                effects: { Resilience: 5, MentalHealth: -10, experience: 50 },
            },
            {
                text: '😔 Blame mom for abandonment (Ambition +10, MentalHealth -20)',
                effects: { Ambition: 10, MentalHealth: -20, experience: 75, 'Stephanie King (Mom)': -15 },
            },
        ],
    },

    1: { // Ages 4-6: Elementary Chaos
        title: '🎒 Elementary: The Chaos Years',
        text: `First grade. You were angry at the world.\n\nYour stepdad, Vincent, moved in. He wasn't your real dad, and you made sure everyone knew it. But his "discipline" was different - it wasn't love, it was CONTROL.\n\nYou threw desks. You threw chairs. You threw HANDS at other kids. Teachers called your mom constantly.\n\nThen, in 2nd grade, a boy named Darrion told you something that twisted your head up. He said it was okay for boys to kiss. You didn't understand it then. That confusion would haunt you for years.\n\nBut you also started to see that violence wasn't the answer. By 3rd grade, you were chilling. You learned control - not because you wanted to, but because consequences hurt.`,
        choices: [
            {
                text: '⚔️ Own your rage (Strength +10, Discipline -15)',
                effects: { Strength: 10, Discipline: -15, experience: 100, 'Vincent Rivera (Stepdad)': -20 },
            },
            {
                text: '🧠 Channel it into academics (Intelligence +10, Discipline +5)',
                effects: { Intelligence: 10, Discipline: 5, experience: 120 },
            },
        ],
    },

    2: { // Ages 7-9: The Anime Years
        title: '📺 Middle School: Escapism',
        text: `Middle school. Anime became your escape.\n\nOne Piece, Naruto, My Hero Academia - these worlds had heroes who overcame their trauma. These characters had PURPOSE.\n\nYou wanted that too.\n\nBut reality was brutal. Your stepdad's abuse got worse. Your mom's drinking got worse. And somewhere between episodes 100 and 200 of Naruto, you picked up a cigarette.\n\nSmoke filled your lungs like relief. It was your first drug. Your first real escape that wasn't a screen.\n\nYou didn't know then that this choice would define the next 5 years of your life.`,
        choices: [
            {
                text: '🚬 Try smoking (Resilience -10, Sobriety -50, experience: 50)',
                effects: { Resilience: -10, Sobriety: -50, experience: 50, trauma: { addiction: 30 } },
            },
            {
                text: '🧘 Stay clean through anime (Intelligence +5, MentalHealth: +10)',
                effects: { Intelligence: 5, MentalHealth: 10, experience: 80 },
            },
        ],
    },

    3: { // Ages 10-12: High School Begins - Criminal Phase
        title: '🚗 High School: Running Wild',
        text: `Freshman year. Your stepdad's abuse escalated. He beat you BADLY one night - so badly you couldn't take it anymore.\n\nYou ran away.\n\nYour aunt took you in, but by then you were already lost. Weed became your constant companion. You stole cars for fun. You hit vape shops and left with jars of weed tucked under your arm.\n\nYou were 14 years old and felt UNTOUCHABLE.\n\nLooking back, you were just a scared kid trying to feel powerful. Every theft was a middle finger to a world that had already victimized you.\n\nBut every choice has a weight.`,
        choices: [
            {
                text: '💨 Lean into the streets (Ambition: +15, Sobriety: -80, Trauma: +20)',
                effects: { Ambition: 15, Sobriety: -80, experience: 120, trauma: { addiction: 60 } },
            },
            {
                text: '⛔ Turn to your aunt for help (Resilience: +15, MentalHealth: +20)',
                effects: { Resilience: 15, MentalHealth: 20, experience: 150 },
            },
        ],
    },

    4: { // Ages 13-17: Rock Bottom
        title: '🌑 The Void: Years You Don\'t Remember',
        text: `Sophomore through Senior year blur together.\n\nWeed. Every. Single. Day.\n\nYou barely remember 10th grade. Like, actually don't remember most of it. That's what constant THC does - it erases you.\n\nAt 17, you did something that shook you: You met 3 trans girls on Grindr. You thought maybe you were curious. You thought maybe there was something different about you.\n\nBut fear grabbed you. What if people found out? What would that mean?\n\nDays later, you got bumps. Herpes. Or something. You spiraled. Got tested. It was nothing. But the FEAR had already done its damage.\n\nYou were 17 years old and completely lost. You didn't recognize yourself anymore.`,
        choices: [
            {
                text: '🚨 Hit rock bottom (MentalHealth: -40, Sobriety: -100, experience: 150)',
                effects: { MentalHealth: -40, Sobriety: -100, experience: 150, trauma: { addiction: 100, sexualTrauma: 80 } },
            },
            {
                text: '🆘 Reach out for help (Resilience: +20, MentalHealth: +15)',
                effects: { Resilience: 20, MentalHealth: 15, experience: 200 },
            },
        ],
    },

    5: { // Age 18+: The Reset
        title: '🌅 Age 18: Jordan\'s Rise Begins NOW',
        text: `You're 18 now.\n\nEverything before was survival. You didn't have the tools. You didn't have the knowledge. You didn't have the CHOICE.\n\nBut now? Now you do.\n\nYou've been thinking about the Navy. About becoming an Aircraft Mechanic. About building something with your hands instead of destroying it.\n\nThe addiction is real. The trauma is REAL. The scars are REAL.\n\nBut so is your potential.\n\nThis is where Jordan's Rise truly begins. Every choice from here forward is YOURS. Every stat you build, every relationship you repair, every day you stay clean - that's YOU taking back your power.\n\nWelcome to Level 2 of your life. The tutorial phase is over.\n\nNow the REAL game begins.`,
        choices: [
            {
                text: '⚓ Join the Navy - Lock in Aircraft Mechanic path (Level up, unlock new mechanics)',
                effects: { 'career.currentPath': 'Navy Aircraft Mechanic', experience: 500, level: 2 },
            },
            {
                text: '🤔 Take time to heal first (MentalHealth: +30, Resilience: +10)',
                effects: { MentalHealth: 30, Resilience: 10, experience: 300 },
            },
        ],
    },
};

// ==================== STORAGE ====================
function saveGameState() {
    localStorage.setItem('jordanRiseState', JSON.stringify(gameState));
}

function loadGameState() {
    const saved = localStorage.getItem('jordanRiseState');
    if (saved) {
        Object.assign(gameState, JSON.parse(saved));
    }
}

// ==================== XP & LEVELING ====================
function addExperience(amount) {
    gameState.experience += amount;

    if (gameState.experience >= gameState.experienceNeeded) {
        levelUp();
    }
    saveGameState();
}

function levelUp() {
    gameState.level += 1;
    gameState.experience = 0;
    gameState.experienceNeeded = gameState.level * 100;

    // Stat boost on level up
    Object.keys(gameState.stats).forEach(stat => {
        gameState.stats[stat] = Math.min(100, gameState.stats[stat] + 5);
    });

    saveGameState();
}

// ==================== STAT MODIFICATION ====================
function modifyStat(stat, amount) {
    if (gameState.stats[stat] !== undefined) {
        gameState.stats[stat] = Math.max(0, Math.min(100, gameState.stats[stat] + amount));
    } else if (gameState.vitals[stat] !== undefined) {
        gameState.vitals[stat] = Math.max(0, Math.min(100, gameState.vitals[stat] + amount));
    }
    saveGameState();
}

// ==================== CHOICE HANDLING ====================
function handleChoice(choiceIndex) {
    const currentEvent = storyEvents[gameState.storyPhase];
    const choice = currentEvent.choices[choiceIndex];

    // Apply effects
    choice.effects.forEach(effect => {
        Object.entries(effect).forEach(([key, value]) => {
            if (key === 'experience') {
                addExperience(value);
            } else if (key === 'level') {
                gameState.level += value;
            } else if (key.includes('.')) {
                // Handle nested properties like 'trauma.addiction'
                const parts = key.split('.');
                let obj = gameState;
                for (let i = 0; i < parts.length - 1; i++) {
                    obj = obj[parts[i]];
                }
                obj[parts[parts.length - 1]] = Math.max(0, Math.min(100, obj[parts[parts.length - 1]] + value));
            } else if (gameState.stats[key]) {
                modifyStat(key, value);
            } else if (gameState.relationships[key]) {
                gameState.relationships[key] = Math.max(0, Math.min(100, gameState.relationships[key] + value));
            }
        });
    });

    // Store decision
    gameState.decisions.push({
        phase: gameState.storyPhase,
        choice: choice.text,
        timestamp: new Date().toISOString(),
    });

    // Progress story
    gameState.storyPhase += 1;
    gameState.currentAge = gameState.storyPhase; // Simplified age progression

    if (gameState.storyPhase > 5) {
        // Free roam after story
        gameState.storyPhase = 5;
    }

    // Check achievements
    checkAchievements();
    saveGameState();
    render();
}

// ==================== ACHIEVEMENTS ====================
function checkAchievements() {
    // First Breath
    if (gameState.storyPhase >= 1) {
        gameState.achievements['First Breath'] = true;
    }

    // Troubled Youth
    if (gameState.storyPhase >= 2) {
        gameState.achievements['Troubled Youth'] = true;
    }

    // Turning Point (Choosing resilience in phase 2)
    if (gameState.stats.Discipline > 30) {
        gameState.achievements['Turning Point'] = true;
    }

    // Survival Instinct
    if (gameState.trauma.addiction > 50) {
        gameState.achievements['Survival Instinct'] = true;
    }

    // Breaking Chains
    if (gameState.storyPhase >= 5 && gameState.vitals.Sobriety > 50) {
        gameState.achievements['Breaking Chains'] = true;
    }

    // Rising Star
    if (gameState.level >= 3) {
        gameState.achievements['Rising Star'] = true;
    }

    // Technical Mastery
    if (gameState.stats.Technical >= 40) {
        gameState.achievements['Technical Mastery'] = true;
    }

    // Healed Soul
    if (gameState.vitals.MentalHealth >= 80 && gameState.trauma.recoveryProgress >= 70) {
        gameState.achievements['Healed Soul'] = true;
    }
}

// ==================== UI RENDERING ====================
function render() {
    const app = document.getElementById('app');

    app.innerHTML = `
        <!-- HEADER -->
        <div class="game-header">
            <div class="game-title">⚔️ JORDAN'S RISE</div>
            <div class="age-level-display">
                <div>📍 Age: ${gameState.storyPhase * 3 + 1} (Phase ${gameState.storyPhase})</div>
                <div>⭐ Level: ${gameState.level}</div>
                <div>🎯 XP: ${gameState.experience}/${gameState.experienceNeeded}</div>
            </div>
        </div>

        <!-- STATUS BARS -->
        <div class="status-container">
            <div class="status-bar health-bar">
                <div class="status-label">❤️ Health</div>
                <div class="bar">
                    <div class="bar-fill" style="width: ${gameState.vitals.Health}%">${gameState.vitals.Health}%</div>
                </div>
            </div>
            <div class="status-bar sobriety-bar">
                <div class="status-label">🌿 Sobriety</div>
                <div class="bar">
                    <div class="bar-fill" style="width: ${gameState.vitals.Sobriety}%">${gameState.vitals.Sobriety}%</div>
                </div>
            </div>
            <div class="status-bar mental-health-bar">
                <div class="status-label">🧠 Mental Health</div>
                <div class="bar">
                    <div class="bar-fill" style="width: ${gameState.vitals.MentalStability}%">${gameState.vitals.MentalStability}%</div>
                </div>
            </div>
            <div class="status-bar">
                <div class="status-label">😊 Happiness</div>
                <div class="bar">
                    <div class="bar-fill" style="width: ${gameState.vitals.Happiness}%">${gameState.vitals.Happiness}%</div>
                </div>
            </div>
        </div>

        <!-- STATS GRID -->
        <div class="stats-grid">
            ${Object.entries(gameState.stats).map(([stat, value]) => `
                <div class="stat-card">
                    <div class="stat-name">${stat}</div>
                    <div class="stat-value">${value}</div>
                    <div class="stat-bar-small">
                        <div class="stat-bar-small-fill" style="width: ${value}%"></div>
                    </div>
                </div>
            `).join('')}
        </div>

        <!-- STORY SECTION -->
        ${renderStory()}

        <!-- RELATIONSHIPS -->
        <div class="relationships-section">
            <div class="relationships-title">👥 Relationships</div>
            ${Object.entries(gameState.relationships).map(([person, level]) => `
                <div class="relationship-item">
                    <div class="relationship-name">${person}</div>
                    <div class="relationship-meter">
                        <div class="relationship-meter-fill" style="width: ${level}%"></div>
                    </div>
                </div>
            `).join('')}
        </div>

        <!-- ACHIEVEMENTS -->
        <div class="achievements-section">
            <div class="achievements-title">🏆 Achievements</div>
            <div class="achievement-grid">
                ${Object.entries(gameState.achievements).map(([name, unlocked]) => `
                    <div class="achievement ${unlocked ? 'unlocked' : ''}">
                        <div class="achievement-icon">${unlocked ? '⭐' : '🔒'}</div>
                        <div class="achievement-name">${name}</div>
                    </div>
                `).join('')}
            </div>
        </div>

        <!-- ACTION BUTTONS -->
        <div style="text-align: center; padding: 20px;">
            <button class="btn btn-danger" onclick="resetGame()">🔄 New Game</button>
            <button class="btn btn-success" onclick="saveGameState()">💾 Save</button>
        </div>
    `;
}

function renderStory() {
    if (gameState.storyPhase > 5) {
        return `
            <div class="story-section">
                <div class="story-title">🎮 Free Roam - Your Journey Continues</div>
                <div class="story-text">
                    You've completed the tutorial phases of your life. Now it's time to CHOOSE YOUR PATH.
                    <br><br>
                    The Navy awaits. Or maybe another path calls to you.
                    <br><br>
                    What's next for Jordan Smith?
                </div>
                <div class="story-choices">
                    <button class="choice-button" onclick="startNavyPath()">⚓ Pursue Naval Career</button>
                    <button class="choice-button" onclick="startRecoveryPath()">🧘 Focus on Recovery</button>
                    <button class="choice-button" onclick="startEducationPath()">📚 Get Education First</button>
                </div>
            </div>
        `;
    }

    const event = storyEvents[gameState.storyPhase];
    if (!event) return '';

    return `
        <div class="story-section">
            <div class="story-title">${event.title}</div>
            <div class="story-text">${event.text}</div>
            <div class="story-choices">
                ${event.choices.map((choice, index) => `
                    <button class="choice-button" onclick="handleChoice(${index})">
                        ${choice.text}
                    </button>
                `).join('')}
            </div>
        </div>
    `;
}

// ==================== PATH FUNCTIONS ====================
function startNavyPath() {
    gameState.career.currentPath = 'Navy Aircraft Mechanic';
    gameState.stats.Technical += 20;
    gameState.stats.Discipline += 15;
    addExperience(250);
    render();
}

function startRecoveryPath() {
    gameState.vitals.MentalStability += 25;
    gameState.trauma.recoveryProgress += 30;
    addExperience(200);
    render();
}

function startEducationPath() {
    gameState.stats.Intelligence += 20;
    gameState.stats.Focus += 15;
    addExperience(200);
    render();
}

// ==================== RESET ====================
function resetGame() {
    if (confirm('⚠️ Start a new game? All progress will be lost.')) {
        localStorage.removeItem('jordanRiseState');
        location.reload();
    }
}

// ==================== INITIALIZE ====================
function init() {
    loadGameState();
    render();
}

window.addEventListener('DOMContentLoaded', init);

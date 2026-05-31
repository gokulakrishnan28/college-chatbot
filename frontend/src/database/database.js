import SQL from 'better-sqlite3';

/**
 * Initialize SQLite Database
 */
export const initializeDatabase = () => {
    const db = new SQL('chatbot.db');

    db.exec(`
        PRAGMA journal_mode = WAL;

        -- Knowledge Base Table
        CREATE TABLE IF NOT EXISTS knowledge_base (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            category TEXT NOT NULL,
            question TEXT NOT NULL,
            answer TEXT NOT NULL,
            keywords TEXT,
            confidence_score REAL DEFAULT 1.0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        -- User Conversations Table
        CREATE TABLE IF NOT EXISTS conversations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_message TEXT NOT NULL,
            bot_response TEXT NOT NULL,
            language TEXT DEFAULT 'en',
            intent_detected TEXT,
            confidence REAL,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        -- Training Data Table
        CREATE TABLE IF NOT EXISTS training_data (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            pattern TEXT NOT NULL,
            response TEXT NOT NULL,
            intent TEXT NOT NULL,
            usage_count INTEGER DEFAULT 0,
            success_rate REAL DEFAULT 0.0
        );

        -- Unanswered Questions Table
        CREATE TABLE IF NOT EXISTS unanswered_questions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            question TEXT NOT NULL,
            language TEXT DEFAULT 'en',
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
            resolved INTEGER DEFAULT 0
        );
    `);

    return db;
};

/**
 * Insert Sample Data
 */
export const initializeSampleData = (db) => {

    /* ---------------- Knowledge Base ---------------- */

    const insertKnowledge = db.prepare(`
        INSERT OR IGNORE INTO knowledge_base
        (category, question, answer, keywords)
        VALUES (?, ?, ?, ?)
    `);

    const knowledgeData = [
        [
            'about',
            'What is SSMIET?',
            'SSM Institute of Engineering and Technology is an autonomous engineering institution approved by AICTE, New Delhi and affiliated with Anna University, Chennai. The institute is located on the Dindigul–Palani Highway in Tamil Nadu and focuses on quality technical education and innovation.',
            'about,ssmiet,college,engineering'
        ],
        [
            'courses',
            'What courses are offered?',
            'SSMIET offers undergraduate B.E and B.Tech programs in Civil Engineering, Computer Science and Engineering, Electronics and Communication Engineering, Electrical and Electronics Engineering, Mechanical Engineering, Artificial Intelligence and Data Science, Computer Science and Business Systems, Information Technology, and Cyber Security. Postgraduate M.E programs are available in Communication Systems and Thermal Engineering.',
            'courses,programs,be,btech,me'
        ],
        [
            'admissions',
            'How can I apply for admission?',
            'Admissions to SSMIET undergraduate programs are through Tamil Nadu Engineering Admissions (TNEA) counseling based on higher secondary examination marks. For postgraduate admissions, candidates must apply through Anna University norms.',
            'admission,apply,tnea,engineering'
        ],
        [
            'placements',
            'How are placements at SSMIET?',
            'SSMIET has a dedicated Training and Placement Cell that supports students with skill development, internships, and campus recruitment. Students have been placed in companies such as TCS, Infosys, Wipro, Zoho, and other reputed organizations.',
            'placements,jobs,career,companies'
        ],
        [
            'contact',
            'How can I contact SSMIET?',
            'Address: Dindigul–Palani Highway, Dindigul - 624002, Tamil Nadu, India. Phone: 0451-2448800 to 899. Email: ssmietdgl@gmail.com.',
            'contact,address,phone,email'
        ]
    ];

    knowledgeData.forEach(row => insertKnowledge.run(row));

    /* ---------------- Training Data ---------------- */

    const insertTraining = db.prepare(`
        INSERT OR IGNORE INTO training_data
        (pattern, response, intent)
        VALUES (?, ?, ?)
    `);

    const trainingData = [
        ['hello', 'Hello! Welcome to SSM Institute of Engineering and Technology.', 'greeting'],
        ['hi', 'Hi! How can I help you with information about SSMIET?', 'greeting'],
        ['courses', 'SSMIET offers multiple undergraduate and postgraduate engineering programs.', 'courses'],
        ['admission', 'Admissions are done through TNEA counseling for undergraduate programs.', 'admissions'],
        ['placement', 'SSMIET has an active placement cell supporting student careers.', 'placements'],
        ['contact', 'You can contact SSMIET via phone or email for more details.', 'contact']
    ];

    trainingData.forEach(row => insertTraining.run(row));

    console.log('✅ Database initialized with English-only official SSMIET data');
};

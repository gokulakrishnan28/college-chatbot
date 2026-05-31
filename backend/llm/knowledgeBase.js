// src/services/knowledgeBase.js

const facultyKnowledgeBase = {
  // ==================== GREETINGS & WELCOME ====================
  'greeting': "Hello! Welcome to SSMIET Assistant!\n\nI'm here to help you with information about\n• Courses and Programs\n• Admissions Process\n• Fee Structure\n• Placement Details\n• Faculty Information\n• Contact Details\n\nWhat would you like to know about SSM Institute of Engineering and Technology?",

  // ==================== CREATOR INFORMATION ====================
  'creator': "I was created by Gokulakrishnan and Mohammed Karib Navas from the AIML department. They're passionate students who built me to help everyone get information about our college easily!",

  // ==================== FOUNDER INFORMATION ====================
  'founder': "SSM Institute of Engineering and Technology was established by the SSM Trust. [Please add founder details from ssmiet.ac.in]",

  // ==================== PRINCIPAL INFORMATION ====================
  'principal': "Dr. D. Senthil Kumaran is our Principal. [Please verify and update qualifications from ssmiet.ac.in]",

  // ==================== MANAGEMENT INFORMATION ====================
  'chairman': "Please update Chairman's information from ssmiet.ac.in",
  'secretary': "Please update Secretary's information from ssmiet.ac.in",
  'treasurer': "Please update Treasurer's information from ssmiet.ac.in",

  // ==================== HOD INFORMATION ====================
  // Please verify all HOD details from the website
  'hod_aiml': "Dr. K. Vinoth Kumar is the Professor and Head of the Department of Artificial Intelligence and Machine Learning. [Verify qualifications from website]",
  'hod_aids': "Dr. K. Jayaram is the Associate Professor and Head of the Department of Artificial Intelligence and Data Science. [Verify from website]",
  'hod_cse': "Dr. C. Sujatha is the Professor and Head of the Department of Computer Science and Engineering. [Verify from website]",
  'hod_cyber': "Dr. K. Rajesh is the Associate Professor and Head of the Department of Cyber Security. [Verify from website]",
  'hod_it': "Dr. G. Prabu is the Associate Professor and Head of the Department of Information Technology. [Verify from website]",
  'hod_csbs': "Dr. M. Jeyalakshmi is the Associate Professor and Head of the Department of Computer Science and Business Systems. [Verify from website]",
  'hod_ece': "Dr. S. Karthigai Lakshmi is the Professor and Head of the Department of Electronics and Communication Engineering. [Verify from website]",
  'hod_eee': "Dr. R.M. Sekar is the Professor and Head of the Department of Electrical and Electronics Engineering. [Verify from website]",
  'hod_mech': "Dr. G. Sankara Narayanan is the Professor and Head of the Department of Mechanical Engineering. [Verify from website]",
  'hod_civil': "Dr. G. Selvabharathi is the Professor and Head of the Department of Civil Engineering. [Verify from website]",

  // ==================== COURSES OFFERED ====================
  'courses': `Courses Offered at SSMIET (Please verify all from ssmiet.ac.in):

Undergraduate Programs (B.E./B.Tech) - 4 Years:
✅ Artificial Intelligence & Data Science (AIDS)
✅ Artificial Intelligence & Machine Learning (AIML)
✅ Computer Science & Engineering (CSE)
✅ Computer Science & Engineering (Cyber Security)
✅ Information Technology (IT)
✅ Computer Science & Business Systems (CSBS)
✅ Electronics & Communication Engineering (ECE)
✅ Electrical & Electronics Engineering (EEE)
✅ Mechanical Engineering
✅ Civil Engineering

Postgraduate Programs (M.E.) - 2 Years:
✅ Communication Systems
✅ Thermal Engineering
✅ [Add any other PG courses from website]

Doctoral Programs (Ph.D.):
✅ [Add Ph.D. programs if available]

All programs are approved by AICTE and affiliated to Anna University, Chennai.`,

  // ==================== COURSE DETAILS ====================
  // Please verify all course details from ssmiet.ac.in
  'course_aiml': `Artificial Intelligence & Machine Learning (AIML) - B.E.

📚 What is AIML?
A specialized branch of Computer Science that focuses on creating intelligent systems capable of learning and decision-making.

🎯 Program Objectives:
• Develop AI and ML solutions for real-world problems
• Build expertise in neural networks and deep learning
• Create intelligent applications and systems

📖 Key Subjects:
• Machine Learning Algorithms
• Neural Networks & Deep Learning
• Natural Language Processing
• Computer Vision & Pattern Recognition
• Reinforcement Learning
• Big Data Analytics

💼 Career Opportunities:
• AI/ML Engineer
• Data Scientist
• Computer Vision Engineer
• NLP Specialist
• Research Scientist

👨‍🏫 Department Head: Dr. K. Vinoth Kumar
📅 Duration: 4 Years
🏆 Eligibility: 10+2 with PCM (50% minimum)

[Please verify and update all details from ssmiet.ac.in]`,

  'course_aids': `Artificial Intelligence & Data Science (AIDS) - B.Tech

📚 What is AIDS?
Integration of AI technologies with data science principles to extract insights and build intelligent data-driven solutions.

📖 Key Subjects:
• Data Analytics & Visualization
• Big Data Technologies
• Statistical Learning
• AI Algorithms
• Database Management
• Cloud Computing

💼 Career Opportunities:
• Data Scientist
• AI Specialist
• Business Intelligence Analyst
• Data Engineer
• Analytics Manager

👨‍🏫 Department Head: Dr. K. Jayaram
📅 Duration: 4 Years

[Please verify and update all details from ssmiet.ac.in]`,

  'course_cse': `Computer Science & Engineering (CSE) - B.E.

📚 What is CSE?
Core engineering discipline focused on computer systems, software development, and computational theories.

📖 Key Subjects:
• Programming Languages (C, C++, Java, Python)
• Data Structures & Algorithms
• Database Management Systems
• Operating Systems
• Software Engineering
• Computer Networks
• Web Technologies

💼 Career Opportunities:
• Software Developer
• System Architect
• Database Administrator
• Full Stack Developer
• IT Consultant

👨‍🏫 Department Head: Dr. C. Sujatha
📅 Duration: 4 Years

[Please verify and update all details from ssmiet.ac.in]`,

  // ... Continue for other courses with verified information

  // ==================== ADMISSIONS ====================
  'admissions': `📝 Admissions Process at SSMIET

🎓 Undergraduate Programs (B.E./B.Tech):
• TNEA Counseling (Government Quota)
• Management Quota (Direct Admission)
• Eligibility: 10+2 with Physics, Chemistry, Mathematics (Minimum 50%)
• Lateral Entry for Diploma holders

🎓 Postgraduate Programs (M.E.):
• TANCET Counseling
• Direct Admission under Management Quota
• Eligibility: B.E./B.Tech in relevant branch

📋 Required Documents:
• 10th & 12th Mark Sheets
• Transfer Certificate
• Conduct Certificate
• Community Certificate (if applicable)
• Passport size photographs

📞 Admission Office:
Phone: 0451-2448800
Email: admissions@ssmiet.ac.in
[Please verify contact details from ssmiet.ac.in]`,

  // ==================== FEE STRUCTURE ====================
  'fees': `💰 Fee Structure (Please verify exact amounts from ssmiet.ac.in):

Tuition Fees (Per Year):
• Government Quota: As per Anna University norms
• Management Quota: Please contact admission office

💰 Scholarships Available:
• Government Scholarships (SC/ST/BC/MBC)
• Merit Scholarships for top performers
• Sports Quota Scholarships
• Fee concession for economically weaker sections

💳 Bank Details for Fee Payment:
Bank Name: State Bank of India, Dindigul
Account Name: SSM Institute of Engineering and Technology
Account Number: 00000032684732711
IFSC Code: SBIN0012758
Branch: Dindigul

For detailed fee structure, please contact Accounts Department at 0451-2448800`,

  // ==================== PLACEMENTS ====================
  'placements': `🎯 Placement Highlights (Please verify current statistics from ssmiet.ac.in):

🏢 Top Recruiters:
• TCS (Tata Consultancy Services)
• Infosys
• Wipro
• Cognizant
• Zoho Corporation
• HCL Technologies
• Tech Mahindra
• [Add more companies from website]

📊 Placement Support:
• Dedicated Training & Placement Cell
• Aptitude Training
• Technical Training
• Soft Skills Development
• Mock Interviews
• Industry Interactions

💼 Average Package: [Add current statistics]
💼 Highest Package: [Add current statistics]

Placement Officer Contact: [Add details from website]`,

  // ==================== FACILITIES ====================
  'facilities': `🏛️ Campus Facilities:

📚 Library:
• Over 50,000+ books
• Digital Resource Center
• NPTEL Video Lectures
• e-Journals & Databases

🔬 Laboratories:
• Department-specific labs with latest equipment
• Computer Labs with high-end systems
• Research Labs

🏨 Hostel:
• Separate hostels for Boys & Girls
• Wi-Fi enabled
• 24/7 Security
• Hygienic Mess

🚌 Transportation:
• Buses covering major routes in Dindigul, Palani, Batlagundu
• [Add transport details from website]

⚕️ Medical:
• First-aid facility
• Tie-up with nearby hospitals

🏟️ Sports:
• Indoor & Outdoor sports facilities
• Gymnasium

Other Facilities:
• Cafeteria
• Banking & ATM
• Wi-Fi Campus
• [Add other facilities from website]`,

  // ==================== CONTACT ====================
  'contact': `📞 Contact SSMIET:

📍 Address:
SSM Institute of Engineering & Technology
Dindigul – Palani Highway
Dindigul - 624002, Tamil Nadu

📞 Phone Numbers:
• College Office: 0451-2448800
• Admission Office: [Add from website]
• Placement Office: [Add from website]

📧 Email:
• General: ssmietdgl@gmail.com
• Admissions: [Add from website]
• Placements: [Add from website]

🌐 Website: www.ssmiet.ac.in

🕒 Office Hours:
Monday - Friday: 9:00 AM - 5:00 PM
Saturday: 9:00 AM - 1:00 PM`,

  // ==================== ABOUT COLLEGE ====================
  'about': `🏛️ About SSM Institute of Engineering and Technology:

📍 Location: Dindigul, Tamil Nadu
📅 Established: [Add year from website]

✅ Accreditations & Approvals:
• Approved by AICTE, New Delhi
• Affiliated to Anna University, Chennai
• NAAC Accredited with 'A' Grade
• [Add NBA accredited programs from website]

🎯 Vision:
[Add vision from ssmiet.ac.in]

🎯 Mission:
[Add mission from ssmiet.ac.in]

🏆 Achievements:
• [Add achievements from website]
• [Add rankings/recognitions from website]

[Please verify and update all details from ssmiet.ac.in]`,

  // ==================== EXIT MESSAGES ====================
  'thanks': "You're welcome! 😊 If you have more questions about SSMIET, feel free to ask. For detailed information, please visit www.ssmiet.ac.in",
  
  'goodbye': "Goodbye! Thank you for chatting with me. For more information, please visit our website at www.ssmiet.ac.in. Have a great day!",

  // ==================== HELP ====================
  'help': `🤔 I can help you with:

📚 Courses: Ask about AIML, AIDS, CSE, etc.
👨‍🏫 Faculty: Information about HODs, Principal, Founder
💰 Admissions: Process, eligibility, documents
💵 Fees: Fee structure, scholarships
🎯 Placements: Recruiters, packages, training
🏛️ Facilities: Library, hostel, transport, labs
📞 Contact: Address, phone, email

What would you like to know?`
};

// ==================== IMPROVED SEARCH FUNCTION ====================
export const getFacultyInfo = (query) => {
  if (!query || typeof query !== 'string') {
    return facultyKnowledgeBase.help;
  }
  
  const lowerQuery = query.toLowerCase().trim();
  
  console.log("Searching for:", query);

  try {
    // ==================== GREETINGS ====================
    if (lowerQuery.match(/^(hello|hi|hey|good morning|good afternoon|good evening|hai|hii?)\b/)) {
      return facultyKnowledgeBase.greeting;
    }

    // ==================== HELP ====================
    if (lowerQuery.includes('help') || lowerQuery.includes('what can you do') || lowerQuery.includes('how to use')) {
      return facultyKnowledgeBase.help;
    }

    // ==================== CREATOR QUERIES ====================
    if (lowerQuery.match(/who (created|made|built|developed) you|your (creator|developer|maker)/) || 
        lowerQuery.includes('gokulakrishnan') || lowerQuery.includes('karib') || lowerQuery.includes('mohammed')) {
      return facultyKnowledgeBase.creator;
    }

    // ==================== FOUNDER QUERIES ====================
    if (lowerQuery.includes('founder') || lowerQuery.includes('established') || lowerQuery.includes('founded')) {
      return facultyKnowledgeBase.founder;
    }

    // ==================== PRINCIPAL QUERIES ====================
    if (lowerQuery.includes('principal') || lowerQuery.includes('director') || lowerQuery.includes('head of college')) {
      return facultyKnowledgeBase.principal;
    }

    // ==================== MANAGEMENT QUERIES ====================
    if (lowerQuery.includes('chairman')) {
      return facultyKnowledgeBase.chairman;
    }
    if (lowerQuery.includes('secretary')) {
      return facultyKnowledgeBase.secretary;
    }
    if (lowerQuery.includes('treasurer')) {
      return facultyKnowledgeBase.treasurer;
    }

    // ==================== HOD QUERIES ====================
    if (lowerQuery.includes('hod') || lowerQuery.includes('head of department') || lowerQuery.includes('department head')) {
      if (lowerQuery.includes('aiml') || lowerQuery.includes('ai ml') || (lowerQuery.includes('artificial intelligence') && lowerQuery.includes('machine learning'))) {
        return facultyKnowledgeBase.hod_aiml;
      }
      if (lowerQuery.includes('aids') || lowerQuery.includes('ai ds') || (lowerQuery.includes('artificial intelligence') && lowerQuery.includes('data science'))) {
        return facultyKnowledgeBase.hod_aids;
      }
      if (lowerQuery.includes('cse') || (lowerQuery.includes('computer science') && !lowerQuery.includes('business') && !lowerQuery.includes('cyber'))) {
        return facultyKnowledgeBase.hod_cse;
      }
      if (lowerQuery.includes('cyber') || lowerQuery.includes('security')) {
        return facultyKnowledgeBase.hod_cyber;
      }
      if (lowerQuery.includes('it') || lowerQuery.includes('information technology')) {
        return facultyKnowledgeBase.hod_it;
      }
      if (lowerQuery.includes('csbs') || lowerQuery.includes('business system') || lowerQuery.includes('computer science and business')) {
        return facultyKnowledgeBase.hod_csbs;
      }
      if (lowerQuery.includes('ece') || lowerQuery.includes('electronics')) {
        return facultyKnowledgeBase.hod_ece;
      }
      if (lowerQuery.includes('eee') || lowerQuery.includes('electrical')) {
        return facultyKnowledgeBase.hod_eee;
      }
      if (lowerQuery.includes('mech') || lowerQuery.includes('mechanical')) {
        return facultyKnowledgeBase.hod_mech;
      }
      if (lowerQuery.includes('civil')) {
        return facultyKnowledgeBase.hod_civil;
      }
    }

    // ==================== COURSE DEFINITIONS ====================
    if (lowerQuery.match(/what is|tell me about|about|define|explain|meaning of|details? of/)) {
      if (lowerQuery.includes('aiml') || lowerQuery.includes('ai ml') || 
          (lowerQuery.includes('artificial intelligence') && lowerQuery.includes('machine learning'))) {
        return facultyKnowledgeBase.course_aiml;
      }
      if (lowerQuery.includes('aids') || lowerQuery.includes('ai ds') || 
          (lowerQuery.includes('artificial intelligence') && lowerQuery.includes('data science'))) {
        return facultyKnowledgeBase.course_aids;
      }
      if (lowerQuery.includes('cse') || (lowerQuery.includes('computer science') && !lowerQuery.includes('business') && !lowerQuery.includes('cyber'))) {
        return facultyKnowledgeBase.course_cse;
      }
      // Add other course conditions here
    }

    // ==================== COURSES LIST ====================
    if (lowerQuery.match(/courses? offered|programs? offered|what courses|available courses|branches/)) {
      return facultyKnowledgeBase.courses;
    }

    // ==================== ADMISSIONS ====================
    if (lowerQuery.match(/admission|apply|eligibility|how to join|tnea|counseling/)) {
      return facultyKnowledgeBase.admissions;
    }

    // ==================== FEES ====================
    if (lowerQuery.match(/fee|fees|cost|payment|scholarship|education loan/)) {
      return facultyKnowledgeBase.fees;
    }

    // ==================== PLACEMENTS ====================
    if (lowerQuery.match(/placement|job|recruiter|company|career|package/)) {
      return facultyKnowledgeBase.placements;
    }

    // ==================== FACILITIES ====================
    if (lowerQuery.match(/facility|infrastructure|lab|workshop|campus/)) {
      return facultyKnowledgeBase.facilities;
    }

    // ==================== LIBRARY ====================
    if (lowerQuery.match(/library|book|journal|digital library/)) {
      return facultyKnowledgeBase.library || "Library information: Please check our website www.ssmiet.ac.in for detailed library resources and facilities.";
    }

    // ==================== HOSTEL ====================
    if (lowerQuery.match(/hostel|accommodation|living|dormitory/)) {
      return facultyKnowledgeBase.hostel || "Hostel information: Please contact the college office at 0451-2448800 for hostel availability and fees.";
    }

    // ==================== TRANSPORT ====================
    if (lowerQuery.match(/transport|bus|conveyance|travel/)) {
      return facultyKnowledgeBase.transport || "Transport information: Please contact the college office for bus route details and transport fees.";
    }

    // ==================== CONTACT ====================
    if (lowerQuery.match(/contact|address|phone|email|reach|location|map/)) {
      return facultyKnowledgeBase.contact;
    }

    // ==================== ABOUT COLLEGE ====================
    if (lowerQuery.match(/about college|about ssmit?e?t|college information|institute details/)) {
      return facultyKnowledgeBase.about;
    }

    // ==================== THANKS ====================
    if (lowerQuery.match(/thank|thanks|thx/)) {
      return facultyKnowledgeBase.thanks;
    }

    // ==================== GOODBYE ====================
    if (lowerQuery.match(/bye|goodbye|see you|cya|exit|quit/)) {
      return facultyKnowledgeBase.goodbye;
    }

    // ==================== DEFAULT RESPONSE ====================
    return `I couldn't find specific information about "${query}" in my knowledge base. 

Here's what I can help you with:
• 📚 Course details (AIML, AIDS, CSE, etc.)
• 👨‍🏫 Faculty information (HODs, Principal)
• 📝 Admissions and eligibility
• 💰 Fee structure and scholarships
• 🎯 Placement details
• 🏛️ Campus facilities
• 📞 Contact information

For accurate and detailed information, please visit our official website: www.ssmiet.ac.in

What would you like to know?`;

  } catch (error) {
    console.error("Error in getFacultyInfo:", error);
    return "I'm experiencing a technical issue. Please try again or visit www.ssmiet.ac.in for information.";
  }
};

export default facultyKnowledgeBase;
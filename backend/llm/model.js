// backend/llm/model.js
const knowledgeBase = require('./knowledgeBase');

class SimpleLLM {
    constructor() {
        this.context = [];
        console.log('✅ LLM Model initialized with knowledge base');
    }

    async processQuery(query) {
        console.log('🔍 Processing query:', query);
        
        // Add to context
        this.context.push({ role: 'user', content: query });
        
        // Get response from knowledge base
        let response = this.getResponseFromKB(query);
        
        // If found in KB, return it
        if (response) {
            console.log('✅ Found in knowledge base');
            this.context.push({ role: 'assistant', content: response });
            return response;
        }
        
        // If not in KB, use fallback
        console.log('❌ Not found in knowledge base, using fallback');
        response = this.generateFallbackResponse(query);
        this.context.push({ role: 'assistant', content: response });
        
        return response;
    }

    getResponseFromKB(query) {
        const lowerQuery = query.toLowerCase().trim();
        
        // ============ GREETINGS ============
        if (lowerQuery.match(/^(hello|hi|hey|good morning|good afternoon)/)) {
            return knowledgeBase.greeting || "Hello! Welcome to SSMIET Assistant!";
        }

        // ============ CREATOR ============
        if (lowerQuery.includes('who created you') || lowerQuery.includes('who made you')) {
            return knowledgeBase.creator || "I was created by Gokulakrishnan and Mohammed Karib Navas from AIML department.";
        }

        // ============ AIML QUERIES ============
        if (lowerQuery.includes('aiml') || 
            lowerQuery.includes('ai ml') || 
            (lowerQuery.includes('artificial intelligence') && lowerQuery.includes('machine learning'))) {
            
            // Check if asking about HOD
            if (lowerQuery.includes('hod') || lowerQuery.includes('head of')) {
                return knowledgeBase.hod_aiml || "Dr. K. Vinoth Kumar is the Professor and Head of AIML department.";
            }
            
            // Check if asking about course details
            if (lowerQuery.includes('what is') || lowerQuery.includes('tell me about') || lowerQuery.includes('about') || lowerQuery.includes('details')) {
                return knowledgeBase.course_aiml || `Artificial Intelligence & Machine Learning (AIML)
                
What is AIML?
AIML is a cutting-edge field that focuses on creating intelligent machines that can learn, reason, and solve problems.

Duration: 4 years (B.E.)
HOD: Dr. K. Vinoth Kumar

Career Opportunities:
• AI Engineer
• Machine Learning Engineer
• Data Scientist
• Research Scientist`;
            }
            
            // Default AIML response
            return knowledgeBase.course_aiml || "AIML stands for Artificial Intelligence & Machine Learning. It's a 4-year B.E. program at SSMIET.";
        }

        // ============ AIDS QUERIES ============
        if (lowerQuery.includes('aids') || 
            lowerQuery.includes('ai ds') || 
            (lowerQuery.includes('artificial intelligence') && lowerQuery.includes('data science'))) {
            
            if (lowerQuery.includes('hod') || lowerQuery.includes('head of')) {
                return knowledgeBase.hod_aids || "Dr. K. Jayaram is the Associate Professor and Head of AIDS department.";
            }
            
            return knowledgeBase.course_aids || "AIDS stands for Artificial Intelligence & Data Science. It's a 4-year B.Tech program at SSMIET.";
        }

        // ============ CSE QUERIES ============
        if (lowerQuery.includes('cse') || 
            (lowerQuery.includes('computer science') && !lowerQuery.includes('business') && !lowerQuery.includes('cyber'))) {
            
            if (lowerQuery.includes('hod') || lowerQuery.includes('head of')) {
                return knowledgeBase.hod_cse || "Dr. C. Sujatha is the Professor and Head of CSE department.";
            }
            
            return knowledgeBase.course_cse || "CSE stands for Computer Science & Engineering. It's a 4-year B.E. program at SSMIET.";
        }

        // ============ CYBER SECURITY ============
        if (lowerQuery.includes('cyber') || lowerQuery.includes('security')) {
            if (lowerQuery.includes('hod') || lowerQuery.includes('head of')) {
                return knowledgeBase.hod_cyber || "Dr. K. Rajesh is the Associate Professor and Head of Cyber Security department.";
            }
            return knowledgeBase.course_cyber || "Cyber Security focuses on protecting computer systems and networks from digital attacks.";
        }

        // ============ IT QUERIES ============
        if (lowerQuery.includes('it') || lowerQuery.includes('information technology')) {
            if (lowerQuery.includes('hod') || lowerQuery.includes('head of')) {
                return knowledgeBase.hod_it || "Dr. G. Prabu is the Associate Professor and Head of IT department.";
            }
            return knowledgeBase.course_it || "IT stands for Information Technology. It's a 4-year B.Tech program at SSMIET.";
        }

        // ============ CSBS QUERIES ============
        if (lowerQuery.includes('csbs') || lowerQuery.includes('business system')) {
            if (lowerQuery.includes('hod') || lowerQuery.includes('head of')) {
                return knowledgeBase.hod_csbs || "Dr. M. Jeyalakshmi is the Associate Professor and Head of CSBS department.";
            }
            return knowledgeBase.course_csbs || "CSBS stands for Computer Science & Business Systems. It's a 4-year B.Tech program.";
        }

        // ============ ECE QUERIES ============
        if (lowerQuery.includes('ece') || lowerQuery.includes('electronics')) {
            if (lowerQuery.includes('hod') || lowerQuery.includes('head of')) {
                return knowledgeBase.hod_ece || "Dr. S. Karthigai Lakshmi is the Professor and Head of ECE department.";
            }
            return knowledgeBase.course_ece || "ECE stands for Electronics & Communication Engineering. It's a 4-year B.E. program.";
        }

        // ============ EEE QUERIES ============
        if (lowerQuery.includes('eee') || lowerQuery.includes('electrical')) {
            if (lowerQuery.includes('hod') || lowerQuery.includes('head of')) {
                return knowledgeBase.hod_eee || "Dr. R.M. Sekar is the Professor and Head of EEE department.";
            }
            return knowledgeBase.course_eee || "EEE stands for Electrical & Electronics Engineering. It's a 4-year B.E. program.";
        }

        // ============ MECHANICAL QUERIES ============
        if (lowerQuery.includes('mech') || lowerQuery.includes('mechanical')) {
            if (lowerQuery.includes('hod') || lowerQuery.includes('head of')) {
                return knowledgeBase.hod_mech || "Dr. G. Sankara Narayanan is the Professor and Head of Mechanical Engineering department.";
            }
            return knowledgeBase.course_mech || "Mechanical Engineering focuses on design, analysis, and manufacturing of mechanical systems.";
        }

        // ============ CIVIL QUERIES ============
        if (lowerQuery.includes('civil')) {
            if (lowerQuery.includes('hod') || lowerQuery.includes('head of')) {
                return knowledgeBase.hod_civil || "Dr. G. Selvabharathi is the Professor and Head of Civil Engineering department.";
            }
            return knowledgeBase.course_civil || "Civil Engineering focuses on design, construction, and maintenance of infrastructure projects.";
        }

        // ============ PRINCIPAL QUERIES ============
        if (lowerQuery.includes('principal') || lowerQuery.includes('director')) {
            return knowledgeBase.principal || "Dr. D. Senthil Kumaran is our Principal.";
        }

        // ============ ADMISSION QUERIES ============
        if (lowerQuery.includes('admission') || lowerQuery.includes('apply') || lowerQuery.includes('join')) {
            return knowledgeBase.admissions || `Admissions Process:
            
• Based on TNEA counseling for B.E./B.Tech programs
• Direct admission available under management quota
• Eligibility: 10+2 with Physics, Chemistry, Mathematics

Contact: 0451-2448800 or ssmietdgl@gmail.com`;
        }

        // ============ FEE QUERIES ============
        if (lowerQuery.includes('fee') || lowerQuery.includes('fees') || lowerQuery.includes('cost')) {
            return knowledgeBase.fees || `Fee Structure:
            
• Government Quota: As per Anna University norms
• Management Quota: Contact admission office

Bank Details:
Account Name: SSM Institute of Engineering and Technology
Account Number: 00000032684732711
IFSC Code: SBIN0012758`;
        }

        // ============ PLACEMENT QUERIES ============
        if (lowerQuery.includes('placement') || lowerQuery.includes('job') || lowerQuery.includes('company')) {
            return knowledgeBase.placements || `Top Recruiters:
• TCS, Infosys, Wipro, Cognizant
• Zoho, HCL, Tech Mahindra

Dedicated Training & Placement Cell provides aptitude training, mock interviews, and placement assistance.`;
        }

        // ============ CONTACT QUERIES ============
        if (lowerQuery.includes('contact') || lowerQuery.includes('phone') || lowerQuery.includes('email') || lowerQuery.includes('address')) {
            return knowledgeBase.contact || `Contact SSMIET:

Address: SSM Institute of Engineering & Technology, Dindigul – Palani Highway, Dindigul - 624002
Phone: 0451-2448800
Email: ssmietdgl@gmail.com
Website: www.ssmiet.ac.in`;
        }

        // ============ FACILITIES QUERIES ============
        if (lowerQuery.includes('facility') || lowerQuery.includes('library') || lowerQuery.includes('hostel') || lowerQuery.includes('transport')) {
            return knowledgeBase.facilities || `Campus Facilities:
• Modern laboratories
• Central library with digital resources
• Separate hostels for boys and girls
• Sports complex and gymnasium
• Wi-Fi enabled campus
• Transportation services`;
        }

        // ============ ABOUT COLLEGE ============
        if (lowerQuery.includes('about') || lowerQuery.includes('ssmiet') || lowerQuery.includes('college')) {
            return knowledgeBase.about || `About SSMIET:

• Approved by AICTE
• Affiliated to Anna University
• NAAC 'A' Grade Accredited
• Several NBA accredited programs`;
        }

        // ============ THANKS ============
        if (lowerQuery.includes('thank')) {
            return knowledgeBase.thanks || "You're welcome! Feel free to ask if you have more questions.";
        }

        // ============ GOODBYE ============
        if (lowerQuery.includes('bye') || lowerQuery.includes('goodbye')) {
            return knowledgeBase.goodbye || "Goodbye! Have a great day!";
        }

        // No match found
        return null;
    }

    generateFallbackResponse(query) {
        return `I understand you're asking about "${query}". Here's how I can help:

• For specific course information, try asking:
  - "What is AIML?"
  - "Tell me about CSE"
  - "AIDS course details"
  - "Civil Engineering information"

• For faculty information:
  - "Who is HOD of AIML?"
  - "Principal name"
  - "Civil department head"

• For other queries:
  - "Admission process"
  - "Fee structure"
  - "Placement details"
  - "Contact information"

Or contact the college directly:
📞 Phone: 0451-2448800
📧 Email: ssmietdgl@gmail.com
🌐 Website: www.ssmiet.ac.in`;
    }
}

// Create instance
const llm = new SimpleLLM();

// Export the function
exports.getLLMResponse = async (message) => {
    try {
        console.log('📨 Processing:', message);
        const response = await llm.processQuery(message);
        console.log('📤 Response:', response.substring(0, 100) + '...');
        return response;
    } catch (error) {
        console.error('❌ Error:', error);
        return "I'm having trouble processing your request. Please try again.";
    }
};
/**
 * CODEDEV ACADEMY - Interactive Application Logic
 * Handles interactive tabs, modals, accordions, mobile drawer & animations
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initStickyNav();
  initMobileDrawer();
  initCodeDashboardTabs();
  initFaqAccordion();
  initScrollAnimations();
  initCountdownTimer();
  initSyllabusModal();
  initWelcomeOfferModal();
});

/* ==========================================================================
   0. Theme Toggle (Dark Mode & Normal Light Mode)
   ========================================================================== */
function initThemeToggle() {
  const desktopBtn = document.getElementById('themeToggleBtn');
  const mobileBtn = document.getElementById('mobileThemeToggleBtn');
  
  // 1. Get saved theme or check system preference
  const savedTheme = localStorage.getItem('codedev_theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const currentTheme = savedTheme || (prefersDark ? 'dark' : 'light');
  applyTheme(currentTheme, false);

  function applyTheme(theme, showNotice = true) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      if (desktopBtn) desktopBtn.setAttribute('title', 'Switch to Normal Light Mode');
      if (mobileBtn) mobileBtn.setAttribute('title', 'Switch to Normal Light Mode');
    } else {
      document.documentElement.removeAttribute('data-theme');
      if (desktopBtn) desktopBtn.setAttribute('title', 'Switch to Dark Mode');
      if (mobileBtn) mobileBtn.setAttribute('title', 'Switch to Dark Mode');
    }
    localStorage.setItem('codedev_theme', theme);

    if (showNotice && typeof window.showToast === 'function') {
      const msg = theme === 'dark' ? '🌙 Dark Mode Activated' : '☀️ Normal Light Mode Activated';
      window.showToast(msg);
    }
  }

  function toggle() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const nextTheme = isDark ? 'light' : 'dark';
    applyTheme(nextTheme, true);
  }

  if (desktopBtn) desktopBtn.addEventListener('click', toggle);
  if (mobileBtn) mobileBtn.addEventListener('click', toggle);
}


/* ==========================================================================
   1. Sticky Navbar & Active Link Observer
   ========================================================================== */
function initStickyNav() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('is-scrolled');
    } else {
      navbar.classList.remove('is-scrolled');
    }
  });
}

/* ==========================================================================
   2. Mobile Drawer Navigation
   ========================================================================== */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobileNavToggle');
  const drawer = document.getElementById('mobileDrawer');
  const backdrop = document.getElementById('mobileDrawerBackdrop');
  const closeBtn = document.getElementById('mobileDrawerClose');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link, .drawer-close-action');

  if (!toggleBtn || !drawer || !backdrop) return;

  function openDrawer() {
    drawer.classList.add('is-open');
    backdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('is-open');
    backdrop.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* ==========================================================================
   3. Interactive Hero Code Simulator Tabs
   ========================================================================== */
const codeSnippets = {
  java: `// 1. JAVA PROGRAMMING + SPRING BOOT
@RestController
@RequestMapping("/api/v1/students")
public class StudentController {
    
    @Autowired
    private StudentService studentService;

    @PostMapping("/enroll")
    public ResponseEntity<Response> enrollInAcademy(
            @Valid @RequestBody EnrollRequest request) {
        // Industry standard Spring Boot + JPA Architecture
        Student student = studentService.register(request);
        return ResponseEntity.ok(new Response("Welcome to CodeDev Academy!", student));
    }
}`,
  python: `# 2. PYTHON PROGRAMMING + MACHINE LEARNING
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

# Real-world data processing & ML pipeline
dataset = pd.read_csv("developer_metrics.csv")
X = dataset.drop(columns=["career_success"])
y = dataset["career_success"]

model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X, y)
print("🚀 Model Trained Successfully! Accuracy: 98.6%")`,
  mern: `// 3. FULL STACK DEVELOPMENT (MERN)
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const DevDashboard = () => {
  const [projects, setProjects] = useState([]);
  
  useEffect(() => {
    // Connect React frontend to Node.js & MongoDB API
    axios.get('/api/projects/portfolio')
      .then(res => setProjects(res.data))
      .catch(err => console.error("Error loading portfolio", err));
  }, []);

  return <div>{projects.map(p => <ProjectCard key={p._id} {...p} />)}</div>;
};`
};

function initCodeDashboardTabs() {
  const tabButtons = document.querySelectorAll('.code-tab-btn');
  const codeContent = document.getElementById('heroCodeDisplay');

  if (!codeContent) return;

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const track = btn.getAttribute('data-track');
      if (codeSnippets[track]) {
        codeContent.textContent = codeSnippets[track];
      }
    });
  });
}

/* ==========================================================================
   4. FAQ Accordion
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      // Close all other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('is-open');
        }
      });

      // Toggle current item
      if (isOpen) {
        item.classList.remove('is-open');
      } else {
        item.classList.add('is-open');
      }
    });
  });
}

/* ==========================================================================
   5. Smooth Scroll Reveal Observer
   ========================================================================== */
function initScrollAnimations() {
  const reveals = document.querySelectorAll('.reveal-on-scroll');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

/* ==========================================================================
   6. Countdown Timer for Early Bird Offer (Urgency Trigger)
   ========================================================================== */
function initCountdownTimer() {
  const countdownElements = document.querySelectorAll('.countdown-timer');
  if (!countdownElements.length) return;

  // Set target to 48 hours from now
  const targetDate = new Date().getTime() + (48 * 60 * 60 * 1000);

  function updateTimer() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      countdownElements.forEach(el => el.textContent = "Ending Today!");
      return;
    }

    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const timeStr = `${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`;
    countdownElements.forEach(el => el.textContent = timeStr);
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

/* ==========================================================================
   7. Syllabus Modal System
   ========================================================================== */
const courseSyllabusData = {
  java: {
    title: "Java Programming + Spring Boot Full Curriculum",
    badge: "Track 01 • Java & Backend",
    modules: [
      {
        name: "Module 1: Core Java Fundamentals & OOP Mastery",
        topics: ["Java Syntax, JVM, JDK, JRE architecture", "Variables, Data Types, Control Flow & Loops", "Object-Oriented Programming (Classes, Objects, Inheritance, Polymorphism, Abstraction, Encapsulation)", "Method Overloading & Overriding", "String Handling & Memory Management"]
      },
      {
        name: "Module 2: Advanced Java, Collections & Exception Handling",
        topics: ["Java Collections Framework (List, Set, Map, Queue, ArrayList, HashMap, LinkedList)", "Exception Handling (Try-Catch, Finally, Custom Exceptions)", "File I/O Streams & Serialization", "Multithreading & Concurrency Concepts", "Java 8+ Features: Lambdas, Stream API & Optional"]
      },
      {
        name: "Module 3: Spring Boot & Enterprise REST APIs",
        topics: ["Introduction to Spring Framework & Inversion of Control (IoC)", "Spring Boot Project Setup & Annotations (@RestController, @Service, @Repository)", "Building RESTful Web Services & CRUD Endpoints", "Request Validation & Global Exception Handling"]
      },
      {
        name: "Module 4: Database Integration with JPA & Hibernate",
        topics: ["Relational Databases & SQL Essentials", "Spring Data JPA & Hibernate ORM", "Entity Relationships (@OneToMany, @ManyToOne, @ManyToMany)", "Pagination, Sorting & Custom JPQL Queries"]
      },
      {
        name: "Module 5: Security, Microservices Basics & Capstone Projects",
        topics: ["JWT Authentication & Role-Based Access Control", "Microservices Architecture Overview & API Gateway", "E-Commerce Backend API Project", "Student Management Enterprise Application", "Deploying Java Backend to AWS Cloud (Free Bonus Complement)"]
      }
    ]
  },
  python: {
    title: "Python Programming + Machine Learning Full Curriculum",
    badge: "Track 02 • Python & AI/ML",
    modules: [
      {
        name: "Module 1: Python Fundamentals & Data Structures",
        topics: ["Python Syntax, Dynamic Typing & Execution Model", "Conditional Logic, Loops, Functions & Scope", "Built-in Data Structures: Lists, Tuples, Sets, Dictionaries", "List Comprehensions & Lambda Functions", "File Handling, JSON Parsing & Error Handling"]
      },
      {
        name: "Module 2: Object-Oriented Python & Advanced Concepts",
        topics: ["OOP Principles: Classes, Dunder Methods (__init__, __str__), Inheritance", "Decorators, Generators & Iterators", "Working with Virtual Environments & PIP Packages", "Modular Code Structure & Clean Code Practices"]
      },
      {
        name: "Module 3: Data Analysis & Scientific Computing",
        topics: ["NumPy: N-Dimensional Arrays, Vectorization, Mathematical Operations", "Pandas: DataFrames, Series, Data Cleaning, GroupBy & Merging", "Matplotlib & Seaborn: Exploratory Data Visualization & Heatmaps", "Feature Engineering & Data Preprocessing"]
      },
      {
        name: "Module 4: Machine Learning Algorithms & Scikit-Learn",
        topics: ["Supervised Learning: Linear & Logistic Regression, Decision Trees, Random Forests", "Unsupervised Learning: K-Means Clustering, PCA Dimensionality Reduction", "Model Evaluation Metrics: Accuracy, Precision, Recall, ROC-AUC, Confusion Matrix", "Hyperparameter Tuning with GridSearchCV"]
      },
      {
        name: "Module 5: Real-World ML Projects & AWS Cloud Deployment",
        topics: ["End-to-End Predictive Analytics Model", "Customer Churn Prediction Application", "Medical Diagnosis / Fraud Detection Machine Learning Pipeline", "Deploying Python ML APIs with FastAPI / Flask on AWS Cloud"]
      }
    ]
  },
  mern: {
    title: "Full Stack Development (MERN) Full Curriculum",
    badge: "Track 03 • Web & Full Stack",
    modules: [
      {
        name: "Module 1: Frontend Foundation (HTML5, Modern CSS & JavaScript ES6+)",
        topics: ["Semantic HTML5, Responsive Layouts, CSS Grid & Flexbox", "Modern CSS Variables, Transitions & Animations", "JavaScript ES6+: Arrow Functions, Destructuring, Promises, Async/Await, Fetch API", "DOM Manipulation & Event-Driven Programming"]
      },
      {
        name: "Module 2: React.js Component Architecture",
        topics: ["React JSX, Virtual DOM, Components & Props", "React Hooks (useState, useEffect, useContext, useReducer, useMemo)", "React Router DOM: Multi-page Client Routing", "Form Handling, State Management & Tailwind/CSS Integration"]
      },
      {
        name: "Module 3: Backend Development with Node.js & Express.js",
        topics: ["Node.js Runtime, Event Loop & NPM Modules", "Express Server Setup, Middleware Architecture & Routing", "RESTful API Design & Status Codes", "Handling File Uploads (Multer) & CORS"]
      },
      {
        name: "Module 4: Database Mastery with MongoDB & Mongoose",
        topics: ["NoSQL Concepts vs Relational Databases (SQL)", "MongoDB Atlas Cloud Setup & Mongoose Schema Design", "CRUD Operations, Aggregation Pipelines & Indexing", "Data Validation & Sanitization"]
      },
      {
        name: "Module 5: Full Stack Integration, Auth & AWS Deployment",
        topics: ["User Authentication with JWT (JSON Web Tokens) & Bcrypt Password Hashing", "Connecting React Frontend with Node Backend via Axios", "Live Full Stack E-Commerce / LMS Platform Project", "Deploying Full Stack Web Apps to AWS Cloud (Free Bonus Complement)"]
      }
    ]
  }
};

function initSyllabusModal() {
  const modal = document.getElementById('syllabusModal');
  const modalBody = document.getElementById('syllabusModalBody');
  const modalTitle = document.getElementById('syllabusModalTitle');
  const modalBadge = document.getElementById('syllabusModalBadge');
  const closeBtn = document.getElementById('syllabusModalClose');
  const syllabusTriggers = document.querySelectorAll('.trigger-syllabus-modal');

  if (!modal || !modalBody) return;

  function openSyllabus(courseKey) {
    const data = courseSyllabusData[courseKey];
    if (!data) return;

    modalTitle.textContent = data.title;
    modalBadge.textContent = data.badge;

    let html = '<div class="syllabus-module-list" style="display:flex; flex-direction:column; gap:1.25rem;">';
    data.modules.forEach((mod, idx) => {
      html += `
        <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:1.25rem;">
          <h4 style="color:#0f172a; font-size:1.05rem; font-weight:800; margin-bottom:0.6rem; display:flex; align-items:center; gap:0.5rem;">
            <span style="background:#4f46e5; color:#fff; font-size:0.75rem; padding:0.2rem 0.55rem; border-radius:6px;">0${idx+1}</span>
            ${mod.name}
          </h4>
          <ul style="list-style:none; padding-left:1.5rem; display:flex; flex-direction:column; gap:0.35rem;">
            ${mod.topics.map(t => `<li style="font-size:0.9rem; color:#475569; position:relative;"><span style="position:absolute; left:-1.2rem; color:#6366f1;">✔</span> ${t}</li>`).join('')}
          </ul>
        </div>
      `;
    });
    html += `
      <div style="margin-top:1.5rem; text-align:center; padding:1.25rem; background:linear-gradient(135deg, rgba(99,102,241,0.06), rgba(236,72,153,0.06)); border-radius:12px; border:1px solid rgba(99,102,241,0.2);">
        <p style="font-weight:700; color:#0f172a; margin-bottom:0.75rem;">Includes 20+ Real-World Resume Projects & Free AWS Cloud Course Complement!</p>
        <button class="btn btn-primary btn-shine" onclick="openDemoModalWithCourse('${courseKey}')" style="width:100%;">
          Book Free 2 Demo Sessions for This Course
        </button>
      </div>
    </div>`;

    modalBody.innerHTML = html;
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  syllabusTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const course = btn.getAttribute('data-course');
      openSyllabus(course);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

/* Global helper to open Demo Modal from anywhere */
window.openDemoModalWithCourse = function(courseKey) {
  const syllabusModal = document.getElementById('syllabusModal');
  if (syllabusModal) syllabusModal.classList.remove('is-open');

  const demoModal = document.getElementById('demoModal');
  const courseSelect = document.getElementById('demoModalCourseSelect');
  if (courseSelect && courseKey) {
    if (courseKey === 'java') courseSelect.value = "Java Programming + Spring Boot";
    if (courseKey === 'python') courseSelect.value = "Python Programming + ML";
    if (courseKey === 'mern') courseSelect.value = "Full Stack Development — MERN";
  }

  if (demoModal) {
    demoModal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
};

window.closeDemoModal = function() {
  const demoModal = document.getElementById('demoModal');
  if (demoModal) {
    demoModal.classList.remove('is-open');
    document.body.style.overflow = '';
  }
};

/* Toast Notification Utility */
window.showToast = function(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span>✨</span><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => toast.classList.add('show'), 50);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 4000);
};

/* Welcome enrollment offer shown when the page opens */
function initWelcomeOfferModal() {
  const modal = document.getElementById('welcomeOfferModal');
  const closeBtn = document.getElementById('welcomeOfferClose');

  if (!modal) return;

  const closeModal = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  const openModal = () => {
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (closeBtn) closeBtn.focus();
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });

  window.setTimeout(openModal, 450);
}
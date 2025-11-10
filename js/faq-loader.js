/**
 * FAQ Loader Module
 * Loads FAQ data from JSON and dynamically renders the page
 */

class FAQLoader {
  constructor(dataPath = '/data/faq-data.json') {
    this.dataPath = dataPath;
    this.data = null;
  }

  /**
   * Initialize the FAQ page
   */
  async init() {
    try {
      await this.loadData();
      this.renderPage();
      this.setupSmoothScroll();
      this.setupSearch();
    } catch (error) {
      console.error('Error initializing FAQ:', error);
      this.showError();
    }
  }

  /**
   * Load FAQ data from JSON file
   */
  async loadData() {
    try {
      const response = await fetch(this.dataPath);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      this.data = await response.json();
    } catch (error) {
      console.error('Error loading FAQ data:', error);
      throw error;
    }
  }

  /**
   * Render the entire FAQ page
   */
  renderPage() {
    if (!this.data) return;

    // Update page header
    this.renderHeader();
    
    // Render sidebar navigation
    this.renderSidebar();
    
    // Render FAQ content
    this.renderContent();
  }

  /**
   * Render page header
   */
  renderHeader() {
    const headerTitle = document.querySelector('.policies-page-title');
    const headerSubtitle = document.querySelector('.policies-header p');
    
    if (headerTitle) headerTitle.textContent = this.data.pageTitle;
    if (headerSubtitle) headerSubtitle.textContent = this.data.pageSubtitle;
  }

  /**
   * Render sidebar navigation
   */
  renderSidebar() {
    const sidebarNav = document.querySelector('.sidebar-nav');
    if (!sidebarNav) return;

    sidebarNav.innerHTML = '';

    this.data.categories.forEach(category => {
      const link = document.createElement('a');
      link.href = `#category-${category.id}`;
      link.className = 'sidebar-link';
      link.innerHTML = `<strong>${category.id}.</strong> ${category.title}`;
      sidebarNav.appendChild(link);
    });
  }

  /**
   * Render FAQ content sections
   */
  renderContent() {
    const mainContent = document.querySelector('.policies-main .policy-section');
    if (!mainContent) return;

    // Clear existing content but keep the title
    const sectionTitle = mainContent.querySelector('.policy-section-title');
    mainContent.innerHTML = '';
    if (sectionTitle) {
      mainContent.appendChild(sectionTitle);
    }

    // Render each category
    this.data.categories.forEach(category => {
      const categoryDiv = this.createCategoryElement(category);
      mainContent.appendChild(categoryDiv);
    });
  }

  /**
   * Create a category element with all its questions
   */
  createCategoryElement(category) {
    const categoryDiv = document.createElement('div');
    categoryDiv.id = `category-${category.id}`;
    categoryDiv.className = 'faq-category';

    // Category title
    const categoryTitle = document.createElement('h3');
    categoryTitle.className = 'faq-category-title';
    categoryTitle.innerHTML = `<strong style="color: #2a7ae2;">Category ${category.id}:</strong> ${category.title}`;
    categoryDiv.appendChild(categoryTitle);

    // Add all questions
    category.questions.forEach(question => {
      const questionDiv = this.createQuestionElement(question);
      categoryDiv.appendChild(questionDiv);
    });

    return categoryDiv;
  }

  /**
   * Create a question element
   */
  createQuestionElement(question) {
    const questionDiv = document.createElement('div');
    questionDiv.className = 'faq-item';
    questionDiv.setAttribute('data-question-id', question.id);

    // Question heading
    const questionHeading = document.createElement('h4');
    questionHeading.className = 'faq-question';
    questionHeading.innerHTML = `<strong style="color: #2a7ae2;">${question.id}</strong> ${question.question}`;
    questionDiv.appendChild(questionHeading);

    // Answer paragraph
    const answerParagraph = document.createElement('p');
    answerParagraph.className = 'faq-answer';
    
    // Convert newlines to <br> tags and preserve bullet points
    const formattedAnswer = question.answer
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .join('<br>');
    
    answerParagraph.innerHTML = formattedAnswer;
    questionDiv.appendChild(answerParagraph);

    return questionDiv;
  }

  /**
   * Setup smooth scrolling for anchor links
   */
  setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          // Update URL without jumping
          history.pushState(null, null, `#${targetId}`);
        }
      });
    });
  }

  /**
   * Setup search functionality (optional enhancement)
   */
  setupSearch() {
    // Placeholder for future search functionality
    // Can add a search box that filters questions in real-time
  }

  /**
   * Show error message
   */
  showError() {
    const mainContent = document.querySelector('.policies-main');
    if (mainContent) {
      mainContent.innerHTML = `
        <div style="padding: 40px; text-align: center;">
          <h2 style="color: #d32f2f;">Error Loading FAQ</h2>
          <p>We're sorry, but there was an error loading the FAQ content. Please try refreshing the page or contact us for assistance.</p>
        </div>
      `;
    }
  }
}

// Initialize FAQ when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const faqLoader = new FAQLoader();
  faqLoader.init();
});

'use strict';


// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category.toLowerCase()) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

document.querySelectorAll('.category-header').forEach(header => {
  header.addEventListener('click', () => {
    const dropdown = header.parentElement;
    dropdown.classList.toggle('active');
  });
});

document.querySelectorAll('.main-category-header').forEach(header => {
  header.addEventListener('click', () => {
    const dropdown = header.parentElement;
    dropdown.classList.toggle('active');
  });
});

// Add search functionality
const searchInput = document.getElementById('prompt-search');
const allItems = document.querySelectorAll('.item');
const allCategories = document.querySelectorAll('.category-dropdown');
const allMainCategories = document.querySelectorAll('.main-category-dropdown');
const promptsSection = document.querySelector('.prompts-categories');

// Add no results message element
const noResults = document.createElement('div');
noResults.className = 'no-results';
noResults.textContent = 'No matching keywords found';
promptsSection.appendChild(noResults);

searchInput.addEventListener('input', function(e) {
  const searchTerm = e.target.value.toLowerCase().trim();
  let hasResults = false;

  // Reset all items and categories
  allItems.forEach(item => {
    item.style.display = 'block';
    item.classList.remove('highlight');
  });
  allCategories.forEach(category => {
    category.classList.remove('active');
    const header = category.querySelector('.category-header span');
    header.classList.remove('highlight');
  });
  allMainCategories.forEach(category => {
    category.classList.remove('active');
    const header = category.querySelector('.main-category-header span');
    header.classList.remove('highlight');
  });

  if (searchTerm) {
    // Search through items
    allItems.forEach(item => {
      const text = item.textContent.toLowerCase();
      if (text.includes(searchTerm)) {
        item.classList.add('highlight');
        // Show parent categories
        const parentCategory = item.closest('.category-dropdown');
        const mainCategory = item.closest('.main-category-dropdown');
        if (parentCategory) parentCategory.classList.add('active');
        if (mainCategory) mainCategory.classList.add('active');
        hasResults = true;
      } else {
        item.style.display = 'none';
      }
    });

    // Search through category headers
    allCategories.forEach(category => {
      const header = category.querySelector('.category-header span');
      const headerText = header.textContent.toLowerCase();
      if (headerText.includes(searchTerm)) {
        header.classList.add('highlight');
        category.classList.add('active');
        const mainCategory = category.closest('.main-category-dropdown');
        if (mainCategory) mainCategory.classList.add('active');
        hasResults = true;
      }
    });

    // Search through main category headers
    allMainCategories.forEach(category => {
      const header = category.querySelector('.main-category-header span');
      const headerText = header.textContent.toLowerCase();
      if (headerText.includes(searchTerm)) {
        header.classList.add('highlight');
        category.classList.add('active');
        hasResults = true;
      }
    });
  }

  // Show/hide no results message
  noResults.classList.toggle('show', !hasResults && searchTerm);
});

// Clear search when changing pages
navigationLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (searchInput) {
      searchInput.value = '';
      // Trigger input event to reset search
      searchInput.dispatchEvent(new Event('input'));
    }
  });
});

// Prompt suggestions data
const promptSuggestions = {
  "User persona": {
    title: "User Persona",
    text: "Create a detailed user persona for [product/service] targeting [specific demographic]. Include their goals, frustrations, technology comfort level, daily routines, and key motivations. Make sure the persona feels realistic and grounded in actual user behavior patterns."
  },
  "User journey map": {
    title: "User Journey Map",
    text: "Help me develop a user journey map for a [specific user type] interacting with [product/service]. Include their actions, thoughts, and emotions at each touchpoint. Focus particularly on potential pain points and moments of delight. Structure this from the initial awareness stage through to post-usage feedback."
  },
  "Accessibility": {
    title: "Accessibility",
    text: "Review these design specifications [insert design details] and suggest improvements to make them more accessible. Consider WCAG guidelines, particularly focusing on color contrast, text size, keyboard navigation, and screen reader compatibility. Provide specific recommendations for each element."
  },
  "Usability testing": {
    title: "Usability Testing",
    text: "Generate a comprehensive usability testing script for [specific feature or product]. Include task scenarios that will help uncover issues with [specific aspects]. Add prompting questions that encourage users to think aloud without leading their responses."
  },
  "Target audience": {
    title: "Target Audience",
    text: "Analyze this target audience [describe audience] and suggest design considerations specifically tailored to their needs, preferences, and behaviors. Include cultural factors, technical proficiency levels, and common usage scenarios."
  },
  "Behavior analysis": {
    title: "Behavior Analysis",
    text: "Based on these user interaction patterns [describe patterns], analyze potential underlying behaviors and motivations. Suggest design improvements that better align with observed user behaviors while considering cognitive load and user expectations."
  },
  "Demographics": {
    title: "Demographics",
    text: "Create a detailed demographic breakdown for [product/service], including primary, secondary, and tertiary user groups. For each segment, suggest specific design considerations that would resonate with their characteristics and needs."
  },
  "Psychographics": {
    title: "Psychographics",
    text: "Develop a psychographic profile for users of [product/service], focusing on their values, interests, lifestyle choices, and attitudes. Translate these insights into specific design recommendations that would appeal to their psychological preferences."
  },
  "Pain points": {
    title: "Pain Points",
    text: "Analyze these user feedback points [insert feedback] and help identify underlying pain points. Categorize them by severity and impact on user experience, then suggest potential design solutions for each identified issue."
  },
  "Stakeholder interviews": {
    title: "Stakeholder Interviews",
    text: "Generate a set of strategic questions for interviewing stakeholders about [project/product]. Include questions that uncover business goals, technical constraints, success metrics, and potential concerns. Add follow-up prompts that dig deeper into critical areas."
  },
  "Observational research": {
    title: "Observational Research",
    text: "Create an observation protocol for studying users interacting with [product/service]. Include specific behaviors to watch for, environmental factors to note, and a structured way to document unexpected user actions."
  },
  "Competitive analysis": {
    title: "Competitive Analysis",
    text: "Help me analyze these competitors [list competitors] in terms of their UX/UI approaches. Compare their features, user flows, visual design, and unique selling points. Identify gaps and opportunities in the market."
  },
  "Market research": {
    title: "Market Research",
    text: "Synthesize market trends and user needs for [industry/product category]. Focus on emerging patterns in user behavior, technological capabilities, and design innovations. Suggest how these insights could inform our design decisions."
  },
  "Survey design": {
    title: "Survey Design",
    text: "Help me create a user research survey for [specific purpose]. Include a mix of quantitative and qualitative questions that will uncover [specific insights needed]. Ensure questions are unbiased and structured to encourage honest responses."
  },
  "Affinity diagram": {
    title: "Affinity Diagram",
    text: "Organize these research findings [insert findings] into logical groups. Identify common themes and patterns, then suggest how these groupings could inform our design priorities and decision-making."
  },
  "Field studies": {
    title: "Field Studies",
    text: "Develop a field study protocol for observing users in [specific context]. Include observation points that will help understand environmental factors, user workflows, and contextual constraints affecting product usage."
  },
  "Focus groups": {
    title: "Focus Groups",
    text: "Create a focus group discussion guide for [specific topic]. Include exercises and questions that will generate insights about [specific aspects], while ensuring balanced participation and avoiding groupthink."
  },
  "Ethnographic research": {
    title: "Ethnographic Research",
    text: "Design an ethnographic research plan for understanding how [user group] interacts with [product/service] in their natural environment. Include observation points that capture cultural nuances and contextual influences."
  },
  "Contextual inquiry": {
    title: "Contextual Inquiry",
    text: "Generate interview questions for a contextual inquiry session observing [specific user type] using [product/service]. Include prompts that help understand their workflow, mental models, and environmental factors."
  },
  "Emotional mapping": {
    title: "Emotional Mapping",
    text: "Help me create an emotional journey map for users experiencing [specific scenario]. Include key touchpoints and suggest how different design elements might influence user emotions at each stage."
  },
  "User journey": {
    title: "User Journey",
    text: "Create a detailed user journey analysis for [specific user type] accomplishing [specific goal]. Break down each step, identifying potential friction points, emotional states, and opportunities for improving the experience."
  },
  "Problem statement": {
    title: "Problem Statement",
    text: "Craft a concise problem statement for [project/product] by identifying the core user challenge, the context, and its impact on users and stakeholders. Ensure it clearly frames the problem without suggesting specific solutions."
  },
  "User needs": {
    title: "User Needs",
    text: "Identify and articulate the key user needs for [product/service] based on [research findings or observations]. Provide actionable insights into how these needs can guide design decisions and improve user satisfaction."
  },
  "Goal definition": {
    title: "Goal Definition",
    text: "Define clear and measurable goals for [product/service] based on user needs and business objectives. Ensure the goals are specific, achievable, relevant, and time-bound (SMART)."
  },
  "Insights clustering": {
    title: "Insights Clustering",
    text: "Organize these insights [insert research findings] into clusters of related themes. Highlight patterns, emerging trends, and gaps that could inform the design direction."
  },
  "Value proposition": {
    title: "Value Proposition",
    text: "Develop a compelling value proposition for [product/service]. Articulate the unique benefits it offers to users and how it addresses their pain points compared to competitors."
  },
  "Design constraints": {
    title: "Design Constraints",
    text: "Analyze the constraints for [project/product], including technical limitations, budget, timeline, and business objectives. Suggest design approaches that work within these constraints while maintaining usability and appeal."
  },
  "User requirements": {
    title: "User Requirements",
    text: "Define detailed user requirements for [product/service]. Include functional, emotional, and contextual needs that must be addressed in the design and development process."
  },
  "Opportunity framing": {
    title: "Opportunity Framing",
    text: "Help frame opportunities for [product/service] by identifying gaps in the current user experience. Suggest potential solutions and areas where innovation could drive user satisfaction and engagement."
  },
  "Problem space": {
    title: "Problem Space",
    text: "Define the problem space for [project/product] by outlining its scope, affected stakeholders, and context. Avoid jumping to solutions and focus on understanding the problem thoroughly."
  },
  "How-might-we questions": {
    title: "How-Might-We Questions",
    text: "Generate a list of 'How Might We' questions based on [problem statement or user insights]. Ensure the questions are open-ended and inspire creative solutions."
  },
  "Gap analysis": {
    title: "Gap Analysis",
    text: "Conduct a gap analysis for [product/service] by comparing the current state of the user experience to the desired outcomes. Identify areas where improvements are needed and propose actionable steps to bridge the gaps."
  },
  "Success criteria": {
    title: "Success Criteria",
    text: "Define success criteria for [project/product]. Include measurable outcomes that indicate a positive user experience, such as user satisfaction, task completion rates, and engagement metrics."
  },
  "Task analysis": {
    title: "Task Analysis",
    text: "Perform a task analysis for [specific user task]. Break down the steps users take, identify potential bottlenecks, and suggest ways to streamline the process for better usability."
  },
  "Job-to-be-done": {
    title: "Job-to-Be-Done",
    text: "Frame the 'Job-to-Be-Done' for [user group] by identifying what users are trying to accomplish with [product/service]. Suggest design strategies that align with their desired outcomes."
  },
  "User pain": {
    title: "User Pain",
    text: "Analyze the sources of user pain based on [feedback or observations]. Categorize them into functional, emotional, and contextual issues, then recommend targeted design improvements."
  },
  "Journey pain points": {
    title: "Journey Pain Points",
    text: "Map out the journey pain points for [specific user scenario]. Identify where friction occurs, analyze its root causes, and suggest design solutions to improve the experience."
  },
  "Prioritization matrix": {
    title: "Prioritization Matrix",
    text: "Develop a prioritization matrix for [project/product]. Include factors like user impact, technical feasibility, and business value to help prioritize features and improvements."
  },
  "Experience goals": {
    title: "Experience Goals",
    text: "Define experience goals for [product/service]. Focus on how users should feel and what they should achieve when interacting with the product. Use these goals to guide design decisions."
  },
  "Product vision": {
    title: "Product Vision",
    text: "Articulate a clear product vision for [project/product]. Include its purpose, target audience, and the value it aims to deliver. Ensure the vision inspires and aligns with stakeholders."
  },
  "Problem framing": {
    title: "Problem Framing",
    text: "Frame the problem for [project/product] by identifying its root causes, stakeholders, and the broader context. Ensure it sets the stage for ideation without being solution-focused."
  },
  "Accessibility needs": {
    title: "Accessibility Needs",
    text: "Assess [design/project] for accessibility needs based on WCAG guidelines. Suggest specific improvements for areas like color contrast, text readability, and keyboard navigation."
  },
  "Layout & structure": {
    title: "Layout & Structure",
    text: "Propose layout and structure improvements for [interface or design]. Focus on optimizing content hierarchy, visual balance, and intuitive navigation to enhance usability."
  },
  "Color-blind friendly design": {
    title: "Color-Blind Friendly Design",
    text: "Review the color scheme of [design/project] and suggest adjustments to make it color-blind friendly. Include specific recommendations for contrasting colors and patterns to improve accessibility."
  },
  // Prototype
  "Prototype": {
    title: "Prototype",
    text: "How do I get started with prototyping for [specific project/product]? Suggest best practices in order to create an effective prototype."
  },
  "Wireframe": {
    title: "Wireframe",
    text: "What are the key steps to create a wireframe for [specific page or screen]? Recommend tools and tips for organizing content and layout effectively."
  },
  "Mockup": {
    title: "Mockup",
    text: "Can you guide me on how to start creating a mockup for [specific feature/page]? What tools and design principles should I consider?"
  },
  "Clickable prototype": {
    title: "Clickable Prototype",
    text: "What are the best tools and techniques to create a clickable prototype for [specific use case]?"
  },
  "Interactive flow": {
    title: "Interactive Flow",
    text: "Build a comprehensive design system for [product/service], including reusable components, style guidelines, and interaction patterns. Ensure scalability and consistency for future development."
  },
  "Style guide": {
    title: "Style Guide",
    text: "How do I start creating a style guide for [brand/product]? What elements should it include?"
  },
  "UI components": {
    title: "UI Components",
    text: "List and design UI components needed for [specific project]. Include buttons, dropdowns, modals, and other elements, with variations for different states (e.g., hover, active, disabled)."
  },
  "User flow": {
    title: "User Flow",
    text: "Map out a user flow for [specific user goal] in [product/service]. Include all key decision points and touchpoints from entry to goal completion, highlighting potential pain points."
  },
  "Navigation design": {
    title: "Navigation Design",
    text: "Design a navigation system for [website/app]. Include options for menus, breadcrumbs, and search functionality. Focus on creating an intuitive and accessible structure."
  },
  "Information architecture": {
    title: "Information Architecture",
    text: "Help structure the information architecture for [website/app]. Organize content into logical categories and hierarchies to ensure users can easily find what they need."
  },
  "High-fidelity prototype": {
    title: "High-Fidelity Prototype",
    text: "Create a high-fidelity prototype for [specific feature/page]. Include detailed visuals, animations, and interactions to simulate the final product as closely as possible."
  },
  "Low-fidelity prototype": {
    title: "Low-Fidelity Prototype",
    text: "Develop a low-fidelity prototype for [specific feature]. Focus on layout and functionality without detailed visual design to gather early-stage feedback."
  },
  "Responsive design": {
    title: "Responsive Design",
    text: "Suggest responsive design solutions for [product/website] that ensure usability across devices of different screen sizes, from mobile to desktop."
  },
  "Adaptive design": {
    title: "Adaptive Design",
    text: "Propose an adaptive design strategy for [product/website]. Include breakpoints and layout variations that cater to specific screen sizes and user contexts."
  },
  "Fixed layout": {
    title: "Fixed Layout",
    text: "Design a fixed layout for [specific project]. Focus on a consistent screen size, ensuring the design fits perfectly within the chosen dimensions."
  },
  "Full-width design": {
    title: "Full-Width Design",
    text: "Create a full-width design for [website/page]. Utilize the entire screen width effectively while maintaining readability and visual balance."
  },
  "Minimalist layout": {
    title: "Minimalist Layout",
    text: "Design a minimalist layout for [website/page]. Focus on simplicity, ample white space, and essential elements that enhance usability and aesthetics."
  },
  "Microinteractions": {
    title: "Microinteractions",
    text: "Suggest microinteractions for [specific feature], such as button clicks, form submissions, or hover states. Ensure they provide feedback and enhance user engagement."
  },
  "Parallax scrolling": {
    title: "Parallax Scrolling",
    text: "Design a parallax scrolling effect for [website/page]. Include layered backgrounds that move at different speeds to create a dynamic and immersive experience."
  },
  "Iconography": {
    title: "Iconography",
    text: "Develop a set of icons for [product/service]. Ensure they are consistent in style, intuitive to understand, and aligned with the overall design aesthetic."
  },
  "Image carousel": {
    title: "Image Carousel",
    text: "Create an image carousel for [specific section]. Include functionality for smooth transitions, navigation controls, and responsive behavior across devices."
  },
  "Hero image": {
    title: "Hero Image",
    text: "Design a hero image for [website/page]. Focus on creating a visually impactful centerpiece that conveys the main message and draws user attention."
  },
  "Background video": {
    title: "Background Video",
    text: "Add a background video to [specific section/page]. Ensure it enhances the visual appeal without distracting from the main content or affecting loading performance."
  },
  "SVG graphics": {
    title: "SVG Graphics",
    text: "Generate SVG graphics for [specific purpose]. Focus on scalability, lightweight file size, and responsiveness to ensure high-quality visuals across all devices."
  },
  "Accordion menu": {
    title: "Accordion Menu",
    text: "Design an accordion menu for [specific section]. Include smooth expand/collapse animations and ensure the content remains accessible and easy to navigate."
  },
  "Brainstorming": {
    title: "Brainstorming",
    text: "Generate 5 unique approaches to solve [specific design problem], considering both conventional and unconventional solutions"
  },
  "Co-creation": {
    title: "Co-creation",
    text: "Suggest methods to incorporate user feedback into the design of [specific feature] while maintaining design consistency"
  },
  "Mind mapping": {
    title: "Mind Mapping",
    text: "Create a mind map structure for [feature/product], showing relationships between core functionality and user needs"
  },
  "Storyboarding": {
    title: "Storyboarding",
    text: "Outline a user journey for [specific task], highlighting key interaction points and emotional states"
  },
  "Role-playing": {
    title: "Role-Playing",
    text: "Generate scenarios where different user personas interact with [feature/interface]"
  },
  "Ideation workshop": {
    title: "Ideation Workshop",
    text: "Structure a workshop session to explore solutions for [design challenge], including activities and timeframes"
  },
  "Concept sketching": {
    title: "Concept Sketching",
    text: "Describe different layout approaches for [specific page/feature], emphasizing visual hierarchy"
  },
  "Crazy 8s": {
    title: "Crazy 8s",
    text: "Generate 8 rapid variations of [specific UI element], each with a distinct approach"
  },
  "SCAMPER method": {
    title: "SCAMPER Method",
    text: "Apply SCAMPER to improve [existing feature]: what can we Substitute, Combine, Adapt, Modify, Put to another use, Eliminate, or Reverse?"
  },
  "Blue-sky thinking": {
    title: "Blue-Sky Thinking",
    text: "Imagine designing [feature] without any technical constraints - what would be possible?"
  },
  "Moodboarding": {
    title: "Moodboarding",
    text: "Suggest visual elements, colors, and patterns that convey [specific emotion/brand attribute]"
  },
  "Design exploration": {
    title: "Design Exploration",
    text: "Explore different visual styles for [component] that maintain functionality while pushing creative boundaries"
  },
  "Divergent thinking": {
    title: "Divergent Thinking",
    text: "List unconventional approaches to solving [design problem], including ones from other industries"
  },
  "Problem reframing": {
    title: "Problem Reframing",
    text: "Reframe [design challenge] from different perspectives: user, business, technical, and emotional"
  },
  "Reverse engineering": {
    title: "Reverse Engineering",
    text: "Break down the success factors of [reference design/solution] and adapt them for [current project]"
  },
  "Concept testing": {
    title: "Concept Testing",
    text: "Generate questions to validate assumptions about [design concept] with users"
  },
  "Heuristic ideation": {
    title: "Heuristic Ideation",
    text: "Apply Nielsen's heuristics to generate improvements for [interface/feature]"
  },
  "Design sprint": {
    title: "Design Sprint",
    text: "Plan a 5-day sprint to solve [design challenge], including daily activities and goals"
  },
  "Typography exploration": {
    title: "Typography Exploration",
    text: "Suggest font combinations that convey [brand personality] while maintaining readability"
  },
  "Grid layout": {
    title: "Grid Layout",
    text: "Explain how a grid system could best organize [page/component] content. Include recommendations for columns, alignment, and responsive behavior."
  },
  "Flexbox layout": {
    title: "Flexbox Layout",
    text: "Analyze how flexbox properties can optimize the layout for [component/section]. Include examples for flex-grow, flex-shrink, and flex-basis."
  },
  "Hero section": {
    title: "Hero Section",
    text: "Suggest how to structure [page's] hero section to maximize impact, focusing on text, visuals, and responsive alignment."
  },
  "Modular design": {
    title: "Modular Design",
    text: "Explain how to break [feature set] into reusable components for consistency and flexibility. Include spacing and alignment rules."
  },
  "Full-width design": {
    title: "Full-Width Design",
    text: "Provide guidance on using full-width layouts for [page/section], focusing on readability, visual interest, and screen size adaptability."
  },
  "Multi-column layout": {
    title: "Multi-Column Layout",
    text: "Recommend a multi-column structure for [page/section], considering reading flow, relationships, and responsive column adjustments."
  },
  "Minimalist layout": {
    title: "Minimalist Layout",
    text: "Guide on applying minimalist principles to [interface/page], focusing on critical content, white space, and visual hierarchy."
  },
  "Responsive design": {
    title: "Responsive Design",
    text: "Explain how [interface/component] should adapt to different screen sizes, with recommendations for breakpoints and layout changes."
  },
  "Adaptive design": {
    title: "Adaptive Design",
    text: "Detail how [interface/component] can have layouts optimized for specific devices, focusing on distinct needs over simple resizing."
  },
  "Fixed layout": {
    title: "Fixed Layout",
    text: "Suggest when to use a fixed layout for [interface/component], with guidance on fixed widths and handling smaller viewports."
  },
  "Gradient background": {
    title: "Gradient Background",
    text: "Create gradient combinations that convey [mood/emotion] while maintaining [brand colors]"
  },
  "Pastel colors": {
    title: "Pastel Colors",
    text: "Generate pastel color palettes that maintain sufficient contrast for accessibility"
  },
  "Hero section": {
    title: "Hero Section",
    text: "Design hero section variations that effectively communicate [main value proposition]"
  },
  "A/B testing": {
    title: "A/B Testing",
    text: "Generate two distinct design variations for [component] that test our hypothesis about [specific user behavior/metric], ensuring only one variable differs between versions while maintaining brand consistency"
  },
  "Usability testing": {
    title: "Usability Testing",
    text: "Design a usability test scenario for [specific task] that will reveal potential friction points and user comprehension issues, including key questions to ask participants and success metrics to track"
  },
  "Heatmaps": {
    title: "Heatmaps",
    text: "Based on typical user behavior patterns, predict areas of high and low engagement on [page/interface] and suggest layout optimizations to improve content visibility and interaction rates"
  },
  "Click tracking": {
    title: "Click Tracking",
    text: "Analyze the current placement of [interactive elements] and suggest alternative arrangements that could improve click-through rates while maintaining a logical user flow"
  },
  "User feedback": {
    title: "User Feedback",
    text: "Create a non-intrusive feedback collection strategy for [feature/page] that captures user sentiment and suggestions without disrupting their primary task flow"
  },
  "Accessibility audit": {
    title: "Accessibility Audit",
    text: "Review [interface/component] against WCAG guidelines and suggest improvements for color contrast, keyboard navigation, screen reader compatibility, and focus management"
  },
  "Performance optimization": {
    title: "Performance Optimization",
    text: "Analyze [page/component] and recommend optimizations for loading time, rendering performance, and interaction responsiveness while maintaining visual quality"
  },
  "Mobile-first design": {
    title: "Mobile-First Design",
    text: "Reimagine [desktop interface] as a mobile-first experience, prioritizing core functionality and considering touch interactions, variable screen sizes, and data conservation"
  },
  "Error tracking": {
    title: "Error Tracking",
    text: "Design an error logging and display system for [feature] that helps users recover from mistakes while providing developers with actionable debugging information"
  },
  "Metrics dashboard": {
    title: "Metrics Dashboard",
    text: "Create a dashboard layout that effectively visualizes [key performance metrics] for quick comprehension, highlighting trends and anomalies in user behavior"
  },
  "Eye-tracking": {
    title: "Eye-Tracking",
    text: "Predict likely visual paths through [interface/page] and suggest layout adjustments to better guide users' attention toward key content and calls-to-action"
  },
  "First-click testing": {
    title: "First-Click Testing",
    text: "Design a test scenario for [navigation/feature] that measures how quickly and accurately users can identify and select the correct path to accomplish [specific goal]"
  },
  // Visual Design
  "Grid layout analysis": {
    title: "Grid Layout Analysis",
    text: "Analyze the content structure for [page/feature] and explain the most effective grid system arrangement, including how many columns would work best and why"
  },
  "Flexbox layout structure": {
    title: "Flexbox Layout Structure",
    text: "Provide a detailed explanation of how to structure [component] using flexbox principles to handle different screen sizes and content amounts effectively"
  },
  "Hero section hierarchy": {
    title: "Hero Section Hierarchy",
    text: "Describe the ideal content hierarchy and arrangement for a hero section that needs to convey [key message], including recommendations for text placement and content balance"
  },
  "Modular design breakdown": {
    title: "Modular Design Breakdown",
    text: "Break down [feature set] into logical, reusable components and explain how they should relate to each other within the design system"
  },
  "Full-width layout": {
    title: "Full-Width Layout",
    text: "Explain the content organization strategies for a full-width layout of [page/section], including how to maintain readability and focus across different screen sizes"
  },
  
  // Typography
  "Font pairing": {
    title: "Font Pairing",
    text: "Analyze [brand personality] and explain which font combinations would best express these traits while maintaining readability. Consider emotional impact and practical legibility."
  },
  "Sans-serif": {
    title: "Sans-serif",
    text: "Review [content type] and recommend appropriate sans-serif fonts that would optimize legibility while supporting [brand/project] goals."
  },
  "Serif": {
    title: "Serif",
    text: "Examine [content purpose] and explain which serif typefaces would best serve your readability and brand tone requirements."
  },
  "Monospace font": {
    title: "Monospace Font",
    text: "Analyze [technical content] and explain how to select a monospace font that balances readability with the precise, technical feel needed."
  },
  "Readability": {
    title: "Readability",
    text: "Review [content type] and explain which typography adjustments would most improve reading comprehension across different devices and contexts."
  },
  "Letter spacing": {
    title: "Letter Spacing",
    text: "Examine [text type] and recommend appropriate letter spacing adjustments that would enhance readability while maintaining visual harmony."
  },
  "Line height": {
    title: "Line Height",
    text: "Analyze [content block] and explain the optimal line height settings that would improve readability and content scanning."
  },
  "Header typography": {
    title: "Header Typography",
    text: "Review [content hierarchy] and explain how header typography should be structured to create clear visual organization and improve scanning."
  },
  "Footer typography": {
    title: "Footer Typography",
    text: "Examine [footer content] and recommend typography choices that would maintain readability while harmonizing with the main content."
  },
  "Body text": {
    title: "Body Text",
    text: "Analyze [main content] and explain which typography settings would best serve your readers' needs and reading environment."
  },

  // Color Analysis
  "Monochromatic scheme": {
    title: "Monochromatic Scheme",
    text: "Review [brand color] and explain how to develop a effective monochromatic palette that maintains visual interest and hierarchy."
  },
  "Complementary colors": {
    title: "Complementary Colors",
    text: "Analyze [primary brand color] and explain how to select complementary colors that create impact while ensuring accessibility."
  },
  "Accent color": {
    title: "Accent Color",
    text: "Examine [interface] and recommend accent color usage that would effectively guide attention without overwhelming the design."
  },
  "Gradient background": {
    title: "Gradient Background",
    text: "Review [section purpose] and explain how to create gradients that enhance the design while maintaining content legibility."
  },
  "Light theme": {
    title: "Light Theme",
    text: "Analyze [interface elements] and explain how to develop a light color scheme that reduces eye strain while maintaining hierarchy."
  },
  "Dark mode": {
    title: "Dark Mode",
    text: "Examine [current colors] and explain how to adapt them for dark mode while preserving brand identity and ensuring readability."
  },
  "Pastel colors": {
    title: "Pastel Colors",
    text: "Review [interface needs] and explain how to implement pastel colors that maintain sufficient contrast while achieving desired mood."
  },
  "Vibrant colors": {
    title: "Vibrant Colors",
    text: "Analyze [brand requirements] and explain how to use vibrant colors effectively without creating visual fatigue."
  },
  "Neutral palette": {
    title: "Neutral Palette",
    text: "Examine [design system] and recommend neutral color combinations that would provide versatility while supporting brand identity."
  },
  "High contrast": {
    title: "High Contrast",
    text: "Review [interface elements] and explain how to implement high-contrast colors that maintain accessibility without sacrificing aesthetics."
  },
  
  // User Interactions
  "Hover effect": {
    title: "Hover Effect",
    text: "Describe appropriate hover state behaviors for [interactive elements], including timing, color changes, and movement that would enhance usability"
  },
  "Loading spinner": {
    title: "Loading Spinner",
    text: "Explain the optimal loading state implementation for [action/process], including recommendations for timing, messaging, and user feedback"
  },
  "Breadcrumb navigation": {
    title: "Breadcrumb Navigation",
    text: "Analyze the structure of [site/app] and explain how to implement effective breadcrumb navigation, including naming conventions and hierarchy"
  },
  
  // Forms and Inputs
  "Multi-step form": {
    title: "Multi-Step Form",
    text: "Break down [process] into logical steps and explain how to structure a multi-step form, including progress indication and error handling strategies"
  },
  "Inline validation": {
    title: "Inline Validation",
    text: "Describe an effective validation strategy for [form fields], including when and how to show validation messages and error states"
  },
  "Error message design": {
    title: "Error Message Design",
    text: "Provide recommendations for error message content and presentation for [form/feature], including tone, clarity, and resolution guidance"
  },
  // Accessibility
  "ARIA labels": {
    title: "ARIA Labels",
    text: "Review the interactive elements in [feature/component] and explain which ARIA labels would be necessary, including specific wording recommendations that clearly communicate purpose and state to screen reader users."
  },
  "Alt text": {
    title: "Alt Text",
    text: "Analyze the visual content in [page/section] and provide detailed recommendations for alt text that effectively communicates both the visual appearance and contextual meaning of each image, considering its role in the overall user experience."
  },
  "Keyboard navigation": {
    title: "Keyboard Navigation",
    text: "Examine the interaction flow of [feature/interface] and explain how to implement logical keyboard navigation, including recommendations for tab order and keyboard shortcuts that would enhance usability for non-mouse users."
  },
  "Screen reader support": {
    title: "Screen Reader Support",
    text: "Analyze [interface/component] and provide recommendations for making it more screen reader friendly, including content structure, heading hierarchy, and descriptive text that maintains context and meaning."
  },
  "High contrast mode": {
    title: "High Contrast Mode",
    text: "Review the current color relationships in [interface] and explain how they should be adjusted for high contrast mode, including specific recommendations for maintaining visual hierarchy while meeting WCAG contrast requirements."
  },
  "Focus indicators": {
    title: "Focus Indicators",
    text: "Examine the interactive elements in [interface] and explain how focus states should be implemented to ensure visibility across different backgrounds while maintaining brand aesthetics."
  },
  "Accessible forms": {
    title: "Accessible Forms",
    text: "Analyze the structure of [form] and provide recommendations for making it more accessible, including label relationships, error handling, and helper text that works effectively with assistive technologies."
  },
  "Large tap target": {
    title: "Large Tap Target",
    text: "Review the interactive elements in [interface] and explain appropriate sizing and spacing requirements for touch targets, including specific recommendations for maintaining usability across different devices and user capabilities."
  },
  "Dynamic text resizing": {
    title: "Dynamic Text Resizing",
    text: "Analyze how [content/interface] should handle dynamic text resizing, including specific recommendations for maintaining layout integrity and readability when users adjust their text size preferences."
  },
  "Color-blind friendly": {
    title: "Color-blind Friendly",
    text: "Review the color usage in [interface/feature] and explain how to ensure it remains usable for different types of color blindness, including specific recommendations for using additional visual indicators beyond color."
  },

  // Visual Elements Analysis
  "Iconography analysis": {
    title: "Iconography Analysis",
    text: "Analyze the functional requirements of [feature/section] and recommend appropriate icon metaphors and styles that would effectively communicate purpose while maintaining visual consistency."
  },
  "Image carousel analysis": {
    title: "Image Carousel Analysis",
    text: "Review the content requirements for [image carousel] and explain how to structure the navigation, timing, and controls to enhance usability while maintaining accessibility."
  },
  "Hero image analysis": {
    title: "Hero Image Analysis",
    text: "Analyze the messaging goals for [page/section] and provide recommendations for hero image content hierarchy, including text placement and focal points that would effectively communicate [key message]."
  },
  "Background video analysis": {
    title: "Background Video Analysis",
    text: "Examine the context of [section] and explain how background video could be implemented effectively, including recommendations for content, performance optimization, and fallback strategies."
  },
  "SVG graphics analysis": {
    title: "SVG Graphics Analysis",
    text: "Review the requirements for [graphic element] and explain how to structure scalable vector graphics that maintain quality while optimizing performance, including specific recommendations for accessibility."
  },
  "Animations": {
    title: "Animations",
    text: "Analyze the user interaction points in [interface] and recommend appropriate animation strategies that enhance understanding without causing distraction or accessibility issues."
  },
  "Illustrations analysis": {
    title: "Illustrations Analysis",
    text: "Review the communication goals for [section/feature] and provide recommendations for illustration style and content that would effectively support the message while maintaining brand consistency."
  },
  "Microinteractions analysis": {
    title: "Microinteractions Analysis",
    text: "Examine the interactive elements in [interface] and explain appropriate feedback mechanisms that would enhance user understanding without creating cognitive overload."
  },
  "Parallax scrolling analysis": {
    title: "Parallax Scrolling Analysis",
    text: "Analyze the content structure of [page/section] and explain how to implement parallax effects that enhance engagement while maintaining usability and performance."
  },
  "Custom icons analysis": {
    title: "Custom Icons Analysis",
    text: "Review the functional requirements of [feature set] and provide recommendations for custom icon designs, including metaphor selection and style guidelines that ensure clarity and consistency."
  },

  // Testing and Optimization Analysis
  "A/B testing analysis": {
    title: "A/B Testing Analysis",
    text: "Analyze [feature/element] and develop testing hypotheses that would validate design decisions, including specific metrics to track and success criteria to measure effectiveness."
  },
  "Usability testing analysis": {
    title: "Usability Testing Analysis",
    text: "Review [interface/feature] and develop a comprehensive usability testing plan, including specific tasks, questions, and success metrics that would uncover potential usability issues."
  },
  "Heatmaps analysis": {
    title: "Heatmaps Analysis",
    text: "Examine the layout of [page/interface] and explain which user interaction patterns should be monitored through heatmapping, including specific areas of interest and expected behavior patterns."
  },
  "Click tracking analysis": {
    title: "Click Tracking Analysis",
    text: "Analyze the interactive elements in [interface] and recommend a click tracking strategy that would provide meaningful insights about user behavior and task completion."
  },
  "User feedback analysis": {
    title: "User Feedback Analysis",
    text: "Develop a structured approach for gathering user feedback about [feature/interface], including specific questions and timing that would yield actionable insights without disrupting the user experience."
  },
  "Accessibility audit analysis": {
    title: "Accessibility Audit Analysis",
    text: "Create a comprehensive accessibility audit plan for [interface/feature], including specific checkpoints, testing methods, and success criteria aligned with WCAG guidelines."
  },
  "Performance optimization analysis": {
    title: "Performance Optimization Analysis",
    text: "Review [interface/feature] and explain which performance metrics should be monitored, including specific recommendations for optimization and acceptable threshold values."
  },
  "Mobile-first design analysis": {
    title: "Mobile-First Design Analysis",
    text: "Analyze the core functionality of [feature/interface] and explain how it should be prioritized and structured for mobile devices, including specific recommendations for progressive enhancement."
  },
  "Error tracking analysis": {
    title: "Error Tracking Analysis",
    text: "Develop a comprehensive error tracking strategy for [feature/interface], including categorization of error types, logging requirements, and user communication recommendations."
  },
  "Metrics dashboard analysis": {
    title: "Metrics Dashboard Analysis",
    text: "Analyze the key performance indicators for [interface/feature] and recommend a dashboard structure that effectively communicates performance trends and anomalies."
  }
};

// Setup prompt overlay functionality
const overlay = document.getElementById('promptOverlay');
const promptTitle = document.querySelector('.prompt-title');
const promptText = document.querySelector('.prompt-text');
const closeButton = document.querySelector('.close-prompt');

// Add click handlers to all items
document.querySelectorAll('.item').forEach(item => {
  item.addEventListener('click', () => {
    const itemText = item.textContent.trim();
    const suggestion = promptSuggestions[itemText];
    
    if (suggestion) {
      promptTitle.textContent = suggestion.title;
      promptText.textContent = suggestion.text;
      overlay.classList.add('active');
      document.body.classList.add('overlay-active');
    }
  });
});

// Close overlay when clicking the close button
closeButton.addEventListener('click', () => {
  overlay.classList.remove('active');
  document.body.classList.remove('overlay-active');
});

// Close overlay when clicking outside the popup
overlay.addEventListener('click', (e) => {
  if (e.target === overlay) {
    overlay.classList.remove('active');
    document.body.classList.remove('overlay-active');
  }
});

// Close overlay when pressing Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && overlay.classList.contains('active')) {
    overlay.classList.remove('active');
    document.body.classList.remove('overlay-active');
  }
});

// Add copy functionality to the prompt overlay
const copyButton = document.querySelector('.copy-prompt');

copyButton.addEventListener('click', () => {
  const promptText = document.querySelector('.prompt-text').textContent;
  
  // Copy text to clipboard
  navigator.clipboard.writeText(promptText).then(() => {
    // Show "Copied!" feedback
    copyButton.classList.add('copied');
    
    // Reset button text after 2 seconds
    setTimeout(() => {
      copyButton.classList.remove('copied');
    }, 2000);
  }).catch(err => {
    console.error('Failed to copy text: ', err);
  });
});

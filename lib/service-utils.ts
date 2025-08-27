// Service utilities and data for keyword-based pages
export interface ServiceInfo {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  heroTitle: string
  heroSubtitle: string
  description: string
  features: string[]
  category: "printing" | "embroidery" | "specialty" | "events" | "business" | "first-responder"
  keywords: string[]
  relatedServices: string[]
}

export const services: ServiceInfo[] = [
  // Core Services - Updated with better "near me" targeting
  {
    slug: "screen-printing",
    title: "Screen Printing Services",
    metaTitle: "Professional Screen Printing Services | Custom T-Shirts | Nyack Screen Printing",
    metaDescription:
      "High-quality screen printing services for custom t-shirts, hoodies, and apparel. Professional results with fast turnaround times.",
    heroTitle: "Professional Screen Printing Services",
    heroSubtitle: "Quality printing for all your custom apparel needs",
    description:
      "Our professional screen printing services deliver vibrant, long-lasting results for all your custom apparel needs. From single-color designs to complex multi-color prints, we have the expertise and equipment to bring your vision to life.",
    features: ["Vibrant, long-lasting colors", "Bulk order discounts", "Professional setup", "Multiple color options"],
    category: "printing",
    keywords: ["screen printing", "t-shirt printing", "custom shirts", "bulk printing", "apparel printing"],
    relatedServices: ["custom-embroidery", "digital-printing", "bulk-printing"],
  },
  {
    slug: "screen-printing-near-me",
    title: "Screen Printing Near Me",
    metaTitle: "Screen Printing Near Me | Local Custom T-Shirt Printing | Nyack Screen Printing",
    metaDescription:
      "Looking for screen printing near you? Professional local screen printing services for custom t-shirts, hoodies, and apparel. Fast turnaround, premium quality.",
    heroTitle: "Professional Screen Printing Near You",
    heroSubtitle: "Local expertise, premium quality, fast turnaround",
    description:
      'When you search for "screen printing near me," you want a local partner who understands your needs and delivers exceptional results. Our professional screen printing services combine years of experience with state-of-the-art equipment to create custom apparel that exceeds expectations.',
    features: ["Local pickup & delivery", "Same-day quotes", "Premium inks & materials", "Bulk discounts available"],
    category: "printing",
    keywords: [
      "screen printing near me",
      "local screen printing",
      "custom t-shirt printing",
      "apparel printing",
      "t-shirt printing near me",
      "shirt printing near me",
      "custom t shirts near me",
      "t shirt printing",
      "shirt companies near me",
    ],
    relatedServices: ["custom-embroidery", "fast-turnaround", "bulk-printing"],
  },

  // NEW: Custom T-Shirts Near Me - High priority service
  {
    slug: "custom-t-shirts-near-me",
    title: "Custom T-Shirts Near Me",
    metaTitle: "Custom T-Shirts Near Me | Local T-Shirt Design & Printing | Nyack Screen Printing",
    metaDescription:
      "Need custom t-shirts near you? Professional local t-shirt design and printing services. Custom designs, fast turnaround, bulk discounts. Serving your area since 2020.",
    heroTitle: "Custom T-Shirts Made Locally",
    heroSubtitle: "From design to delivery, we've got you covered",
    description:
      'Searching for "custom t-shirts near me"? Look no further! We specialize in creating high-quality custom t-shirts for businesses, events, teams, and individuals. Our local service means faster turnaround, personalized attention, and the ability to see samples before you commit.',
    features: ["Custom design service", "Local consultation", "Fast local delivery", "Bulk order discounts"],
    category: "printing",
    keywords: [
      "custom t shirts near me",
      "custom t-shirts near me",
      "t-shirt design near me",
      "t shirt design near me",
      "custom shirt printing",
      "personalized t-shirts",
      "local t-shirt printing",
      "custom tee shirts",
      "t-shirt making near me",
      "tshirt making near me",
    ],
    relatedServices: ["screen-printing-near-me", "t-shirt-design-service", "bulk-printing"],
  },

  // NEW: T-Shirt Design Service
  {
    slug: "t-shirt-design-service",
    title: "T-Shirt Design Service",
    metaTitle: "T-Shirt Design Service | Custom T-Shirt Design Near Me | Nyack Screen Printing",
    metaDescription:
      "Professional t-shirt design service near you. Custom t-shirt designs, logo creation, and graphic design for screen printing and embroidery. Free design consultation.",
    heroTitle: "Professional T-Shirt Design Service",
    heroSubtitle: "Bring your ideas to life with custom designs",
    description:
      "Need help with t-shirt design? Our professional design service takes your ideas and creates stunning custom t-shirt designs ready for printing. From concept to final artwork, we handle every step of the design process.",
    features: ["Professional designers", "Unlimited revisions", "Print-ready artwork", "Logo design included"],
    category: "specialty",
    keywords: [
      "t-shirt design near me",
      "t shirt design near me",
      "custom t-shirt design",
      "t-shirt graphic design",
      "logo design for shirts",
      "shirt design service",
      "custom shirt design",
      "t-shirt artwork",
    ],
    relatedServices: ["custom-t-shirts-near-me", "screen-printing-near-me", "custom-embroidery"],
  },

  // NEW: T-Shirt Making Service
  {
    slug: "t-shirt-making-service",
    title: "T-Shirt Making Service",
    metaTitle: "T-Shirt Making Service Near Me | Custom T-Shirt Production | Nyack Screen Printing",
    metaDescription:
      "Complete t-shirt making service near you. From blank shirts to finished custom apparel. Professional t-shirt production with screen printing and embroidery options.",
    heroTitle: "Complete T-Shirt Making Service",
    heroSubtitle: "From concept to finished product",
    description:
      "Our comprehensive t-shirt making service handles everything from sourcing quality blank shirts to applying your custom designs. Whether you need screen printing, embroidery, or heat transfer, we make the entire process seamless.",
    features: ["Quality blank shirts", "Multiple decoration methods", "Full-service production", "Quality control"],
    category: "printing",
    keywords: [
      "t-shirt making near me",
      "tshirt making near me",
      "custom t-shirt production",
      "t-shirt manufacturing",
      "shirt making service",
      "custom apparel production",
      "t-shirt creation service",
    ],
    relatedServices: ["custom-t-shirts-near-me", "screen-printing-near-me", "bulk-printing"],
  },

  {
    slug: "custom-embroidery",
    title: "Custom Embroidery Services",
    metaTitle: "Custom Embroidery Services | Professional Logo Embroidery | Nyack Screen Printing",
    metaDescription:
      "Professional custom embroidery services for uniforms, hats, polos, and corporate apparel. Premium quality embroidery with fast turnaround times.",
    heroTitle: "Premium Custom Embroidery Services",
    heroSubtitle: "Elevate your brand with professional embroidery",
    description:
      "Our custom embroidery services add a premium, professional touch to your apparel. From corporate uniforms to team gear, our precision embroidery creates lasting impressions that represent your brand with distinction.",
    features: ["High-definition embroidery", "Corporate logos", "Uniform services", "Hat embroidery"],
    category: "embroidery",
    keywords: ["custom embroidery", "logo embroidery", "uniform embroidery", "hat embroidery"],
    relatedServices: ["corporate-uniforms", "business-apparel", "custom-decals"],
  },
  {
    slug: "fast-turnaround",
    title: "Fast Turnaround Printing",
    metaTitle: "Fast Turnaround Screen Printing | Rush Orders | Nyack Screen Printing",
    metaDescription:
      "Need custom apparel fast? Our rush printing services deliver high-quality screen printing and embroidery with same-day and 24-hour turnaround options.",
    heroTitle: "Rush Orders & Fast Turnaround",
    heroSubtitle: "Quality printing when you need it most",
    description:
      "When deadlines are tight, our fast turnaround printing services deliver without compromising quality. We specialize in rush orders for events, emergencies, and last-minute promotional needs.",
    features: ["Same-day service available", "24-48 hour rush orders", "Emergency printing", "Weekend availability"],
    category: "specialty",
    keywords: ["fast turnaround printing", "rush orders", "same day printing", "emergency printing"],
    relatedServices: ["screen-printing-near-me", "event-t-shirts", "promotional-products"],
  },
  {
    slug: "bulk-printing",
    title: "Bulk Printing Services",
    metaTitle: "Bulk Screen Printing | Volume Discounts | Nyack Screen Printing",
    metaDescription:
      "Save money with our bulk printing services. Volume discounts on custom t-shirts, uniforms, and promotional apparel for large orders.",
    heroTitle: "Bulk Printing with Volume Discounts",
    heroSubtitle: "Better prices for larger orders",
    description:
      "Our bulk printing services are perfect for large events, corporate orders, and organizations needing high quantities. The more you order, the more you save with our competitive volume pricing.",
    features: ["Volume discounts", "Large order specialists", "Consistent quality", "Flexible payment terms"],
    category: "printing",
    keywords: ["bulk printing", "volume discounts", "large orders", "wholesale printing"],
    relatedServices: ["corporate-uniforms", "team-t-shirts", "promotional-products"],
  },

  {
    slug: "digital-printing",
    title: "Digital Printing Services",
    metaTitle: "Digital Printing Services | Photo-Quality Prints | Nyack Screen Printing",
    metaDescription:
      "Modern digital printing for detailed designs and small quantities with photo-quality results. Perfect for complex designs and small orders.",
    heroTitle: "Digital Printing Services",
    heroSubtitle: "Photo-quality prints for detailed designs",
    description:
      "Our digital printing services offer photo-quality results perfect for detailed designs, small quantities, and complex artwork. Using state-of-the-art digital printing technology, we can reproduce intricate designs with stunning clarity and color accuracy.",
    features: ["Photo-quality prints", "Small quantity orders", "Full-color designs", "Quick turnaround"],
    category: "printing",
    keywords: ["digital printing", "photo printing", "small batch", "full color printing", "detailed designs"],
    relatedServices: ["screen-printing", "custom-embroidery", "promotional-products"],
  },

  // Event & Occasion Services
  {
    slug: "team-t-shirts",
    title: "Custom Team T-Shirts",
    metaTitle: "Custom Team T-Shirts | Sports Team Apparel | Nyack Screen Printing",
    metaDescription:
      "Custom team t-shirts for sports teams, corporate groups, and events. Professional screen printing and embroidery for team uniforms and spirit wear.",
    heroTitle: "Custom Team T-Shirts & Uniforms",
    heroSubtitle: "Unite your team with custom apparel",
    description:
      "Build team spirit and unity with custom team t-shirts designed specifically for your group. Whether for sports teams, corporate departments, or special events, our team apparel creates lasting bonds and professional appearance.",
    features: ["Team logos & numbers", "Matching designs", "Bulk team discounts", "Multiple color options"],
    category: "events",
    keywords: ["team t-shirts", "custom team apparel", "sports team shirts", "team uniforms"],
    relatedServices: ["sports-jerseys", "bulk-printing", "custom-embroidery"],
  },
  {
    slug: "graduation-shirts",
    title: "Custom Graduation Shirts",
    metaTitle: "Custom Graduation Shirts | Class of 2024 T-Shirts | Nyack Screen Printing",
    metaDescription:
      "Celebrate graduation with custom class shirts. Personalized graduation t-shirts for high school, college, and university graduates.",
    heroTitle: "Custom Graduation Shirts",
    heroSubtitle: "Celebrate your achievement in style",
    description:
      "Mark this milestone with custom graduation shirts that commemorate your academic journey. From class of 2024 designs to personalized graduate apparel, we help you celebrate this special achievement.",
    features: ["Class year designs", "School colors", "Personalized names", "Group discounts"],
    category: "events",
    keywords: ["graduation shirts", "class of 2024", "graduate apparel", "school shirts"],
    relatedServices: ["event-t-shirts", "bulk-printing", "custom-embroidery"],
  },
  {
    slug: "bachelorette-party-shirts",
    title: "Bachelorette Party Shirts",
    metaTitle: "Custom Bachelorette Party Shirts | Bridal Party Apparel | Nyack Screen Printing",
    metaDescription:
      "Fun and stylish bachelorette party shirts for the bride tribe. Custom designs for bachelorette weekends, bridal parties, and wedding celebrations.",
    heroTitle: "Bachelorette Party Shirts",
    heroSubtitle: "Celebrate the bride-to-be in style",
    description:
      "Make the bachelorette party unforgettable with custom shirts for the entire bride tribe. Our fun, stylish designs help create lasting memories for this special celebration.",
    features: ["Bride tribe designs", "Matching party shirts", "Fun sayings & graphics", "Fast turnaround"],
    category: "events",
    keywords: ["bachelorette party shirts", "bride tribe shirts", "bridal party apparel", "wedding shirts"],
    relatedServices: ["event-t-shirts", "fast-turnaround", "custom-hoodies"],
  },
  {
    slug: "family-reunion-shirts",
    title: "Family Reunion Shirts",
    metaTitle: "Custom Family Reunion Shirts | Family Event T-Shirts | Nyack Screen Printing",
    metaDescription:
      "Custom family reunion shirts to bring everyone together. Personalized designs with family names, dates, and special messages for your family gathering.",
    heroTitle: "Family Reunion Shirts",
    heroSubtitle: "Bringing families together with custom apparel",
    description:
      "Strengthen family bonds with custom reunion shirts that celebrate your family heritage. Our personalized designs help create unity and lasting memories for your special family gathering.",
    features: ["Family name designs", "Reunion dates & locations", "Multi-generational sizes", "Family tree graphics"],
    category: "events",
    keywords: ["family reunion shirts", "family event shirts", "reunion apparel", "family gathering shirts"],
    relatedServices: ["event-t-shirts", "bulk-printing", "memorial-shirts"],
  },
  {
    slug: "event-t-shirts",
    title: "Custom Event T-Shirts",
    metaTitle: "Custom Event T-Shirts | Conference & Festival Apparel | Nyack Screen Printing",
    metaDescription:
      "Custom event t-shirts for conferences, festivals, fundraisers, and special occasions. Professional event apparel with fast turnaround.",
    heroTitle: "Custom Event T-Shirts",
    heroSubtitle: "Make your event memorable",
    description:
      "Create lasting memories with custom event t-shirts that participants will treasure long after your event ends. Perfect for conferences, festivals, fundraisers, and special occasions.",
    features: ["Event branding", "Date & location printing", "Sponsor logos", "Commemorative designs"],
    category: "events",
    keywords: ["event t-shirts", "conference shirts", "festival apparel", "fundraiser shirts"],
    relatedServices: ["fundraising-shirts", "promotional-products", "fast-turnaround"],
  },
  {
    slug: "fundraising-shirts",
    title: "Fundraising Shirts",
    metaTitle: "Custom Fundraising Shirts | Charity Event Apparel | Nyack Screen Printing",
    metaDescription:
      "Boost your fundraising efforts with custom shirts. Professional fundraising apparel for charity events, school fundraisers, and nonprofit organizations.",
    heroTitle: "Fundraising Shirts That Make a Difference",
    heroSubtitle: "Support your cause with custom apparel",
    description:
      "Amplify your fundraising efforts with custom shirts that supporters will proudly wear. Our fundraising apparel helps spread awareness while generating revenue for your important cause.",
    features: ["Cause-specific designs", "Profit-sharing options", "Bulk fundraiser pricing", "Awareness messaging"],
    category: "events",
    keywords: ["fundraising shirts", "charity apparel", "nonprofit shirts", "awareness shirts"],
    relatedServices: ["event-t-shirts", "bulk-printing", "promotional-products"],
  },
  {
    slug: "memorial-shirts",
    title: "Memorial Shirts",
    metaTitle: "Custom Memorial Shirts | Tribute Apparel | Nyack Screen Printing",
    metaDescription:
      "Honor loved ones with custom memorial shirts. Respectful tribute apparel for memorial services, celebrations of life, and remembrance events.",
    heroTitle: "Memorial Shirts & Tribute Apparel",
    heroSubtitle: "Honoring memories with dignity",
    description:
      "Create meaningful tribute apparel that honors the memory of loved ones. Our respectful memorial shirt designs help families and communities come together in remembrance.",
    features: ["Respectful designs", "Photo printing available", "Memorial dates & quotes", "Compassionate service"],
    category: "events",
    keywords: ["memorial shirts", "tribute apparel", "remembrance shirts", "celebration of life shirts"],
    relatedServices: ["family-reunion-shirts", "event-t-shirts", "custom-embroidery"],
  },

  // Business & Corporate
  {
    slug: "corporate-uniforms",
    title: "Corporate Uniforms",
    metaTitle: "Corporate Uniforms | Business Apparel | Nyack Screen Printing",
    metaDescription:
      "Professional corporate uniforms and business apparel. Custom embroidered polos, dress shirts, and branded clothing for your company.",
    heroTitle: "Professional Corporate Uniforms",
    heroSubtitle: "Elevate your brand with professional apparel",
    description:
      "Present a unified, professional image with custom corporate uniforms. Our business apparel solutions help establish brand identity while ensuring your team looks polished and professional.",
    features: ["Logo embroidery", "Professional styling", "Consistent branding", "Employee sizing"],
    category: "business",
    keywords: ["corporate uniforms", "business apparel", "company uniforms", "professional clothing"],
    relatedServices: ["business-apparel", "custom-embroidery", "promotional-products"],
  },
  {
    slug: "business-apparel",
    title: "Custom Business Apparel",
    metaTitle: "Custom Business Apparel | Professional Clothing | Nyack Screen Printing",
    metaDescription:
      "Custom business apparel for companies and organizations. Professional branded clothing, polos, button-downs, and corporate wear.",
    heroTitle: "Custom Business Apparel",
    heroSubtitle: "Professional clothing that represents your brand",
    description:
      "Strengthen your brand identity with custom business apparel that makes a lasting impression. From client meetings to trade shows, our professional clothing helps you stand out.",
    features: ["Brand consistency", "Professional quality", "Various styles available", "Corporate discounts"],
    category: "business",
    keywords: ["business apparel", "corporate clothing", "branded apparel", "professional wear"],
    relatedServices: ["corporate-uniforms", "promotional-products", "custom-embroidery"],
  },
  {
    slug: "promotional-products",
    title: "Promotional Products",
    metaTitle: "Custom Promotional Products | Branded Merchandise | Nyack Screen Printing",
    metaDescription:
      "Custom promotional products and branded merchandise. T-shirts, hats, bags, and apparel for marketing campaigns and corporate events.",
    heroTitle: "Promotional Products & Branded Merchandise",
    heroSubtitle: "Marketing that people actually want to keep",
    description:
      "Extend your marketing reach with promotional products that people love to use. Our branded merchandise creates lasting impressions and keeps your brand top-of-mind.",
    features: ["Marketing ROI", "Brand visibility", "Trade show ready", "Bulk pricing"],
    category: "business",
    keywords: ["promotional products", "branded merchandise", "marketing apparel", "trade show giveaways"],
    relatedServices: ["corporate-uniforms", "business-apparel", "custom-decals"],
  },
  {
    slug: "company-shirts",
    title: "Custom Company Shirts",
    metaTitle: "Custom Company Shirts | Employee Apparel | Nyack Screen Printing",
    metaDescription:
      "Custom company shirts for employees and corporate events. Professional branded t-shirts, polos, and business casual apparel.",
    heroTitle: "Custom Company Shirts",
    heroSubtitle: "Unite your team with branded apparel",
    description:
      "Build team unity and brand recognition with custom company shirts. Our employee apparel solutions help create a cohesive company culture while promoting your brand.",
    features: ["Employee unity", "Brand promotion", "Team building", "Professional appearance"],
    category: "business",
    keywords: ["company shirts", "employee apparel", "corporate t-shirts", "branded shirts"],
    relatedServices: ["corporate-uniforms", "business-apparel", "team-t-shirts"],
  },

  // Sports & Athletics
  {
    slug: "sports-jerseys",
    title: "Custom Sports Jerseys",
    metaTitle: "Custom Sports Jerseys | Team Uniforms | Nyack Screen Printing",
    metaDescription:
      "Custom sports jerseys and team uniforms for all sports. Professional athletic apparel with names, numbers, and team logos.",
    heroTitle: "Custom Sports Jerseys & Team Uniforms",
    heroSubtitle: "Gear up for victory",
    description:
      "Equip your team for success with custom sports jerseys that combine performance, durability, and team pride. Our athletic apparel is designed to withstand the demands of competition.",
    features: ["Performance fabrics", "Names & numbers", "Team colors", "Durable construction"],
    category: "events",
    keywords: ["sports jerseys", "team uniforms", "athletic apparel", "custom jerseys"],
    relatedServices: ["team-t-shirts", "uniform-printing", "bulk-printing"],
  },
  {
    slug: "uniform-printing",
    title: "Uniform Printing Services",
    metaTitle: "Uniform Printing Services | Custom Work Uniforms | Nyack Screen Printing",
    metaDescription:
      "Professional uniform printing services for businesses, schools, and organizations. Custom work uniforms with logos and branding.",
    heroTitle: "Professional Uniform Printing",
    heroSubtitle: "Consistent, professional appearance",
    description:
      "Maintain a professional image with custom uniform printing services. We provide consistent, high-quality uniforms that represent your organization with pride and professionalism.",
    features: ["Consistent quality", "Logo placement", "Durable printing", "Uniform standards"],
    category: "business",
    keywords: ["uniform printing", "work uniforms", "custom uniforms", "professional uniforms"],
    relatedServices: ["corporate-uniforms", "business-apparel", "first-responder-apparel"],
  },

  // First Responder Services
  {
    slug: "fire-department-shirts",
    title: "Fire Department Shirts",
    metaTitle: "Custom Fire Department Shirts | Firefighter Apparel | Nyack Screen Printing",
    metaDescription:
      "Custom fire department shirts and firefighter apparel. Professional designs for fire departments, volunteer firefighters, and fire safety events.",
    heroTitle: "Fire Department Shirts & Firefighter Apparel",
    heroSubtitle: "Honoring those who serve and protect",
    description:
      "Show pride in your fire department with custom shirts designed specifically for firefighters and fire safety professionals. Our durable, professional apparel represents the courage and dedication of first responders.",
    features: ["Department logos", "Rank insignia", "Reflective options", "Durable materials"],
    category: "first-responder",
    keywords: ["fire department shirts", "firefighter apparel", "fire dept clothing", "firefighter t-shirts"],
    relatedServices: ["firefighter-uniforms", "first-responder-apparel", "safety-vests"],
  },
  {
    slug: "police-shirts",
    title: "Police Department Shirts",
    metaTitle: "Custom Police Shirts | Law Enforcement Apparel | Nyack Screen Printing",
    metaDescription:
      "Custom police department shirts and law enforcement apparel. Professional designs for police officers, departments, and law enforcement events.",
    heroTitle: "Police Department Shirts & Law Enforcement Apparel",
    heroSubtitle: "Supporting those who protect and serve",
    description:
      "Honor law enforcement with custom police department shirts that reflect professionalism and pride. Our law enforcement apparel is designed to meet the needs of police departments and officers.",
    features: ["Department badges", "Professional designs", "Rank identification", "Quality materials"],
    category: "first-responder",
    keywords: ["police shirts", "law enforcement apparel", "police department clothing", "officer shirts"],
    relatedServices: ["police-uniforms", "first-responder-apparel", "uniform-printing"],
  },
  {
    slug: "ems-shirts",
    title: "EMS & Paramedic Shirts",
    metaTitle: "Custom EMS Shirts | Paramedic Apparel | Nyack Screen Printing",
    metaDescription:
      "Custom EMS and paramedic shirts for emergency medical services. Professional medical responder apparel and ambulance service clothing.",
    heroTitle: "EMS & Paramedic Shirts",
    heroSubtitle: "Honoring emergency medical heroes",
    description:
      "Recognize the vital work of emergency medical services with custom EMS shirts. Our paramedic apparel combines professionalism with the durability needed for emergency response work.",
    features: ["Medical symbols", "Service identification", "Comfortable fit", "Easy care fabrics"],
    category: "first-responder",
    keywords: ["EMS shirts", "paramedic apparel", "emergency medical shirts", "ambulance service clothing"],
    relatedServices: ["paramedic-shirts", "first-responder-apparel", "uniform-printing"],
  },
  {
    slug: "firefighter-uniforms",
    title: "Firefighter Uniforms",
    metaTitle: "Custom Firefighter Uniforms | Fire Department Clothing | Nyack Screen Printing",
    metaDescription:
      "Professional firefighter uniforms and fire department clothing. Custom uniforms for career and volunteer firefighters.",
    heroTitle: "Professional Firefighter Uniforms",
    heroSubtitle: "Gear worthy of heroes",
    description:
      "Equip your fire department with professional uniforms that command respect and ensure functionality. Our firefighter uniforms are designed for both career and volunteer departments.",
    features: ["Professional appearance", "Department standards", "Durable construction", "Custom embroidery"],
    category: "first-responder",
    keywords: ["firefighter uniforms", "fire department uniforms", "firefighter clothing", "fire dept apparel"],
    relatedServices: ["fire-department-shirts", "first-responder-apparel", "uniform-printing"],
  },
  {
    slug: "police-uniforms",
    title: "Police Uniforms",
    metaTitle: "Custom Police Uniforms | Law Enforcement Clothing | Nyack Screen Printing",
    metaDescription:
      "Professional police uniforms and law enforcement clothing. Custom uniforms that meet department standards and regulations.",
    heroTitle: "Professional Police Uniforms",
    heroSubtitle: "Uniforms that command respect",
    description:
      "Maintain the highest standards with professional police uniforms designed to meet department regulations while ensuring comfort and durability for daily service.",
    features: ["Regulation compliance", "Professional standards", "Rank insignia", "Badge placement"],
    category: "first-responder",
    keywords: ["police uniforms", "law enforcement uniforms", "police clothing", "officer uniforms"],
    relatedServices: ["police-shirts", "first-responder-apparel", "uniform-printing"],
  },
  {
    slug: "paramedic-shirts",
    title: "Paramedic Shirts",
    metaTitle: "Custom Paramedic Shirts | Emergency Medical Apparel | Nyack Screen Printing",
    metaDescription:
      "Custom paramedic shirts and emergency medical apparel. Professional clothing for paramedics, EMTs, and emergency medical personnel.",
    heroTitle: "Custom Paramedic Shirts",
    heroSubtitle: "Professional apparel for medical heroes",
    description:
      "Support emergency medical professionals with custom paramedic shirts designed for comfort, functionality, and professional appearance during critical situations.",
    features: ["Medical identification", "Comfortable fabrics", "Professional appearance", "Easy maintenance"],
    category: "first-responder",
    keywords: ["paramedic shirts", "EMT apparel", "emergency medical clothing", "medical responder shirts"],
    relatedServices: ["ems-shirts", "first-responder-apparel", "uniform-printing"],
  },
  {
    slug: "first-responder-apparel",
    title: "First Responder Apparel",
    metaTitle: "First Responder Apparel | Emergency Services Clothing | Nyack Screen Printing",
    metaDescription:
      "Custom first responder apparel for police, fire, EMS, and emergency services. Professional clothing for all first responder departments.",
    heroTitle: "First Responder Apparel",
    heroSubtitle: "Honoring all who serve in emergency services",
    description:
      "Comprehensive first responder apparel solutions for all emergency services. From police and fire to EMS and emergency management, we provide professional clothing for those who serve.",
    features: ["Multi-department service", "Professional quality", "Service recognition", "Custom designs"],
    category: "first-responder",
    keywords: ["first responder apparel", "emergency services clothing", "public safety apparel", "responder gear"],
    relatedServices: ["fire-department-shirts", "police-shirts", "ems-shirts"],
  },
  {
    slug: "safety-vests",
    title: "Custom Safety Vests",
    metaTitle: "Custom Safety Vests | Reflective Clothing | Nyack Screen Printing",
    metaDescription:
      "Custom safety vests and reflective clothing for construction, emergency services, and workplace safety. High-visibility apparel with custom logos.",
    heroTitle: "Custom Safety Vests & Reflective Clothing",
    heroSubtitle: "Visibility and safety with professional branding",
    description:
      "Ensure workplace safety while maintaining professional appearance with custom safety vests. Our high-visibility apparel meets safety standards while promoting your brand.",
    features: ["High-visibility materials", "Safety compliance", "Custom logos", "Reflective strips"],
    category: "first-responder",
    keywords: ["safety vests", "reflective clothing", "high visibility apparel", "construction vests"],
    relatedServices: ["reflective-clothing", "first-responder-apparel", "uniform-printing"],
  },
  {
    slug: "reflective-clothing",
    title: "Reflective Clothing",
    metaTitle: "Custom Reflective Clothing | High-Visibility Apparel | Nyack Screen Printing",
    metaDescription:
      "Custom reflective clothing and high-visibility apparel for safety and emergency services. Professional reflective gear with custom branding.",
    heroTitle: "Custom Reflective Clothing",
    heroSubtitle: "Safety meets professional branding",
    description:
      "Combine safety requirements with professional branding through custom reflective clothing. Our high-visibility apparel ensures safety while maintaining a professional appearance.",
    features: ["ANSI compliance", "Reflective materials", "Custom branding", "Professional appearance"],
    category: "first-responder",
    keywords: ["reflective clothing", "high visibility clothing", "safety apparel", "reflective gear"],
    relatedServices: ["safety-vests", "first-responder-apparel", "uniform-printing"],
  },

  // Additional Services
  {
    slug: "custom-hoodies",
    title: "Custom Hoodies",
    metaTitle: "Custom Hoodies | Personalized Sweatshirts | Nyack Screen Printing",
    metaDescription:
      "Custom hoodies and personalized sweatshirts for teams, events, and businesses. High-quality screen printing and embroidery on premium hoodies.",
    heroTitle: "Custom Hoodies & Sweatshirts",
    heroSubtitle: "Comfort meets custom style",
    description:
      "Stay warm and stylish with custom hoodies designed for your team, event, or business. Our premium sweatshirts combine comfort with professional customization.",
    features: ["Premium materials", "Custom designs", "Embroidery options", "Team discounts"],
    category: "printing",
    keywords: ["custom hoodies", "personalized sweatshirts", "custom pullover", "team hoodies"],
    relatedServices: ["team-t-shirts", "custom-embroidery", "bulk-printing"],
  },
  {
    slug: "custom-decals",
    title: "Custom Decals & Stickers",
    metaTitle: "Custom Decals & Stickers | Vehicle Graphics | Nyack Screen Printing",
    metaDescription:
      "Custom decals, stickers, and vehicle graphics for businesses and personal use. Weather-resistant vinyl decals with professional installation.",
    heroTitle: "Custom Decals & Vehicle Graphics",
    heroSubtitle: "Mobile advertising that works",
    description:
      "Extend your brand reach with custom decals and vehicle graphics. Our weather-resistant vinyl decals turn vehicles and surfaces into powerful marketing tools.",
    features: ["Weather-resistant vinyl", "Vehicle graphics", "Business signage", "Custom shapes"],
    category: "specialty",
    keywords: ["custom decals", "vehicle graphics", "vinyl stickers", "business decals"],
    relatedServices: ["promotional-products", "business-apparel", "corporate-uniforms"],
  },
  {
    slug: "rush-orders",
    title: "Rush Order Services",
    metaTitle: "Rush Order Screen Printing | Same Day Service | Nyack Screen Printing",
    metaDescription:
      "Rush order screen printing and embroidery services. Same-day and 24-hour turnaround for urgent custom apparel needs.",
    heroTitle: "Rush Order Services",
    heroSubtitle: "When you need it yesterday",
    description:
      "Emergency situations require immediate solutions. Our rush order services provide same-day and 24-hour turnaround for urgent custom apparel needs without compromising quality.",
    features: ["Same-day service", "24-hour turnaround", "Emergency availability", "Quality guaranteed"],
    category: "specialty",
    keywords: ["rush orders", "same day printing", "emergency printing", "24 hour turnaround"],
    relatedServices: ["fast-turnaround", "screen-printing-near-me", "event-t-shirts"],
  },
]

// Get service by slug
export const getServiceBySlug = (slug: string): ServiceInfo | undefined => {
  return services.find((service) => service.slug === slug)
}

// Get services by category
export const getServicesByCategory = (category: ServiceInfo["category"]): ServiceInfo[] => {
  return services.filter((service) => service.category === category)
}

// Get all service slugs for static generation
export const getAllServiceSlugs = (): string[] => {
  return services.map((service) => service.slug)
}

// Validate if a service slug exists
export const isValidServiceSlug = (slug: string): boolean => {
  return services.some((service) => service.slug === slug)
}

// Get related services with proper error handling
export const getRelatedServices = (currentSlug: string): ServiceInfo[] => {
  const currentService = getServiceBySlug(currentSlug)
  if (!currentService || !currentService.relatedServices) return []

  return currentService.relatedServices
    .map((slug) => getServiceBySlug(slug))
    .filter((service): service is ServiceInfo => service !== undefined && service.slug !== undefined)
    .slice(0, 3) // Limit to 3 related services
}

// Search services by keyword
export const searchServices = (query: string): ServiceInfo[] => {
  const lowercaseQuery = query.toLowerCase()
  return services.filter(
    (service) =>
      service.title.toLowerCase().includes(lowercaseQuery) ||
      service.keywords.some((keyword) => keyword.toLowerCase().includes(lowercaseQuery)) ||
      service.description.toLowerCase().includes(lowercaseQuery),
  )
}

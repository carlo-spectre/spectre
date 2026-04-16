export const projects = [
  {
    id: 1,
    slug: 'signal-commerce',
    title: 'Signal Commerce',
    tag: 'Web',
    timeframe: '8 weeks',
    role: 'Lead Product Designer',
    team: '1 PM, 2 Engineers, 1 Designer',
    visitSiteUrl: '',
    summary:
      'Redesigned checkout and account flows to reduce abandonment while keeping the purchase journey clear on mobile and desktop.',
    thumbnail:
      'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?auto=format&fit=crop&w=1400&q=80',
    challenge:
      'Conversion dropped sharply on mobile during checkout due to too many decision points, weak visual hierarchy, and unclear form states.',
    goals: [
      'Increase mobile checkout completion rate by at least 15%',
      'Cut average time-to-complete purchase below 2 minutes',
      'Reduce support tickets related to payment errors',
    ],
    process: [
      'Audited analytics funnels and support logs to isolate high-friction steps',
      'Mapped user journeys and rebuilt flow architecture around critical decisions',
      'Iterated wireframes into polished prototypes and validated with usability sessions',
    ],
    outcome: [
      'Checkout completion improved by 22% in the first month',
      'Average checkout duration dropped from 2m 44s to 1m 56s',
      'Payment-related support requests decreased by 31%',
    ],
  },
  {
    id: 2,
    slug: 'pulse-workbench',
    title: 'Pulse Workbench',
    tag: 'Product',
    timeframe: '10 weeks',
    role: 'UX/UI Designer',
    team: '1 PM, 3 Engineers',
    visitSiteUrl: '',
    summary:
      'Built a data-heavy dashboard experience that helps operations teams detect issues and act quickly without overwhelming novice users.',
    thumbnail:
      'https://images.unsplash.com/photo-1511300636408-a63a89df3482?auto=format&fit=crop&w=1400&q=80',
    challenge:
      'Users needed deep operational insight, but current screens were dense and difficult to scan under time pressure.',
    goals: [
      'Improve time-to-insight for critical alerts',
      'Create a scalable component model for data cards and charts',
      'Support power workflows while preserving beginner usability',
    ],
    process: [
      'Interviewed operations users and clustered key tasks by urgency',
      'Created progressive disclosure patterns for charts and detail drawers',
      'Established reusable component tokens and interaction patterns',
    ],
    outcome: [
      'Time-to-insight reduced by 35% in moderated usability tests',
      'Team shipped new modules faster using the reusable card system',
      'New users reached first successful task in under 3 minutes',
    ],
  },
  {
    id: 3,
    slug: 'northline-brand-system',
    title: 'Northline Brand System',
    tag: 'Brand',
    timeframe: '6 weeks',
    role: 'Brand + Interface Designer',
    team: 'Founder, Marketing Lead, Designer',
    visitSiteUrl: '',
    summary:
      'Developed a modular identity and digital style system to unify marketing and product surfaces under one visual language.',
    thumbnail:
      'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1400&q=80',
    challenge:
      'Brand and product visuals diverged heavily, producing inconsistent user trust signals and weak campaign continuity.',
    goals: [
      'Define a cohesive visual framework for product and marketing',
      'Standardize typography, color, and motion guidance',
      'Enable non-designers to create on-brand collateral quickly',
    ],
    process: [
      'Documented current-state inconsistencies across channels',
      'Created visual explorations and tested recognition in preference studies',
      'Built a practical style guide with examples and downloadable assets',
    ],
    outcome: [
      'Visual consistency increased across web, email, and product surfaces',
      'Launch campaign production time reduced by 40%',
      'Stakeholders reported stronger confidence in design direction',
    ],
  },
  {
    id: 4,
    slug: 'atlas-booking-redesign',
    title: 'Atlas Booking Redesign',
    tag: 'Web',
    timeframe: '7 weeks',
    role: 'Product Designer',
    team: 'PM, 2 Engineers, QA',
    visitSiteUrl: '',
    summary:
      'Restructured a legacy booking flow into a clearer multi-step journey with stronger feedback, trust cues, and mobile-first hierarchy.',
    thumbnail:
      'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1400&q=80',
    challenge:
      'Drop-off was highest between date selection and payment confirmation due to weak progress visibility and validation feedback.',
    goals: [
      'Lower booking abandonment between step 2 and step 4',
      'Improve confidence during payment review',
      'Increase successful first-attempt bookings on mobile',
    ],
    process: [
      'Reviewed session recordings to identify recurring hesitation points',
      'Introduced persistent progress context and error prevention patterns',
      'Polished microinteractions and validated end-to-end flows',
    ],
    outcome: [
      'Step-to-step completion rose consistently across the funnel',
      'Mobile successful first-attempt bookings improved by 18%',
      'Fewer user errors during payment confirmation',
    ],
  },
  {
    id: 5,
    slug: 'orbit-mobile-suite',
    title: 'Orbit Mobile Suite',
    tag: 'App',
    timeframe: '12 weeks',
    role: 'Lead UX Designer',
    team: 'PM, iOS Engineer, Android Engineer',
    visitSiteUrl: '',
    summary:
      'Designed a companion app for account management, notifications, and service actions with a focused, low-friction interaction model.',
    thumbnail:
      'https://images.unsplash.com/photo-1553356084-58ef4a67b2a7?auto=format&fit=crop&w=1400&q=80',
    challenge:
      'The prior app was feature-heavy but task completion was low because key actions were buried and status states were unclear.',
    goals: [
      'Surface top three tasks in under one tap from home',
      'Clarify account status and notification urgency',
      'Improve retention over the first 30 days',
    ],
    process: [
      'Prioritized key mobile tasks through analytics and interviews',
      'Built a modular home architecture around frequent actions',
      'Tested gesture patterns and edge-case states in clickable prototypes',
    ],
    outcome: [
      'Day-30 retention increased by 14%',
      'Task completion for core actions improved by 27%',
      'User satisfaction scores improved after launch',
    ],
  },
  {
    id: 6,
    slug: 'echo-content-platform',
    title: 'Echo Content Platform',
    tag: 'Web',
    timeframe: '9 weeks',
    role: 'UX Designer',
    team: 'PM, 2 Engineers, Content Strategist',
    visitSiteUrl: '',
    summary:
      'Created a content publishing and governance interface that balances editorial speed with quality and review controls.',
    thumbnail:
      'https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&w=1400&q=80',
    challenge:
      'Editors struggled to publish quickly while maintaining consistency, resulting in duplicated efforts and missed deadlines.',
    goals: [
      'Simplify content creation and scheduling workflows',
      'Reduce errors in approval and publishing states',
      'Provide clearer ownership visibility across teams',
    ],
    process: [
      'Mapped stakeholder workflows across authoring, review, and publish',
      'Designed status-driven interfaces with clear ownership context',
      'Validated workflow reliability through scenario-based testing',
    ],
    outcome: [
      'Editorial cycle time reduced by 29%',
      'Approval-state errors dropped across high-volume teams',
      'Cross-team collaboration improved with clearer ownership signals',
    ],
  },
  {
    id: 7,
    slug: 'lumen-design-language',
    title: 'Lumen Design Language',
    tag: 'Design',
    timeframe: '11 weeks',
    role: 'Design Systems Lead',
    team: 'Design Team, Frontend Team',
    visitSiteUrl: '',
    summary:
      'Established a cross-platform design language with reusable foundations, components, and guidance for consistent product delivery.',
    thumbnail:
      'https://images.unsplash.com/photo-1515405295579-ba7b45403062?auto=format&fit=crop&w=1400&q=80',
    challenge:
      'Teams moved fast but produced inconsistent components and accessibility behaviors across products.',
    goals: [
      'Unify patterns and accessibility practices across teams',
      'Increase implementation consistency and speed',
      'Provide clear documentation for contributors',
    ],
    process: [
      'Audited component usage and captured recurring inconsistencies',
      'Built foundational tokens and standardized component anatomy',
      'Documented guidance with usage rules and implementation examples',
    ],
    outcome: [
      'Implementation consistency improved across major surfaces',
      'Design-to-dev handoff time decreased by 30%',
      'Accessibility baseline improved across key components',
    ],
  },
  {
    id: 8,
    slug: 'vector-growth-console',
    title: 'Vector Growth Console',
    tag: 'Product',
    timeframe: '8 weeks',
    role: 'Product Designer',
    team: 'PM, Analyst, 2 Engineers',
    visitSiteUrl: '',
    summary:
      'Designed an experimentation console enabling growth teams to create, monitor, and evaluate tests with clear confidence signals.',
    thumbnail:
      'https://images.unsplash.com/photo-1516117172878-fd2c41f4a759?auto=format&fit=crop&w=1400&q=80',
    challenge:
      'Existing growth tooling lacked clarity on test confidence, causing delayed decisions and inconsistent rollout behavior.',
    goals: [
      'Make experiment health and confidence immediately scannable',
      'Reduce time to launch and evaluate tests',
      'Enable safer, faster decision-making for rollouts',
    ],
    process: [
      'Mapped decision checkpoints across the experimentation lifecycle',
      'Designed confidence indicators and guardrail messaging',
      'Tested decision workflows with real experiment scenarios',
    ],
    outcome: [
      'Teams launched experiments faster with fewer setup errors',
      'Decision confidence improved in post-launch reviews',
      'Rollout decisions became more consistent across squads',
    ],
  },
  {
    id: 9,
    slug: 'horizon-service-hub',
    title: 'Horizon Service Hub',
    tag: 'Web',
    timeframe: '9 weeks',
    role: 'Lead UX Designer',
    team: 'PM, Support Lead, 2 Engineers',
    visitSiteUrl: '',
    summary:
      'Reframed self-serve support into a guided service hub that improves issue resolution while reducing escalation volume.',
    thumbnail:
      'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=1400&q=80',
    challenge:
      'Users often escalated simple issues because support content was fragmented and difficult to navigate under stress.',
    goals: [
      'Increase self-serve resolution for top support intents',
      'Reduce escalations for repetitive issues',
      'Improve user confidence during troubleshooting',
    ],
    process: [
      'Analyzed support taxonomy and clustered high-volume intents',
      'Designed guided resolution paths with contextual fallback options',
      'Ran usability sessions focused on urgent troubleshooting scenarios',
    ],
    outcome: [
      'Self-serve resolution rate increased significantly',
      'Escalation volume dropped for repetitive ticket categories',
      'Users reported greater confidence in finding next steps',
    ],
  },
]

export const projectBySlug = projects.reduce((acc, project) => {
  acc[project.slug] = project
  return acc
}, {})

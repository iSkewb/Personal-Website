export const projects = [
  {
    slug: 'qmc-lsm-fpga',
    title: 'QMC-LSM on FPGA',
    tagline: 'American option pricer — fully pipelined SystemVerilog on Spartan-7',
    tags: ['Featured', 'Hardware'],
    featured: true,
    image: '/project-images/qmc-lsm-fpga.svg',
    summary:
      'Production-grade streaming pipeline for pricing American options with Quasi-Monte Carlo + Longstaff-Schwartz regression. Q16.16 fixed-point throughout, ready/valid handshaking, O(1) memory via online sufficient statistics instead of path storage.',
    highlights: [
      'Debugged from 842% numerical error down to 0.8% vs C++ baseline across 8 distinct pipeline bugs',
      '8-stage pipeline: Sobol → InverseCDF → GBM → Accumulator → Regression → LSM decision',
      'Custom fixed-point library (fxMul, fxDiv, fxExpLUT, Zelen-Severo InvCDF) mapped to DSP48 blocks',
      'Host-side Python driver fetches live market data via yfinance over UART'
    ],
    stack: ['SystemVerilog', 'Vivado', 'Spartan-7', 'C++', 'Python', 'UART'],
    link: 'https://github.com/iSkewb'
  },
  {
    slug: 'fir-filter',
    title: 'FIR Filter — FPGA vs Python',
    tagline: '8-tap real-time filter benchmark, hardware vs software head-to-head',
    tags: ['Featured', 'Hardware'],
    featured: true,
    image: '/project-images/fir-filter.svg',
    summary:
      'Built the same 8-tap low-pass FIR filter twice — once in Verilog for an FPGA and once in NumPy — then benchmarked them head-to-head on streaming financial price data.',
    highlights: [
      '109× throughput improvement: 100M samples/sec on FPGA vs 915K samples/sec in Python',
      'Pipelined adder tree with deliberate bit-width headroom to prevent silent accumulator overflow',
      'UART bridge and CSV waveform export for cross-validation between sim and software'
    ],
    stack: ['Verilog', 'Python', 'NumPy', 'UART', 'Matplotlib'],
    link: 'https://github.com/iSkewb/FIR_Filter'
  },
  {
    slug: 'breakfree',
    title: 'BreakFree',
    tagline: 'AI-powered subscription manager — TAMUHack 2025',
    tags: ['Web'],
    image: '/project-images/breakfree.svg',
    summary:
      'Subscription tracking tool with a GPT-4o-mini advisor that analyzes flagged subscriptions alongside user profile and budget to recommend what to cut, bundle, or keep. Shipped end-to-end in one hackathon day.',
    highlights: [
      'React 19 + Context API for single-source-of-truth state across 5 routes',
      'Direct OpenAI integration with structured JSON prompts for consistent advice output',
      'Recharts category breakdown, localStorage persistence, CSV export'
    ],
    stack: ['React 19', 'React Router', 'Recharts', 'OpenAI API', 'Vite'],
    link: 'https://github.com/iSkewb/BreakFree'
  },
  {
    slug: 'pos-system',
    title: 'Boba Tea POS',
    tagline: 'Full-stack point-of-sale system — CSCE 331 team project',
    tags: ['Web', 'Team'],
    image: '/project-images/pos-system.svg',
    summary:
      'Multi-role POS with distinct customer, cashier, and manager workflows. Clerk OAuth for managers, PIN sessions for cashiers, and middleware-gated manager analytics, inventory, and employee management.',
    highlights: [
      'React + Vite SPA with role-based routing and accessibility controls (font size, contrast)',
      'Express API with requireManager middleware gating admin routes',
      'PostgreSQL-backed inventory, orders, and rewards; documented Cashier API contract'
    ],
    stack: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Clerk'],
    link: 'https://github.com/iSkewb/project3-team41-deployment'
  },
  {
    slug: 'ready-alert',
    title: 'Ready-Alert',
    tagline: 'Drowsy driving detector — TAMU Datathon 2024',
    tags: ['ML'],
    image: '/project-images/ready-alert.svg',
    summary:
      'Web app that captures webcam frames and runs a ResNet50 transfer-learning model to classify drowsiness. Flags the driver as too drowsy if more than 65% of frames register as drowsy.',
    highlights: [
      'ResNet50 transfer-learning + custom sequential CNN explored in parallel notebooks',
      'Flask backend with /run_script and /run_drowsy endpoints wrapping OpenCV capture',
      'Cross-platform webcam index probing for environment-portable demos'
    ],
    stack: ['Python', 'Flask', 'TensorFlow', 'ResNet50', 'OpenCV'],
    link: 'https://github.com/iSkewb/TamuDatathon2024'
  },
  {
    slug: 'pcb-design',
    title: 'PCB Design (WIP)',
    tagline: 'Custom hardware board — full design log and writeup in progress',
    tags: ['Hardware'],
    image: '/project-images/pcb-design.svg',
    summary:
      'Placeholder entry for an upcoming PCB project. The writeup page is wired up and ready — schematic, layout, bring-up log, and measurement tables will land here as the board progresses.',
    highlights: [
      'Design log with dated entries for each revision and debug step',
      'Schematic, layout, and bring-up photos alongside measurement tables',
      'Writeup structure already templated — sections fill in as work happens'
    ],
    stack: ['KiCad', 'STM32', 'C'],
    link: 'https://github.com/iSkewb'
  },
  {
    slug: 'jklmbot',
    title: 'JKLMbot',
    tagline: 'Bomb Party word-game bot with bonus-life heuristic',
    tags: ['Automation'],
    image: '/project-images/jklmbot.svg',
    summary:
      'Python bot that plays JKLM.fun Bomb Party. Prioritizes words whose unique letters are still unused in the round — which earns bonus lives — over just finding any valid match.',
    highlights: [
      'Letter-scoring heuristic maximizes full-alphabet bonus (extra life)',
      'Randomized inter-keystroke delays to avoid rate-limit detection'
    ],
    stack: ['Python', 'pyperclip', 'keyboard', 'mouse'],
    link: 'https://github.com/iSkewb/JKLMbot'
  }
];

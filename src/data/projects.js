const b = import.meta.env.BASE_URL

export const projects = [
  {
    slug: 'qmc-lsm-fpga',
    title: 'QMC-LSM on FPGA',
    tagline: 'American option pricer — fully pipelined SystemVerilog on Spartan-7',
    tags: ['Featured', 'Hardware'],
    featured: true,
    image: `${b}project-images/QMC-LSM-FPGA.png`,
    summary:
      'Production-grade streaming pipeline for pricing American options with Quasi-Monte Carlo + Longstaff-Schwartz regression. Q16.16 fixed-point throughout, ready/valid handshaking, O(1) memory via online sufficient statistics instead of path storage.',
    highlights: [
      'Debugged from 842% numerical error down to 0.8% vs C++ baseline across 8 distinct pipeline bugs',
      '8-stage pipeline: Sobol → InverseCDF → GBM → Accumulator → Regression → LSM decision',
      'Custom fixed-point library (fxMul, fxDiv, fxExpLUT, Zelen-Severo InvCDF) mapped to DSP48 blocks',
      'Host-side Python driver fetches live market data via yfinance over UART'
    ],
    stack: ['SystemVerilog', 'Vivado', 'Spartan-7', 'C++', 'Python', 'UART'],
    link: 'https://github.com/austinbra/QMC-LSM-to-FPGA'
  },
  {
    slug: 'fir-filter',
    title: 'FIR Filter — FPGA vs Python',
    tagline: '8-tap real-time filter benchmark, hardware vs software head-to-head',
    tags: ['Featured', 'Hardware'],
    featured: true,
    image: `${b}project-images/FIR_Filter.png`,
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
    slug: 'pcb-design',
    title: 'Bench Power Supply (WIP)',
    tagline: '±1.25–15 V, 500 mA linear supply — LM317/LM337 with foldback current limiting',
    tags: ['Hardware'],
    image: `${b}project-images/pcb-design.svg`,
    summary:
      'Dual-rail linear bench supply built as a deliberate analog learning exercise. Full-wave rectifier into LM317/LM337 regulators with foldback current limiting, thermal design, and mains-side safety. Every major failure mode — bulk-cap ripple, regulator junction heating, foldback knee — is intentionally observable on the bench.',
    highlights: [
      '±1.25 V to ±15 V output; 500 mA per rail; ≤5 mV output ripple at full load',
      'Foldback current limit cuts short-circuit dissipation from 12.6 W down to ~3 W',
      'Thermal, safety, and regulation analysis across 6 design calculation subsections',
      'Target BOM ≤$80 in a 6″×4″×3″ chassis'
    ],
    stack: ['KiCad', 'LM317', 'LM337', 'LTspice'],
    link: 'https://github.com/iSkewb'
  },
  {
    slug: 'instru-amp',
    title: 'InstruAmp PCB',
    tagline: 'Discrete 3-op-amp instrumentation amplifier — KiCad to fab, built & bench-tested',
    tags: ['Hardware'],
    image: `${b}project-images/INA/InstruAmp.png`,
    summary:
      'Took the 3-op-amp INA topology from ECEN325 Lab 4 and turned it into a real 2-layer PCB. Designed for variable gain of 19×–201×, used 1% metal-film resistors in the output stage to target ≥60 dB CMRR, and applied proper layout discipline. Board built and DC gain confirmed on the bench — within 0.5% of theory at minimum Rgain.',
    highlights: [
      'Measured gain ~200× at min Rgain (100 Ω) vs theoretical 201× — within 0.5% of theory',
      'Variable gain 19×–201× via 1 kΩ Bourns 25-turn pot + 100 Ω safety series resistor',
      '1% metal-film resistors in the matched output stage targeting ≥60 dB CMRR vs ~35 dB with 5% resistors in Lab 4',
      '2-layer KiCad layout: bypass caps at every supply pin, star-ground, bottom-layer ground pour; DRC-clean'
    ],
    stack: ['KiCad', 'LM741', 'JLCPCB', 'Digi-Key'],
    link: 'https://github.com/iSkewb'
  },
  {
    slug: 'ready-alert',
    title: 'Ready-Alert',
    tagline: 'Drowsy driving detector — TAMU Datathon 2024',
    tags: ['ML'],
    image: `${b}project-images/ready-alert.svg`,
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
    slug: 'breakfree',
    title: 'BreakFree',
    tagline: 'AI-powered subscription manager — TAMUHack 2025',
    tags: ['Web'],
    image: `${b}project-images/break_free.png`,
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
    image: `${b}project-images/Boba_POS.png`,
    summary:
      'Multi-role POS with distinct customer, cashier, and manager workflows. Clerk OAuth for managers, PIN sessions for cashiers, and middleware-gated manager analytics, inventory, and employee management.',
    highlights: [
      'React + Vite SPA with role-based routing and accessibility controls (font size, contrast)',
      'Express API with requireManager middleware gating admin routes',
      'PostgreSQL-backed inventory, orders, and rewards; documented Cashier API contract'
    ],
    stack: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Clerk'],
    link: 'https://github.com/iSkewb/project3-team41-deployment',
    demo: 'https://project3-team41.onrender.com/'
  },
  {
    slug: 'jklmbot',
    title: 'JKLMbot',
    tagline: 'Bomb Party word-game bot with bonus-life heuristic',
    tags: ['Automation'],
    image: `${b}project-images/bomb_party.png`,
    summary:
      'Python bot that plays JKLM.fun Bomb Party. Prioritizes words whose unique letters are still unused in the round — which earns bonus lives — over just finding any valid match.',
    highlights: [
      'Letter-scoring heuristic maximizes full-alphabet bonus (extra life)',
      'Randomized inter-keystroke delays to avoid rate-limit detection'
    ],
    stack: ['Python', 'pyperclip', 'keyboard', 'mouse'],
    link: 'https://github.com/iSkewb/JKLMbot'
  }
]

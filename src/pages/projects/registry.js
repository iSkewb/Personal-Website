// Register long-form writeups here. Key = project slug (matches projects.js).
// Each value is a lazy dynamic import so writeups are code-split.
import { lazy } from 'react'

export const writeups = {
  template: lazy(() => import('./_Template')),
  'pcb-design': lazy(() => import('./PcbDesign')),
  'instru-amp': lazy(() => import('./InstruAmp'))
  // Duplicate _Template.jsx and register new writeups here, keyed by slug.
}

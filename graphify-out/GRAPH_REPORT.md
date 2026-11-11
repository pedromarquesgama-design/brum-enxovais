# Graph Report - brum-enxovais  (2026-11-10)

## Corpus Check
- Corpus is ~30,371 words - fits in a single context window. You may not need a graph.

## Summary
- 62 nodes · 64 edges · 9 communities (8 shown, 1 thin omitted)
- Extraction: 94% EXTRACTED · 6% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.88)
- Token cost: 1,250 input · 620 output

## Community Hubs (Navigation)
- Project Tooling & Config
- Atelier Brum Design System
- React Application Runtime
- HTML Entry & Template Assets
- Oxlint Linter Rules
- Development Dependencies
- Production Dependencies
- NPM Scripts & Build Pipeline
- UI Icon Assets

## God Nodes (most connected - your core abstractions)
1. `Atelier Brum Luxury Linens Brand` - 6 edges
2. `scripts` - 5 edges
3. `Vite React Template Setup` - 4 edges
4. `rules` - 3 edges
5. `react` - 3 edges
6. `Atelier Brum Color & Surface System` - 3 edges
7. `Atelier Brum Typography Hierarchy` - 3 edges
8. `@tailwindcss/vite` - 2 edges
9. `react-dom` - 2 edges
10. `@vitejs/plugin-react` - 2 edges

## Surprising Connections (you probably didn't know these)
- `Atelier Brum Luxury Linens Brand` --references--> `Brum Enxovais Logo PNG`  [INFERRED]
  DESIGN.md → public/brum-enxovais-logo.png
- `Vite Hero Starter Illustration` --conceptually_related_to--> `Vite React Template Setup`  [INFERRED]
  src/assets/hero.png → README.md
- `React Framework SVG Logo` --references--> `Vite React Template Setup`  [EXTRACTED]
  src/assets/react.svg → README.md
- `Vite Bundler SVG Logo` --references--> `Vite React Template Setup`  [EXTRACTED]
  src/assets/vite.svg → README.md
- `Vite Web Entrypoint HTML` --references--> `Site Favicon SVG`  [EXTRACTED]
  index.html → public/favicon.svg

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Atelier Brum Design Foundations** — design_atelier_brum, design_color_palette, design_typography_system, design_elevation_pill_shape [EXTRACTED 1.00]

## Communities (9 total, 1 thin omitted)

### Community 0 - "Project Tooling & Config"
Cohesion: 0.18
Nodes (11): name, private, type, version, oxlint, tailwindcss, @tailwindcss/vite, @types/react (+3 more)

### Community 1 - "Atelier Brum Design System"
Cohesion: 0.22
Nodes (10): Atelier Brum Luxury Linens Brand, Atelier Brum Color & Surface System, E-Commerce Components Specification, Pill Contour (9999px) & Elevation Hierarchy, Inter Sans-Serif Font, Playfair Display Serif Font, Primary Petroleum Slate (#1f434d), Secondary Honey Amber (#f3a63b) (+2 more)

### Community 2 - "React Application Runtime"
Cohesion: 0.28
Nodes (3): react, react-dom, App()

### Community 3 - "HTML Entry & Template Assets"
Cohesion: 0.33
Nodes (6): Vite Web Entrypoint HTML, Site Favicon SVG, Vite React Template Setup, Vite Hero Starter Illustration, React Framework SVG Logo, Vite Bundler SVG Logo

### Community 4 - "Oxlint Linter Rules"
Cohesion: 0.33
Nodes (5): plugins, rules, react/only-export-components, react/rules-of-hooks, $schema

### Community 5 - "Development Dependencies"
Cohesion: 0.33
Nodes (6): devDependencies, oxlint, @types/react, @types/react-dom, vite, @vitejs/plugin-react

### Community 6 - "Production Dependencies"
Cohesion: 0.40
Nodes (5): dependencies, react, react-dom, tailwindcss, @tailwindcss/vite

### Community 7 - "NPM Scripts & Build Pipeline"
Cohesion: 0.40
Nodes (5): scripts, build, dev, lint, preview

## Knowledge Gaps
- **13 isolated node(s):** `tailwindcss`, `@types/react`, `@types/react-dom`, `oxlint`, `Secondary Honey Amber (#f3a63b)` (+8 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 38 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `Development Dependencies` to `Project Tooling & Config`?**
  _High betweenness centrality (0.093) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `Vite React Template Setup` (e.g. with `Vite Web Entrypoint HTML` and `Vite Hero Starter Illustration`) actually correct?**
  _`Vite React Template Setup` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `tailwindcss`, `@types/react`, `@types/react-dom` to the rest of the system?**
  _13 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Why does `react` connect `React Application Runtime` to `Project Tooling & Config`?**
  _High betweenness centrality (0.090) - this node is a cross-community bridge._
- **Why does `scripts` connect `NPM Scripts & Build Pipeline` to `Project Tooling & Config`?**
  _High betweenness centrality (0.075) - this node is a cross-community bridge._
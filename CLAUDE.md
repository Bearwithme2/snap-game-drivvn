# CLAUDE.md

## Project Context
Read README.md for project requirements and setup instructions.

## Code Style

### Formatting
- 2 space indentation
- Semicolons required
- Single quotes for strings
- Max line length: 100 characters
- Trailing commas in multiline structures

### Braces & Spacing
```typescript
// Braces on same line, space before brace
if (condition) {
  doSomething();
} else {
  doOther();
}

// Functions
function getName(id: string): string {
  return names[id];
}

// Arrow functions
const getUser = (id: string) => {
  return users.find((u) => u.id === id);
};

// Single-line arrow for simple returns
const double = (n: number) => n * 2;

// Objects and arrays
const config = {
  name: 'app',
  version: 1,
};

const items = [
  'first',
  'second',
];
```

### Naming
- `camelCase` — variables, functions
- `PascalCase` — components, classes, types, interfaces
- `UPPER_SNAKE_CASE` — constants
- `kebab-case` — file names, CSS classes

### Structure
- Imports at top, grouped: external → internal → types
- One component per file
- Keep files under 200 lines; split if larger
- Prefer functional components and hooks
- Use TypeScript strict mode

## Commits
- Use conventional commits: `feat:`, `fix:`, `refactor:`, `test:`, `docs:`
- One logical change per commit

## Testing
- Write tests for new functionality
- Run tests before committing: `npm test`
- Maintain existing test coverage

## Token Optimization
- Run `/clear` between unrelated tasks
- Use `view_range` instead of reading entire files
- Limit shell output: pipe to `head`, `tail`, or `grep`
- Keep CLAUDE.md under 200 lines
- Use `.claudeignore` to exclude: `node_modules`, `dist`, `build`, `*.lock`, `.git`
- Plan before implementing: outline approach, then execute
- Avoid re-reading files already in context

## Sub-Agent Usage
Use sub-agents (`dispatch_agent`) for parallelizable or isolated tasks:
- Running test suites
- Linting/formatting checks
- Generating boilerplate for multiple files
- Researching documentation
- Independent component implementation

Keep in main agent:
- Architecture decisions
- Cross-file refactors
- Tasks requiring full project context

## Before Submitting
- [ ] Code compiles without errors
- [ ] All tests pass
- [ ] No console warnings/errors
- [ ] README updated if needed
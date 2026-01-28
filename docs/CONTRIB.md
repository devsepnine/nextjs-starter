# Contributing Guide

This document provides guidelines for contributing to the Next.js Starter Kit project.

## Table of Contents

- [Development Workflow](#development-workflow)
- [Available Scripts](#available-scripts)
- [Environment Setup](#environment-setup)
- [Testing Procedures](#testing-procedures)
- [Code Standards](#code-standards)
- [Internationalization (i18n)](#internationalization-i18n)
- [Git Workflow](#git-workflow)

## Development Workflow

### Prerequisites

- **Node.js**: 24.11.0 (managed via Volta)
- **Package Manager**: pnpm
- **Git**: Latest version

### Initial Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nextjs-starter
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start development server**
   ```bash
   pnpm dev
   ```

4. **Access the application**
   - Open http://localhost:3000 in your browser

## Available Scripts

### Development Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `next dev` | Start development server with hot reload |
| `build` | `pnpm lingui:extract_and_compile && next build --webpack` | Build production bundle with i18n compilation |
| `start` | `next start` | Start production server |
| `clean` | `rm -rf .next` | Remove Next.js build cache |

### Code Quality Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `typecheck` | `tsc --noEmit` | Run TypeScript type checking |
| `check` | `pnpm typecheck && pnpm lint:fix` | Run type check and auto-fix linting issues |
| `lint:fix` | `npx eslint --fix` | Auto-fix ESLint issues |
| `format` | `prettier --write .` | Format all files with Prettier |

### Build Analysis

| Script | Command | Description |
|--------|---------|-------------|
| `analyze` | `ANALYZE=true npm run build` | Build with bundle analyzer enabled |

### Internationalization (i18n)

| Script | Command | Description |
|--------|---------|-------------|
| `lingui:extract` | `lingui extract --clean` | Extract translation strings from source code |
| `lingui:compile` | `lingui compile --typescript` | Compile translation catalogs for production |
| `lingui:watch` | `lingui extract --watch` | Watch mode for translation extraction |
| `lingui:extract_and_compile` | `pnpm run lingui:extract && pnpm run lingui:compile` | Extract and compile translations |

### Git Hooks

| Script | Command | Description |
|--------|---------|-------------|
| `prepare` | `husky` | Install Husky git hooks |

## Environment Setup

### Required Tools

1. **Node.js 24.11.0**
   - Managed automatically via Volta
   - Volta configuration in `package.json`

2. **pnpm**
   - Install globally: `npm install -g pnpm`

### No Environment Variables Required

This project does not require environment variables for development. All configuration is handled through:
- `next.config.js` - Next.js configuration
- `lingui.config.mjs` - Internationalization configuration
- `tailwind.config.js` - Tailwind CSS configuration

If you need to add environment variables in the future:
1. Create `.env.local` file (gitignored)
2. Create `.env.example` file with documentation
3. Update this guide

## Testing Procedures

### Type Checking

Run TypeScript type checking:
```bash
pnpm typecheck
```

### Linting

Check and auto-fix linting issues:
```bash
pnpm lint:fix
```

### Code Formatting

Format all code:
```bash
pnpm format
```

### Full Quality Check

Run all checks:
```bash
pnpm check
```

### Build Verification

Verify production build:
```bash
pnpm build
pnpm start
```

### Bundle Analysis

Analyze bundle size:
```bash
pnpm analyze
```

Opens webpack bundle analyzer in your browser.

## Code Standards

### File Organization

- **Components**: `components/`
  - UI components: `components/ui/`
  - Template components: `components/template/`
  - Provider components: `components/providers/`
- **Layouts**: `layout/`
- **Application Pages**: `app/`
- **Utilities**: `lib/`
- **Styles**: `styles/`
- **Locales**: `locales/`

### Naming Conventions

- **Components**: PascalCase (e.g., `Button.tsx`, `ThemeSwitch.tsx`)
- **Utilities**: camelCase (e.g., `utils.ts`, `i18n.ts`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `FALLBACK_LANG`)
- **Types/Interfaces**: PascalCase with `I` prefix for interfaces (e.g., `ILocale`)

### Code Style

- **TypeScript**: Strict mode enabled
- **ESLint**: Next.js + Prettier configuration
- **Prettier**: Consistent formatting
- **Line Length**: 100 characters (enforced by Prettier)

### Pre-commit Hooks

Husky runs the following on commit:
- ESLint auto-fix on `*.{js,jsx,ts,tsx}`
- Prettier formatting on `*.{js,jsx,ts,tsx,json,md,css,scss}`

## Internationalization (i18n)

### Supported Languages

- English (en-US) - Default
- Korean (ko-KR)
- Japanese (ja-JP)
- Chinese Simplified (zh-CN)
- Chinese Traditional (zh-TW)
- Arabic (ar-SA) - RTL support

### Adding New Translations

1. **Extract translation strings**
   ```bash
   pnpm lingui:extract
   ```

2. **Edit translation files**
   - Files located in `locales/{locale}/messages.po`
   - Update `msgstr` values with translations

3. **Compile translations**
   ```bash
   pnpm lingui:compile
   ```

### Adding New Languages

1. **Update `lib/i18n.ts`**
   ```typescript
   export const SUPPORTED_LANGUAGES: ILocale[] = [
     // ... existing languages
     {
       language: 'fr',
       locale: 'fr-FR',
       label: 'Français',
     },
   ];
   ```

2. **Update `lingui.config.mjs`**
   ```javascript
   locales: ['en', 'ko', 'ja', 'zh-cn', 'zh-tw', 'ar', 'fr'],
   ```

3. **Extract and create translation files**
   ```bash
   pnpm lingui:extract
   ```

4. **For RTL languages**, update `lib/i18n.ts`:
   ```typescript
   export const RTL_LANGUAGES: Locales[] = ['ar', 'he', 'fa'];
   ```

## Git Workflow

### Branch Naming

- **Feature**: `feature/rtl`, `feature/dark-mode`
- **Fix**: `fix/button-alignment`, `fix/memory-leak`
- **Chore**: `chore/update-deps`, `chore/refactor-utils`

### Commit Messages

Follow conventional commits:
```
<type>: <description>

<body>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `refactor`: Code refactoring
- `style`: Code formatting
- `docs`: Documentation
- `test`: Tests
- `chore`: Build/tooling

**Example:**
```
feat: add Arabic language support with RTL layout

- Add Arabic (ar-SA) to supported languages list
- Implement automatic RTL/LTR direction switching
- Complete Arabic translations for 66 UI strings
```

### Pull Request Process

1. Create feature branch from `develop`
2. Make changes and commit
3. Push branch and create PR
4. Ensure CI checks pass
5. Request code review
6. Merge after approval

## Troubleshooting

### Common Issues

**Build fails with Lingui errors:**
```bash
pnpm lingui:extract_and_compile
pnpm clean
pnpm build
```

**Type errors after updating dependencies:**
```bash
pnpm typecheck
rm -rf node_modules .next
pnpm install
```

**Husky hooks not working:**
```bash
pnpm prepare
```

**Port 3000 already in use:**
```bash
# Find process
lsof -ti:3000

# Kill process
kill -9 $(lsof -ti:3000)

# Or use different port
PORT=3001 pnpm dev
```

## Browser Support

Target browsers (from `package.json`):
- \> 0.5% market share
- Last 2 versions
- Not dead browsers

## Key Technologies

- **Framework**: Next.js 16.1.4 (App Router)
- **React**: 19.2.3
- **Styling**: Tailwind CSS 4.1.18
- **State**: Zustand 5.0.10
- **i18n**: Lingui 5.9.0
- **Icons**: Iconify React 6.0.2
- **UI Components**: Radix UI
- **PWA**: Serwist 9.5.0

## Getting Help

- Check existing documentation in `docs/`
- Review TypeScript types for API reference
- Check Next.js documentation: https://nextjs.org/docs
- Check Lingui documentation: https://lingui.dev/

## License

See LICENSE file in repository root.

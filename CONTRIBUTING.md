# Contributing to TeosPitaxi

Thanks for helping improve TeosPitaxi! A few guidelines:

- Fork the repo and create feature branches: `feature/xyz` or `fix/bug-name`.
- Run linters and tests before opening a PR.
- Keep secrets out of commits (use .env.local and GitHub secrets).
- Add a brief description to PRs and link related issues.
# Contributing Guidelines

We welcome contributions to **TeosPitaxi**! Please follow these guidelines to keep the project secure, consistent, and easy to maintain.

---

## 📌 Workflow

1. **Fork** the repository
2. **Clone** your fork locally
3. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
Make your changes

Run checks locally (pnpm lint, pnpm typecheck, pnpm build)

Commit with a clear message (see below)

Push your branch and open a Pull Request (PR)
🧹 Code Style
Use TypeScript for all new code

Run pnpm lint before committing

Run pnpm typecheck to ensure type safety

Format code with: pnpm format
📝 Commit Messages
Follow Conventional Commits for clarity:

feat: add ride booking API

fix: resolve Supabase RLS error

docs: update README with environment notes

chore: bump dependencies
✅ Testing
Ensure all CI checks pass before requesting review

Test locally with pnpm dev

Verify ride booking and wallet flows before merging

🔒 Security
Never commit .env.local or secrets

Rotate any leaked keys immediately

Report vulnerabilities via Issues or private email

🤝 Pull Requests
Keep PRs focused (one feature or fix per PR)

Reference related issues in description

Include screenshots or logs if UI/UX changes

Thank you for helping build TeosPitaxi — Pi-Native Mobility dApp 🚖✅ 

---



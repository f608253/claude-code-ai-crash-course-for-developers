# CLAUDE.md — DevOps Conventions

This file tells Claude how to work inside this repository. Follow these conventions
whenever you write, review, or modify any code or infrastructure in this project.

## Repo Layout
- `claude-code-in-terminal/` — a Vite + React (TypeScript) front-end app (the "course" web app).
- `claude-code-tip-calculator/` — the featured Vite + React + TypeScript app (validated tip
  calculator, Vitest + React Testing Library suite).
- Root-level `.tf`, `.yml`, `k8s/`, `helm/`, etc. — infrastructure you generate in this repo.
- `.claude/settings.json` — Claude Code harness config; do not edit unless asked.

## Front-end app conventions
- Two sibling Vite 8 + React 19 + TypeScript apps, built with strict TypeScript
  (`verbatimModuleSyntax`, explicit `.ts`/`.tsx` import extensions):
  - `claude-code-in-terminal/` — **minimal demo** (single `App.tsx`, no tests). Keep it
    minimal; don't bolt on features.
  - `claude-code-tip-calculator/` — **featured app**: validated whole-number inputs, arrow-key
    stepping, folder-per-component components + `src/utils/`, and a Vitest suite. It is the
    reference app for refactors, tests, and docs.
- **Tests:** Vitest + React Testing Library, `.spec.{ts,tsx}` files co-located with whatever
  they test. Run with `npm test` (`vitest run`) or `npm run test:watch`. Config lives in each
  app's `vitest.config.ts` (jsdom, `globals: false`, threads pool — see the config comment
  for the non-obvious pool choice).
- **Quality gates before "done":** `npm run build` (`tsc -b && vite build`) and
  `npm run lint` (`oxlint`); run `npm test` for the tip calculator.
- **Docs:** keep a `DOCUMENTATION.md` in each app root (tip calculator's is the reference
  format) covering overview, features, tech stack, structure, scripts, and how to test.

## Working principles
- **Never mutate production.** Any apply/deploy/destructive command must be
  `--dry-run` / `plan` first, and confirmed before executing.
- **Work inside a git repo** when generating infra so Claude can read real context.
- **Idempotency is mandatory.** Scripts and IaC must be safe to re-run (guards,
  `terraform plan`, `kubectl apply --dry-run`).
- **Least privilege.** IAM policies, security groups, and RBAC must be scoped —
  never `*` actions on `*` resources unless unavoidable and justified.
- **Encrypt by default.** Volumes, buckets, and secrets must be encrypted at rest
  and in transit.
- **No hardcoded secrets.** Use AWS Secrets Manager / Vault / CI secrets. Never commit
  `.env`, keys, or tokens. Run a secret-scan mindset on every PR.
- **Explain, don't just emit.** When generating config, briefly justify non-obvious
  choices so a human can review before applying.

## Naming conventions
- **Resources:** `<project>-<environment>-<resource>` — e.g. `myapp-prod-alb`,
  `myapp-dev-s3`.
- **Terraform:** snake_case for resource names and variables.
- **Kubernetes:** kebab-case for names; use `app.kubernetes.io/name` and
  `environment: <dev|staging|prod>` labels on every object.
- **Env tiers:** use exactly `dev`, `staging`, `prod` (not `production`/`test`).
- **Tags:** every AWS resource gets `Environment`, `Project`, `ManagedBy=terraform`,
  and `CostCenter` where applicable.

## Language & formatting defaults
- **Terraform:** format with `terraform fmt`; pin providers; use modules; no hardcoded
  resource IDs — reference them via outputs/data sources.
- **Docker:** multi-stage builds, minimal base images (`-slim`/`-alpine`), non-root
  user, explicit `EXPOSE`, and a `HEALTHCHECK`.
- **CI:** YAML pipelines (GitHub Actions / GitLab). Keep jobs small, add caching,
  and fail on HIGH/CRITICAL security scan findings.
- **Shell/Python scripts:** add `set -euo pipefail` (Bash), argument parsing,
  logging, and a `--dry-run` flag.

## Security & quality gates (run before considering work "done")
1. `terraform fmt -check` + `terraform validate` (if Terraform present).
2. Scan IaC with `tfsec` / `checkov`; scan images with `trivy`.
3. `kubectl apply --dry-run=client -f` / `helm lint` for K8s.
4. No secrets committed; `.gitignore` covers `.env`, `*.pem`, `*.key`.
5. Review diffs for least-privilege and encryption before applying.

## On-call / incident conventions
- When diagnosing: request the real logs/describe output, identify root cause first,
  then propose a fix — don't jump to a workaround.
- Runbooks live in version control next to the code they document.

## How to work with this file
- If a convention is outdated or a better one emerges, propose an update here.
- Keep it concise — this file is loaded every session, so don't pad it.

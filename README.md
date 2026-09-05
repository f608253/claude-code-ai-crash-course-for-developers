# Claude Code — AI Crash Course for Developers

A hands-on course and reference workspace for developers and DevOps engineers learning to use
[Claude Code](https://claude.com/claude-code) effectively. This repo combines a practical guide,
a living set of conventions, and a small demo app — all in one place.

---

## 📚 What's Inside

| Path | Description |
|------|-------------|
| [`50-ways-claude-helps-devops.md`](50-ways-claude-helps-devops.md) | **The core guide.** 50 ways a DevOps engineer can use Claude Code, each with detailed, copy-paste implementation steps and real code examples (Terraform, Helm, CI pipelines, Prometheus, security, cost optimization, incident response, and more). |
| [`CLAUDE.md`](CLAUDE.md) | Project-level conventions Claude follows automatically in every session — naming, tagging, least-privilege IAM, encryption, idempotency, and quality gates. |
| [`claude-code-in-terminal/`](claude-code-in-terminal/) | A small Vite + React (TypeScript) web app used as a runnable example in the course. |
| [`.claude/settings.json`](.claude/settings.json) | Claude Code harness configuration for this project. |

---

## 🗂️ The 50 Ways Guide — At a Glance

The guide is organized into practical categories, each with numbered, actionable ideas:

1. **IaC & Provisioning** — Terraform modules, Ansible playbooks, Pulumi/CloudFormation, provider migrations, Helm charts, Kubernetes manifests.
2. **CI/CD** — GitHub Actions / GitLab / Jenkins pipelines, debugging failures, optimizing performance, blue-green / canary / rolling deploys, rollback procedures.
3. **Automation & Scripting** — Bash/Python/Go scripts, cron jobs, runbooks, migration scripts, Makefiles.
4. **Monitoring & Observability** — Prometheus/Alertmanager, Grafana, log parsing, Fluentd/Fluent Bit, Datadog / New Relic APM.
5. **Security** — Dockerfile audits, IAM least-privilege review, SOC2/ISO27001 evidence, secrets management, vulnerability remediation.
6. **Kubernetes Operations** — debugging pod crashes/OOM, Kustomize overlays, OPA Gatekeeper / admission webhooks.
7. **Cost Optimization** — capacity planning, billing analysis, right-sizing instances, data-transfer review.
8. **Incident Response & Reliability** — post-mortems, runbooks, escalation paths, real-time triage, checklists, Slack thread summaries, chaos engineering, smoke tests, drift detection.

Each idea includes a **"What it does,"** a step-by-step **implementation**, and **copy-paste examples** you can adapt to your own stack.

---

## 🚀 Getting Started

### 1. Use the guide
Open the guide and jump to any idea that matches what you're doing today:

```bash
# Search the guide for a topic
grep -i "helm" 50-ways-claude-helps-devops.md
```

### 2. Work with Claude Code in this repo
The `CLAUDE.md` file is loaded automatically when you open this folder in Claude Code.
That means Claude will already know your conventions — it won't mutate production, it'll
prefer `--dry-run`/`plan`, it'll follow your naming/tagging rules, and it'll run quality
gates before considering work done.

### 3. Run the demo app (optional)

```bash
cd claude-code-in-terminal
npm install
npm run dev
```

---

## 🧑‍💻 Example Prompts to Try

- *"Write a Terraform module for a VPC with public/private subnets following the conventions in CLAUDE.md."*
- *"Review this Dockerfile for vulnerabilities and hardening opportunities."*
- *"Create a GitHub Actions pipeline that runs lint, tests, and a trivy image scan."*
- *"Generate a Prometheus alert rule set for a 99.9% SLO with burn-rate alerts."*
- *"Draft a blameless incident post-mortem from this timeline and logs."*

---

## 📄 License

Learning material — feel free to use, adapt, and share for internal training and personal projects.

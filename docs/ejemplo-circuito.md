# Ejemplo del circuito DevSecOps

PR de referencia: https://github.com/devsecops-gh-actions/axaes-test-node-application/pull/1 (base `develop`, rama `feature/ejemplo-circuito`).

Reutilizables: `devsecops-gh-actions/shared-workflows` @ `bb94195f0e8e0b60bc5420d676dfacdb528427ae` (main).

## Checks (resultado en el último run antes de este commit, head `d418e25`)

| Check | Resultado | Motivo / nota |
|---|---|---|
| CI / prepare | pass | |
| CI / test (22) | pass | `npm test`, 4 tests |
| CI / build-and-test | pass | Antes fallaba: el script `build` no generaba `dist/`. Corregido en `package.json` |
| Security / codeql | pass | Antes fallaba: CodeQL rechaza autobuild en JS/TS. Corregido en `security.yml` (modo `none` para interpretados) |
| CodeQL (default setup) | pass | Análisis nativo de GitHub, aparte del caller |
| Security / dependency-review | pass | Antes fallaba: dependency graph desactivado. Activado vía vulnerability-alerts |
| Security / secret-scan | **fail (bloqueado)** | `require-push-protection: true` exige `app-token` de la GitHub App `devsecops-security-reviewer`, que no existe. Sin secreto no se puede generar |
| Validation / conventions | **fail (bloqueado)** | `bot-validator.yml` hace checkout de `devsecops-gh-actions/bots`, que no existe |
| Validation / workflows-and-iac | **fail (bloqueado)** | Mismo motivo que conventions |

## Causas corregidas en esta PR

1. `caller-security.yml`: input `languages` inexistente; ahora `codeql-languages`.
2. `caller-bots.yml`: placeholder `REPLACE_SHA_SHARED_WORKFLOWS` en `validator-ref` (ahora vacío).
3. `caller-*.yml`: pin a `bb94195` (SHA real de shared-workflows main).
4. `shared-workflows/.github/workflows/security.yml`: CodeQL con autobuild para JS/TS. Ahora el modo se elige por lenguaje.
5. `package.json` `build`: genera `dist/` (exigido por `kind: application`).
6. Repo: branch `develop` creada y marcada como por defecto.
7. Repo: dependency graph activado (vulnerability-alerts).

## Bloqueado

- **Secret scanning / push protection**: el repo tiene push protection desactivado. El gate `require-push-protection` necesita un `app-token` (GitHub App). Opciones que requieren decisión: crear la App y su secreto, o bajar a `require-push-protection: false` documentándolo. No se ha hecho ningún cambio de ese tipo.
- **Validación de convenciones y workflows**: falta el repo `devsecops-gh-actions/bots` con `bots/validator/`. No se ha creado (regla: no crear repos). Ni `shared-workflows` ni este repo contienen esos scripts.
- **Despliegue**: no aplica. `CICD/config.yml` tiene `deployable: false` y `deploy-target: none`, y no hay caller de `deploy-*.yml`. Si se quisiera desplegar, quedaría bloqueado por: federación OIDC con el proveedor de nube (sin credenciales), entornos de GitHub con reviewers y variables de entorno de nube (no creadas).
- **Contenedor, SBOM y release**: no están cableados en los callers de este repo (`has-containers: false`, sin job de release). Se ejercitan en otros repos o en `devsecops-release.yml` cuando se añadan.

## Pendiente fuera de este repo (shared-workflows, detectado)

- `release.yml` y `bot-deps.yml` usan placeholders (`<org>-platform/...`, `@<SHA-DEL-RELEASE>`, `@<sha-completo>`). El workflow no es válido y falla en cada push a main.
- `axaes-test-python-application`: `ci-python.yml` exige `requirements*.txt` con hashes o `poetry.lock`/`uv.lock`.
- `axaes-test-java-application`: `caller-ci.yml` y `caller-bots.yml` fallan sin jobs (startup failure); no diagnosticado completamente.

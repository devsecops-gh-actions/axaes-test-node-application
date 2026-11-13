# axaes-template-node-application

Repositorio de producto de `acme-templates`, propiedad del equipo `platform-templates`. Generado por `devsecops-scaffold` (`bots/scaffold`).

## Propiedades del repositorio

| Propiedad | Valor |
|---|---|
| `kind` | `application` |
| `stack` | `node` |
| `deploy-target` | `none` |
| `data-classification` | `internal` |
| `has-containers` | `false` |
| `has-iac` | `false` |
| `deployable` | `false` |

Las custom properties de GitHub son la fuente de verdad. `CICD/config.yml` las refleja.

## Checks requeridos

- `CI / build-and-test`
- Seguridad de código: `Security / codeql`, `Security / dependency-review`, `Security / secret-scan`
- `Validation / conventions`, `Validation / workflows-and-iac`
- `Container / scan` y `IaC / scan`, según `has-containers` y `has-iac`

## Flujo

- Pull request: validación de convenciones, build y tests, seguridad y escaneos condicionales.
- `main`: build y despliegue a `dev` y `staging`, cuando el tipo de artefacto lo requiere.
- Tags `v*.*.*`: release, publicación o despliegue a `prod` con aprobación humana.

Los workflows son reutilizables y viven en `devsecops-gh-actions/shared-workflows` y `devsecops-gh-actions/bots`. No se copian en este repositorio.

## Pendiente antes del primer merge

- Sustituir los valores `REPLACE_*` y `devsecops-gh-actions` de los callers.
- Fijar `shared-ref` a un SHA completo.
- Completar la descripción del producto y la licencia (`LICENSE`).

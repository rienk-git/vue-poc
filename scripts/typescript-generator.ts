import { execSync } from 'child_process'

execSync(
  'npx swagger-typescript-api -p ./src/stores/features/imdb/types/swagger.json -o ./src/stores/features/imdb/types -n apiTypes.ts'
)

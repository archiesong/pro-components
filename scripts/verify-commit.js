import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import pico from 'picocolors'

const gitDir = execSync('git rev-parse --git-dir', { encoding: 'utf-8' }).trim()
const msgPath = path.resolve(gitDir, 'COMMIT_EDITMSG')
const msg = readFileSync(msgPath, 'utf-8').trim()

const commitRE
  = /^(((\uD83C[\uDF00-\uDFFF])|(\uD83D[\uDC00-\uDE4F\uDE80-\uDEFF])|[\u2600-\u2B55]) )?(revert: )?(feat|fix|docs|UI|refactor|⚡perf|workflow|build|CI|typos|chore|tests|types|wip|release|dep)(\(.+\))?: .{1,50}/

if (!commitRE.test(msg)) {
  console.log()
  console.error(
    `  ${pico.white(pico.bgRed(' ERROR '))} ${pico.red(
      `invalid commit message format.`,
    )}\n\n${
      pico.red(
        `  Proper commit message format is required for automated changelog generation. Examples:\n\n`,
      )
    }    ${pico.green(`💥 feat(compiler): add 'comments' option`)}\n`
    + `    ${pico.green(
      `🐛 fix(compiler): fix some bug`,
    )}`
    + `
      ${pico.green(
        `📝 docs(compiler): add some docs`,
      )}
    `
      + `
    ${pico.green(
      `💄 UI(compiler): better styles`,
    )}
    `
    + `
    ${pico.green(
      `🎨 chore(compiler): do something`,
    )}
    `,
  )
  process.exit(1)
}

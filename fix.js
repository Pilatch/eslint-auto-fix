let cliEngine = new (require('eslint').CLIEngine)({fix: true})
let chokidar = require('chokidar')
let fs = require('fs')
let writingTo = {} // Paths we're currently writing fixed codez to

module.exports = (globsToWatch, verbose = false) => {
  if (!globsToWatch || !globsToWatch.length) {
    globsToWatch = ['./**/*.js']
  }

  if (!Array.isArray(globsToWatch)) {
    globsToWatch = [globsToWatch]
  }

  if (verbose) {
    console.error(`eslint-auto-fix is watching ${globsToWatch.join(', ')} for file changes`)
  }

  chokidar.watch(globsToWatch).on('change', fix(verbose))
}

let fix = verbose => path => {
  if (writingTo[path] === true) {
    return
  }

  let output = cliEngine.executeOnFiles([path]).results[0].output

  if (output) { // Something needed fixin'
    writingTo[path] = true

    if (verbose) {
      console.error(`ESLint is fixing ${path}`)
    }

    fs.writeFile(path, output, writeError => {
      delete writingTo[path]
      if (writeError) {
        console.error(`Could not write to file ${path} to auto-fix it with ESLint.`)
      }
    })
  }
}

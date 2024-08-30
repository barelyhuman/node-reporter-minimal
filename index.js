'use strict'

const { relative } = require('path')

const cross = 'x'
const check = '√'

const color = (code, end) => str => `\x1B[${code}m${str}\x1B[${end}m`
const bold = color(1, 22)
const dim = color(2, 22)
const red = color(31, 39)
const green = color(32, 39)
const pad = count => '  '.repeat(count)
const header = (test, duration, passed) =>
  (!passed ? red(`${cross} `) : green(`${check} `)) +
  test +
  dim(` [${duration}ms]`) +
  '\n'

const cleanTermLink = link => link.replace(process.cwd(), '').replace(/^\//, '')

const printEvents = (baseTestEvent, depth = baseTestEvent.depth || 0) => {
  const children = baseTestEvent.children || []
  const hasErrors = children.find(d => d.hasError)
  let output = ''
  output +=
    pad(depth) +
    header(
      baseTestEvent.name,
      baseTestEvent.diagnostics.duration_ms,
      !hasErrors
    )

  children.forEach(childTestEvents => {
    if (!childTestEvents.hasError) return

    if (childTestEvents.children) {
      output += printEvents(childTestEvents, depth + childTestEvents.depth + 1)
    } else {
      output +=
        pad(depth + childTestEvents.depth + 1) +
        red('x ') +
        childTestEvents.name +
        '\n' +
        pad(depth + childTestEvents.depth + 1) +
        dim(cleanTermLink(childTestEvents.termLink)) +
        '\n' +
        red(
          pad(depth + childTestEvents.depth + 1) +
            new Error(childTestEvents.error).message
              .replace(/(\n)/g, '\n ' + pad(depth + childTestEvents.depth + 1))
              .toString() +
            '\n'
        )
    }
  })
  return output
}

// runner
const run = {
  tree: [],
  create: event => {
    const hasError = event.type == 'test:fail'
    return {
      name: event.data.name,
      depth: event.data.nesting,
      diagnostics: event.data.details || {},
      file: event.data.file,
      termLink: `${event.data.file}:${event.data.line}:${event.data.column}`,
      hasError,
      startOfFile: event.data.line === 1 && event.data.column === 1,
      error: hasError ? event.data.details.error : null,
    }
  },
  add: (event, completion) => {
    if (event.startOfFile) return
    const existingEventInd = run.tree.findIndex(
      d => d.termLink === event.termLink
    )

    if (existingEventInd > -1) {
      if (completion) {
        Object.assign(run.tree[existingEventInd], event)
        return
      }
    }
    if (event.depth === 0) {
      run.tree.push(event)
      return
    }

    let parentNode
    for (let i = run.tree.length - 1; i >= 0; i--) {
      const node = run.tree[i]
      if (node.file === event.file && node.depth === event.depth - 1) {
        parentNode = node
        break
      }
    }
    if (!parentNode) {
      return
    }

    event.parent = parentNode
    ;(parentNode.children ||= []).push(event)

    run.tree.push(event)
  },
  end: () => {
    if (!run.tree.length) return

    let output =
      dim('\n> Test ') + bold(`${relative(process.cwd(), run.tree[0].file)}\n`)

    for (let node of run.tree) {
      if (node.depth !== 0) continue
      output += printEvents(node)
    }

    return output
  },
}

module.exports = async function* minimalReporter(source) {
  const diagnosticErrors = []
  for await (const event of source) {
    switch (event.type) {
      case 'test:start':
        run.add(run.create(event))
        break

      case 'test:pass':
      case 'test:fail':
        run.add(run.create(event), true)
        break

      case 'test:diagnostic':
        if (event.data.message.toLowerCase().includes('error'))
          diagnosticErrors.push(event.data.message)
        break
      case 'test:stderr':
        yield `${event.data.message}\n`
        break

      default:
        break
    }
  }

  yield run.end()

  if (diagnosticErrors.length)
    yield `Diagnostic Errors:\n` + diagnosticErrors.join('\n')
}

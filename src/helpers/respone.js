const respon = (res, status, result = '', err = false) => {
  let desc = ''

  switch (status) {
    case 200:
      desc = 'OK'
      break
    case 201:
      desc = 'Created'
      break
    case 400:
      desc = 'Bad Request'
      break
    case 401:
      desc = 'Unauthorized'
      break
    case 500:
      desc = 'Internal Server Error'
      break
    case 501:
      desc = 'Bad Gateway'
      break
    case 304:
      desc = 'Not Modified'
      break
    default:
      desc = ''
  }

  const isObject = (data) => {
    return !!data && data.constructor === Object
  }

  const isString = (data) => {
    if (typeof data === 'string') {
      return true
    } else {
      return false
    }
  }

  const results = {}
  results.status = status
  results.description = desc
  if (isObject(result)) {
    results.result = [result]
  } else if (Array.isArray(result)) {
    results.result = result
  } else {
    results.result = result
  }
  if (err === true) {
    results.isError = true
  }

  if (isString(result)) {
    results.result = { message: result }
  }
  return res.status(status).json(results)
}

module.exports = respon

function createEndpoint(baseUrl: string) {
  return function(endpoint: string) {
    return `${baseUrl}${endpoint}`
  }
}

export { createEndpoint }

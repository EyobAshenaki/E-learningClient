function GraphqlError (errors) {
  this.errors = errors;
  this.name = 'GRAPHQL ERROR'
}

module.exports= {
  GraphqlError
}
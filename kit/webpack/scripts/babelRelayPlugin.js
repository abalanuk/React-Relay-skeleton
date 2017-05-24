import getBabelRelayPlugin from 'babel-relay-plugin'
import { introspectionQuery } from 'graphql/utilities'
import request from 'sync-request'

const url = 'http://localhost:3000/graphql'

const response = request('POST', url, {
  json: {
    query: introspectionQuery,
  },
})

const schema = JSON.parse(response.body.toString('utf-8'))
//console.log(schema.data)
module.exports = getBabelRelayPlugin(schema.data, { abortOnError: true })

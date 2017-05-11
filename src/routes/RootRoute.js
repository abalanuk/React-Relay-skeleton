import Relay from 'react-relay'

export default class extends Relay.Route {
  static queries = {
    user: () => Relay.QL`
      query {
        viewer(key: $userID)
      }
      `,
  }
  static paramDefinitions = {
    userID: {required: true}
  }
  static routeName = 'RootRoute'
}

//${Component.getFragment('user')}
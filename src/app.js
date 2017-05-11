// React
import React from 'react'
import PropTypes from 'prop-types'

// Relay
import Relay from 'react-relay'

// Routing
import { Link, Route, BrowserRouter } from 'react-router-dom'

// <Helmet> component for setting the page title
import Helmet from 'react-helmet'

// Styles
import './styles.global.css'
import css from './styles.css'
import sass from './styles.scss'

// Get the ReactQL logo.  This is a local .svg file, which will be made
// available as a string relative to [root]/dist/assets/img/
import logo from './reactql-logo.svg'

// ----------------------

// We'll display this <Home> component when we're on the / route
const Home = () => (
  <h1>You&apos;re on the home page - click another link above</h1>
)

// Helper component that will be conditionally shown when the route matches.
// This gives you an idea how React Router v4 works
const Page = ({ match }) => (
  <h1>Changed route: {match.params.name}</h1>
)

// Specify PropTypes if the `match` object, which is injected to props by
// the <Route> component
Page.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object,
  }).isRequired,
}

// Stats pulled from the environment.  This demonstrates how data will
// change depending where we're running the code (environment vars, etc)
const Stats = () => {
  const info = [
    ['Environment', process.env.NODE_ENV],
    ['Running', SERVER ? 'On the server' : 'In the browser'],
  ]

  return (
    <ul className={css.data}>
      {info.map(([key, val]) => (
        <li key={key}>{key}: <span>{val}</span></li>
      ))}
    </ul>
  )
}

class Message extends React.PureComponent {
  constructor(props) {
    super(props)
  }
  static propTypes = {
    user: PropTypes.object
  }
  render() {
    const user = this.props.user
    return (
      <div>
        <h2>Message from GraphQL server: <em>{user.fullName}</em></h2>
      </div>
    )
  }
}

// Example of CSS, SASS styles being used together
const Styles = () => (
  <ul className={css.styleExamples}>
    <li className={css.example}>Styled by CSS</li>
    <li className={sass.example}>Styled by SASS</li>
  </ul>
)

 //Export a simple component that allows clicking on list items to change
 //the route, along with a <Route> 'listener' that will conditionally display
 //the <Page> component based on the route name
const App = (props) => (
  <BrowserRouter>
    <div>
      <Helmet
      title="Barista-admin ReactQL application"
      meta={[{
        name: 'description',
        content: 'ReactQL starter kit app',
      }]} />
      <div className={css.hello}>
        <img src={logo} alt="ReactQL" className={css.logo} />
      </div>
      <hr />
      <Message {...props}/>
      <hr />
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/page/about">About</Link></li>
        <li><Link to="/page/contact">Contact</Link></li>
      </ul>
      <hr />
      <Route exact path="/" component={Home} />
      <Route path="/page/:name" component={Page} />
      <hr />
      <p>Runtime info:</p>
      <Stats />
      <hr />
      <p>Stylesheet examples:</p>
      <Styles />
    </div>
  </BrowserRouter>
)

// GraphQL-enabled component...
const AppContainer = Relay.createContainer(App, {
  fragments: {
    user: () => Relay.QL`
       fragment on viewerNode {
          fullName
       }
    `,
  },
})

export default AppContainer
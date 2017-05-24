// Browser entry point, for Webpack.  We'll grab the browser-flavoured
// versions of React mounting, routing etc to hook into the DOM

// React parts
import React from 'react'
import ReactDOM from 'react-dom'
import Relay from 'react-relay'

// Browser routing
import RootRoute from 'src/routes/RootRoute'

// Root component.  This is our 'entrypoint' into the app.  If you're using
// the ReactQL starter kit for the first time, `src/app.js` is where
// you can start editing to add your own code
import App from 'src/app'


ReactDOM.render(
  <Relay.Renderer
    environment={Relay.Store}
    Container={App}
    queryConfig={new RootRoute({userID: "1111"})}
  />,
  document.getElementById('main')
)

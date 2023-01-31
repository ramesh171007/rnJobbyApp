import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from './components/Home/index'
import Login from './components/Login/index'
import Jobs from './components/Jobs/index'
import ProctectedRoute from './components/ProtectedRoute/index'
import JobDetailSection from './components/JobDetailSection/index'
import NotFound from './components/NotFound/index'
import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProctectedRoute exact path="/" component={Home} />
      <ProctectedRoute exact path="/jobs" component={Jobs} />
      <ProctectedRoute exact path="/jobs/:id" component={JobDetailSection} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)

export default App

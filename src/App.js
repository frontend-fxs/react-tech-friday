import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import './App.styles.css'


export default function App() {

  return (
    <Router>
      <div>
        <AppBar position="static">
          <Toolbar>
            <Link to="/class-component" className='link'>
              Class Component with state
            </Link>
            <Link to="/functional-component" className='link'>
              Function component with Hooks
            </Link>
          </Toolbar>
        </AppBar>
        <Switch>
          <Route path="/class-component">
            <ClassComponent />
          </Route>
          <Route path="/functional-component">
            <FunctionalComponent />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <Typography variant="h2">
      Hola Mundo. Escoge entre Class Component y Functional component
    </Typography>
  );
}

class ClassComponent extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      rendered: 0,
      updated: 0      
    };
  }

  componentDidMount() {
    this.setState({ rendered: this.state.rendered + 1  });
  }

  componentDidUpdate() {
    //No se debe actualizar el estado dentro del componentDidUpdate porque causaría un bucle infinito
    setTimeout(() => {
      document.title = `${this.state.updated} updates`;
    }, 2000);
  }

  componentWillUnmount() {
    console.log("Bye bye. Destroying external objects, unsubscribing ... here.");
  }

  render() {
    return (
      <div>
        <Typography variant="h2" >Class Component</Typography>

        <Typography variant="p">{this.state.rendered} Renders</Typography>
        <Typography variant="p">{this.state.updated} Updates</Typography>
        <Button
          color="primary"
          className='button'
          onClick={() =>
            this.setState({
              update: this.state.update + 1,
              rendered: this.state.rendered + 1,
            })
          }
        >
          Update the page
        </Button>
      </div>
    );
  }
}

function FunctionalComponent(props) {

  const [rendered, setRendered] = useState(1);
  const [updated, setUpdated] = useState(0);

  useEffect(() => {

    setTimeout(() => {
      document.title = `${updated} updates`;
    }, 2000);

    return function cleanup() {
      console.log("Bye bye. Destroying external objects, unsubscribing... here.");
    };

  });

  return (
    <div>
      <Typography variant="h2">Functional Component</Typography>
      <Typography variant="p" className='paragraph'>{rendered} Renders</Typography>
      <Typography variant="p" className='paragraph'>{updated} Updates</Typography>
      <Button
        color="primary"
        className='button'
        onClick={() => {
          setRendered(rendered + 1);
          setUpdated(updated + 1);
        }}
      >
        Update the page
      </Button>
    </div>
  );
}

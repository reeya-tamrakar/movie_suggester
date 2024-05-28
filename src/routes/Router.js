import {
  BrowserRouter,
  Route,
  Switch,
} from "react-router-dom/cjs/react-router-dom.min";
import Home from "../pages/Home";
import ViewMovie from "../pages/ViewMovie";
import AddMovie from "../pages/AddMovie";
import Login from "../pages/Login";
import Profile from "../pages/Profile";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} exact></Route>
        <Route path="/view_movie/:id" component={ViewMovie} exact></Route>
        <Route path="/add" component={AddMovie} exact></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/profile" component={Profile}></Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;

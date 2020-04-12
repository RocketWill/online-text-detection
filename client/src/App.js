import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { Layout } from 'antd';

import Header from './components/organisms/CustomHeader';
import Container from './components/organisms/Container';
import Main from './components/pages/Main';
import Result from './components/pages/Result';


const App = () => (
  <BrowserRouter>
    <Layout>
      <Header />
      <Container>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/result/:id" component={Result} />
        </Switch>
      </Container>
    </Layout>
  </BrowserRouter>
);

export default App;

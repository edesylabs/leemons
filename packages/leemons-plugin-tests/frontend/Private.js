import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import loadable from '@loadable/component';
import { useSession } from '@users/session';
import { goLoginPage } from '@users/navigate';

const TestsList = loadable(() => import('./src/pages/private/tests/List'));
const TestsEdit = loadable(() => import('./src/pages/private/tests/Edit'));
const TestsDetail = loadable(() => import('./src/pages/private/tests/Detail'));
const QuestionBanksList = loadable(() => import('./src/pages/private/questions-banks/List'));
const QuestionBankDetail = loadable(() => import('./src/pages/private/questions-banks/Detail'));
const StudentInstance = loadable(() => import('./src/pages/private/tests/StudentInstance'));

export default function Private() {
  const { path } = useRouteMatch();
  const session = useSession({ redirectTo: goLoginPage });

  return (
    <Switch>
      <Route path={`${path}/student/:id`}>
        <StudentInstance session={session} />
      </Route>
      <Route path={`${path}/questions-banks/:id`}>
        <QuestionBankDetail session={session} />
      </Route>
      <Route path={`${path}/questions-banks`}>
        <QuestionBanksList session={session} />
      </Route>
      <Route path={`${path}/detail/:id`}>
        <TestsDetail session={session} />
      </Route>
      <Route path={`${path}/:id`}>
        <TestsEdit session={session} />
      </Route>
      <Route path={`${path}`}>
        <TestsList session={session} />
      </Route>
    </Switch>
  );
}

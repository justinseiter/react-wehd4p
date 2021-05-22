import React from 'react';
import './styles/main.scss';
import Button from './components/button';

export default function App() {
  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <p className="graph">Start editing to see some magic happen :)</p>
      <p className="graph graph--loud">
        Start editing to see some magic happen :)
      </p>
      <Button>Hi</Button>
    </div>
  );
}

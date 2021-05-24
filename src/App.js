import React from 'react';
import './styles/main.scss';
import Button from './components/button';
import Pill from './components/pill';

export default function App() {
  return (
    <div>
      <h1>Hello!</h1>
      <p className="graph graph--loud">
        Start editing to see some magic happen :)
        <br />
        <Pill type="rounded" status="info">
          Type:Rounded -- Status:Info
        </Pill>
      </p>
      <Button type="primary">Hi</Button>
    </div>
  );
}

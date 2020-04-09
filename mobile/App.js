import React from 'react';
import 'intl'
import 'intl/locale-data/jsonp/pt-BR'

import Routes from './src/routes'
console.disableYellowBox = true
export default function App() {
  return (
    <Routes />
  );
}


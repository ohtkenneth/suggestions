// test server side rendering
import path from 'path';
import express from 'express';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import counterApp from './reducers';
import App from './containers/App';

const app = express();
const PORT = process.env.PORT || 3000;
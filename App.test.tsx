
// import React  from "react";
// import App from "./App";
// //import ShallowRenderer from 'react-test-renderer/shallow';
// test('renders without error', () => {
//   // const wrapper = shallow(<App />)
// });


// app.test.js








// Import the function or component you want to test
import { thisIsAwsome } from './App';
import mockAsyncStorage from 'mock-async-storage';
import storage from 'redux-persist/lib/storage';
import { persistStore } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';

// const persistConfig = {
//   key: 'root',
//   storage, // Provide the storage engine here
//   whitelist: ['someReducer'], // Optional: Specify reducers to persist
// };

console.log("AJUNGE AICI IN TEST")
mockAsyncStorage();

// Test case
test('should return true', () => {
  // Call the function or render the component and assert the expected outcome
  expect(thisIsAwsome()).toBe(true);
});
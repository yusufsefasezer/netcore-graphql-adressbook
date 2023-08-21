import React from 'react'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import Layout from './components/Layout/Layout'

// // pages
import Home from './pages/Home/Home'
import About from './pages/About/About'
import NotFound from './pages/NotFound/NotFound'

// // contact
import DetailsContact from './pages/Contact/Details/DetailsContact'
import AddContact from './pages/Contact/Add/AddContact'
import EditContact from './pages/Contact/Edit/EditContact'

// // address
import AddAddress from './pages/Address/Add/AddAddress'
import EditAddress from './pages/Address/Edit/EditAddress'

// // other
import Blank from './pages/Blank/Blank'
import { CONTACT_PREFIX, ADDRESS_PREFIX, ADD_PREFIX, EDIT_PREFIX } from './Global'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<Home />} />
      <Route path='about' element={<About />} />

      <Route path={`${CONTACT_PREFIX}/:contactId`} element={<DetailsContact />} />

      <Route path={`${CONTACT_PREFIX}/${ADD_PREFIX}`} element={<AddContact />} />
      <Route path={`${CONTACT_PREFIX}/:contactId/${EDIT_PREFIX}`} element={<EditContact />} />

      <Route path={`${CONTACT_PREFIX}/:contactId/${ADDRESS_PREFIX}/${ADD_PREFIX}`} element={<AddAddress />} />
      <Route path={`${CONTACT_PREFIX}/:contactId/${ADDRESS_PREFIX}/:addressId/${EDIT_PREFIX}`} element={<EditAddress />} />

      <Route path='blank' element={<Blank />} />
      <Route path='*' element={<NotFound />} />
    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;

import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { CompanyGroup } from './components/CompanyGroup/CompanyGroup';
import { Address } from './components/Address/Address';
import { Contact } from './components/Contact/Contact';
import { Home } from "./components/Home";
import FormikPage  from "./components/FormikPage";

const AppRoutes = [
  {
    index: true,
    element: <Home />
    },
    {
        path: '/companygroup',
        requireAuth:true,
        element: <CompanyGroup />
    },
    {
        path: '/address',
        requireAuth: true,
        element: <Address />
    },
    {
        path: '/contact',
        requireAuth: true,
        element: <Contact />
    },
    {
        path: '/test',
        requireAuth: true,
        element: <FormikPage />
    },
  ...ApiAuthorzationRoutes
];

export default AppRoutes;

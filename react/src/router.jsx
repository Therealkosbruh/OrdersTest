import {createBrowserRouter} from 'react-router-dom';
import ProductView from './Views/ProductView';

const router = createBrowserRouter([
    {
        path: '/products',
        element: <ProductView/>
    },
    {
        path: '*',
        element: <ProductView/>
    }
])

export default router;
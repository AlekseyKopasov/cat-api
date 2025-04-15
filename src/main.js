import { jsx as _jsx } from "react/jsx-runtime";
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false
        }
    }
});
createRoot(document.getElementById('root')).render(_jsx(QueryClientProvider, { client: queryClient, children: _jsx(App, {}) }));

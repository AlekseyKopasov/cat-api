import { jsx as _jsx } from "react/jsx-runtime";
import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
const createTestQueryClient = () => new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
});
export function renderWithProviders(ui, options) {
    const testQueryClient = createTestQueryClient();
    return render(_jsx(QueryClientProvider, { client: testQueryClient, children: ui }), options);
}

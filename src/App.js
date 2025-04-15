import { jsx as _jsx } from "react/jsx-runtime";
import { Form } from './components/Form/Form/Form';
function App() {
    return (_jsx("div", { className: 'flex flex-col gap-12 items-center justify-center max-w-[320px] min-h-screen m-auto', children: _jsx(Form, {}) }));
}
export default App;

import FormComponent from "../form/Form";
import NavBar from "../nav/Nav";
import TodoProvider from '../reducer-context/context'


function App() {
  return (
    <>
    <TodoProvider>
      <NavBar />
      <FormComponent/>
    </TodoProvider>
    </>
  );
}

export default App;

import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Protected from "./components/Protected/protected";
import Header from "./components/Header/header";
import Home from "./pages/home/home";
import About from "./pages/about/about";
import Login from "./pages/login/login";
import SignUp from "./pages/sign up/sign up";
import Footer from "./components/Footer/footer";
import Write from "./pages/write/write";
import FullBlog from "./pages/fullBlog/fullBlog";
import Library from "./pages/library/library";


const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign up" element={<SignUp />} />
          <Route 
             path="/About" 
             element={
             <Protected>
               <About/>
             </Protected>
             } 
          />

          <Route 
             path="/write" 
             element={
             <Protected>
                <Write/>
             </Protected>
             } 
          />
          <Route 
             path="/blog/:id" 
             element={
             <Protected>
                <FullBlog/>
             </Protected>
             } 
          />
          <Route 
             path="/Blogs" 
             element={
             <Protected>
                <Library/>
             </Protected>
             } 
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

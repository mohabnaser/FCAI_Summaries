import { useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { contentPages } from "./data/content-pages.generated";
import ContentPage from "./pages/ContentPage";
import NotFoundPage from "./pages/NotFoundPage";
import DatabaseHomePage from "./pages/database/DatabaseHomePage";
import Exam2018Page from "./pages/ds/Exam2018Page";
import Exam2022Page from "./pages/ds/Exam2022Page";

const BASENAME = import.meta.env.BASE_URL.replace(/\/$/, "");

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);

  return null;
}

const contentRoutes = Object.values(contentPages).map((page) => (
  <Route
    key={page.id}
    path={page.route}
    element={<ContentPage key={page.id} page={page} />}
  />
));

export default function App() {
  return (
    <BrowserRouter basename={BASENAME || undefined}>
      <ScrollToTop />
      <Routes>
        {contentRoutes}

        <Route path="/2nd-year/database" element={<DatabaseHomePage />} />
        <Route
          path="/2nd-year/data-structures/exam-2018"
          element={<Exam2018Page />}
        />
        <Route
          path="/2nd-year/data-structures/exam-2022"
          element={<Exam2022Page />}
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

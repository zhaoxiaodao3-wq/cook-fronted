import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { AllRecipes } from "./pages/AllRecipes";
import { RecipeDetails } from "./pages/RecipeDetails";
import { Upload } from "./pages/Upload";
import { Profile } from "./pages/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "recipes", Component: AllRecipes },
      { path: "recipes/:id", Component: RecipeDetails },
      { path: "upload", Component: Upload },
      { path: "profile", Component: Profile },
    ],
  },
]);
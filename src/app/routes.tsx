import { createBrowserRouter, Navigate } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { AllRecipes } from "./pages/AllRecipes";
import { RecipeDetails } from "./pages/RecipeDetails";
import { Upload } from "./pages/Upload";
import { Profile } from "./pages/Profile";

// 与 vite base 一致，例如 /cook-frontend
const basename = import.meta.env.BASE_URL.replace(/\/$/, "") || undefined;

export const router = createBrowserRouter(
  [
    { path: "index.html", element: <Navigate to="/" replace /> },
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
  ],
  { basename },
);
import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import * as kv from './kv_store.tsx';

const app = new Hono();

app.use('*', logger(console.log));
app.use('*', cors());

// Routes should be prefixed with /make-server-ba034f32
const api = app.basePath('/make-server-ba034f32');

api.get('/recipes', async (c) => {
  try {
    const keys = await kv.getByPrefix('recipe:');
    return c.json({ success: true, data: keys.map(k => k.value) });
  } catch (error) {
    return c.json({ success: false, error: String(error) }, 500);
  }
});

api.post('/recipes', async (c) => {
  try {
    const body = await c.req.json();
    const recipeId = body.id || `r${Date.now()}`;
    const newRecipe = { ...body, id: recipeId };
    await kv.set(`recipe:${recipeId}`, newRecipe);
    return c.json({ success: true, data: newRecipe });
  } catch (error) {
    return c.json({ success: false, error: String(error) }, 500);
  }
});

api.post('/recipes/:id/rate', async (c) => {
  try {
    const { id } = c.req.param();
    const { rating, user } = await c.req.json();
    const recipe = await kv.get(`recipe:${id}`);
    if (!recipe) return c.json({ success: false, error: 'Recipe not found' }, 404);

    const newReview = { id: `rev${Date.now()}`, userId: user.id, userName: user.name, userAvatar: user.avatar, rating, date: new Date().toISOString() };
    const existingIdx = recipe.reviews.findIndex((r: any) => r.userId === user.id);
    if (existingIdx >= 0) {
      recipe.reviews[existingIdx] = { ...recipe.reviews[existingIdx], rating, date: new Date().toISOString() };
    } else {
      recipe.reviews.push(newReview);
    }
    const total = recipe.reviews.reduce((sum: number, r: any) => sum + r.rating, 0);
    recipe.rating = Number((total / recipe.reviews.length).toFixed(1));
    recipe.ratingCount = recipe.reviews.length;

    await kv.set(`recipe:${id}`, recipe);
    return c.json({ success: true, data: recipe });
  } catch (error) {
    return c.json({ success: false, error: String(error) }, 500);
  }
});

api.post('/recipes/:id/suggest', async (c) => {
  try {
    const { id } = c.req.param();
    const { content, user } = await c.req.json();
    const recipe = await kv.get(`recipe:${id}`);
    if (!recipe) return c.json({ success: false, error: 'Recipe not found' }, 404);

    const newSugg = { id: `sugg${Date.now()}`, userId: user.id, userName: user.name, userAvatar: user.avatar, content, date: new Date().toISOString() };
    const existingIdx = recipe.suggestions.findIndex((s: any) => s.userId === user.id);
    if (existingIdx >= 0) {
      recipe.suggestions[existingIdx] = { ...recipe.suggestions[existingIdx], content, date: new Date().toISOString() };
    } else {
      recipe.suggestions.push(newSugg);
    }

    await kv.set(`recipe:${id}`, recipe);
    return c.json({ success: true, data: recipe });
  } catch (error) {
    return c.json({ success: false, error: String(error) }, 500);
  }
});

api.get('/users/:id/favorites', async (c) => {
  try {
    const { id } = c.req.param();
    const favs = await kv.get(`user_favs:${id}`);
    return c.json({ success: true, data: favs || [] });
  } catch (error) {
    return c.json({ success: false, error: String(error) }, 500);
  }
});

api.post('/users/:id/favorites', async (c) => {
  try {
    const { id } = c.req.param();
    const { recipeId } = await c.req.json();
    let favs = await kv.get(`user_favs:${id}`) || [];
    if (favs.includes(recipeId)) {
      favs = favs.filter((f: string) => f !== recipeId);
    } else {
      favs.push(recipeId);
    }
    await kv.set(`user_favs:${id}`, favs);
    return c.json({ success: true, data: favs });
  } catch (error) {
    return c.json({ success: false, error: String(error) }, 500);
  }
});

Deno.serve(app.fetch);

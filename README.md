# README

## Overview

Lord of the Flags is a flag guessing game built as a Progressive Web App. Given a country name, you pick the correct flag from four options. The game tracks your best score per region and challenges you to beat it.

The project has two goals: learning Vue 3 by building something real, and exploring what Claude can help you build, one feature at a time.

Stack: Vue 3 + Vite + Pinia + Tailwind CSS. Hosted on Vercel.

---

## How It Works

### Region Selection

On the home screen, you choose a region to play: World, Africa, America, Asia, Europe, or Oceania. Each region shows your personal best score alongside the total number of countries in that region.

### A Round

Each round presents a country name and four flag options. You tap the flag you think matches. The correct answer highlights green; a wrong guess highlights red on the wrong tile and green on the correct one.

### Scoring

You earn one point per correct answer. A game runs through every country in the selected region exactly once, in a shuffled order. Your best score per region is saved for the session.

### End of Game

When all countries in the region have been shown, the game ends and returns to the region selection screen. Your score is compared to your previous best and updated if it's higher.

---

## Stack

- **Vue 3**, UI framework, Composition API with `<script setup>`
- **Vite**, build tool and dev server
- **Pinia**, state management (the game store)
- **Tailwind CSS**, utility-first styling
- **Vercel**, hosting and deployment

---

## Project Setup

```bash
npm install
```

### Local Run & Development

```bash
npm run dev
```
---

## Countries

The game includes over 200 countries across all six regions. The data lives in `src/data/countries.json` as a simple array of objects with `name`, `code`, and `continent`. Adding a new country is a matter of adding one entry and dropping the matching SVG flag into `assets/world_flags/`.

---
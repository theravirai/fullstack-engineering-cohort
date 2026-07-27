# Redux Toolkit Mini Hackathon

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

This repository contains my submission for the **Redux Toolkit Mini Hackathon**. The goal of this project was to independently research Redux Toolkit, document the learning journey, and build a practical React application demonstrating unidirectional data flow (UI → Actions → Reducers → State).

## 🌟 Quick Links
- **Live Demo:** [https://redux-hackathon.vercel.app](https://redux-hackathon.vercel.app)
- **Video Walkthrough:** [Coming Soon (LinkedIn/YouTube)](#)
3. Designing a nice UI rather than relying on generic templates.
4. Implementing local storage syncing natively via React `useEffect` hooks tied to the Redux state.


## 🏗️ Repository Structure

To keep things organized, the repository is split into three main sections:

- **[`/project`](./project)**
  The actual React codebase. It features a custom "Industrial Hardware Dashboard" design built with Vite and vanilla CSS. All global state is handled exclusively by Redux Toolkit.
  
- **[`/documentation`](./documentation)**
  My personal notes, research, and technical documentation on core Redux concepts like the Store, Slices, Reducers, and `useSelector`/`useDispatch`.
  
- **[`/screenshots`](./screenshots)**
  Contains pictures.

## 🧠 Learning

Throughout this hackathon, I focused on:
1. Moving away from legacy Redux (`createStore`) to modern Redux Toolkit (`configureStore`, `createSlice`).
2. Keeping React components completely stateless regarding business logic (relying purely on `dispatch`).


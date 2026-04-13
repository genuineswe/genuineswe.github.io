---
title: "Why I Finally Put My Frontend in a Container"
date: "2026-04-14"
description: "Moving past the 'install instructions' hell and embracing Docker."
---

Last month, a new developer joined our team. 
I pointed them to the project README. 
It had 15 steps to set up the environment. 
By lunch, he was still stuck on step 4.

His Node version was 20. 
The project needed Node 16. 
He had a Windows machine. 
I was on a Mac. 
The "Standard Setup" was a myth.

---

### The Wrong Approach

For months, I tried to solve this with documentation. 
I added more "Note:" sections to the README. 
I shared my `.nvmrc` file. 
I even wrote a setup script in Bash.

But documentation is **Knowledge that Rots**. 
Every time we updated a package, the README broke. 
The principle of "Don't Repeat Yourself" (DRY) applies to setups too. 
I was repeating the same manual fixes for every new hire. 

| Method | Effort | Result |
| :--- | :--- | :--- |
| Writing long READMEs | High | Quickly outdated |
| Custom Bash scripts | Medium | OS-dependent issues |
| Screen-sharing fixes | High | Total time sink |

---

### The Realization

I realized that a README is just a wish list. 
It *hopes* the developer has the right tools. 
I needed to provide the *actual* environment. 

In *The Pragmatic Programmer*, they talk about **Orthogonality**. 
My application code was tied too closely to my global OS. 
If I updated my system, I broke my app. 
I needed a boundary.

---

### The Correct Approach

I replaced the 15-step README with one `Dockerfile`. 
This file defines the operating system, Node, and dependencies. 
It is the "Single Source of Truth" for the environment.

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]
```
*This works because it creates an isolated virtual environment where the Node version and OS are identical on every machine.*

For full-stack features, I used **Docker Compose**. 
Instead of telling devs to "install Redis locally," I just added it to the config.

```yaml
version: '3.8'
services:
  web:
    build: .
    ports: ["5173:5173"]
  cache:
    image: redis:alpine
```
*This works because it orchestrates multiple services to run in a private network without cluttering the developer's laptop.*

---

### The Results

I asked that same new developer to try the Docker setup instead. 
He ran `docker-compose up`. 
The environment was ready in minutes. 

| Metric | Before Docker | After Docker |
| :--- | :--- | :--- |
| First install | 2 hours | 5 minutes |
| Local OS pollution | High (Global DBs) | Zero |
| Environment drift | Constant | None |

---

### Reflection

Consistency is a feature. 
We spend too much time on "Incidental Complexity." 
Setting up a dev environment shouldn't be a test of patience. 
Docker is just a better way to communicate requirements.

It isn't about being a DevOps expert. 
It is about being a professional who values their time. 
Keep your laptop clean. 
Containers are the modern README.

---

### Your Next Step

Check your project's README today. 
Count how many steps are just environment setup. 
Try to move the first three steps into a `Dockerfile`. 
Run it locally and see if you can delete those lines from your documentation.

# Deploy CampusVibe to Vercel

CampusVibe's deployable frontend is the Vite + React app in `frontend/react-app`, not the repository root. Set the Vercel project's **Root Directory** to `frontend/react-app`.

## Configure the Vercel project

In the Vercel dashboard, open the CampusVibe project and go to **Settings → Build and Deployment**. Set or confirm:

| Setting | Value |
| --- | --- |
| Root Directory | `frontend/react-app` |
| Framework Preset | Vite |
| Install Command | `npm install` |
| Build Command | `npm run build` |
| Output Directory | `dist` |

Save any changes. If importing the repository as a new Vercel project, use the same root directory and build settings during setup.

## Deploy and verify

With the GitHub repository connected, push to the configured production branch (currently `main`) to start a production deployment. Preview branches deploy separately.

Wait for the deployment to finish and show **Ready**, then open its assigned production domain and confirm that the CampusVibe page loads. If the domain returns Vercel's `404 NOT_FOUND`, check that the root directory is `frontend/react-app` and review the deployment's build logs.

After changing project build settings, trigger a **new deployment** or redeploy the latest one. Settings changes do not update a deployment that has already been built. If the deployment page says its configuration differs from the current project settings, redeploy after confirming the settings above.

## Make the production site publicly accessible

Vercel Authentication can protect a production deployment URL even when the deployment is Ready. If visitors should be able to open the production site without joining the Vercel team, configure the CampusVibe project's **Settings → Deployment Protection → Vercel Authentication** to protect **Preview** deployments only. Do not change the team's global Deployment Protection settings for this project-level behavior.

Then verify both access paths in a private browser window where you are not signed in to Vercel:

- The production URL loads the CampusVibe app without an access-request page.
- A preview deployment remains protected and requires team access.

If the production URL still shows **You Need Access**, confirm the project-level Vercel Authentication scope and verify that you are testing the latest production deployment URL.

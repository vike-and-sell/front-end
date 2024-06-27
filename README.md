# Vike & Sale Frontend

This repository contains all the code for the frontend of the Vike & Sale project.

## Local Set Up and Run

In order to run the frontend locally on your machine, you will have to prepare the following:

<ol>
  <li>Clone front-end, gateway, and data-layer repositories</li>
  <li>Follow the respective instructions in the  <a href="https://github.com/vike-and-sell/gateway" target="_blank" rel="noopener">gateway</a> and <a href="https://github.com/vike-and-sell/data-layer" target="_blank" rel="noopener">data-layer</a> repositories to get their Docker Containers running</li>
  <li>In the cloned front-end, run <strong>npm install</strong> to install the node modules</li>
  <li>Run <strong>npm run dev</strong> to start up the front-end</li>
</ol>

## Local Set Up and Run

On Windows, sometimes Docker has issues with the line endings of Windows machines and the data-layer. Try running **git config core.autocrlf false** and then **git reset --hard** to resolve this issue.

On Mac, sometime Docker has issues with executable permissions on Mac and the data-layer. Try running **chmod +x /path/to/1-init-dummy-data.sh** to resolve this issue.


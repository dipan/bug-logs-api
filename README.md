# bug-logs-api
Bug-Logs API back-end

### Dev setup steps

#### 1: Clone
```sh
git clone https://github.com/mandaldipan01/bug-logs-api.git
```

#### 2: Install required packages

2.1: Global packages

> Note: If already installed, skip
```sh
npm i -g nodemon
```
or
```sh
yarn global add nodemon
```

2.2: Local packages

Navigate to project's root directory after cloning
```sh
cd bug-logs-api
```
then
```sh
npm i
```
or
```sh
yarn
```

#### 3: Add Config data

3.1: Create file `config.js` in `api/auth` directory

3.2: Copy template content form `src/api/auth/app.config.sample.js` and update with real values

3.3: Create file `connection.properties` in `lib` directory

3.4: Copy template content form `mongodb/connection.sample.properties` and update with real values

#### 4: Run locally
```sh
node app.js
```
or
```sh
nodemon app.js
```
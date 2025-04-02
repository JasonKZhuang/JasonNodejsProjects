# Setup Node.js with TypeScript
1. Initialize a node.js project
  ```shell
  npm init -y
  ```

2. create a index.ts file
see details in index.ts

3. install typescript and type of node
```shell
  npm install -D typescript  @types/node 
```
this command will add the following into package.js
```javascript
"devDependencies": {
    "typescript": "^5.1.6",
    "@types/node": "^20.4.2"
  }
```
we also add the typescript compiler to script in package.js file
```javascript
   "scripts": {
        "start": "node ./dist/index.js", // the entry of application
        "build": "tsc", // compile and build 
        "lint": "eslint", //linting finds inconsistencies and possible errors in code, for consistent and high qulity code
        "test": "jest" // using jest to do the test
    }
```
4. add src directory, and move *.ts into src
5. configure Typescript
    ```shell 
      npx tsc  -v # npx typescript compiler version
      npx tsc --init # initialize typescript compiler
      npm install -D @tsconfig/node20          
    ```
6. run build command to generate the dist folder  
   if you run command node src/index.ts, you will get error indicating Unknown file extension, so you need to run this  
    - first to compile the typescript
      ```shell
        npx tsc
        # or the same
        npm run build
      ```
   - Then, run the node command to run the project
      ```shell
        node ./dist/index.js
        # or the same
        npm run start
   ```
7. More efficient way is to instal tsx dependency (TypeScript Execute (tsx): The easiest way to run TypeScript in Node.js)
    ```shell
      npm install -D tsx
    ```
    - Using it in package.json only in dev mode, 
    - Not run on the production mode
    ```json
      // package.json
      {
          "scripts": {
              "dev": "tsx watch --clear-screen=false src/index.ts",
          }
      }
    ```
    - so , this time, you only need to run 
      ```shell
        npm run dev
      ```
      and then, you just working on your typescript source code and save the file, the output of terminal will pop up the new result


# some git command
  ```shell
    git config --list
    git config --global user.email "you@example.com"
    git config --global user.name "Your Name"
    git config --global user.password "your password"
  ```

# References:
[How to Setup Node.js with TypeScript in 2023](https://www.youtube.com/watch?v=H91aqUHn8sE) 
[Centralized Recommendations for TSConfig bases](https://github.com/tsconfig/bases)  
[TypeScript and NodeJS: The Proper Setup!](https://www.youtube.com/watch?v=HvxYkugp55A)  
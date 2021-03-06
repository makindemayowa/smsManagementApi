# smsManagementApi

SMS management API allows users to send and receive short messages.

#### Setting up locally

- Clone the project from repository [https://github.com/makindemayowa/smsManagementApi.git](https://github.com/makindemayowa/smsManagementApi.git)
- Change directory to `smsManagementApi` and run `npm install`.
- Create a postgres database and add its name and username into `env.sh` file replicating
  the sample specified in [env.sh.sample](env.sh.sample)
- Start the app with `npm run start:dev`
- Point your browser to `http://localhost:8000`.
- Swagger was used for the API documentation and can be accessed through `http://localhost:8000/docs/`.

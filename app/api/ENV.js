const ENV = process.env.API_ENV ? process.env.API_ENV : 'dev'; // local, dev, qa, prod
export default ENV;

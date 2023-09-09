import server from '../../../config/server';

const app = server.listen(3434).on('error', () => { });

export default async () => app;
export { app };
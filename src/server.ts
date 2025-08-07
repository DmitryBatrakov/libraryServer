import express from 'express';
import { PORT } from './config/libConfig.ts';
import { libRouter } from './routes/libRouter.ts';
import { errorHandler } from './errorHandler/errorHandler.ts';

export const launchServer = () => {
    const app = express();
    
    
    
//================Middleware==============
    app.use(express.json());


//=================Router=================
    app.use('/api', libRouter);

    app.use((req, res) => {
        res.status(404).send("Page not found")
    })


//===============ErrorHandler=============
    app.use(errorHandler)

    app.listen(PORT, () => {
        console.log(`Server started on http://localhost${PORT}`);    
    })

}
import express, { Application } from 'express';
import userRoutes from '../routes/usuarios'
import cors from 'cors';
import db from '../db/conexion'


class server {
    
    private app: Application;
    private port: string;
    private apiPaths = {
        usuarios: '/api/usuarios'
    };

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';

        this.dbConection();
        this.milddwares();

        this.routes();
    }

    async dbConection(){
        try {
            await db.authenticate();
            console.log('Database Online');
        } catch (error) {
            throw new Error('Database Offline');
            
        }
    }

    milddwares(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'))
    }


    routes(){
        this.app.use(this.apiPaths.usuarios, userRoutes)
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Server on port' + this.port);
        
        })
    }
  
}

export default server